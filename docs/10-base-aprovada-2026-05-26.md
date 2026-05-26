# Base Aprovada - 2026-05-26

## Marco do Projeto

Em 2026-05-26 a base visual e textual atual do site foi aprovada como direcao principal para levar o projeto ate a versao final.

Essa base passa a ser a referencia de continuidade para:

- copy consultiva, sem excesso de comparacao com bancos;
- visual claro, premium, com preto, branco, cinzas quentes e dourado como detalhe;
- logo ZR simplificada, usando apenas o monograma;
- motion design discreto, com funcao narrativa;
- site estatico em GitHub Pages, sem build obrigatorio;
- captura de leads via formulario integrado ao Google Apps Script.

## Versao Publicada

- Site: `https://zrinvestimentosltda.com`
- Repositorio: `StriveKS/site-zr`
- Branch: `main`
- Commit de referencia da base tipografica aprovada: `c656c8f`
- Mensagem do commit: `Prevent hero headline descender clipping`

## Decisoes Aprovadas

### Direcao Visual

- Manter visual claro, com fundo off-white e detalhes em preto, cinza e dourado.
- Manter uma composicao premium, limpa e institucional, evitando excesso de brilho e efeitos financeiros genericos.
- Usar o dourado como acento de marca, linhas, destaques e microinteracoes, nao como cor dominante.
- Preservar grid sutil, particulas discretas e cards com vidro leve quando ajudarem na leitura.

### Logo

- Usar a logo simplificada apenas com `ZR`, sem a assinatura `Investimentos` abaixo.
- Manter a marca pequena no header, com bastante respiro.
- Evoluir no futuro para um SVG mais fiel ao arquivo original, mas sem comprometer a limpeza atual.

### Hero

Headline aprovada como base:

```text
Seu proximo
passo comeca
aqui.
```

Subheadline aprovada como base:

```text
Estrategia financeira para decisoes que pedem clareza, criterio e conducao.
```

Texto de apoio:

```text
A ZR entende seu cenario, organiza possibilidades e conduz a escolha com visao consultiva: credito, consorcio, capital ou estruturacao patrimonial no momento certo para o seu objetivo.
```

### Tipografia do Hero

- Manter a fonte anterior usada no modelo que estava sendo refinado.
- Evitar trocar a familia da palavra dourada.
- Evitar gradiente aplicado diretamente no texto quando ele causar corte visual nas descendentes.
- Garantir que letras como `p`, `q`, `g`, `j` e cedilha tenham area vertical suficiente.
- Preservar hierarquia visual em camadas:
  - linha 1 na frente;
  - linha 2 em camada intermediaria;
  - linha 3 atras.

### Copy

- Posicionar a ZR como consultoria financeira e prestadora de servico.
- Evitar bater repetidamente na comparacao com bancos.
- Evitar excesso de foco em numero de parceiros.
- Evitar termos com tom de "limpa nome", promessa de aprovacao ou venda agressiva de credito.
- Priorizar clareza, criterio, conducao e leitura do cenario.

## Ajuste Tecnico Feito no Hero

O problema visual principal era a sensacao de corte nas letras da headline, especialmente nas descendentes de `p` e `q`.

Foi ajustado em `styles.css`:

- `overflow: visible` no bloco do titulo e nas linhas;
- `isolation: isolate` para preservar camadas;
- `z-index` progressivo nas linhas;
- aumento do `line-height`;
- aumento do `padding-bottom` das linhas;
- afastamento do traco inferior depois de `aqui.`;
- remocao do gradiente recortado nas palavras douradas.

Screenshot local validado:

```text
C:\Users\User\Documents\Site Zr\hero-no-cut-final-check.png
```

## Estado Atual

O site esta em uma base muito boa para continuidade. O foco agora deixa de ser "corrigir a primeira impressao" e passa a ser refinar a experiencia inteira com consistencia.

## Proximas Frentes

1. Revisar todas as secoes abaixo do hero com a mesma linguagem consultiva.
2. Refinar microcopy do formulario para aumentar qualidade dos leads.
3. Melhorar responsividade mobile com base na composicao aprovada do desktop.
4. Criar SVG definitivo da logo ZR com animacao sutil.
5. Criar motion graphics proprietarios para metodo, rota financeira e estrutura.
6. Revisar eventos de conversao no GA4 e Clarity.
7. Criar rotina de acompanhamento de leads e funil comercial.

## Guardrail Principal

Qualquer nova alteracao deve respeitar a direcao aprovada:

```text
Consultoria financeira premium, clara e confiavel.
Menos promessa.
Mais criterio, estrutura e conducao.
```
