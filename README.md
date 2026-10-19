# Site de teste Nnova (HTML + Pages CMS + Vercel)

Site estático sem build. Os imóveis ficam em `data/imoveis.json` e o painel (Pages CMS) edita esse arquivo direto no GitHub. Cada salvamento vira um commit e a Vercel publica de novo sozinha.

## Passo a passo

1. **GitHub**: crie um repositório (pode ser privado) e envie todos os arquivos desta pasta, incluindo o `.pages.yml` (arquivo oculto, confira que subiu).
2. **Vercel**: Add New > Project > importe o repositório. Framework Preset: *Other*. Build Command e Output Directory: deixe em branco. Deploy.
3. **Pages CMS**: acesse https://pagescms.org, entre com o GitHub, instale o app no repositório e abra o projeto. Vão aparecer duas áreas: *Imóveis* e *Dados da imobiliária*.
4. **Teste**: em *Imóveis*, edite um preço, adicione um imóvel novo com fotos e salve. Em cerca de 1 minuto a Vercel conclui o deploy e a mudança aparece no site.

## O que testar

- Adicionar imóvel com upload de fotos (vão para `assets/imoveis/`).
- Marcar "Situação" como Vendido ou Alugado e ver o selo no card.
- Desmarcar "Aparece no site" para ocultar sem apagar.
- Marcar "Mostrar em destaque" para o imóvel entrar na home.
- Alterar telefone e WhatsApp em *Dados da imobiliária*.
- O cliente precisa de conta no GitHub e acesso de colaborador ao repositório.

## Estrutura

- `index.html`, `imoveis.html`, `imovel.html?c=CODIGO`
- `data/imoveis.json` e `data/site.json`: conteúdo editável
- `assets/imoveis/`: fotos (as atuais são ilustrações de exemplo)
- `.pages.yml`: configuração do painel

## Para rodar local

`python3 -m http.server 8000` dentro da pasta e abrir http://localhost:8000 (abrir o HTML direto não funciona, por causa do fetch).

## Limitação importante

Os imóveis são montados no navegador com JavaScript. Para a versão final com foco em SEO, o ideal é gerar uma página estática por imóvel no deploy (um script simples de build na Vercel resolve).
