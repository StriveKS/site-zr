// app.js — orquestrador: abertura, menu lateral, roteador SPA, modal do quiz,
// formulário de contato e eventos de analytics. Depende de: config, shaders,
// analytics, content (núcleo) e js/pages/*.js (uma aba por arquivo).
window.ZR = window.ZR || {};

(function () {
  const $ = s => document.querySelector(s);
  const C = ZR.CONFIG;

  /* ================= MENU LATERAL ================= */
  const DRAWER_MAX = 1024; // até este width o menu é drawer; acima, é fixo mas retrátil
  const inDrawerMode = () => innerWidth <= DRAWER_MAX;

  function buildNav() {
    const nav = $('#nav');
    ZR.NAV.forEach(([id, label]) => {
      const a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = label;
      a.dataset.t = id;
      nav.appendChild(a);
    });
    const burger = $('#burger'), scrim = $('#scrim'), sideToggle = $('#sideToggle');
    burger.setAttribute('aria-expanded', String(!inDrawerMode()));
    function toggleSide() {
      if (inDrawerMode()) {
        // mobile/tablet: drawer por cima do conteúdo
        const open = $('#side').classList.toggle('open');
        scrim.classList.toggle('on', open);
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      } else {
        // desktop: recolhe/mostra o menu com a mesma animação de deslize
        const hidden = document.body.classList.toggle('side-hidden');
        burger.setAttribute('aria-expanded', String(!hidden));
        burger.setAttribute('aria-label', hidden ? 'Mostrar menu' : 'Esconder menu');
      }
    }
    burger.onclick = toggleSide;
    if (sideToggle) sideToggle.onclick = toggleSide;
    scrim.onclick = closeMenu;
    // cruzar o breakpoint nunca deixa estados conflitantes
    addEventListener('resize', () => {
      if (inDrawerMode()) document.body.classList.remove('side-hidden');
      else closeMenu();
    });
  }
  function closeMenu() {
    const side = $('#side'); if (!side) return;
    side.classList.remove('open');
    $('#scrim').classList.remove('on');
    if (inDrawerMode()) $('#burger').setAttribute('aria-expanded', 'false');
  }
  function markActive(id) {
    const ind = $('#ind');
    $('#nav').querySelectorAll('a').forEach(a => {
      const on = a.dataset.t === id;
      if (on) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
      if (on) ind.style.transform = `translateY(${a.offsetTop}px)`;
    });
  }

  /* ================= ROTEADOR SPA (hash) ================= */
  let cur = '';
  function routeId() {
    const h = location.hash.slice(1);
    return ZR.pages[h] ? h : 'inicio';
  }
  function render(first) {
    const view = $('#view');
    const id = routeId();
    if (id === cur && !first) return;
    const draw = () => {
      cur = id;
      const pg = ZR.pages[id];
      document.title = pg.title;
      view.innerHTML = pg.render();
      scrollTo(0, 0);
      view.classList.remove('swap');
      markActive(id);
      initReveals(view);
      if (id === 'contato') initContactForm();
      ZR.trackRoute(id, pg.title);
    };
    if (first || !cur) draw();
    else { view.classList.add('swap'); setTimeout(draw, 230); }
  }
  function initReveals(view) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
    }), { threshold: .12 });
    view.querySelectorAll('.rv,.ln').forEach(x => io.observe(x));
  }

  /* ================= MODAL DO QUIZ (iframe do quiz integrado) ================= */
  let opener = null, quizLoaded = false;
  function openQuiz(source) {
    const modal = $('#modal'), frame = $('#qframe');
    opener = source || document.activeElement;
    if (!quizLoaded) { frame.src = C.quizUrl; quizLoaded = true; }
    modal.classList.add('open');
    closeMenu();
    document.body.style.overflow = 'hidden';
    ZR.track('quiz_open', { origin_route: cur });
    $('#qx').focus();
  }
  function closeQuiz() {
    const modal = $('#modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (opener && opener.focus) opener.focus();
  }

  /* ================= FORMULÁRIO DE CONTATO ================= */
  const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s+[A-Za-zÀ-ÖØ-öø-ÿ]*)?$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_REGEX = /^\(?\d{2,3}\)?\s?\d{4,5}-?\d{4}$/;

  // Sugestões coerentes com os rótulos usados pelo motor de matching do quiz
  const SUG = {
    'Comprar um imóvel': ['Financiamento Imobiliário', 'Consórcio de Imóvel', 'Carta de Crédito Contemplada (imóvel)'],
    'Comprar/trocar veículo': ['Financiamento de Veículo', 'Consórcio de Veículo', 'Carta de Crédito Contemplada (veículo)'],
    'Comprar máquinas/equipamentos': ['Financiamento de Máquinas/Equipamentos', 'Consórcio de Máquinas'],
    'Planejar uma aquisição futura': ['Consórcio de Imóvel', 'Consórcio de Veículo', 'Consórcio de Máquinas'],
    'Buscar capital': ['Home Equity', 'Auto Equity', 'Antecipação de Recebíveis'],
    'Usar imóvel como garantia': ['Home Equity'],
    'Usar veículo como garantia': ['Auto Equity'],
    'Antecipar recebíveis': ['Antecipação de Recebíveis'],
    'Proteger patrimônio/empresa': ['Seguros'],
    'Ainda não sei qual solução faz sentido': ['Análise personalizada de crédito']
  };

  function initContactForm() {
    const form = $('#leadForm');
    if (!form) return;
    const nome = $('#f-nome'), wa = $('#f-wa'), email = $('#f-email'),
      obj = $('#f-obj'), prazo = $('#f-prazo'), msg = $('#f-msg'),
      send = $('#f-send'), err = $('#f-err');

    function perfil() { const r = form.querySelector('input[name=perfil]:checked'); return r ? r.value : ''; }
    function valid() {
      return NAME_REGEX.test(nome.value.trim())
        && PHONE_REGEX.test(wa.value.trim())
        && EMAIL_REGEX.test(email.value.trim())
        && perfil() && obj.value && prazo.value;
    }
    function check() { send.disabled = !valid(); }
    [nome, wa, email, msg].forEach(i => i.addEventListener('input', check));
    [obj, prazo].forEach(i => i.addEventListener('change', check));
    form.querySelectorAll('input[name=perfil]').forEach(r => r.addEventListener('change', check));

    form.addEventListener('submit', async ev => {
      ev.preventDefault();
      if (!valid()) return;
      const payload = {
        nome: nome.value.trim().split(' ')[0],
        nomeCompleto: nome.value.trim(),
        whatsapp: wa.value.trim(),
        email: email.value.trim(),
        timestamp: new Date().toISOString(),
        flags: { intencao: 'contato-site', perfil: perfil() },
        respostas: [
          { pergunta: 'Você é:', resposta: perfil() },
          { pergunta: 'O que você quer resolver?', resposta: obj.value },
          { pergunta: 'Prazo:', resposta: prazo.value },
          { pergunta: 'Mensagem:', resposta: msg.value.trim() || '-' }
        ],
        produtosSugeridos: SUG[obj.value] || []
      };
      send.disabled = true;
      send.textContent = 'Enviando...';
      err.hidden = true;
      ZR.track('lead_form_submit_attempt', { objetivo: obj.value });
      try {
        // mesmo endpoint/automação do quiz (text/plain evita preflight CORS do Apps Script)
        await fetch(C.leadEndpoint, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
        ZR.track('lead_form_submit_success', { objetivo: obj.value });
        showSuccess(payload.nome);
      } catch (e2) {
        console.error('Falha ao enviar lead:', e2);
        ZR.track('lead_form_submit_error', { error_message: String((e2 && e2.message) || e2) });
        err.hidden = false;
        send.disabled = false;
        send.textContent = 'Quero analisar meu cenário';
      }
    });

    function showSuccess(firstName) {
      const waLink = `https://wa.me/${C.whatsapp}?text=` + encodeURIComponent(`Olá, sou ${firstName}. Acabei de enviar meu cenário pelo site da ZR e quero conversar.`);
      $('#f-wrap').innerHTML = `
        <div class="ok">
          <h3>Recebido, ${firstName}.</h3>
          <p>Sua mensagem foi enviada. A equipe ZR vai analisar seu cenário e retornar pelos canais que você informou.</p>
          <a class="btn" href="${waLink}" target="_blank" rel="noopener" data-track="click_whatsapp">Acelerar pelo WhatsApp</a>
          <p class="fine">O envio não representa aprovação ou contratação. Cada operação está sujeita à análise, documentação, critérios da instituição e condições da solução escolhida.</p>
        </div>`;
    }
  }

  /* ================= INICIALIZAÇÃO ================= */
  document.addEventListener('DOMContentLoaded', () => {
    const sh = ZR.shaders.init();
    
    // abrir intro ao carregar página (hash sem rotra entra direto)
    const intro = $('#intro');
    const enterBtn = $('#enter');
    function enterSite() {
      if (intro.classList.contains('out')) return;
      entered = true;
      intro.classList.add('out');
      setTimeout(() => { intro.remove(); sh && sh.lines && sh.lines.stop(); }, 1200);
    }
    let entered = false;
    if (enterBtn) enterBtn.onclick = enterSite;
    if (location.hash && location.hash.length > 1) setTimeout(enterSite, 400);
    
    buildNav();
    addEventListener('hashchange', () => { render(); closeMenu(); });
    render(true);

    // barra de progresso de leitura
    addEventListener('scroll', () => {
      const h = document.documentElement;
      $('#bar').style.transform = `scaleX(${scrollY / Math.max(1, h.scrollHeight - innerHeight)})`;
    }, { passive: true });

    // brilho dos botões que segue o mouse
    document.addEventListener('pointermove', e => {
      const b = e.target.closest && e.target.closest('.btn');
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      b.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });

    // abrir quiz por qualquer CTA [data-quiz]
    document.addEventListener('click', e => {
      const q = e.target.closest('[data-quiz]');
      if (q) { e.preventDefault(); openQuiz(q); }
      const t = e.target.closest('[data-track]');
      if (t) ZR.track(t.dataset.track);
    });

    // fechar modal: X, clique fora, Esc
    $('#qx').onclick = closeQuiz;
    $('#modal').onclick = e => { if (e.target === $('#modal')) closeQuiz(); };
    addEventListener('keydown', e => {
      if (e.key === 'Escape' && $('#modal').classList.contains('open')) closeQuiz();
    });

    // eventos enviados pelo quiz (iframe) para analytics
    addEventListener('message', e => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.zr === 'quiz_start') ZR.track('quiz_start');
      if (e.data.zr === 'quiz_complete') ZR.track('quiz_complete', { produtos: (e.data.produtos || []).join(', ') });
    });
  });
})();
