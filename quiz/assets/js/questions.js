// questions.js — árvore de decisão completa do quiz de consultoria de crédito

const FAIXA = {
  saldoDevedorPF: ['Até R$ 20 mil', 'De R$ 20 a 50 mil', 'De R$ 50 a 100 mil', 'Acima de R$ 100 mil'],
  restricaoValorPF: ['Até R$ 5 mil', 'De R$ 5 a 15 mil', 'De R$ 15 a 30 mil', 'Acima de R$ 30 mil'],
  valorImovel: ['Até R$ 200 mil', 'De R$ 200 a 400 mil', 'De R$ 400 a 800 mil', 'Acima de R$ 800 mil'],
  valorVeiculo: ['Até R$ 60 mil', 'De R$ 60 a 120 mil', 'De R$ 120 a 250 mil', 'Acima de R$ 250 mil'],
  saldoDevedorPJ: ['Até R$ 50 mil', 'De R$ 50 a 150 mil', 'De R$ 150 a 400 mil', 'Acima de R$ 400 mil'],
  restricaoValorPJ: ['Até R$ 15 mil', 'De R$ 15 a 40 mil', 'De R$ 40 a 100 mil', 'Acima de R$ 100 mil'],
  valorBemPJ: ['Até R$ 150 mil', 'De R$ 150 a 500 mil', 'De R$ 500 mil a R$ 1,5 milhão', 'Acima de R$ 1,5 milhão'],
  tempoAtividade: ['Menos de 1 ano', 'De 1 a 3 anos', 'De 3 a 5 anos', 'Mais de 5 anos'],
  faturamentoAnual: ['Até R$ 360 mil', 'De R$ 360 mil a R$ 1 milhão', 'De R$ 1 a R$ 4,8 milhões', 'Acima de R$ 4,8 milhões'],
  valorCapitalPessoal: ['Até R$ 10 mil', 'De R$ 10 a 30 mil', 'De R$ 30 a 80 mil', 'Acima de R$ 80 mil'],
  valorCapitalEmpresa: ['Até R$ 50 mil', 'De R$ 50 a 150 mil', 'De R$ 150 a 500 mil', 'Acima de R$ 500 mil'],
};

function opt(label, set, next) { return { label, set: set || {}, next }; }
function faixaOpts(labels, next) { return labels.map(l => opt(l, {}, next)); }

const QUESTIONS = {

  // ---------- RAIZ ----------
  q_objetivo: {
    text: s => `Pra começarmos da melhor forma, ${s.nome}, hoje qual objetivo está em destaque dentro dos seus planos?`,
    options: s => [
      opt('Meu foco está em conseguir dinheiro extra, capital de giro, algo nesse sentido', { intencao: 'capital' }, 'q_capital_destino'),
      opt('Meu objetivo é realizar uma compra, já tenho algo em mente', { intencao: 'aquisicao' }, 'q_aquisicao_urgencia'),
    ]
  },

  // ---------- AQUISIÇÃO ----------
  q_aquisicao_urgencia: {
    text: s => 'Essa oportunidade já está na sua frente, ou é um objetivo que você busca alcançar em um prazo mais longo?',
    options: s => [
      opt('A chance ideal surgiu e estou ansioso pra aproveitar', { urgencia: 'alta' }, 'q_aquisicao_perfil'),
      opt('Ainda estou buscando, sem pressa', { urgencia: 'baixa' }, 'q_aquisicao_perfil'),
    ]
  },

  q_aquisicao_perfil: {
    text: s => 'Essa aquisição é para você, pessoa física, ou para sua empresa/atividade rural?',
    options: s => [
      opt('É para mim', { perfil: 'PF' }, 'q_pf_tipo_bem'),
      opt('É para minha empresa ou atividade rural', { perfil: 'PJ' }, 'q_pj_tipo_bem'),
    ]
  },

  // -- PF --
  q_pf_tipo_bem: {
    text: s => 'O que você está pensando em conquistar?',
    options: s => [
      opt('Um imóvel', { bem: 'imovel' }, 'q_pf_bem_primeiro'),
      opt('Um veículo', { bem: 'veiculo' }, 'q_pf_bem_primeiro'),
    ]
  },

  q_pf_bem_primeiro: {
    text: s => `Esse seria seu primeiro ${s.flags.bem === 'imovel' ? 'imóvel' : 'veículo'}, ou você já tem outro hoje?`,
    options: s => [
      opt('Seria o primeiro', {}, 'q_pf_patrimonio'),
      opt('Já tenho outro no meu nome', {}, 'q_pf_patrimonio'),
    ]
  },

  q_pf_patrimonio: {
    text: s => 'Além disso, você já tem algum bem — imóvel ou veículo — que poderia usar como parte da entrada ou garantia?',
    options: s => [
      opt('Sim, tenho um bem que pode ajudar nisso', { patrimonio: true }, 'q_pf_patrimonio_situacao'),
      opt('Não, por enquanto não', { patrimonio: false }, 'q_pf_restricao'),
    ]
  },

  q_pf_patrimonio_situacao: {
    text: s => 'Esse bem já está quitado, ou ainda tem financiamento em andamento?',
    options: s => [
      opt('Está quitado', { patrimonio_situacao: 'quitado' }, 'q_pf_restricao'),
      opt('Ainda tem parcelas em aberto', { patrimonio_situacao: 'financiado' }, 'q_pf_saldo_devedor'),
    ]
  },

  q_pf_saldo_devedor: {
    text: s => 'Sem precisar ser exato, qual seria o saldo devedor médio hoje?',
    options: s => faixaOpts(FAIXA.saldoDevedorPF, 'q_pf_restricao')
  },

  q_pf_restricao: {
    text: s => 'Só pra eu entender melhor seu momento: hoje seu nome está limpo para negociações, ou existe alguma restrição em aberto?',
    options: s => [
      opt('Está tudo certo', { restricao: false }, 'q_pf_valor_bem'),
      opt('Tenho alguma restrição em aberto', { restricao: true }, 'q_pf_restricao_natureza'),
    ]
  },

  q_pf_restricao_natureza: {
    text: s => 'Entendido — isso é bem mais comum do que parece, e às vezes até faz parte da solução. É mais com bancos, com o comércio, ou de outra natureza?',
    options: s => [
      opt('Com bancos / financeiras', { restricao_natureza: 'bancos' }, 'q_pf_restricao_valor'),
      opt('Com o comércio', { restricao_natureza: 'comercio' }, 'q_pf_restricao_valor'),
      opt('De outra natureza', { restricao_natureza: 'outra' }, 'q_pf_restricao_valor'),
    ]
  },

  q_pf_restricao_valor: {
    text: s => 'Em média, qual seria o valor total dessas pendências?',
    options: s => faixaOpts(FAIXA.restricaoValorPF, 'q_pf_valor_bem')
  },

  q_pf_valor_bem: {
    text: s => `Voltando ao seu objetivo: qual faixa de valor está esse ${s.flags.bem === 'imovel' ? 'imóvel' : 'veículo'}?`,
    options: s => faixaOpts(s.flags.bem === 'imovel' ? FAIXA.valorImovel : FAIXA.valorVeiculo, 'q_pf_renda')
  },

  q_pf_renda: {
    text: s => 'Última pergunta desse bloco: hoje você é registrado (CLT), autônomo, ou tem seu próprio negócio?',
    options: s => [
      opt('Sou CLT, registrado', { renda: 'clt' }, 'CAPTURE'),
      opt('Sou autônomo(a)', { renda: 'autonomo' }, 'CAPTURE'),
      opt('Tenho meu próprio negócio / sou empresário(a)', { renda: 'empresario' }, 'CAPTURE'),
    ]
  },

  // -- PJ / Agro --
  q_pj_tipo_bem: {
    text: s => 'O que sua empresa (ou atividade rural) está buscando adquirir?',
    options: s => [
      opt('Um imóvel (comercial ou rural)', { bem: 'imovel' }, 'q_pj_frota'),
      opt('Um veículo', { bem: 'veiculo' }, 'q_pj_frota'),
      opt('Maquinário ou equipamento', { bem: 'maquinario' }, 'q_pj_frota'),
    ]
  },

  q_pj_frota: {
    text: s => 'Hoje vocês já possuem frota, maquinário ou patrimônio na empresa, ou essa seria uma aquisição inicial?',
    options: s => [
      opt('Já temos patrimônio na empresa', { patrimonio: true }, 'q_pj_patrimonio_situacao'),
      opt('Seria nossa primeira aquisição desse tipo', { patrimonio: false }, 'q_pj_tempo_atividade'),
    ]
  },

  q_pj_patrimonio_situacao: {
    text: s => 'Esse patrimônio está quitado, ou ainda existe financiamento em andamento?',
    options: s => [
      opt('Está quitado', { patrimonio_situacao: 'quitado' }, 'q_pj_tempo_atividade'),
      opt('Ainda tem parcelas em aberto', { patrimonio_situacao: 'financiado' }, 'q_pj_saldo_devedor'),
    ]
  },

  q_pj_saldo_devedor: {
    text: s => 'Em média, qual o saldo devedor hoje?',
    options: s => faixaOpts(FAIXA.saldoDevedorPJ, 'q_pj_tempo_atividade')
  },

  q_pj_tempo_atividade: {
    text: s => 'Há quanto tempo a empresa (ou atividade) está em funcionamento?',
    options: s => faixaOpts(FAIXA.tempoAtividade, 'q_pj_faturamento')
  },

  q_pj_faturamento: {
    text: s => 'E qual o faturamento médio anual da empresa hoje, aproximadamente?',
    options: s => faixaOpts(FAIXA.faturamentoAnual, 'q_pj_socios')
  },

  q_pj_socios: {
    text: s => 'A empresa tem outros sócios além de você?',
    options: s => [
      opt('Sim, tenho sócio(s)', { socios: true }, 'q_pj_restricao'),
      opt('Não, sou o único responsável', { socios: false }, 'q_pj_restricao'),
    ]
  },

  q_pj_restricao: {
    text: s => 'Hoje, o CNPJ ou algum dos sócios possui alguma restrição em aberto que devemos considerar?',
    options: s => [
      opt('Sim, existe alguma pendência', { restricao: true }, 'q_pj_restricao_natureza'),
      opt('Não, está tudo regular', { restricao: false }, 'q_pj_valor_bem'),
    ]
  },

  q_pj_restricao_natureza: {
    text: s => 'Essa pendência é mais com bancos, com fornecedores ou comércio, ou de outra natureza?',
    options: s => [
      opt('Com bancos / financeiras', { restricao_natureza: 'bancos' }, 'q_pj_restricao_valor'),
      opt('Com fornecedores / comércio', { restricao_natureza: 'comercio' }, 'q_pj_restricao_valor'),
      opt('De outra natureza', { restricao_natureza: 'outra' }, 'q_pj_restricao_valor'),
    ]
  },

  q_pj_restricao_valor: {
    text: s => 'E qual seria o valor médio dessas pendências?',
    options: s => faixaOpts(FAIXA.restricaoValorPJ, 'q_pj_valor_bem')
  },

  q_pj_valor_bem: {
    text: s => 'Voltando à aquisição: qual faixa de valor vocês têm em mente?',
    options: s => faixaOpts(FAIXA.valorBemPJ, 'CAPTURE')
  },

  // ---------- CAPITAL ----------
  q_capital_destino: {
    text: s => 'Esse valor que você busca é mais para uso pessoal — alguma questão pra resolver — ou pra dar aquele respiro no caixa da empresa?',
    options: s => [
      opt('Preciso de dinheiro pra mim mesmo, tenho algumas questões a resolver', { perfil: 'PF' }, 'q_cappes_motivo'),
      opt('Isso, estou buscando capital pra injetar na minha empresa', { perfil: 'PJ' }, 'q_capemp_finalidade'),
    ]
  },

  // -- Capital Pessoal --
  q_cappes_motivo: {
    text: s => 'Pra eu entender melhor: qual seria o principal motivo por trás desse capital?',
    options: s => [
      opt('Quitar ou reorganizar alguma dívida/restrição', { motivo: 'divida' }, 'q_cappes_restricao'),
      opt('Resolver uma questão de saúde', { motivo: 'saude' }, 'q_cappes_restricao'),
      opt('Investir ou melhorar minha casa', { motivo: 'casa' }, 'q_cappes_restricao'),
      opt('Outro projeto pessoal', { motivo: 'outro' }, 'q_cappes_restricao'),
    ]
  },

  q_cappes_restricao: {
    text: s => 'Hoje seu nome está limpo para negociações, ou existe alguma restrição em aberto que devemos considerar na análise?',
    options: s => [
      opt('Está tudo certo', { restricao: false }, 'q_cappes_patrimonio'),
      opt('Tenho alguma restrição em aberto', { restricao: true }, 'q_cappes_restricao_natureza'),
    ]
  },

  q_cappes_restricao_natureza: {
    text: s => 'Essa restrição é mais com bancos, com o comércio, ou de outra natureza?',
    options: s => [
      opt('Com bancos / financeiras', { restricao_natureza: 'bancos' }, 'q_cappes_restricao_valor'),
      opt('Com o comércio', { restricao_natureza: 'comercio' }, 'q_cappes_restricao_valor'),
      opt('De outra natureza', { restricao_natureza: 'outra' }, 'q_cappes_restricao_valor'),
    ]
  },

  q_cappes_restricao_valor: {
    text: s => 'Em média, qual o valor total dessas pendências?',
    options: s => faixaOpts(FAIXA.restricaoValorPF, 'q_cappes_patrimonio')
  },

  q_cappes_patrimonio: {
    text: s => 'Você tem algum bem no seu nome hoje — imóvel ou veículo — que poderia servir de garantia?',
    options: s => [
      opt('Sim, tenho um bem', { patrimonio: true }, 'q_cappes_patrimonio_situacao'),
      opt('Não tenho nenhum bem', { patrimonio: false }, 'q_cappes_renda'),
    ]
  },

  q_cappes_patrimonio_situacao: {
    text: s => 'Esse bem já está quitado ou ainda tem financiamento em aberto?',
    options: s => [
      opt('Está quitado', { patrimonio_situacao: 'quitado' }, 'q_cappes_renda'),
      opt('Ainda tem parcelas em aberto', { patrimonio_situacao: 'financiado' }, 'q_cappes_saldo_devedor'),
    ]
  },

  q_cappes_saldo_devedor: {
    text: s => 'Em média, qual seria o saldo devedor hoje?',
    options: s => faixaOpts(FAIXA.saldoDevedorPF, 'q_cappes_renda')
  },

  q_cappes_renda: {
    text: s => 'Como você recebe sua renda hoje? É CLT, autônomo(a), ou tem negócio próprio?',
    options: s => [
      opt('Sou CLT, registrado', { renda: 'clt' }, 'q_cappes_valor'),
      opt('Sou autônomo(a)', { renda: 'autonomo' }, 'q_cappes_valor'),
      opt('Tenho meu próprio negócio', { renda: 'empresario' }, 'q_cappes_valor'),
    ]
  },

  q_cappes_valor: {
    text: s => 'Pra fecharmos esse raciocínio: qual valor você tem em mente pra essa solução?',
    options: s => faixaOpts(FAIXA.valorCapitalPessoal, 'CAPTURE')
  },

  // -- Capital Empresarial --
  q_capemp_finalidade: {
    text: s => 'Esse capital seria mais pra equilibrar o caixa em um período mais apertado, ou pra investir em crescimento — estoque, expansão, equipamentos?',
    options: s => [
      opt('Equilibrar o caixa, dar um fôlego', { finalidade: 'caixa' }, 'q_capemp_tempo'),
      opt('Investir em crescimento', { finalidade: 'crescimento' }, 'q_capemp_tempo'),
    ]
  },

  q_capemp_tempo: {
    text: s => 'Há quanto tempo a empresa está em atividade?',
    options: s => faixaOpts(FAIXA.tempoAtividade, 'q_capemp_faturamento')
  },

  q_capemp_faturamento: {
    text: s => 'Qual o faturamento médio anual da empresa hoje?',
    options: s => faixaOpts(FAIXA.faturamentoAnual, 'q_capemp_recebimento')
  },

  q_capemp_recebimento: {
    text: s => 'E como funciona o recebimento da empresa hoje — mais por boletos e contratos, cartão/maquininha, ou por medições e produção (obra, agro, serviços)?',
    options: s => [
      opt('Boletos e contratos', { recebimento_empresa: 'boletos' }, 'q_capemp_socios'),
      opt('Cartão / maquininha', { recebimento_empresa: 'maquininha' }, 'q_capemp_socios'),
      opt('Medições, produção ou safra', { recebimento_empresa: 'medicao' }, 'q_capemp_socios'),
    ]
  },

  q_capemp_socios: {
    text: s => 'A empresa tem sócios além de você?',
    options: s => [
      opt('Sim', { socios: true }, 'q_capemp_restricao'),
      opt('Não', { socios: false }, 'q_capemp_restricao'),
    ]
  },

  q_capemp_restricao: {
    text: s => 'Hoje o CNPJ, você ou algum sócio possuem alguma restrição em aberto?',
    options: s => [
      opt('Sim, existe alguma pendência', { restricao: true }, 'q_capemp_restricao_natureza'),
      opt('Não, está tudo regular', { restricao: false }, 'q_capemp_patrimonio'),
    ]
  },

  q_capemp_restricao_natureza: {
    text: s => 'Essa pendência é mais com bancos, com fornecedores ou comércio, ou de outra natureza?',
    options: s => [
      opt('Com bancos / financeiras', { restricao_natureza: 'bancos' }, 'q_capemp_restricao_valor'),
      opt('Com fornecedores / comércio', { restricao_natureza: 'comercio' }, 'q_capemp_restricao_valor'),
      opt('De outra natureza', { restricao_natureza: 'outra' }, 'q_capemp_restricao_valor'),
    ]
  },

  q_capemp_restricao_valor: {
    text: s => 'Qual seria o valor médio dessas pendências?',
    options: s => faixaOpts(FAIXA.restricaoValorPJ, 'q_capemp_patrimonio')
  },

  q_capemp_patrimonio: {
    text: s => 'A empresa ou algum dos sócios possui patrimônio — imóvel, veículo ou maquinário — que poderia servir de garantia?',
    options: s => [
      opt('Sim', { patrimonio: true }, 'q_capemp_patrimonio_situacao'),
      opt('Não', { patrimonio: false }, 'q_capemp_valor'),
    ]
  },

  q_capemp_patrimonio_situacao: {
    text: s => 'Esse patrimônio está quitado ou ainda tem financiamento em aberto?',
    options: s => [
      opt('Está quitado', { patrimonio_situacao: 'quitado' }, 'q_capemp_valor'),
      opt('Ainda tem parcelas em aberto', { patrimonio_situacao: 'financiado' }, 'q_capemp_saldo_devedor'),
    ]
  },

  q_capemp_saldo_devedor: {
    text: s => 'Em média, qual o saldo devedor hoje?',
    options: s => faixaOpts(FAIXA.saldoDevedorPJ, 'q_capemp_valor')
  },

  q_capemp_valor: {
    text: s => 'Por fim: qual valor vocês têm em mente pra essa solução?',
    options: s => faixaOpts(FAIXA.valorCapitalEmpresa, 'CAPTURE')
  },
};
