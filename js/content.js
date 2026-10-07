// content.js — núcleo de conteúdo: navegação, helpers de render e registro de rotas.
// Cada aba do site vive em seu próprio arquivo: js/pages/<rota>.js
// O arquivo da aba chama ZR.registerPage(id, titulo, render).
window.ZR = window.ZR || {};

/* ===== MENU LATERAL (ordem = ordem das abas) ===== */
ZR.NAV = [
  ['inicio', 'Início'],
  ['consorcio', 'Consórcio'],
  ['financiamento', 'Financiamento'],
  ['home-equity', 'Crédito com garantia de imóvel'],
  ['auto-equity', 'Crédito com garantia de veículo'],
  ['recebiveis', 'Antecipação de recebíveis'],
  ['seguros', 'Seguros'],
  ['como', 'Como trabalhamos'],
  ['contato', 'Fale com a ZR']
];

/* ===== MICROCOPY DE RODAPÉ (compliance) ===== */
ZR.FOOT = 'ZR Investimentos — Hub de Soluções Financeiras. Soluções sujeitas a análise, documentação, critérios da instituição e condições contratuais. Consórcios estão sujeitos às regras da administradora e à legislação aplicável. Seguros estão sujeitos às condições da apólice e aos critérios da seguradora.';

/* ===== REGISTRO DE ROTAS ===== */
ZR.pages = {};
ZR.registerPage = function (id, title, render) {
  ZR.pages[id] = { id, title, render };
};

/* ===== HELPERS DE RENDERIZAÇÃO (compartilhados entre as abas) ===== */
ZR.ui = (function () {
  // H1 com animação palavra a palavra
  const words = t => t.split(' ').map((w, i) => `<span class="w"><i style="--i:${i}">${w}</i></span> `).join('');

  // reveal on scroll
  const rv = (h, i = 0) => `<div class="rv" style="--i:${i}">${h}</div>`;

  // eyebrow + H1 da aba
  const head = (eb, h) => `<p class="eb">${eb}</p><h1 class="h1">${words(h)}</h1>`;

  // parágrafos de abertura (texto corrido de entrada)
  const paras = (arr, base = 3) => arr.map((p, i) => rv(`<p class="lead">${p}</p>`, base + i)).join('');

  // seção com H2
  const sec = (title, inner) => `<section class="sec"><h2 class="rv">${title}</h2>${inner}</section>`;

  // grid de cards: [titulo, texto, (opcional) linha "para quem faz sentido"]
  const items = a => `<div class="grid">${a.map(([t, p, sub], i) => `<div class="it rv" style="--i:${i % 3}"><div class="ln" style="--i:0;position:absolute;top:0;left:0;right:0"></div><h3>${t}</h3><p>${p}</p>${sub ? `<p class="sub">${sub}</p>` : ''}</div>`).join('')}</div>`;

  // CTA que abre o quiz
  const cta = (t, i = 0) => `<div class="row rv" style="--i:${i}"><button class="btn" data-quiz>${t}</button></div>`;

  // bloco de atenção / compliance
  const att = (t, p) => `<section class="att rv"><div class="ln"></div><h3 style="font-size:24px;margin-top:20px">${t}</h3><p>${p}</p></section>`;

  // nota de rodapé da aba
  const note = t => `<p class="note">${t || ZR.FOOT}</p>`;

  // citação em destaque
  const bq = t => rv(`<blockquote class="bq">${t}</blockquote>`);

  // comparativo "faz sentido quando / talvez outra estrutura"
  const cmp = a => `<section class="sec grid" style="gap:24px">${a.map(([t, l]) => `<div class="panel rv"><h3 style="font-size:24px">${t}</h3><ul>${l.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</section>`;

  // linha do tempo (usada no consórcio)
  const timeline = a => `<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));margin-top:40px">${a.map(([t, p], i) => `<div class="rv" style="--i:${i}"><div class="ln" style="--i:${i * 2}"></div><h3 style="font-size:26px;margin:16px 0 8px">${t}</h3><p style="margin:0;color:var(--mute);font-size:15.5px">${p}</p></div>`).join('')}</div>`;

  // lista numerada de etapas (usada em "Como trabalhamos")
  const stepsList = a => a.map(([t, p], i) => `<div class="rv"><div class="ln"></div><div class="step"><b>${i + 1}</b><div><h3 style="font-size:26px;margin-bottom:6px">${t}</h3><p style="margin:0;color:var(--mute)">${p}</p></div></div></div>`).join('');

  return { words, rv, head, paras, sec, items, cta, att, note, bq, cmp, timeline, stepsList };
})();
