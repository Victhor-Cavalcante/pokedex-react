import type { CSSProperties } from 'react';
import type { Pokemon, PokemonType } from '../data/pokemon';
import { artworkUrl, typeColors } from '../data/pokemon';
import { TypeBadge } from './TypeBadge';

const typePastels: Record<PokemonType, string> = {
  grass: '#EAF5EE',
  fire: '#FCEEE8',
  water: '#EAF3FC',
  electric: '#FFF7D9',
  psychic: '#F3ECFA',
  fairy: '#FCEFF4',
  poison: '#F3ECF8',
  ground: '#F5EFE4',
  rock: '#F1ECE5',
  ice: '#EAF5F8',
  normal: '#F3EFEA',
  dragon: '#EDF0FB',
  ghost: '#EFEAF5',
  bug: '#EEF4E3',
  fighting: '#F8ECE6',
  flying: '#EDF4FC',
};

export function PokemonCard({ pokemon, selected, onSelect }: { pokemon: Pokemon; selected: boolean; onSelect: (pokemon: Pokemon) => void }) {
  const primaryType = pokemon.types[0];
  const accent = typeColors[primaryType];

  return (
    <button
      type="button"
      className={`pokemon-card ${selected ? 'is-selected' : ''}`}
      onClick={() => onSelect(pokemon)}
      aria-pressed={selected}
      aria-label={`Abrir detalhes de ${pokemon.name}, número ${pokemon.id}`}
      style={{ '--card-accent': accent, '--card-tint': typePastels[primaryType] } as CSSProperties}
    >
      <span className="card-frame">
        <span className="card-header">
          <span className="card-name">{pokemon.name}</span>
          <span className="card-number">#{String(pokemon.id).padStart(3, '0')}</span>
        </span>

        <span className="card-art" aria-hidden="true">
          <span className="card-art-bg" />
          <img
            src={artworkUrl(pokemon.id)}
            loading="lazy"
            alt={`Ilustração de ${pokemon.name}`}
            onError={event => { event.currentTarget.style.opacity = '0'; }}
          />
        </span>

        <span className="card-types">
          {pokemon.types.map(type => <TypeBadge key={type} type={type} />)}
        </span>

        <span className="card-info">
          <span className="card-info-item card-info-habitat">
            <span className="card-info-label">Habitat</span>
            <span className="card-info-value">{pokemon.habitat}</span>
          </span>
          <span className="card-info-meta">
            <span className="card-info-item">
              <span className="card-info-label">Altura</span>
              <span className="card-info-value">{pokemon.height.toLocaleString('pt-BR')} m</span>
            </span>
            <span className="card-info-item">
              <span className="card-info-label">Peso</span>
              <span className="card-info-value">{pokemon.weight.toLocaleString('pt-BR')} kg</span>
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}
