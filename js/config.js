// config.js — constantes públicas da nova versão (nenhum segredo aqui)
// Endpoints de terceiros são públicos por natureza no frontend; nunca colocar tokens/chaves privadas.
window.ZR = window.ZR || {};

ZR.CONFIG = {
  // Quiz de consultoria (integrado, embutido via iframe no modal; ?v= quebra cache entre versões)
  quizUrl: 'quiz/index.html?embed=1&v=116',

  // Automação de leads (Google Apps Script — ficha em PDF por e-mail; mesma do quiz)
  leadEndpoint: 'https://script.google.com/macros/s/AKfycbzpm3wx1ceiTZCh7I1kUBjX5d3rRbb7hfAbBDzjVVKMQ11i-grcQ8rS0PI7bfY-cLFcew/exec',

  // Canais diretos oficiais
  whatsapp: '5554996935056',
  whatsappDisplay: '+55 54 99693-5056',
  instagram: 'https://www.instagram.com/zrinvestimentos/',

  // Métricas (mesmos IDs do site publicado, para continuidade do histórico)
  ga4: 'G-3TFKER5ZGK',
  clarity: 'wwf25gobgk',

  // Versão deste pacote
  version: '1.0.16'
};
