import type { Pokemon } from '../data/pokemon';
import { artworkUrl, typeColors, typeLabels } from '../data/pokemon';
const labels=['HP','Ataque','Defesa','At. Esp.','Def. Esp.','Velocidade'];
const barColors=['#73B995','#E9B766','#70A9D9','#A58DDD','#64BFC7','#E67C91'];
export function PokemonDetails({pokemon,onPrevious,onNext}:{pokemon:Pokemon;onPrevious:()=>void;onNext:()=>void}) {
  return <aside className="detail-panel" aria-label={`Detalhes de ${pokemon.name}`}>
    <div className="detail-header"><div><span className="detail-overline">REGISTRO POKÉDEX</span><h2><span>#{String(pokemon.id).padStart(3,'0')}</span> {pokemon.name}</h2></div><span className="detail-diamond">✦</span></div>
    <div className="detail-hero"><div className="detail-orbit"/><img src={artworkUrl(pokemon.id)} alt={pokemon.name}/><span className="detail-index">Nº {String(pokemon.id).padStart(3,'0')}</span></div>
    <div className="detail-types">{pokemon.types.map(type=><span key={type} className="type-badge" style={{background:typeColors[type]}}>{typeLabels[type]}</span>)}</div>
    <p className="detail-description">{pokemon.description}</p>
    <div className="detail-section-heading"><span>◈</span><h3>Estatísticas base</h3></div>
    <div className="stat-list">{pokemon.stats.map((value,index)=><div className="stat-row" key={labels[index]}><span>{labels[index]}</span><div className="stat-track"><div style={{width:`${Math.min(100,value/160*100)}%`,background:barColors[index]}}/></div><strong>{value}</strong></div>)}</div>
    <div className="detail-measures"><div><span>↕ ALTURA</span><strong>{pokemon.height.toLocaleString('pt-BR')} m</strong></div><div><span>◈ PESO</span><strong>{pokemon.weight.toLocaleString('pt-BR')} kg</strong></div></div>
    <div className="detail-section-heading"><span>⌖</span><h3>Habitat</h3></div><div className="habitat-box"><span className="habitat-icon">♧</span><div><strong>Onde encontrar</strong><p>{pokemon.habitat}</p></div></div>
    <div className="detail-nav"><button type="button" onClick={onPrevious} aria-label="Pokémon anterior">← Anterior</button><button type="button" onClick={onNext} aria-label="Próximo Pokémon">Próximo →</button></div>
    <p className="detail-disclaimer">Dados ilustrativos para demonstração da interface. A integração com a PokéAPI ficará com a equipe.</p>
  </aside>
}
