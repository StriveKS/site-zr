// matching.js — motor de regras simples que cruza as flags coletadas no quiz
// com o catálogo de produtos, pra decidir quais soluções têm sinergia com o lead.

function matchProdutos(flags) {
  const produtos = new Set();

  if (flags.intencao === 'aquisicao') {
    if (flags.bem === 'imovel') {
      produtos.add('Financiamento Imobiliário');
      produtos.add('Consórcio de Imóvel');
      produtos.add('Carta de Crédito Contemplada (imóvel)');
    }
    if (flags.bem === 'veiculo') {
      produtos.add('Financiamento de Veículo');
      produtos.add('Consórcio de Veículo');
      produtos.add('Carta de Crédito Contemplada (veículo)');
    }
    if (flags.bem === 'maquinario') {
      produtos.add('Financiamento de Máquinas/Equipamentos');
      produtos.add('Consórcio de Máquinas');
    }
  }

  if (flags.intencao === 'capital') {
    if (flags.patrimonio && flags.patrimonio_situacao === 'quitado') {
      produtos.add(flags.bem === 'veiculo' ? 'Auto Equity' : 'Home Equity');
    }
    if (flags.patrimonio && flags.patrimonio_situacao === 'financiado') {
      produtos.add('Refinanciamento (redução de parcela / troco)');
    }
    if (flags.perfil === 'PJ' && flags.recebimento_empresa === 'boletos') {
      produtos.add('Antecipação de Recebíveis');
    }
    if (flags.perfil === 'PJ' && flags.recebimento_empresa === 'maquininha') {
      produtos.add('Antecipação de Recebíveis de Cartão');
    }
  }

  // Restrição não elimina o lead — é considerada parte da solução
  if (flags.restricao) {
    produtos.add('Possibilidade de uso de parte do crédito para quitação de restrições');
  }

  if (produtos.size === 0) produtos.add('Análise personalizada de crédito');

  return Array.from(produtos);
}
