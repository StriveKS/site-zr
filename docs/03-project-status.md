# Status do Projeto Site ZR

## Estado Atual

Site publicado, operacional e com base visual/copy aprovada em 2026-05-26.

- Repo: `StriveKS/site-zr`
- Site: `https://zrinvestimentosltda.com`
- Publicacao: GitHub Pages
- Dominio: configurado e apontado para o Pages
- Captura de leads: ativa
- Notificacao por e-mail: ativa
- Metricas: GA4 e Microsoft Clarity instalados
- Base aprovada: visual claro premium, logo ZR simplificada, hero tipografico refinado e copy consultiva.
- Atualizacao em 2026-05-29: painel visual do hero recriado do zero como `Mesa de decisao ZR`, com leitura de cenario, comparacao de rotas e estrutura indicada.

## Feito

- Repositorio dedicado criado.
- `index.html` criado com LP premium.
- `styles.css` criado com base visual.
- `premium.css` criado com camada visual premium e motion refinado.
- `scripts/main.js` criado com:
  - carregamento de `premium.css`;
  - GA4;
  - Microsoft Clarity;
  - eventos de clique e formulario;
  - envio de leads ao Apps Script.
- `apps-script/Code.gs` criado para receber leads, gravar na planilha e notificar por e-mail.
- `apps-script/appsscript.json` criado.
- `CNAME` criado com `zrinvestimentosltda.com`.
- Workflow de GitHub Pages criado em `.github/workflows/pages.yml`.
- Dominio proprio configurado.
- Formulario validado com leads reais de teste.
- Drive organizado com contexto, backlog, historico, decisoes, prompts e planilha de leads.
- Workspace local sincronizado com o GitHub em 2026-05-25.
- Copy, arquitetura e design refinados em 2026-05-25 com:
  - nova tese de hero;
  - secao `Quando a ZR entra`;
  - formulario reposicionado como `Diagnostico ZR`;
  - tipografia `Instrument Serif` + `Manrope`;
  - rota financeira SVG animada com GSAP;
  - mapa visual de estrutura e confianca;
  - documentacao em `DESIGN.md` e `docs/09-copy-design-motion-plan.md`.
- Base de continuidade aprovada em 2026-05-26 com:
  - paleta clara/off-white, preto, cinzas e dourado como detalhe;
  - logo reduzida ao monograma `ZR`;
  - headline `Seu proximo passo comeca aqui.`;
  - fonte anterior mantida no hero;
  - ajuste de line-height, overflow e camadas para evitar cortes em letras descendentes;
  - commit publicado `c656c8f` (`Prevent hero headline descender clipping`);
  - registro detalhado em `docs/10-base-aprovada-2026-05-26.md`.
- Painel visual do hero refeito em 2026-05-29:
  - substituicao da rota/video anterior por uma composicao HTML/CSS consultiva;
  - narrativa visual: cenario -> rotas comparadas -> estrutura indicada;
  - animacao GSAP discreta, com respeito a `prefers-reduced-motion`;
  - validacao visual em desktop e mobile por screenshots locais;
  - verificacao tecnica com `node --check scripts\main.js`.

## Proxima Frente Recomendada

1. Revisar secoes abaixo do hero para ficarem tao refinadas quanto a primeira dobra.
2. Refinar formulario como experiencia de triagem consultiva.
3. Transformar a logo em componente SVG animavel mais fiel ao asset original.
4. Configurar Search Console.
5. Criar rotina de acompanhamento de leads e funil comercial.
6. Criar criativos externos em motion para social/trafego pago, se necessario.

## Decisao Tecnica

O site fica na raiz do repo para facilitar GitHub Pages e evitar build. Essa decisao reduz complexidade, acelera publicacao e ainda permite evoluir para uma stack com build no futuro, se necessario.
