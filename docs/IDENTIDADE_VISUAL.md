# DexLab — identidade visual (versão 1.0)

## Conceito e posicionamento
DexLab é o **nome conceitual proposto** para a interface acadêmica do grupo; confirmar com os demais antes da integração final. A linguagem visual é tecnológica, acolhedora e orientada à descoberta. O símbolo é uma esfera geométrica criada em CSS, sem usar o logotipo oficial Pokémon.

## Design tokens
- Primária/acento: `#EF4444` (ações, ênfase, pequenos detalhes)
- Fundo base: `#101523`; fundo profundo: `#0C101C`
- Superfície: `#171E2F`; superfície alternativa: `#1C2538`
- Texto principal: `#F6F7FB`; texto secundário: `#A6AEC2`
- Bordas: `#2A3246`
- Fonte: `Inter, ui-sans-serif, system-ui, ...` (fallback local, sem depender de Google Fonts)
- Grid: container máximo 1160px, margens laterais flexíveis
- Raios: cartões 20px, botões 9px
- Espaçamento: escala base 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

## Componentes reutilizáveis
- `Header` e `Footer`: estrutura e navegação.
- `Brand`: assinatura visual textual e símbolo CSS.
- `SectionHeading`: rótulo, título e texto opcional por props.
- `InfoCard`: ícone, número, título e descrição por props.
- Botões e chips da biblioteca Material UI, estilizados conforme o sistema.

## UX e acessibilidade
- Conteúdo em linguagem simples; arquitetura: proposta → benefícios → tecnologias → chamada final.
- Layout adaptável para desktop, tablet e celular.
- Navegação pelo teclado, link para pular ao conteúdo, `nav` e `main` semânticos.
- Estados de foco; respeito a `prefers-reduced-motion`.
- Verificar contrastes com ferramenta WCAG antes do release final e fazer teste com usuários reais.

## Regras para páginas dos colegas
1. Importar `styles/tokens.css` e `styles/global.css` no ponto de entrada uma vez.
2. Utilizar `var(--color-...)` ao invés de repetir hexadecimais.
3. Usar `<div className="container">` para alinhamento.
4. Reutilizar `SectionHeading` e `InfoCard` quando apropriado.
5. Reservar vermelho para ações e destaque, não para parágrafos extensos.
6. Responsividade mínima: conferir 375px, 768px, 1280px; testar também teclado.
7. Não usar personagens ou logos oficiais sem analisar os direitos aplicáveis.

## Pesquisa UX — plano leve e honesto
Hipóteses para validar (não são resultados de pesquisa):
- Busca e filtros devem ser fáceis de localizar no catálogo.
- Cartões precisam deixar claro o que abre o detalhe.
- O contexto de um Pokémon deve ser compreensível sem conhecimento técnico.

Roteiro sugerido para 3 pessoas: (1) localize um Pokémon, (2) abra informações, (3) retorne ao catálogo. Observar tempo, erros, hesitações e opinião. Registrar evidências, evitar afirmar que testes já ocorreram.

## Referências
- Documentação pública: https://pokeapi.co/docs/v2
- Fonte aberta do projeto PokéAPI: https://github.com/PokeAPI/pokeapi
- Observação: PokéAPI é fonte de dados de terceiros; projeto não é afiliado à The Pokémon Company.
