// pages/auto-equity.js — Aba CRÉDITO COM GARANTIA DE VEÍCULO (Auto Equity)
(function () {
  const { head, paras, rv, sec, cta, att, note } = ZR.ui;

  ZR.registerPage('auto-equity', 'Crédito com garantia de veículo | ZR Investimentos', function () {
    return head('Liquidez a partir de um ativo que você já possui', 'E se o veículo que você já tem também puder ajudar a financiar o próximo passo?')

      + paras([
        'Um carro ou caminhão pode ser apenas um meio de transporte. Para uma empresa, pode ser parte da operação.',
        'E, quando existe patrimônio com valor e a necessidade é de capital, ele também pode participar de uma estrutura de crédito com garantia.',
        'O crédito com garantia de veículo utiliza o veículo como garantia da operação, permitindo acessar crédito sem precisar vender o ativo.'
      ])

      + sec('Para que o recurso pode ser utilizado',
        rv('<p class="lead">A finalidade depende da estrutura e da instituição, mas o objetivo pode estar relacionado a:</p>')
        + `<div class="panel rv"><ul>${[
          'capital de giro;',
          'reorganização financeira;',
          'investimentos;',
          'expansão da operação;',
          'aquisição de outros ativos;',
          'necessidades de caixa com finalidade definida.'
        ].map(x => `<li>${x}</li>`).join('')}</ul></div>`)

      + sec('Quem costuma olhar para essa solução', paras([
        'Empresários com veículos no patrimônio da empresa ou pessoal que precisam de liquidez e possuem um ativo que pode compor a garantia.',
        'Também pode ser relevante para transportadores que possuem caminhões e precisam estruturar capital para manutenção, renovação, expansão ou reorganização do caixa.'
      ]))

      + att('Critérios importantes',
        'Na estrutura atualmente catalogada pela ZR, são considerados carros e caminhões, desde que sejam veículos emplacáveis e atendam aos critérios da operação. A instituição ainda poderá avaliar veículo, documentação, perfil, capacidade de pagamento, valor de garantia e demais condições. Aceitação, valor, prazo e condições dependem da análise da operação.')

      + cta('Quero avaliar meu veículo como garantia')
      + note();
  });
})();
