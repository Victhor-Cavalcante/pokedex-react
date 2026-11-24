# DexLab — Front-end responsivo da Pokédex (protótipo de alta fidelidade)

**Disciplina:** Tecnologia para Frontend Avançado — UNIESP, 2026.2  
**Responsável por este módulo de UI:** José Victhor Cavalcante Lima  
**Equipe:** inserir os nomes completos de todos antes de realizar a entrega coletiva.

## Entregas e rotas

| Rota | Tela | O que foi preparado |
| --- | --- | --- |
| `/pokedex` | Catálogo | Busca visual, filtros por tipo, grade de cards, ordenação, paginação, seleção, estatísticas e detalhes |
| `/sobre` | Sobre | Objetivo, contexto, proposta, metodologia e identidade do produto |
| `/guia-visual` | Design system | Paleta, tipografia, botões e princípios de interface |

A interface baseia-se em duas referências trazidas pelo responsável: Pokédex vermelha em formato de dispositivo e um catálogo claro com painel lateral de filtros e ficha de detalhes. A aplicação usa **React, TypeScript, Vite, React Router e MUI**.

## Importante: escopo técnico

**Esta entrega é um front-end demonstrativo, não é o produto integrado.** `src/data/pokemon.ts` contém **24 registros de demonstração**, utilizados para testar os componentes visualmente. Busca, filtros, paginação e navegação entre Pokémon operam apenas sobre esses dados locais. Não há chamadas à PokéAPI, autenticação, servidor ou persistência.

As ilustrações dos Pokémon são mostradas por URLs públicas de sprites (repositório PokeAPI/sprites no GitHub), **sem consumir endpoints da API**. Precisam de acesso à internet e podem falhar caso a origem esteja indisponível. Não distribuir essas imagens como propriedade do projeto.

## Executar

```bash
npm install
npm run dev
```

Acesse o endereço que o Vite mostrar (geralmente `http://localhost:5173`). Execute `npm run build` para validar o bundle antes da entrega.

## Como os colegas devem integrar a API

1. Substituir `samplePokemon` por dados reais, mapeando os resultados para o tipo `Pokemon` em `src/data/pokemon.ts`.
2. Manter as props dos componentes `PokemonCard` e `PokemonDetails`; eles não precisam saber de onde os dados vieram.
3. Integrar os serviços e hooks de dados em `pages/PokedexPage.tsx`, incluindo estados `loading`, `error`, `empty` e navegação de páginas remota.
4. Revisar a abordagem de filtros e ordenação quando o catálogo passar a contemplar a Pokédex inteira; atualmente são locais.
5. Remover a identificação "PROTÓTIPO UI" e os avisos de dados demonstrativos somente após a integração.

**Ao integrar no repositório do grupo:** evite sobrescrever `App.tsx` e `main.tsx` existentes. Mescle as novas rotas, imports e estilos. A cor vermelha e o nome DexLab são propostas visuais sujeitas à validação do grupo.

## Responsividade e UX

- Desktop grande: três painéis (filtros, catálogo, ficha Pokémon).
- Notebook/tablet: dois painéis, ficha de detalhes reposicionada abaixo do catálogo.
- Celular: filtros recolhíveis, cards em duas colunas, detalhes em sequência vertical.
- Acessibilidade básica: labels, foco visível, botões semânticos, alternativas textuais e respeito à preferência de movimento reduzido.

## Histórico das três fases do trabalho

- **01 — Wireframe / estrutura:** catálogo com áreas de busca, filtro, cards e detalhes.
- **02 — MVP visual:** três rotas, componentes reutilizáveis e dados mockados.
- **03 — Alta fidelidade:** superfícies claras, cores por tipo, grid adaptativo, estados visuais e ficha com estatísticas.

Essas fases descrevem a evolução do design; não representam três implementações separadas do produto.

## Git

```bash
git checkout -b feat/ui-pokedex-responsiva
git add .
git commit -m "feat: implementa interface responsiva da pokedex"
git push -u origin feat/ui-pokedex-responsiva
```

O professor exige que cada integrante trabalhe na sua própria branch; a integração e apresentação final são responsabilidades coletivas. Todos devem compreender o código antes da apresentação.

## Avisos

Projeto acadêmico não oficial, sem afiliação à Nintendo, Game Freak ou The Pokémon Company. Personagens e nomes pertencem aos respectivos titulares. Ilustrações carregadas externamente de `PokeAPI/sprites`.


## Atualização

Documentação revisada para a entrega acadêmica da disciplina Tecnologia para Frontend Avançado — UNIESP.