package br.eng.treinador;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

/**
 * Embrulha o Treinador (HTML em assets/index.html) num WebView.
 * O progresso fica no localStorage do WebView, dentro do app.
 */
public class MainActivity extends Activity {

    private static final int REQ_ABRIR = 1;
    private static final int REQ_SALVAR = 2;

    private WebView web;
    private TextToSpeech tts;
    private volatile boolean ttsPronto = false;
    private ValueCallback<Uri[]> escolhaArquivo;
    private String textoParaSalvar;

    @Override
    protected void onCreate(Bundle salvo) {
        super.onCreate(salvo);

        web = new WebView(this);
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        setContentView(web);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setTextZoom(100);

        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                int r = tts.setLanguage(new Locale("pt", "BR"));
                if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) {
                    tts.setLanguage(new Locale("pt"));
                }
                ttsPronto = true;
            }
        });

        web.addJavascriptInterface(new Ponte(), "AndroidApp");

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest req) {
                Uri u = req.getUrl();
                if ("file".equals(u.getScheme())) return false;
                // links externos abrem no navegador do celular
                try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (ActivityNotFoundException e) { /* ignora */ }
                return true;
            }
        });

        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
                if (escolhaArquivo != null) escolhaArquivo.onReceiveValue(null);
                escolhaArquivo = cb;
                Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType("*/*");
                try {
                    startActivityForResult(Intent.createChooser(i, "Escolher arquivo de progresso"), REQ_ABRIR);
                } catch (ActivityNotFoundException e) {
                    escolhaArquivo = null;
                    return false;
                }
                return true;
            }
        });

        if (salvo == null || web.restoreState(salvo) == null) {
            web.loadUrl("file:///android_asset/index.html");
        }
    }

    /** Métodos chamados pelo JavaScript da página (window.AndroidApp). */
    private class Ponte {
        @JavascriptInterface
        public void speak(String texto, String idioma, double ritmo) {
            if (!ttsPronto || texto == null) return;
            tts.setSpeechRate((float) Math.max(0.5, Math.min(2.0, ritmo)));
            String t = texto.length() > 3900 ? texto.substring(0, 3900) : texto;
            tts.speak(t, TextToSpeech.QUEUE_FLUSH, null, "treinador");
        }

        @JavascriptInterface
        public void stopSpeaking() {
            if (tts != null) tts.stop();
        }

        @JavascriptInterface
        public void saveFile(String nome, String conteudo) {
            runOnUiThread(() -> {
                textoParaSalvar = conteudo;
                Intent i = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType("application/json");
                i.putExtra(Intent.EXTRA_TITLE, nome);
                try {
                    startActivityForResult(i, REQ_SALVAR);
                } catch (ActivityNotFoundException e) {
                    textoParaSalvar = null;
                    Toast.makeText(MainActivity.this, "Não há onde salvar arquivos. Use Copiar código.", Toast.LENGTH_LONG).show();
                }
            });
        }
    }

    @Override
    protected void onActivityResult(int req, int res, Intent dados) {
        super.onActivityResult(req, res, dados);
        if (req == REQ_ABRIR) {
            if (escolhaArquivo != null) {
                Uri u = (res == RESULT_OK && dados != null) ? dados.getData() : null;
                escolhaArquivo.onReceiveValue(u != null ? new Uri[]{u} : null);
                escolhaArquivo = null;
            }
        } else if (req == REQ_SALVAR) {
            String txt = textoParaSalvar;
            textoParaSalvar = null;
            if (res != RESULT_OK || dados == null || dados.getData() == null || txt == null) return;
            try (OutputStream os = getContentResolver().openOutputStream(dados.getData(), "wt")) {
                os.write(txt.getBytes(StandardCharsets.UTF_8));
                Toast.makeText(this, "Progresso salvo.", Toast.LENGTH_SHORT).show();
            } catch (Exception e) {
                Toast.makeText(this, "Não foi possível salvar o arquivo.", Toast.LENGTH_LONG).show();
            }
        }
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        // a página usa o histórico para voltar ao Canteiro; na tela inicial, sai do app
        if (web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (tts != null) tts.stop();
        web.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        web.onResume();
    }

    @Override
    protected void onDestroy() {
        if (tts != null) tts.shutdown();
        web.destroy();
        super.onDestroy();
    }
}
