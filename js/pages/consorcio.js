// pages/consorcio.js — Aba CONSÓRCIO (tratamento editorial especial: narrativa de planejamento)
(function () {
  const { head, paras, rv, sec, items, cta, bq, cmp, timeline, note } = ZR.ui;

  ZR.registerPage('consorcio', 'Consórcio | ZR Investimentos', function () {
    return head('Planejamento patrimonial', 'Algumas decisões importantes começam muito antes do dia da compra.')

      + paras([
        'Seu próximo carro talvez ainda não exista na sua garagem. A próxima máquina da sua empresa talvez ainda esteja no catálogo. O imóvel que você pretende comprar talvez ainda nem tenha sido escolhido. E o patrimônio que você gostaria de deixar para os seus filhos provavelmente está sendo construído muito antes de eles precisarem dele.',
        'O consórcio parte justamente dessa lógica: você começa a estruturar hoje uma capacidade de compra que pretende usar no futuro.',
        'Não é sobre esperar. É sobre se comprometer com uma decisão que você já sabe que pretende tomar.'
      ])

      + sec('O que é consórcio', paras([
        'Consórcio é uma forma de autofinanciamento em grupo. Pessoas físicas ou jurídicas participam de um grupo administrado por uma administradora de consórcio, contribuindo para formar os recursos utilizados nas contemplações.',
        'A contemplação acontece por sorteio ou lance, conforme as regras do grupo e a existência de recursos para a contemplação. Depois de contemplado, o participante recebe o crédito para utilizar dentro da finalidade prevista no contrato.',
        'O ponto importante é entender o que o consórcio realmente faz: ele transforma uma intenção futura de compra em um compromisso financeiro organizado no presente.'
      ]))

      + sec('Consórcio não é “investimento” no sentido tradicional',
        paras([
          'É importante separar as coisas. A cota de consórcio não deve ser apresentada como uma aplicação que gera rentabilidade garantida.',
          'O valor do crédito pode ser atualizado conforme o índice ou critério previsto no contrato, acompanhando a referência econômica estabelecida para aquele grupo. Essa atualização tem relação com o poder de compra do crédito, não com uma promessa de rendimento financeiro.',
          'Por isso, a pergunta mais interessante não é “quanto esse consórcio vai render?”.'
        ]) + bq('Que capacidade de compra quero construir para o meu futuro?'))

      + sec('A ideia de compromisso com o futuro',
        paras([
          'Existe uma diferença entre guardar dinheiro quando sobra e criar uma obrigação planejada para aquilo que você já decidiu que quer fazer. O consórcio pode entrar nessa segunda lógica.',
          'Você escolhe uma faixa de crédito, um prazo e uma estrutura de pagamento compatível com seu planejamento. Ao longo do caminho, pode ocorrer a contemplação por sorteio ou por lance, seguindo as regras do grupo. Quando a contemplação acontece, aquela intenção de futuro ganha uma capacidade de compra concreta.',
          'É uma maneira de transformar uma decisão que está “algum dia” em uma estratégia que começa agora.'
        ])
        + timeline([
          ['Hoje', 'Você escolhe uma faixa de crédito, um prazo e uma estrutura de pagamento compatível com seu planejamento.'],
          ['Ao longo do caminho', 'A contemplação pode ocorrer por sorteio ou por lance, seguindo as regras do grupo.'],
          ['Na contemplação', 'A intenção de futuro ganha capacidade de compra concreta, dentro da finalidade do contrato.']
        ]))

      + sec('Onde o consórcio pode entrar na sua vida', items([
        ['Trocar o carro sem deixar a decisão para a última hora',
          'Trocar de carro costuma acontecer quando o veículo atual já virou problema ou quando aparece uma oportunidade. O planejamento pode mudar essa lógica: você estrutura uma carta pensando na próxima troca antes que ela seja urgente. Quando chegar o momento adequado — de acordo com a contemplação e as regras da operação — o crédito pode ser utilizado para a aquisição do veículo previsto na categoria contratada.',
          'Para quem faz sentido: quem troca de veículo periodicamente e quer transformar uma compra recorrente em um planejamento financeiro.'],
        ['Construir ou renovar uma frota',
          'Para uma empresa, veículo não é apenas patrimônio: é capacidade operacional. Caminhões, utilitários, carretas e outros veículos podem representar expansão, substituição de ativos ou manutenção da operação. Uma estrutura de consórcio pode ser usada para planejar essas aquisições ao longo do tempo, evitando que cada renovação de frota seja tratada como uma decisão isolada.',
          'Pergunta que importa: quantos veículos sua operação provavelmente precisará substituir ou incorporar nos próximos anos?'],
        ['Planejar uma aquisição imobiliária',
          'Um imóvel raramente é uma compra pequena ou impulsiva. Pode ser a casa da família, uma sala comercial, um terreno, uma futura construção ou parte de uma estratégia patrimonial. O consórcio imobiliário permite estruturar uma capacidade de aquisição para imóveis, terrenos, construção ou reforma, conforme a categoria e as regras do grupo.',
          'Para quem faz sentido: quem possui horizonte de médio ou longo prazo e quer construir uma capacidade de compra sem depender de uma decisão imediata.'],
        ['Construir patrimônio para os filhos',
          'Nem todo planejamento patrimonial precisa ter o nome de quem vai usar o patrimônio. Uma cota pode fazer parte de uma estratégia familiar de longo prazo: formar recursos para uma futura aquisição imobiliária, preparar uma compra relevante ou criar uma capacidade financeira que será utilizada em uma fase futura da vida dos filhos.',
          'A lógica é menos sobre “dar dinheiro no futuro” e mais sobre começar hoje a construir uma opção para o futuro.'],
        ['Planejar máquinas e equipamentos',
          'Para uma empresa ou produtor, uma máquina pode representar produtividade, capacidade e crescimento. Uma aquisição planejada pode ser estruturada por consórcio para máquinas agrícolas, industriais e equipamentos, observadas as condições da administradora e da operação.',
          'Isso permite pensar na próxima aquisição antes que a necessidade vire urgência.'],
        ['Planejar serviços e projetos',
          'Dependendo da categoria contratada, o consórcio também pode ser destinado a serviços. Reformas, viagens, festas, cirurgias e outros serviços podem aparecer como finalidades possíveis dentro das regras da categoria e da administradora.',
          'O conceito permanece o mesmo: transformar uma despesa futura relevante em algo que começa a ser planejado no presente.']
      ]))

      + sec('E a contemplação?', paras([
        'A contemplação é o momento em que o crédito é liberado para a aquisição do bem ou serviço previsto no contrato. Ela pode ocorrer por sorteio ou por lance, nas assembleias de contemplação e conforme as regras e recursos do grupo.',
        'Por isso, nenhuma comunicação da ZR sugere contemplação garantida. Também não é correto dizer que simplesmente antecipar parcelas garante contemplação.',
        'Quando a pergunta é “quando vou ser contemplado?”, a resposta parte das regras específicas do grupo, do histórico, da modalidade de lance e da disponibilidade de recursos — nunca de uma promessa.'
      ]))

      + cmp([
        ['O consórcio tende a fazer mais sentido quando', [
          'você consegue planejar a aquisição com alguma antecedência;',
          'a compra não precisa necessariamente acontecer imediatamente;',
          'existe interesse em construir uma capacidade de compra para o futuro;',
          'o objetivo envolve patrimônio ou uma aquisição relevante;',
          'você quer trabalhar com planejamento e disciplina financeira.'
        ]],
        ['Talvez outra estrutura seja mais coerente quando', [
          'existe uma necessidade imediata de aquisição;',
          'você precisa do recurso agora e não pode depender do momento da contemplação;',
          'a finalidade é gerar liquidez para uma operação empresarial;',
          'você já possui um patrimônio que pode ser usado como garantia para obter capital.'
        ]]
      ])
      + rv('<p class="lead b" style="margin-top:32px">Essa comparação é uma das razões pelas quais a ZR trabalha como hub: a pergunta não é “qual produto a ZR quer vender?”, mas “qual estrutura conversa com o seu momento?”.</p>')

      + cta('Quero saber se o consórcio faz sentido para meu plano')
      + note('Consórcio é uma modalidade de autofinanciamento administrada por administradora de consórcio. A contemplação ocorre por sorteio ou lance, conforme as regras do grupo e a existência de recursos. Condições, taxas, prazos, atualização do crédito e demais características dependem do contrato e da administradora.');
  });
})();
