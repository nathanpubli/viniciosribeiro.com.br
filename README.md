# viniciosribeiro.com.br

Landing page da **Vinicios Ribeiro Mentoria** (Instituto Pulsa Farma). Site estático em HTML, CSS e JavaScript, sem build.

- `index.html`: as 11 seções da página e os ícones SVG
- `styles.css`: estilos (paleta, tipografia, layout mobile-first)
- `main.js`: formulário de aplicação → WhatsApp, FAQ, eventos de Lead (GTM / Meta Pixel)
- `images/`: fotos da página (veja `images/README.md`)

## Configuração

No topo de `main.js`, em `CONFIG`:

- `whatsappNumber`: número com DDI e DDD, só dígitos (ex.: `5562999999999`)
- `showFloatingWhatsApp`: mostra ou esconde o botão flutuante
- `showTexture`: liga ou desliga a textura de linhas no fundo

## Rodar localmente

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000.

## Branches

- `main`: produção
- `dev`: desenvolvimento
