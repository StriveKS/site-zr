// pages/financiamento.js — Aba FINANCIAMENTO (quando a aquisição precisa acontecer)
(function () {
  const { head, paras, sec, items, cta, att, note } = ZR.ui;

  ZR.registerPage('financiamento', 'Financiamento | ZR Investimentos', function () {
    return head('Quando a aquisição precisa acontecer', 'Quando o objetivo é agora, a estrutura precisa acompanhar.')

      + paras([
        'Existem compras que podem ser planejadas para daqui a alguns anos. E existem decisões que dependem de prazo.',
        'Um imóvel que surgiu como oportunidade. Um carro necessário para trabalhar. Um caminhão para colocar uma operação em movimento. Uma máquina que aumenta a capacidade produtiva.',
        'Nesses casos, o financiamento pode ser uma das estruturas a considerar, porque o recurso é direcionado à aquisição do bem, sujeito à análise e às condições da instituição.'
      ])

      + sec('O que é financiamento', paras([
        'Financiamento é uma operação de crédito destinada à aquisição de um bem ou finalidade específica. Diferentemente de um empréstimo de uso livre, o financiamento está ligado à compra do bem previsto na operação.',
        'A instituição analisa o perfil, a documentação, o bem e as condições da operação. Quando aprovado, o crédito é utilizado conforme a finalidade contratada.'
      ]))

      + sec('Quando pode fazer sentido', items([
        ['Você encontrou o imóvel que precisava agora',
          'Para aquisição, reforma ou construção de imóveis urbanos, dentro das condições da instituição e da modalidade.'],
        ['Você precisa colocar um veículo em operação',
          'Automóveis, utilitários, motos e veículos pesados podem ser objeto de financiamento conforme os critérios da operação.'],
        ['Uma máquina pode gerar capacidade imediatamente',
          'Para empresas e produtores, financiar um equipamento pode fazer sentido quando o ganho operacional ou a necessidade de aquisição não combina com esperar um planejamento de longo prazo.']
      ]))

      + att('Antes de olhar apenas para a parcela',
        'Uma parcela que cabe no mês nem sempre representa a estrutura mais adequada para o objetivo. Antes da contratação, vale olhar para: valor de entrada, prazo, custo total, capacidade de pagamento, finalidade, garantia e impacto no caixa. A ZR entra para organizar essa leitura e encaminhar o cenário para as instituições parceiras compatíveis com a operação.')

      + cta('Quero analisar uma aquisição')
      + note();
  });
})();
