// pages/como.js — Aba COMO TRABALHAMOS (o processo de consultoria em 5 etapas)
(function () {
  const { head, paras, rv, sec, stepsList, cta, note } = ZR.ui;

  const FRASES = [
    '“Quero comprar.”',
    '“Preciso de capital.”',
    '“Minha empresa está crescendo e o caixa não acompanha.”',
    '“Quero trocar minha frota.”',
    '“Tenho patrimônio e quero entender como utilizá-lo.”',
    '“Quero começar a construir algo para meus filhos.”'
  ];

  const STEPS = [
    ['Entender o objetivo', 'O que você quer realizar ou resolver? Qual é o valor aproximado? Existe uma data? O objetivo é compra, liquidez, expansão, reorganização ou proteção?'],
    ['Entender o cenário', 'Prazo, renda, faturamento, patrimônio, documentação, histórico, garantias e capacidade de pagamento entram na leitura. Uma boa estrutura raramente nasce de um único número.'],
    ['Comparar caminhos', 'Consórcio, financiamento, crédito com garantia, antecipação de recebíveis, seguros ou outras estruturas disponíveis aos parceiros podem atender problemas diferentes. A escolha deve partir da necessidade, não do produto que apareceu primeiro.'],
    ['Estruturar e encaminhar', 'Depois da leitura, a ZR organiza o caminho e encaminha a operação para a instituição ou parceiro compatível com o caso, respeitando os critérios de aceitação de cada estrutura.'],
    ['Acompanhar', 'A condução não termina no primeiro encaminhamento. A ZR acompanha o avanço da operação dentro do escopo de sua atuação e mantém o cliente informado sobre próximos passos, documentos e condições.']
  ];

  ZR.registerPage('como', 'Como trabalhamos | ZR Investimentos', function () {
    return head('Consultoria', 'O produto vem depois do objetivo.')

      + paras([
        'Você não precisa chegar à ZR dizendo “eu preciso de Home Equity” ou “quero fazer um consórcio”. Pode simplesmente dizer:'
      ])
      + rv(`<div class="panel"><ul>${FRASES.map(f => `<li>${f}</li>`).join('')}</ul></div>`)
      + rv('<p class="lead" style="margin-top:24px">A partir daí começa a análise.</p>')

      + sec('Do objetivo à estrutura, cinco etapas', stepsList(STEPS))

      + cta('Quero analisar meu cenário')
      + note();
  });
})();
