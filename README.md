# Portfólio de Vitor Higino

Portfólio de Vitor Higino, que também apresenta o serviço de criação de sites. O visual é uma parede urbana escura onde o site reage a quem visita.

**Ver online:** https://viitor-dev.github.io/portfolio/

## O que tem no site

- **Abertura em forma de pôster**, com um personagem ilustrado que segue o mouse e reage ao clique.
- **Papel que rasga com a rolagem**, de cima para baixo, com fibras, dobra e pedaços soltos.
- **Três projetos em faixas coloridas**, que abrem com o mouse, o toque ou o foco do teclado.
- **Página do Vale Ermo 2**, com a lanterna ligada e desligada por clique. O feixe sai do personagem e segue o ponteiro.
- **Serviços**: portfólio, sites de venda e vitrine digital.
- **Como eu desenvolvo** e os bastidores de cada efeito deste site.

## Projetos apresentados

| Projeto | Situação | Link |
|---|---|---|
| Dara Sublimação | Concluído e em uso | [Conhecer a vitrine](https://dara-sublimacao-vitrine.conectanegocio.chatgpt.site/) |
| Vale Ermo 2 | Em desenvolvimento | [Jogar no navegador](https://vale-ermo-coop.onrender.com/) |
| Coletivo Code | Atividade de curso | [Abrir o site](https://viitor-dev.github.io/coletivo-code/) |
| Guia de Prompts | Concluído | [Ler no GitHub](https://github.com/Viitor-Dev/guia-prompts-ia) |

## Como foi feito

Vitor definiu a ideia, escolheu as referências, testou e aprovou cada etapa, usando inteligência artificial como apoio no desenvolvimento.

- HTML, CSS e JavaScript, sem etapa de compilação.
- [GSAP](https://gsap.com) com ScrollTrigger para o rasgo.
- Canvas 2D para a luz da lanterna.
- Personagem ilustrado criado com IA a partir de uma foto.

O visitante que prefere menos movimento, nas configurações do aparelho, vê o conteúdo sem o rasgo.

## Estrutura

```text
index.html    página única, com todo o conteúdo
estilo.css    identidade visual e responsividade
app.js        rasgo, personagem, faixas e lanterna
servir.mjs    servidor simples para rodar no computador
img/          personagem, capturas, foto e ícones
vendor/       GSAP e ScrollTrigger
```

## Rodar no computador

Precisa do [Node.js](https://nodejs.org).

```bash
node servir.mjs
```

Depois abra http://localhost:4173.

## Direitos

O código e as imagens deste repositório são de Vitor Higino, salvo os itens abaixo. Eles não têm licença aberta, então peça autorização antes de reutilizar.

- GSAP: [GSAP Standard License](https://gsap.com/standard-license/).
- Fontes Anton, Permanent Marker e IBM Plex: carregadas pelo Google Fonts.
- Os ícones de WhatsApp, Instagram, GitHub e LinkedIn são marcas de seus donos.
