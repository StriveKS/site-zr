# Status do Projeto Site ZR

## Estado atual

MVP inicial criado no GitHub.

Repo: `StriveKS/site-zr`

## Feito

- Repositório dedicado criado.
- README operacional atualizado.
- `index.html` criado com a primeira versão da LP.
- `styles.css` criado com base visual premium e motion foundation.
- `scripts/main.js` criado com reveal animation e envio de formulário preparado.
- `apps-script/Code.gs` criado para receber leads, gravar na planilha e notificar por e-mail.
- `apps-script/appsscript.json` criado.
- `CNAME` criado com `zrinvestimentosltda.com`.
- Workflow de GitHub Pages criado em `.github/workflows/pages.yml`.
- Guias de deploy adicionados em `docs/`.

## Pendente agora

1. Ativar GitHub Pages em Settings > Pages > GitHub Actions.
2. Publicar o Apps Script.
3. Copiar a URL do Web App.
4. Substituir `FORM_ENDPOINT` em `scripts/main.js`.
5. Testar formulário real.
6. Configurar DNS do domínio.
7. Instalar métricas.

## Decisão técnica

O site foi colocado inicialmente na raiz do repo para facilitar GitHub Pages e evitar build. Essa decisão reduz complexidade e acelera publicação.

## Próxima ação

Ativar Pages e rodar primeiro teste de URL temporária.
