// pages/contato.js — Aba FALE COM A ZR (formulário de análise + canais diretos)
// O envio usa a mesma automação do quiz (Apps Script → ficha em PDF por e-mail).
// O comportamento do formulário é ligado em app.js (initContactForm) após o render.
(function () {
  const { head, paras, rv, sec, note } = ZR.ui;

  const OBJETIVOS = [
    'Comprar um imóvel',
    'Comprar/trocar veículo',
    'Comprar máquinas/equipamentos',
    'Planejar uma aquisição futura',
    'Buscar capital',
    'Usar imóvel como garantia',
    'Usar veículo como garantia',
    'Antecipar recebíveis',
    'Proteger patrimônio/empresa',
    'Ainda não sei qual solução faz sentido'
  ];

  const PRAZOS = [
    'Agora',
    'Próximos 3 meses',
    '3 a 12 meses',
    'Mais de 12 meses',
    'Ainda estou planejando'
  ];

  ZR.registerPage('contato', 'Fale com a ZR | ZR Investimentos', function () {
    const wa = `https://wa.me/${ZR.CONFIG.whatsapp}?text=` + encodeURIComponent('Olá! Quero analisar meu cenário com a ZR Investimentos.');

    return head('Fale com a ZR', 'Comece pelo que você quer resolver.')
      + paras([
        'Você não precisa saber qual produto procurar. Conte o que pretende fazer, qual valor está envolvido, quanto tempo tem e o que já possui disponível.',
        'A equipe ZR entende o cenário e avalia quais caminhos podem ser considerados para o seu objetivo.'
      ])

      + `<div class="panel rv" style="--i:4" id="f-wrap">
        <form id="leadForm" novalidate>
          <div class="field">
            <label for="f-nome">Nome</label>
            <span class="hint">Como podemos chamar você?</span>
            <input type="text" id="f-nome" name="nome" autocomplete="name" placeholder="Seu nome completo">
          </div>
          <div class="field">
            <label for="f-wa">WhatsApp</label>
            <span class="hint">Para onde devemos retornar?</span>
            <input type="tel" id="f-wa" name="whatsapp" autocomplete="tel" placeholder="(54) 99999-0000">
          </div>
          <div class="field">
            <label for="f-email">E-mail</label>
            <span class="hint">Para envio de informações e acompanhamento.</span>
            <input type="email" id="f-email" name="email" autocomplete="email" placeholder="voce@email.com">
          </div>
          <div class="field">
            <span class="lbl">Você é:</span>
            <div class="seg" role="radiogroup" aria-label="Perfil">
              <label class="segopt"><input type="radio" name="perfil" value="Pessoa física"><span>Pessoa física</span></label>
              <label class="segopt"><input type="radio" name="perfil" value="Pessoa jurídica"><span>Pessoa jurídica</span></label>
            </div>
          </div>
          <div class="field">
            <label for="f-obj">O que você quer resolver?</label>
            <select id="f-obj" name="objetivo">
              <option value="" selected disabled>Selecione</option>
              ${OBJETIVOS.map(o => `<option>${o}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label for="f-prazo">Prazo</label>
            <select id="f-prazo" name="prazo">
              <option value="" selected disabled>Selecione</option>
              ${PRAZOS.map(o => `<option>${o}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label for="f-msg">Mensagem <span class="opt-tag">opcional</span></label>
            <span class="hint">Conte brevemente o que está planejando ou o problema que precisa resolver.</span>
            <textarea id="f-msg" name="mensagem" rows="4"></textarea>
          </div>
          <button class="btn" id="f-send" type="submit" disabled style="width:100%">Quero analisar meu cenário</button>
          <p id="f-err" class="form-err" role="alert" hidden>Não foi possível enviar agora. Tente novamente em instantes ou fale direto pelo WhatsApp.</p>
          <p class="fine">O envio do formulário não representa aprovação ou contratação. Cada operação está sujeita à análise, documentação, critérios da instituição e condições da solução escolhida.</p>
        </form>
      </div>`

      + sec('Prefere um contato direto?',
        `<div class="row rv">
          <a class="btn" href="${wa}" target="_blank" rel="noopener" data-track="click_whatsapp">Falar no WhatsApp · ${ZR.CONFIG.whatsappDisplay}</a>
          <a class="lnk" href="${ZR.CONFIG.instagram}" target="_blank" rel="noopener" data-track="click_instagram">Instagram — @zrinvestimentos</a>
        </div>`)

      + note();
  });
})();
