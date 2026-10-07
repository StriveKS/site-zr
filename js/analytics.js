// analytics.js — GA4 + Microsoft Clarity, injetados dinamicamente (sem bloquear render)
// Eventos rastreados: page_view (por rota), quiz_open, quiz_start, quiz_complete,
// lead_form_submit_attempt/success/error, click_whatsapp, click_instagram
window.ZR = window.ZR || {};

(function () {
  let ready = false;

  ZR.track = function (name, params) {
    if (!ready || typeof window.gtag !== 'function') return;
    window.gtag('event', name, params || {});
  };

  ZR.trackRoute = function (id, title) {
    if (!ready || typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_title: title || document.title,
      page_path: '/#' + id
    });
  };

  function init() {
    const C = ZR.CONFIG;
    if (!C) return;

    if (C.ga4) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + C.ga4;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', C.ga4, { send_page_view: false });
      ready = true;
    }

    if (C.clarity) {
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', C.clarity);
    }
  }

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init);
})();
