# Deploy no GitHub Pages

## Objetivo

Publicar o MVP estático do Site ZR usando GitHub Pages.

## Repositório

- Owner: `StriveKS`
- Repo: `site-zr`
- Branch: `main`
- Domínio desejado: `zrinvestimentosltda.com`

## Passo a passo

1. Acesse o repositório `StriveKS/site-zr`.
2. Vá em **Settings**.
3. Vá em **Pages**.
4. Em **Build and deployment**, selecione **GitHub Actions**.
5. Confirme se o workflow `Deploy static site to GitHub Pages` executou.
6. Aguarde a URL temporária do GitHub Pages.
7. Teste a home, responsividade e links.

## Domínio

O arquivo `CNAME` já contém:

```text
zrinvestimentosltda.com
```

## DNS recomendado

Para `www`:

```text
CNAME www -> StriveKS.github.io
```

Para domínio raiz, usar registros A do GitHub Pages conforme documentação atual do GitHub.

## Validação

- Site abre sem erro.
- HTTPS ativo.
- Botão WhatsApp abre `https://wa.me/5554993805657`.
- Formulário mostra erro amigável caso o endpoint ainda não esteja configurado.
