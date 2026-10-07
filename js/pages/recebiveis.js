// pages/recebiveis.js — Aba ANTECIPAÇÃO DE RECEBÍVEIS (faturamento não é caixa)
(function () {
  const { head, paras, sec, items, cta, att, note } = ZR.ui;

  ZR.registerPage('recebiveis', 'Antecipação de recebíveis | ZR Investimentos', function () {
    return head('Transformar receita futura em liquidez presente', 'Faturamento não é caixa. E, para uma empresa, essa diferença importa.')

      + paras([
        'Você vendeu. O contrato está assinado. A nota foi emitida. O cliente vai pagar — mas o dinheiro ainda não entrou.',
        'Enquanto isso, fornecedores vencem, a folha continua, novas compras aparecem e oportunidades não esperam 30, 60 ou 90 dias.',
        'A antecipação de recebíveis pode transformar parte desse fluxo futuro em liquidez presente, mediante uma estrutura de cessão/antecipação dos direitos creditórios e as condições aplicáveis à operação.'
      ])

      + sec('Como funciona', paras([
        'A empresa possui valores a receber provenientes de vendas, boletos ou contratos comerciais. Esses direitos creditórios podem ser antecipados, fazendo com que a empresa receba antes do vencimento, normalmente mediante uma taxa/deságio definido na operação.',
        'Estruturas com FIDCs são uma das formas existentes no mercado para aquisição de direitos creditórios. Em determinados contextos, também podem existir estruturas envolvendo outros veículos e agentes de crédito.'
      ]))

      + sec('Quando faz sentido', items([
        ['A empresa cresce, mas o caixa chega depois', 'O faturamento está aumentando, mas o prazo de recebimento cria um intervalo que exige capital.'],
        ['O fornecedor precisa receber antes do cliente', 'A antecipação pode ser avaliada como ferramenta de gestão do ciclo financeiro.'],
        ['Existe uma oportunidade que não pode esperar', 'Compra de estoque, equipamento ou outra necessidade operacional pode exigir liquidez antes do recebimento previsto.'],
        ['O problema é timing, não necessariamente falta de venda', 'Uma das situações em que a diferença entre faturamento e caixa fica mais importante.']
      ]))

      + att('Enquadramento atual da ZR',
        'Esta estrutura é indicada exclusivamente para pessoas jurídicas com faturamento mensal acima de R$ 700.000,00. O requisito aparece aqui de forma transparente para que você avalie se o seu cenário se encaixa antes de avançar.')

      + cta('Quero avaliar meus recebíveis')
      + note();
  });
})();
