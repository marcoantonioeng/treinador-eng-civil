#!/usr/bin/env bash
# Monta o treinador em um único HTML.
#   ./montar.sh artefato <saida.html>   → página para o artefato do Claude
#   ./montar.sh celular                 → aplicativo instalável (PWA) em celular/
set -euo pipefail
cd "$(dirname "$0")"
FONTES='https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..600&family=Inter:wght@400..700&display=swap'
corpo() {
  echo '<style>'; cat css/estilo.css; echo '</style>'
  echo '<style>'; cat css/tema-marfim.css; echo '</style>'
  echo '<main class="pagina" id="app"></main>'
  echo '<div id="toasts" aria-live="polite"></div>'
  echo '<canvas id="confete" aria-hidden="true"></canvas>'
  for f in questoes questoes-basicos questoes-camara2025 questoes-ingles ajustes-leitura discursivas app; do echo '<script>'; cat "js/$f.js"; echo '</script>'; done
}
case "${1:-}" in
  artefato)
    { echo '<title>Treinador Engenharia Civil</title>'
      echo '<meta name="claude:viewport-fit-sides" content="cover">'
      echo "<link rel=\"stylesheet\" href=\"$FONTES\">"
      corpo; } > "$2" ;;
  celular)
    VERSAO=$(cat css/*.css js/*.js celular/manifest.webmanifest sw.tpl.js montar.sh | sha1sum | cut -c1-10)
    { echo '<!doctype html>'
      echo '<html lang="pt-BR"><head><meta charset="utf-8">'
      echo '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
      echo '<title>Treinador Engenharia Civil</title>'
      echo '<meta name="description" content="Treino de questões Cebraspe para Analista Legislativo – Engenharia Civil da Câmara dos Deputados.">'
      echo '<link rel="manifest" href="manifest.webmanifest">'
      echo '<meta name="theme-color" content="#F4F2ED" media="(prefers-color-scheme: light)">'
      echo '<meta name="theme-color" content="#101318" media="(prefers-color-scheme: dark)">'
      echo '<meta name="mobile-web-app-capable" content="yes">'
      echo '<meta name="apple-mobile-web-app-capable" content="yes">'
      echo '<meta name="apple-mobile-web-app-title" content="Treinador">'
      echo '<meta name="apple-mobile-web-app-status-bar-style" content="default">'
      echo '<link rel="apple-touch-icon" href="icones/apple-touch-icon.png">'
      echo '<link rel="icon" type="image/png" sizes="32x32" href="icones/favicon-32.png">'
      echo '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
      echo "<link rel=\"stylesheet\" href=\"$FONTES\">"
      echo '</head><body>'
      corpo
      echo '<script>'; cat js/atualizacao-app.js; echo '</script>'
      echo '</body></html>'; } > celular/index.html
    sed "s/__VERSAO__/$VERSAO/" sw.tpl.js > celular/sw.js
    echo "celular/ montado (versão $VERSAO)" ;;
  *) echo "uso: $0 artefato <saida.html> | $0 celular" >&2; exit 1 ;;
esac
