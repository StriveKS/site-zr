# Site ZR

Site premium da ZR Investimentos.

## Status Atual

- Site publicado em `https://zrinvestimentosltda.com`.
- Repositorio GitHub: `StriveKS/site-zr`.
- Deploy: GitHub Pages com workflow em `.github/workflows/pages.yml`.
- Dominio proprio: `zrinvestimentosltda.com`.
- Base visual/copy aprovada em 2026-05-26.
- Commit de referencia da base aprovada: `c656c8f`.
- Atualizacao de hero em 2026-05-29: painel visual recriado como `Mesa de decisao ZR`, substituindo a rota/video anterior por uma composicao consultiva de cenario, rotas comparadas e estrutura indicada.
- Atualizacao de fluxo em 2026-06-01: secoes `Metodo ZR` e `Como a operacao ganha forma` refinadas com visual de processo, camadas conectadas e microanimacoes coerentes.
- Atualizacao VivaScroll em 2026-06-01: fundo vivo global em canvas aplicado ao site real, adaptado do beta local `zr-vivascroll-beta.html`, reagindo a scroll e mouse, com mapa de rede visualmente refinado.
- Captura de leads: formulario do site -> Google Apps Script -> Google Sheets + e-mail.
- Notificacao de leads: `contato.eduardokeitel@gmail.com`.
- WhatsApp oficial: `+55 54 9 9380-5657`.
- GA4 instalado: `G-3TFKER5ZGK`.
- Microsoft Clarity instalado: `wwf25gobgk`.
- Formulario validado com leads reais de teste.

## Objetivo

Criar uma presenca digital premium para posicionar a ZR como consultoria financeira e prestadora de servico, focada em:

- consorcio e cartas contempladas;
- credito com garantia;
- capital para PF/PJ;
- preparacao de perfil para analise de credito;
- captacao de leads qualificados.

O projeto e LP-first: aparencia de site, logica de landing page e foco em conversao.

## Base Aprovada

A direcao aprovada combina:

- visual claro premium com preto, off-white, cinzas quentes e dourado como detalhe;
- logo simplificada no monograma `ZR`;
- copy consultiva, sem promessa agressiva de credito;
- headline principal `Seu proximo passo comeca aqui.`;
- motion design discreto para reforcar clareza, criterio, comparacao de rotas, arquitetura de decisao, conducao e profundidade.

Registro detalhado: `docs/10-base-aprovada-2026-05-26.md`.

## Stack

- Site estatico: HTML, CSS e JavaScript.
- Motion design: CSS e JavaScript, sem build obrigatorio.
- Hospedagem: GitHub Pages.
- Dominio: `zrinvestimentosltda.com`.
- Formulario: Google Apps Script.
- CRM inicial: Google Sheets.
- Notificacao: Gmail/MailApp.
- Metricas: GA4 e Microsoft Clarity.

## Estrutura Publicada

```text
.
|-- index.html
|-- styles.css
|-- premium.css
|-- CNAME
|-- assets/
|   |-- favicon.svg
|   `-- zr-logo-gold.svg
|-- scripts/
|   `-- main.js
|-- apps-script/
|   |-- Code.gs
|   `-- appsscript.json
|-- docs/
|   `-- 03-project-status.md
`-- .github/workflows/pages.yml
```

## Observacao Local

A pasta `site/` permanece no workspace como versao inicial/legado do MVP. A versao publicada e sincronizada com o GitHub fica na raiz do projeto.

## Eventos de Analytics

- `click_whatsapp`
- `click_cta_contato`
- `lead_form_submit_attempt`
- `lead_form_submit_success`
- `lead_form_submit_error`
- `lead_form_endpoint_missing`

## Guardrails de Comunicacao

Usar: analise personalizada, rota financeira, estruturacao financeira, criterio, clareza, conducao, credito sujeito a analise, instituicoes reguladas.

Evitar: aprovacao garantida, limpa Bacen, score garantido, remocao garantida de restricoes, credito garantido para negativado, comparacao repetitiva com bancos, excesso de foco em numero de parceiros.
