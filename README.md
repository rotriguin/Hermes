# Hermes — Site Institucional

Site institucional de uma agência de marketing digital voltada para escritórios de advocacia.
Desenvolvido em HTML, CSS e JavaScript puro, sem framework, e publicado automaticamente via
GitHub Pages a cada push na branch `main`.

## Stack

| Camada | Tecnologias |
|---|---|
| **Front-end** | HTML5, CSS3, JavaScript (ES6+) |
| **Tipografia** | Montserrat (Google Fonts) |
| **Deploy** | GitHub Pages via GitHub Actions (`.github/workflows/static.yml`) |
| **Servidor local** | script PowerShell (`server.ps1`) para pré-visualização |

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Página principal: home, quem somos, planos e contato |
| `servicos.html` | Detalhamento dos serviços oferecidos |
| `obrigado.html` | Página de confirmação após envio do formulário |
| `styles.css` | Estilos do site, com layout responsivo |
| `main.js` | Navegação, interações e envio do formulário |

## Destaques técnicos

- Layout responsivo escrito à mão, sem framework de CSS
- SEO básico: `meta description`, títulos semânticos e `preconnect` para as fontes
- Fallback de imagem no logo (`onerror`) para não quebrar o cabeçalho
- Publicação contínua: o site sobe sozinho a cada commit, sem passo manual

## Rodando localmente

```bash
# opção 1 — script incluso (Windows)
./server.ps1

# opção 2 — qualquer servidor estático
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.
