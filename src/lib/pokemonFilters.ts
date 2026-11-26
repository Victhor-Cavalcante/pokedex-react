import type { Pokemon, PokemonType } from '../data/pokemon';

export type TypeFilter = PokemonType | 'all';
export type SortOrder = 'number' | 'name' | 'descending';

export type PokemonFilters = {
  search: string;
  type: TypeFilter;
  order: SortOrder;
};

/** Busca pelo nome ou pelo número do registro (aceita "#25"). */
export function matchesSearch(pokemon: Pokemon, search: string): boolean {
  const term = search.trim().toLowerCase();
  if (!term) return true;
  return pokemon.name.toLowerCase().includes(term) || String(pokemon.id).includes(term.replace('#', ''));
}

/** Pokémon com dois tipos aparecem em ambas as categorias. */
export function matchesType(pokemon: Pokemon, type: TypeFilter): boolean {
  return type === 'all' || pokemon.types.includes(type);
}

/** Devolve uma lista nova já ordenada, sem alterar a original. */
export function sortPokemon(list: Pokemon[], order: SortOrder): Pokemon[] {
  return [...list].sort((a, b) => {
    if (order === 'name') return a.name.localeCompare(b.name);
    if (order === 'descending') return b.id - a.id;
    return a.id - b.id;
  });
}

/** Aplica busca, filtro por tipo e ordenação em uma única chamada. */
export function filterPokemon(list: Pokemon[], { search, type, order }: PokemonFilters): Pokemon[] {
  const filtered = list.filter(pokemon => matchesSearch(pokemon, search) && matchesType(pokemon, type));
  return sortPokemon(filtered, order);
}
