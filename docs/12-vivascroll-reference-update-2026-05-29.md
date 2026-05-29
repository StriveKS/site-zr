# VivaScroll - Atualizacao de Referencias - 2026-05-29

## Pedido

Adicionar uma fonte viva de referencias para evoluir o motion/design CSS do site ZR com base no artigo:

- `https://prismic-io.translate.goog/blog/css-animation-examples?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc&_x_tr_hist=true`

## Como Usar Esta Referencia

Antes de propor uma evolucao visual relevante no site, consultar exemplos contemporaneos de CSS animation e traduzir a tecnica para a linguagem da ZR:

- consultoria financeira premium;
- fundo claro/off-white;
- preto, cinzas quentes e dourado como acento;
- movimento com funcao narrativa;
- sem excesso de brilho, template ou efeito gratuito.

## Padroes de Referencia Extraidos

### Twinbru

Usar como referencia para:

- microinteracoes com identidade;
- resposta a hover/mouse;
- loaders e transicoes com personalidade;
- detalhes que fazem o site parecer vivo sem virar entretenimento.

Traducao para ZR:

- botoes com deslocamento fino e brilho contido;
- chips e cards reagindo com elevacao discreta;
- linhas douradas que surgem como gesto de assinatura.

### iPad Pro Website

Usar como referencia para:

- scroll cinematografico;
- elementos que mudam de escala, profundidade e foco conforme o usuario avanca;
- narrativa visual em etapas, sem depender de texto explicativo longo.

Traducao para ZR:

- sequencia `cenario -> rotas -> estrutura -> decisao`;
- paineis sticky;
- fundo vivo que reage ao scroll;
- progresso visual em camadas.

### BetterUp Landing Page

Usar como referencia para:

- experiencia editorial leve;
- transicoes suaves;
- parallax, SVG e motion integrado ao conteudo;
- sensacao humana/profissional sem parecer dashboard frio.

Traducao para ZR:

- secao consultiva com copy curta e visual forte;
- blocos respirados;
- animacao que reforca clareza e confianca.

## Guardrails

- Nao instalar biblioteca de animacao pronta como dependencia principal sem necessidade.
- Preferir CSS, GSAP e JS proprio.
- Respeitar `prefers-reduced-motion`.
- Validar desktop e mobile por screenshot.
- O motion deve explicar a tese da ZR, nao apenas decorar.

## Prototipo Criado

Arquivo local:

- `prototypes/zr-vivascroll-prismic-test.html`

Objetivo:

- testar uma evolucao tecnica/visual antes de aplicar no site principal.
- combinar fundo vivo, scroll progressivo, microinteracoes e narrativa consultiva.
