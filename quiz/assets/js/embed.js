// embed.js — integração do quiz com o novo site ZR sem alterar a lógica do quiz:
// 1) ?embed=1 ativa o modo modal (esconde o chrome da página dedicada)
// 2) avisa o site-pai via postMessage quando a consulta começa (quiz_start)
//    e quando é concluída (quiz_complete) — usado pelo analytics do site
(function () {
  // modo embed: por querystring (?embed=1) OU simplesmente por estar dentro de um iframe
  var inFrame = false;
  try { inFrame = window.self !== window.top; } catch (e) { inFrame = true; }
  if (/[?&]embed=1/.test(location.search) || inFrame) document.body.classList.add('embed');

  function notify(type, extra) {
    try {
      window.parent.postMessage(Object.assign({ zr: type }, extra || {}), '*');
    } catch (e) { /* sem janela-pai: segue normal (modo página dedicada) */ }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btnIniciar = document.getElementById('btn-iniciar');
    if (btnIniciar) btnIniciar.addEventListener('click', function () { notify('quiz_start'); });

    // a tela final do quiz é detectada por conteúdo — nenhuma linha do app.js foi tocada
    var qc = document.getElementById('quiz-container');
    if (qc && window.MutationObserver) {
      new MutationObserver(function () {
        if (/análise já está em produção/i.test(qc.textContent || '')) notify('quiz_complete');
      }).observe(qc, { childList: true, subtree: true, characterData: true });
    }
  });
})();
