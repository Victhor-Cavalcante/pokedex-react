import type { CSSProperties } from 'react';
import type { Pokemon } from '../data/pokemon';
import { artworkUrl, typeColors, typeLabels } from '../data/pokemon';
export function PokemonCard({pokemon,selected,onSelect}:{pokemon:Pokemon;selected:boolean;onSelect:(pokemon:Pokemon)=>void}) {
  return <button type="button" className={`pokemon-card ${selected?'is-selected':''}`} onClick={()=>onSelect(pokemon)} aria-pressed={selected}>
    <span className="poke-number">#{String(pokemon.id).padStart(3,'0')}</span>
    <span className="poke-art" style={{'--poke-accent':typeColors[pokemon.types[0]]} as CSSProperties}>
      <img src={artworkUrl(pokemon.id)} loading="lazy" alt={`Ilustração de ${pokemon.name}`} onError={event=>{event.currentTarget.style.opacity='0'}}/>
    </span>
    <strong>{pokemon.name}</strong><span className="type-badges">{pokemon.types.map(type=><span key={type} className="type-badge" style={{background:typeColors[type]}}>{typeLabels[type]}</span>)}</span>
  </button>;
}
