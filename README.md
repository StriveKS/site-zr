# Site ZR

MVP da landing page/site da ZR Investimentos.

## Objetivo

Criar uma presença digital premium para reposicionar a ZR como consultoria financeira focada em:

- consórcio e cartas contempladas;
- crédito com garantia;
- capital para PF/PJ;
- preparação de perfil para análise de crédito;
- captação de leads qualificados.

O projeto é LP-first: aparência de site, lógica de landing page e foco em conversão.

## Stack inicial

- Site estático: HTML, CSS e JavaScript
- Hospedagem: GitHub Pages
- Domínio: `zrinvestimentosltda.com`
- Formulário: Google Apps Script
- CRM inicial: Google Sheets
- Notificação: Gmail/MailApp
- Métricas futuras: GA4, Microsoft Clarity e Search Console

## Estrutura

```text
.
├── index.html
├── styles.css
├── scripts/
│   └── main.js
├── apps-script/
│   ├── Code.gs
│   └── appsscript.json
├── docs/
│   ├── 01-deploy-github-pages.md
│   ├── 02-apps-script-deploy.md
│   └── 03-project-status.md
├── CNAME
└── .github/workflows/pages.yml
```

## Pendências críticas

1. Publicar o Apps Script como Web App.
2. Copiar a URL do Web App.
3. Substituir `FORM_ENDPOINT` em `scripts/main.js`.
4. Ativar GitHub Pages.
5. Configurar DNS do domínio.
6. Testar formulário real.

## Guardrails de comunicação

Usar: análise personalizada, rota financeira, estruturação financeira, crédito sujeito à análise, instituições reguladas, diagnóstico de aprovação.

Evitar: aprovação garantida, limpa Bacen, score garantido, remoção garantida de restrições, crédito garantido para negativado.
