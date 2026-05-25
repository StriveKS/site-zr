# Plano de Copy, Design e Motion - Site ZR

## Diagnostico Atual

O site ja cumpre o papel de MVP publicado: tem dominio, formulario, WhatsApp, metricas e uma base visual premium. A proxima etapa nao e "adicionar efeitos"; e elevar percepcao de autoridade, clareza comercial e confianca consultiva.

O que esta bom:

- Promessa atual ja foge de chamada agressiva de credito.
- Estrutura de solucoes esta coerente com PF/PJ, patrimonio, garantia e consorcio.
- Formulario qualifica melhor do que um cadastro simples.
- Visual dark/gold conversa com o universo premium.
- Motion atual e leve e respeita acessibilidade.

O que precisa melhorar:

- A copy ainda esta ampla demais: "comprar, captar capital ou preparar aprovacao" e correta, mas pode ficar mais memoravel e consultiva.
- Falta uma secao forte de "para quem e" e "quando a ZR entra".
- Faltam provas de confianca mais explicadas: +50, BC e PF/PJ precisam de contexto e cuidado legal.
- O visual ainda depende de cards e glow; precisa de um sistema proprietario de linhas, mapas, vetores e movimentos.
- A logo SVG atual e funcional, mas ainda nao e a versao definitiva animavel fiel ao asset original.
- O formulario pode virar uma "triagem financeira" com linguagem mais premium.

## Nova Tese Central

Antes de escolher credito, consorcio ou carta contemplada, a ZR analisa seu objetivo, perfil e garantias para estruturar a rota financeira mais coerente.

Versoes de hero para teste:

1. `Antes de buscar credito ou consorcio, descubra qual rota financeira faz sentido para seu objetivo.`
2. `Credito, consorcio e capital com estrategia antes da decisao.`
3. `A ZR estrutura sua proxima decisao financeira com criterio, rede e clareza.`
4. `Nao comece pelo produto. Comece pela rota financeira certa.`

Recomendacao inicial:

`Nao comece pelo produto. Comece pela rota financeira certa.`

Subheadline proposta:

`A ZR analisa objetivo, perfil, patrimonio, garantias e prazo para orientar caminhos entre credito, consorcio, carta contemplada e capital para PF ou PJ.`

CTA principal:

`Solicitar diagnostico ZR`

CTA secundario:

`Ver como funciona`

## Arquitetura Recomendada da Pagina

### 1. Hero - Tese e Conversao

Objetivo: deixar claro que a ZR e consultiva, nao apenas vendedora de produto.

Elementos:

- Logo menor e mais refinada.
- Headline forte e curta.
- Subheadline explicativa.
- CTA principal para diagnostico.
- CTA secundario para metodo.
- Painel animado com rota financeira: Perfil -> Garantia -> Objetivo -> Enquadramento.

Motion:

- Linha dourada desenhando a rota.
- Pontos acendendo em sequencia.
- Logo com reveal vetorial sutil.

### 2. Quando a ZR Entra

Objetivo: gerar identificacao imediata.

Blocos:

- Quero comprar imovel, veiculo ou equipamento.
- Preciso transformar patrimonio em capital.
- Minha empresa precisa de capital ou reorganizacao.
- Meu banco nao trouxe uma resposta boa.
- Quero comparar consorcio, credito e carta contemplada.

Motion:

- Cards entram por prioridade, sem excesso de movimento.
- Hover mostra a "rota provavel" de cada situacao.

### 3. Metodo ZR

Objetivo: mostrar processo e profissionalismo.

Etapas:

1. Diagnostico do objetivo.
2. Leitura de perfil e documentacao.
3. Comparacao de rotas financeiras.
4. Enquadramento com instituicoes/administradoras.
5. Acompanhamento ate a decisao.

Motion:

- Timeline horizontal/vertical com progresso por scroll.
- Cada etapa revela uma micro-ilustracao vetorial.

### 4. Solucoes

Objetivo: organizar oferta sem parecer catalogo.

Categorias:

- Aquisicao patrimonial.
- Capital com garantia.
- Capital para empresas.
- Consorcio e cartas contempladas.
- Preparacao para analise de credito.

Motion:

- Grid modular com linhas conectando solucao -> objetivo.

### 5. Estrutura e Confianca

Objetivo: dar seguranca sem prometer resultado.

Conteudos:

- Rede com bancos, cooperativas e administradoras autorizadas.
- Operacoes sujeitas a analise e enquadramento.
- Processo consultivo antes da indicacao.
- Transparencia sobre limites e criterios.

Motion:

- Mapa abstrato de rede: nos institucionais conectados a "ZR" no centro.

### 6. Diagnostico ZR

Objetivo: transformar o formulario em experiencia premium.

Melhorias:

- Renomear secao para `Diagnostico ZR`.
- Separar campos em blocos: contato, objetivo, contexto, urgencia.
- Adicionar microcopy de privacidade e proximo passo.
- Confirmacao pos-envio com tom consultivo.

Motion:

- Progresso visual simples.
- Campo ativo com linha dourada e feedback claro.

## Direcao Visual Definitiva

### Fontes

Recomendacao A:

- Headline: `Instrument Serif`.
- Texto/UI: `Manrope`.

Recomendacao B:

- Headline: `Fraunces`.
- Texto/UI: `Inter`.

Escolha preferida para a ZR:

- `Instrument Serif` + `Manrope`.

Motivo:

- Instrument Serif aproxima o visual de consultoria/editorial premium.
- Manrope mantém legibilidade, tecnologia e sobriedade em formularios, botoes e textos longos.

### Paleta

Manter dark/gold, mas com menos brilho:

- Fundo: quase preto quente.
- Superficies: grafite quente.
- Texto: marfim claro.
- Dourado: acento e linha, nao preenchimento dominante.
- Usar linhas finas, divisorias e transparencias.

### Elementos Proprietarios

- Logo vetorial animavel.
- Rota financeira em SVG.
- Mapa de rede com nos institucionais.
- Diagramas de enquadramento.
- Contadores e indicadores com tabular nums.
- Micro-ilustracoes abstratas para credito, garantia, consorcio e capital.

## Motion Design no Site

Stack recomendada:

- CSS para microinteracoes simples.
- GSAP para timelines, scroll reveals, stagger e SVG path drawing.
- Sem framework pesado por enquanto.
- Respeitar `prefers-reduced-motion`.

Animacoes prioritarias:

1. Logo reveal vetorial.
2. Hero route drawing.
3. Scroll timeline do Metodo ZR.
4. Mapa de rede em "Estrutura".
5. Cards de situacao com hover consultivo.
6. Formulario com feedback premium.

Regras:

- Animar `opacity`, `transform`, `stroke-dashoffset` e filtros leves.
- Evitar animar layout.
- Nao criar loop infinito chamativo.
- Toda animacao precisa reforcar uma ideia da copy.

## Videos Animados em Motion

Stack recomendada:

- HyperFrames para videos HTML/GSAP exportaveis.
- Remotion se a evolucao pedir React, composicoes parametrizadas ou variacoes em escala.

Videos iniciais:

1. `Metodo ZR em 30 segundos` - 16:9 e 9:16.
2. `Credito, consorcio ou carta contemplada?` - 9:16.
3. `Antes de buscar capital, organize sua rota` - 9:16.
4. `ZR Investimentos - institucional curto` - 16:9.

Estilo:

- Fundo escuro, vetores dourados, tipografia grande.
- Poucas palavras por cena.
- Transicoes suaves entre cenas.
- Sem poluicao visual.

## Roadmap de Execucao

### Fase 1 - Fundacao de Marca

- Criar `DESIGN.md` como guia de identidade.
- Definir par tipografico.
- Revisar paleta e tokens CSS.
- Redesenhar logo SVG animavel com base no asset original.

### Fase 2 - Copy Definitiva

- Reescrever hero.
- Criar secao "Quando a ZR entra".
- Refinar Metodo ZR.
- Refinar provas de confianca.
- Transformar formulario em "Diagnostico ZR".

### Fase 3 - Design System

- Criar componentes: header, CTA, proof strip, situation cards, method timeline, trust network, diagnostic form.
- Definir grids responsivos.
- Reduzir cards decorativos.
- Melhorar hierarquia mobile.

### Fase 4 - Motion no Site

- Instalar/usar GSAP se aprovado.
- Criar timelines por secao.
- Desenhar vetores SVG.
- Aplicar motion sem quebrar performance.
- Testar desktop e mobile.

### Fase 5 - Video Motion

- Criar primeira composicao HyperFrames para "Metodo ZR em 30 segundos".
- Exportar 16:9 e 9:16.
- Reaproveitar os vetores do site.
- Preparar criativos para WhatsApp, Instagram e trafego futuro.

### Fase 6 - Validacao Comercial

- Conferir eventos no GA4 e Clarity.
- Ver gravacoes/sessoes do Clarity.
- Medir cliques e taxa de envio.
- Ajustar copy com base nos primeiros leads.

## Proxima Acao Recomendada

Implementar a Fase 1 e Fase 2 juntas:

1. Aplicar fontes `Instrument Serif` + `Manrope`.
2. Reescrever hero com a nova tese.
3. Criar secao "Quando a ZR entra".
4. Renomear formulario para `Diagnostico ZR`.
5. Preparar SVG da rota financeira para animacao.

Essa etapa ja deve deixar o site com aparencia mais profissional antes mesmo dos videos.
