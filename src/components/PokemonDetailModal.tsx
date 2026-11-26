import { useMemo, useState } from 'react';
import { Modal } from '@mui/material';
import { allTypes, samplePokemon, typeGlyphs, typeLabels, type Pokemon, type PokemonType } from '../data/pokemon';
import { PokemonDetails } from './PokemonDetails';
import { PokemonMiniCard } from './PokemonMiniCard';

const TITLE_ID = 'pdm-title';
const DESCRIPTION_ID = 'pdm-description';
const noop = () => {};
const sameTypes = (a: PokemonType[], b: PokemonType[]) => a.length === b.length && a.every((type, i) => type === b[i]);

export function PokemonDetailModal({ pokemon, open, onClose, onPokemonChange }: { pokemon: Pokemon; open: boolean; onClose: () => void; onPokemonChange: (pokemon: Pokemon) => void }) {
  const [appliedTypes, setAppliedTypes] = useState<PokemonType[]>([pokemon.types[0]]);
  const [draftTypes, setDraftTypes] = useState<PokemonType[]>([pokemon.types[0]]);
  const [panelOpen, setPanelOpen] = useState(false);

  const typeCounts = useMemo(() => {
    const counts = {} as Record<PokemonType, number>;
    allTypes.forEach(type => { counts[type] = samplePokemon.filter(item => item.types.includes(type)).length; });
    return counts;
  }, []);

  const visiblePokemon = useMemo(
    () => samplePokemon.filter(item => appliedTypes.some(type => item.types.includes(type))),
    [appliedTypes],
  );

  const ensureVisiblePokemon = (types: PokemonType[]) => {
    const nextVisible = samplePokemon.filter(item => types.some(type => item.types.includes(type)));
    if (nextVisible.length && !nextVisible.some(item => item.id === pokemon.id)) onPokemonChange(nextVisible[0]);
  };

  const openPanel = () => {
    setDraftTypes(appliedTypes);
    setPanelOpen(true);
  };

  const toggleDraftType = (type: PokemonType) => {
    setDraftTypes(current => (current.includes(type) ? current.filter(item => item !== type) : [...current, type]));
  };

  const applyDraft = () => {
    if (draftTypes.length === 0) return;
    if (!sameTypes(appliedTypes, draftTypes)) {
      setAppliedTypes(draftTypes);
      ensureVisiblePokemon(draftTypes);
    }
    setPanelOpen(false);
  };

  const removeAppliedType = (type: PokemonType) => {
    if (appliedTypes.length === 1) return;
    const next = appliedTypes.filter(item => item !== type);
    setAppliedTypes(next);
    setDraftTypes(current => (panelOpen ? current.filter(item => item !== type) : current));
    ensureVisiblePokemon(next);
  };

  return (
    <Modal open={open} onClose={onClose} slotProps={{ backdrop: { className: 'pdm-backdrop' } }}>
      <div className="pdm-dialog" role="dialog" aria-modal="true" aria-labelledby={TITLE_ID} aria-describedby={DESCRIPTION_ID}>
        <button type="button" className="pdm-close" onClick={onClose} aria-label="Fechar detalhes">✕</button>
        <div className="pdm-body">
          <aside className="pdm-side" aria-label="Categorias por tipo">
            <div className="pdm-side-heading">
              <span>Categorias</span>
              <button type="button" className="pdm-filter-toggle" aria-expanded={panelOpen} aria-controls="pdm-category-panel" onClick={panelOpen ? () => setPanelOpen(false) : openPanel}>
                {panelOpen ? 'Fechar categorias' : 'Selecionar categorias'}
              </button>
            </div>

            <div className="pdm-applied" aria-label="Categorias aplicadas">
              {appliedTypes.map(type => (
                <span key={type} className="pdm-tag">
                  <span className="pdm-tag-label">{typeLabels[type]}</span>
                  <button type="button" className="pdm-tag-remove" aria-label={`Remover categoria ${typeLabels[type]}`} disabled={appliedTypes.length === 1} onClick={() => removeAppliedType(type)}>×</button>
                </span>
              ))}
            </div>

            {panelOpen && (
              <div id="pdm-category-panel" className="pdm-category-panel">
                <div className="pdm-panel-help">Selecione uma ou mais categorias.</div>
                <div className="pdm-categories">
                  {allTypes.map(type => {
                    const count = typeCounts[type];
                    const disabled = count === 0;
                    const active = draftTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        className={`pdm-category${active ? ' is-active' : ''}`}
                        disabled={disabled}
                        aria-pressed={active}
                        onClick={() => toggleDraftType(type)}
                      >
                        <span className="pdm-category-glyph">{typeGlyphs[type]}</span>
                        <span className="pdm-category-name">{typeLabels[type]}</span>
                        <span className="pdm-category-count">{count}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="pdm-panel-actions">
                  <button type="button" className="pdm-panel-done" disabled={draftTypes.length === 0} onClick={applyDraft}>Concluir</button>
                </div>
              </div>
            )}

            <div className="pdm-side-heading"><span>Resultados</span><small>{visiblePokemon.length} Pokémon</small></div>
            <div className="pdm-minicards">
              {visiblePokemon.map(item => (
                <PokemonMiniCard key={item.id} pokemon={item} selected={item.id === pokemon.id} onClick={onPokemonChange} />
              ))}
            </div>
          </aside>
          <div className="pdm-main">
            <PokemonDetails pokemon={pokemon} titleId={TITLE_ID} descriptionId={DESCRIPTION_ID} onPrevious={noop} onNext={noop} navDisabled />
          </div>
        </div>
      </div>
    </Modal>
  );
}
