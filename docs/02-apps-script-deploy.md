# Deploy do Google Apps Script

## Objetivo

Criar o endpoint que recebe leads do formulário do Site ZR, grava na planilha e envia notificação para o comercial.

## Dados configurados

- Planilha: `ZR_SITE - Leads e Qualificacao`
- Spreadsheet ID: `1FCZywlCoH6pVDnKvxHfS1iEEIf7j4hpQKFmbP678p3s`
- E-mail de notificação: `contato.eduardokeitel@gmail.com`
- Aba usada pelo script: `Leads`

## Passo a passo

1. Abra o Google Apps Script.
2. Crie um novo projeto chamado `ZR_SITE - Lead Endpoint`.
3. Copie o conteúdo de `apps-script/Code.gs` para o arquivo `Code.gs`.
4. Configure o manifesto com o conteúdo de `apps-script/appsscript.json`.
5. Salve o projeto.
6. Crie uma nova implantação como App da Web.
7. Autorize as permissões solicitadas pela conta Google.
8. Copie a URL final da implantação.
9. No GitHub, edite `scripts/main.js`.
10. Substitua `COLE_AQUI_A_URL_DO_WEB_APP_DO_APPS_SCRIPT` pela URL real.
11. Faça commit da alteração.
12. Teste o formulário no site publicado.

## Teste esperado

Ao enviar o formulário:

- Uma nova linha deve aparecer na aba `Leads`.
- Um e-mail deve chegar em `contato.eduardokeitel@gmail.com`.
- A mensagem de sucesso deve aparecer no site.

## Observações

- O endpoint apenas recebe dados, registra lead e notifica o comercial.
- O crédito continua sujeito à análise e enquadramento.
- Se o endpoint ainda não estiver preenchido, o formulário direciona o usuário para o WhatsApp.
