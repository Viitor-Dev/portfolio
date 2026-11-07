# Portfólio de Vitor Higino

Portfólio pessoal de um vibe coder: uma parede urbana escura onde o site reage a quem visita.

**Ver online:** https://viitor-dev.github.io/portfolio/

## O que tem no site

- **Abertura em forma de pôster**, com um personagem ilustrado que segue o mouse e reage ao clique.
- **Papel que rasga com a rolagem**, de cima para baixo, com fibras, dobra e pedaços soltos.
- **Quatro projetos em faixas coloridas**, que abrem com o mouse, o toque ou o foco do teclado.
- **Lanterna do Vale Ermo 2**, ligada e desligada por clique. O feixe sai do personagem e segue o ponteiro.
- **Bastidores** sobre vibe coding e sobre como cada efeito foi feito.

## Projetos apresentados

| Projeto | Situação | Link |
|---|---|---|
| Vale Ermo 2 | Em desenvolvimento | [Jogar](https://vale-ermo-coop.onrender.com/) |
| Dara Sublimação | Concluído e em uso | [Abrir a vitrine](https://dara-sublimacao-vitrine.conectanegocio.chatgpt.site/) |
| Coletivo Code | Atividade de curso | [Abrir o site](https://viitor-dev.github.io/coletivo-code/) |
| Guia de Prompts | Concluído | [Ler no GitHub](https://github.com/Viitor-Dev/guia-prompts-ia) |

## Como foi feito

Este site foi criado com vibe coding: Vitor definiu a ideia, escolheu as referências, testou e aprovou cada etapa, e a IA escreveu o código.

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
