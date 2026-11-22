/* Ponte com o app Android: voz (TextToSpeech), salvar arquivo e detecção de app instalado. */
(function () {
  var A = window.AndroidApp; if (!A) return;
  function Utt(t) { this.text = String(t == null ? '' : t); this.lang = 'pt-BR'; this.rate = 1; this.voice = null; }
  var sintese = {
    speak: function (u) { try { A.speak(String(u.text || ''), String(u.lang || 'pt-BR'), Number(u.rate) || 1); } catch (e) {} },
    cancel: function () { try { A.stopSpeaking(); } catch (e) {} },
    getVoices: function () { return []; }, pause: function () {}, resume: function () {},
    speaking: false, pending: false, paused: false, onvoiceschanged: null
  };
  try { Object.defineProperty(window, 'speechSynthesis', { value: sintese, configurable: true, writable: true }); } catch (e) { try { window.speechSynthesis = sintese; } catch (e2) {} }
  try { Object.defineProperty(window, 'SpeechSynthesisUtterance', { value: Utt, configurable: true, writable: true }); } catch (e) { window.SpeechSynthesisUtterance = Utt; }
  var blobs = {}, criar = URL.createObjectURL.bind(URL);
  URL.createObjectURL = function (b) { var u = criar(b); blobs[u] = b; return u; };
  var clicar = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    var b = blobs[this.href];
    if (this.hasAttribute('download') && b) {
      var nome = this.getAttribute('download') || 'arquivo.json', r = new FileReader();
      r.onload = function () { A.saveFile(nome, String(r.result || '')); };
      r.readAsText(b);
      return;
    }
    return clicar.apply(this, arguments);
  };
})();
