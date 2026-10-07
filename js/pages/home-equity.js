// pages/home-equity.js — Aba CRÉDITO COM GARANTIA DE IMÓVEL (Home Equity)
(function () {
  const { head, paras, sec, items, cta, att, bq, note } = ZR.ui;

  ZR.registerPage('home-equity', 'Crédito com garantia de imóvel | ZR Investimentos', function () {
    return head('Capital sem precisar vender o patrimônio', 'Seu patrimônio pode ter outra função além de estar parado.')

      + paras([
        'Você tem um imóvel. Mas talvez o capital que esse patrimônio representa esteja parado enquanto outras oportunidades passam.',
        'Capital de giro. Expansão. Reorganização. Uma aquisição. Um projeto de maior porte.',
        'O crédito com garantia de imóvel é uma estrutura que utiliza um imóvel como garantia para uma operação de crédito, permitindo acessar capital sem vender o ativo.'
      ])

      + sec('Como funciona', paras([
        'O imóvel é oferecido como garantia da operação e passa por análise e avaliação conforme os critérios da instituição.',
        'A operação pode ser estruturada para volumes mais altos e prazos mais longos, dependendo do perfil, do imóvel, da instituição e da finalidade do recurso.',
        'A garantia não significa que o crédito é automático. Ela faz parte da estrutura de risco da operação, que também depende de análise, documentação e capacidade de pagamento.'
      ]))

      + sec('Quando faz sentido', items([
        ['Capital de giro', 'A empresa precisa de caixa para comprar, produzir, pagar fornecedores ou atravessar um ciclo operacional maior.'],
        ['Expansão', 'Abrir uma unidade, ampliar estrutura, adquirir equipamentos ou financiar um projeto de crescimento.'],
        ['Reorganização financeira', 'Substituir estruturas inadequadas por uma operação com outra configuração de prazo e garantia, quando isso for viável.'],
        ['Investimento patrimonial', 'Usar parte da capacidade financeira do patrimônio para viabilizar uma aquisição ou projeto relevante, mantendo o imóvel como ativo.']
      ]))

      + att('Imóveis e critérios',
        'A disponibilidade da operação depende do enquadramento da instituição. Na estrutura atualmente catalogada pela ZR, podem ser considerados casas residenciais urbanas, apartamentos, terrenos urbanos e salas/imóveis comerciais, observadas as condições de aceitação — incluindo restrições específicas para imóveis comerciais. Propriedades rurais não são aceitas, com exceção indicada para terrenos destinados a loteamento. A garantia traz responsabilidades que precisam ser compreendidas antes da contratação.')

      + sec('O ponto central', paras([
        'Home Equity não é “tirar dinheiro do imóvel”. É estruturar uma operação em que um patrimônio existente participa da solução financeira.'
      ]) + bq('O que esse patrimônio precisa possibilitar para o seu próximo ciclo?'))

      + cta('Quero analisar meu imóvel como garantia')
      + note();
  });
})();
