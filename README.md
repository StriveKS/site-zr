# Site ZR

Site premium da ZR Investimentos.

## Status Atual

- Site publicado em `https://zrinvestimentosltda.com`.
- Repositorio GitHub: `StriveKS/site-zr`.
- Deploy: GitHub Pages com workflow em `.github/workflows/pages.yml`.
- Dominio proprio: `zrinvestimentosltda.com`.
- Captura de leads: formulario do site -> Google Apps Script -> Google Sheets + e-mail.
- Notificacao de leads: `contato.eduardokeitel@gmail.com`.
- WhatsApp oficial: `+55 54 9 9380-5657`.
- GA4 instalado: `G-3TFKER5ZGK`.
- Microsoft Clarity instalado: `wwf25gobgk`.
- Formulario validado com leads reais de teste.

## Objetivo

Criar uma presenca digital premium para reposicionar a ZR como consultoria financeira focada em:

- consorcio e cartas contempladas;
- credito com garantia;
- capital para PF/PJ;
- preparacao de perfil para analise de credito;
- captacao de leads qualificados.

O projeto e LP-first: aparencia de site, logica de landing page e foco em conversao.

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

## Eventos de Analytics

- `click_whatsapp`
- `click_cta_contato`
- `lead_form_submit_attempt`
- `lead_form_submit_success`
- `lead_form_submit_error`
- `lead_form_endpoint_missing`

## Guardrails de Comunicacao

Usar: analise personalizada, rota financeira, estruturacao financeira, credito sujeito a analise, instituicoes reguladas, diagnostico de aprovacao.

Evitar: aprovacao garantida, limpa Bacen, score garantido, remocao garantida de restricoes, credito garantido para negativado.
