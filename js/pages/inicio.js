// pages/inicio.js — Aba INÍCIO: apresentação do Hub + Sobre a ZR + Do objetivo à estrutura + FAQ
(function () {
  const { head, paras, rv, sec, note } = ZR.ui;

  const GOALS = [
    ['Comprar', 'Imóveis, veículos, máquinas, equipamentos e outros bens.'],
    ['Capitalizar', 'Transformar patrimônio ou recebíveis em liquidez para uma finalidade definida.'],
    ['Planejar', 'Construir uma estratégia de aquisição e formação patrimonial ao longo do tempo.'],
    ['Expandir', 'Buscar recursos para capital de giro, expansão, aquisição de equipamentos ou reorganização financeira.'],
    ['Proteger', 'Reduzir o impacto financeiro de imprevistos sobre pessoas, patrimônio, veículos, máquinas, operações e empresas.'],
    ['Reorganizar', 'Avaliar uma estrutura existente e entender se existe outro caminho financeiro mais coerente para aquele momento.']
  ];

  const FAQ = [
    ['A ZR é banco?', 'Não. A ZR atua como Hub de Soluções Financeiras e consultoria, conectando clientes a diferentes estruturas e instituições parceiras, conforme o perfil e o objetivo da operação.'],
    ['Preciso saber qual produto quero antes de falar com vocês?', 'Não. O ponto de partida pode ser simplesmente o objetivo. A ZR pode analisar o cenário e explicar quais caminhos podem ser considerados.'],
    ['A ZR garante aprovação de crédito?', 'Não. Toda operação depende de análise, documentação, critérios da instituição e condições da solução.'],
    ['Consórcio garante contemplação?', 'Não. A contemplação ocorre por sorteio ou lance, conforme as regras do grupo e a existência de recursos. O pagamento antecipado de parcelas, por si só, não garante contemplação.'],
    ['Consórcio é investimento?', 'Não no sentido de uma aplicação financeira que promete rentabilidade. É uma modalidade de autofinanciamento voltada à aquisição de bens ou serviços. O crédito pode ser atualizado conforme as regras previstas no contrato.'],
    ['Posso usar um imóvel que já tenho para conseguir capital?', 'Algumas operações de crédito utilizam imóvel como garantia, permitindo acessar recursos sem vender o patrimônio. A viabilidade depende de avaliação do imóvel, documentação, perfil, finalidade e critérios da instituição.'],
    ['Posso usar um veículo como garantia?', 'Existem operações de crédito com garantia de veículos. A aceitação depende do tipo e condição do veículo, documentação, análise do cliente e critérios da instituição.'],
    ['A ZR atende empresas?', 'Sim. Há estruturas voltadas a capital de giro, expansão, aquisição de equipamentos, crédito com garantia e antecipação de recebíveis, entre outras possibilidades compatíveis com o perfil empresarial.'],
    ['A ZR atende todo o Brasil?', 'Sim, conforme a disponibilidade das estruturas e parceiros envolvidos na operação.']
  ];

  ZR.registerPage('inicio', 'ZR Investimentos | Hub de Soluções Financeiras', function () {
    return head('Hub de soluções financeiras', 'Seu objetivo começa por uma boa estrutura.')
      + paras([
        'Nem toda decisão financeira começa com um produto.',
        'Às vezes começa com a vontade de comprar um imóvel. Expandir uma empresa. Trocar uma frota. Construir patrimônio. Organizar o caixa. Transformar um ativo em capital. Planejar o futuro dos filhos.',
        'O ponto de partida é o objetivo. A partir dele, a ZR entende seu cenário e conecta você às possibilidades que podem fazer sentido para aquele momento — com acesso a diferentes estruturas de crédito, consórcio, capital e proteção patrimonial.'
      ])
      + rv('<p class="lead b">Você traz o objetivo. A ZR ajuda a encontrar o caminho financeiro.</p>', 6)
      + `<div class="row rv" style="--i:7"><button class="btn" data-quiz>Quero analisar meu cenário</button><a class="lnk" href="#consorcio">Conhecer as soluções</a></div>`

      + sec('Um hub financeiro para quem não quer escolher no escuro.',
        paras([
          'A ZR Investimentos é um Hub de Soluções Financeiras criado por profissionais que atuam há mais de dez anos no mercado financeiro.',
          'Nossa missão é facilitar os caminhos até as soluções que permitem a realização dos seus objetivos — sejam eles pessoais, patrimoniais ou empresariais.',
          'Em vez de limitar uma necessidade a um único produto, trabalhamos com uma rede de parceiros e diferentes estruturas do mercado: bancos, cooperativas de crédito, administradoras de consórcio, FIDCs e securitizadoras.',
          'Isso permite olhar para o cenário como um todo antes de definir a rota. Porque, para objetivos diferentes, existem estruturas diferentes. E uma escolha financeira começa a fazer sentido quando está conectada ao que você realmente precisa resolver.'
        ]))

      + sec('Do objetivo à estrutura.',
        GOALS.map(([v, t], i) => `<div class="rv" style="--i:${i % 3}"><div class="ln"></div><div class="step" style="grid-template-columns:200px 1fr;padding:20px 0"><h3 style="font-size:28px">${v}</h3><p style="margin:0;color:var(--mute)">${t}</p></div></div>`).join(''))

      + `<section class="sec faq"><h2 class="rv">Perguntas frequentes</h2>${FAQ.map(([q, a]) => `<details class="rv"><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>`
      + note();
  });
})();
