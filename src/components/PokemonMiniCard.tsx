import type { Pokemon } from '../data/pokemon';
import { artworkUrl } from '../data/pokemon';
export function PokemonMiniCard({pokemon,selected,onClick}:{pokemon:Pokemon;selected:boolean;onClick:(pokemon:Pokemon)=>void}) {
  return <button type="button" className={`pokemon-mini-card ${selected?'is-selected':''}`} aria-label={`Selecionar ${pokemon.name}, número ${pokemon.id}`} aria-pressed={selected} onClick={()=>onClick(pokemon)}>
    <span className="mini-number">#{String(pokemon.id).padStart(3,'0')}</span>
    <img src={artworkUrl(pokemon.id)} alt="" loading="lazy" onError={event=>{event.currentTarget.style.opacity='0'}}/>
    <strong className="mini-name">{pokemon.name}</strong>
  </button>;
}
