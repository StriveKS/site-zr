// submit.js
// Depois de implantar o Code.gs como Web App, cole aqui a URL gerada.
const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzpm3wx1ceiTZCh7I1kUBjX5d3rRbb7hfAbBDzjVVKMQ11i-grcQ8rS0PI7bfY-cLFcew/exec';

async function submitLead(state) {
  try {
    await fetch(GAS_WEBAPP_URL, {
      method: 'POST',
      body: JSON.stringify(state),
      // text/plain evita o preflight CORS que o Apps Script não responde bem
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    });
  } catch (err) {
    console.error('Falha ao enviar lead:', err);
  }
}
