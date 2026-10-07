// app.js — controlador principal: renderização, transições e fluxo do quiz

const state = {
  nome: '',
  whatsapp: '',
  email: '',
  respostas: [],
  flags: {}
};

let quizContainer;

function startQuiz() {
  goTo('q_objetivo');
}

function goTo(nodeId) {
  if (nodeId === 'CAPTURE') return renderCapture();
  render(QUESTIONS[nodeId]);
}

function transition(html) {
  quizContainer.classList.remove('fade-in');
  void quizContainer.offsetWidth; // reflow força reinício da animação
  quizContainer.innerHTML = html;
  quizContainer.classList.add('fade-in');
}

function render(node) {
  transition(buildQuestionHTML(node));
  attachOptionHandlers(node);
}

function buildQuestionHTML(node) {
  const options = node.options(state);
  const optionsHTML = options
    .map((o, i) => `<button class="option-btn" data-index="${i}">${o.label}</button>`)
    .join('');
  return `
    <p class="question-text">${node.text(state)}</p>
    <div class="options">${optionsHTML}</div>
  `;
}

function attachOptionHandlers(node) {
  const options = node.options(state);
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const option = options[Number(btn.dataset.index)];
      state.respostas.push({ pergunta: node.text(state), resposta: option.label });
      Object.assign(state.flags, option.set || {});
      goTo(option.next);
    });
  });
}

function renderCapture() {
  const produtos = matchProdutos(state.flags);
  state.produtosSugeridos = produtos;
  const solucoesTxt = produtos.length === 1 ? 'uma possível solução' : `${produtos.length} possíveis soluções`;

  transition(`
    <p class="question-text">Perfeito, ${state.nome}. Com base em tudo que você me contou, sua situação tem sinergia com ${solucoesTxt} de crédito dentro do nosso catálogo. Pra eu liberar sua análise completa, me diga seu WhatsApp e e-mail — nosso time vai te enviar o resultado por lá.</p>
    <input type="tel" id="whatsapp-input" placeholder="Seu WhatsApp com DDD" />
    <input type="email" id="email-input" placeholder="Seu melhor e-mail" />
    <button id="btn-enviar" disabled>Receber minha análise</button>
  `);

  const waInput = document.getElementById('whatsapp-input');
  const emailInput = document.getElementById('email-input');
  const btnEnviar = document.getElementById('btn-enviar');

  function validateCapture() {
    const okWa = PHONE_REGEX.test(waInput.value.trim());
    const okEmail = EMAIL_REGEX.test(emailInput.value.trim());
    btnEnviar.disabled = !(okWa && okEmail);
  }

  waInput.addEventListener('input', validateCapture);
  emailInput.addEventListener('input', validateCapture);

  btnEnviar.addEventListener('click', async () => {
    state.whatsapp = waInput.value.trim();
    state.email = emailInput.value.trim();
    state.timestamp = new Date().toISOString();
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';
    await submitLead(state);
    renderFinal();
  });
}

function renderFinal() {
  const despedidas = {
    aquisicao: 'conquistar esse objetivo',
    capital: 'resolver essa questão e seguir tranquilo(a)'
  };
  const foco = despedidas[state.flags.intencao] || 'alcançar seu objetivo';

  transition(`
    <p class="question-text">Prontinho, ${state.nome}! Sua análise já está em produção e vai chegar no seu e-mail e WhatsApp em até 48 horas. Torço muito pra que essa solução te ajude a ${foco}. Bons negócios e conte comigo nessa jornada!</p>
  `);
}

// Gate do nome na tela de abertura
// AJUSTE ZR v1.0.1: o gate original exigia nome completo (2+ palavras) e travava quem
// digitava só o primeiro nome. A nova copy da tela ("Como podemos chamar você?") pede
// um nome de tratamento — mínimo de 2 caracteres. O restante do quiz segue intacto.
document.addEventListener('DOMContentLoaded', () => {
  quizContainer = document.getElementById('quiz-container');

  const nomeInput = document.getElementById('nome-input');
  const btnIniciar = document.getElementById('btn-iniciar');

  nomeInput.addEventListener('input', () => {
    btnIniciar.disabled = nomeInput.value.trim().length < 2;
  });

  btnIniciar.addEventListener('click', () => {
    const nomeCompleto = nomeInput.value.trim();
    state.nome = nomeCompleto.split(' ')[0]; // primeiro nome, soa mais natural nas perguntas
    state.nomeCompleto = nomeCompleto;

    document.getElementById('opening-screen').classList.add('hidden');
    quizContainer.classList.remove('hidden');
    startQuiz();
  });
});
