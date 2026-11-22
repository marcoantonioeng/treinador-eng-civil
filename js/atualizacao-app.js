/* App de celular: registra o service worker, procura versão nova sempre que o app é aberto
 * ou volta ao primeiro plano e, quando ela chega, oferece recarregar. Só entra em celular/index.html. */
(function () {
  if (!('serviceWorker' in navigator) || !(location.protocol === 'https:' || location.hostname === 'localhost')) return;
  var tinhaControle = !!navigator.serviceWorker.controller, avisado = false;
  function avisar() {
    if (avisado) return;
    avisado = true;
    var el = document.createElement('div');
    el.className = 'aviso-versao';
    el.setAttribute('role', 'status');
    el.innerHTML = '<span>Nova versão do Treinador disponível.</span><button type="button">Atualizar</button>';
    el.querySelector('button').addEventListener('click', function () { location.reload(); });
    document.body.appendChild(el);
  }
  // A versão nova assume o controle sozinha (skipWaiting + clients.claim); a página aberta ainda é a antiga.
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (tinhaControle) avisar();
    tinhaControle = true;
  });
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(function (reg) {
      // O app instalado costuma voltar da memória sem recarregar: confere a versão a cada retorno.
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') reg.update().catch(function () { /* sem internet */ });
      });
    }).catch(function () { /* segue sem modo offline */ });
  });
})();
