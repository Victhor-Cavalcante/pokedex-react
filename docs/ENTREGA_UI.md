# Entrega UI/UX — Pokedex

## Referências do usuário
1. Dispositivo Pokédex vermelho: linguagem de hardware, visual tecnológico, luzes, menus e organização por módulos.
2. Painel de catálogo claro: menu à esquerda, cartões no centro e ficha à direita; vermelho nos destaques.

## Design em três etapas

### 1. Wireframe / estrutura
- Cabeçalho: identidade, busca e status.
- Navegação lateral: região (somente visual no protótipo) e tipos.
- Centro: título, ordenação, cards, paginação.
- Lateral direita: espécie, ilustração, tipos, descrição, stats, medidas e habitat.

### 2. MVP visual
- Layout de três rotas, cards e componentes desacoplados, tipografia e cores consistentes.
- Dados de exemplo locais para avaliar a experiência sem bloquear o andamento pelo backend.

### 3. Alta fidelidade
- Barra de navegação vermelha e telas do catálogo em off-white com contraste; cards com estados hover/selecionado; fichas com barras de atributos; cores por tipo.
- Breakpoints em 1320px, 1050px, 720px, 510px: 3 colunas -> 2 colunas -> 1 coluna; catálogo de 4/3/2 cards.
- Foco visível, rótulos, scroll natural e filtro recolhível em telas pequenas.

## Pendências de integração
- Conectar PokéAPI e tratar loading, erro, paginação e ausência de resultados.
- Fazer seleção real por região, atualmente desabilitada como conceito.
- Confirmar com o grupo o nome da marca e integração no roteamento original.
- Validar com usuários e testar nos dispositivos da equipe.
