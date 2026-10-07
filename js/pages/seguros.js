// pages/seguros.js — Aba SEGUROS (abordagem patrimonial, 6 categorias)
(function () {
  const { head, paras, sec, items, cta, att, note } = ZR.ui;

  ZR.registerPage('seguros', 'Seguros | ZR Investimentos', function () {
    return head('Proteção financeira e patrimonial', 'Planejar também é proteger o que já foi construído.')

      + paras([
        'Crédito ajuda a construir. Capital ajuda a crescer. Consórcio ajuda a planejar. Seguro ajuda a proteger.',
        'A lógica é complementar: uma estratégia financeira também precisa considerar o impacto que um imprevisto pode causar sobre aquilo que você levou anos para construir.',
        'A ZR trabalha com soluções de seguros conforme o perfil, o patrimônio, a atividade e os riscos envolvidos.'
      ])

      + sec('Soluções de proteção', items([
        ['Seguro Auto',
          'Seu veículo pode representar patrimônio, mobilidade e, para muitas pessoas e empresas, capacidade de trabalho. As coberturas podem ser estruturadas para riscos como colisão, incêndio, roubo/furto e outros eventos, conforme a apólice. Assistência 24 horas, proteção de vidros, carro reserva e outras coberturas adicionais podem existir conforme o produto e a seguradora.',
          'Para você: escolha a proteção a partir do seu uso real, não de um pacote genérico.'],
        ['Seguro Residencial',
          'Casa e apartamento carregam muito mais do que valor de mercado. Um seguro residencial pode reunir coberturas para riscos como incêndio, danos elétricos, roubo/furto, impacto de veículos, vendaval, alagamento e outros, conforme a contratação. A escolha deve considerar imóvel, localização, conteúdo e os riscos que realmente importam para você.'],
        ['Seguro Empresarial',
          'O patrimônio de uma empresa não está apenas nas paredes. Equipamentos, estoque, estrutura, responsabilidade perante terceiros e a própria continuidade da operação podem representar riscos financeiros relevantes. O seguro empresarial pode ser configurado de acordo com a atividade, a estrutura e os riscos do negócio.',
          'Pergunta que importa: o que faria mais falta para sua empresa se um imprevisto interrompesse a operação amanhã?'],
        ['Seguro de Vida',
          'Proteção não é apenas sobre o que você possui. Também é sobre quem depende de você. O seguro de vida pode oferecer proteção financeira ao segurado e/ou aos beneficiários, conforme as coberturas e condições da apólice. A análise deve considerar renda, responsabilidades familiares, patrimônio e necessidade de proteção.'],
        ['Seguro de Máquinas e Equipamentos',
          'Para empresas, produtores e operações industriais, uma máquina parada pode significar produção interrompida, atraso, perda de receita e impacto sobre contratos. O seguro de máquinas e equipamentos pode proteger ativos agrícolas, industriais e operacionais conforme utilização, equipamento e cobertura contratada.'],
        ['Seguro para Transportes',
          'Quando uma operação depende de movimentar cargas, o risco não termina quando a mercadoria sai do estoque. O seguro para transportes permite estruturar proteção relacionada à carga e à operação de transporte, conforme tipo de mercadoria, percurso, modal, responsabilidade e coberturas contratadas.']
      ]))

      + att('Nota de confiança',
        'Coberturas, franquias, capitais segurados, exclusões, aceitação e assistências variam conforme o produto, a seguradora, o perfil do cliente e a apólice. A contratação deve sempre considerar as condições contratuais e a seguradora responsável pela cobertura.')

      + cta('Quero entender quais proteções fazem sentido para mim')
      + note();
  });
})();
