import type { PokemonType } from '../data/pokemon';
import { typeColors, typeLabels } from '../data/pokemon';
export function TypeBadge({type}:{type:PokemonType}) {
  return <span className="type-badge" style={{background:typeColors[type]}}>{typeLabels[type]}</span>;
}
