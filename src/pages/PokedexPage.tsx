import { useMemo, useState } from 'react';
import { PokemonCard } from '../components/PokemonCard';
import { PokemonDetailModal } from '../components/PokemonDetailModal';
import { allTypes, samplePokemon, typeLabels, typeGlyphs } from '../data/pokemon';
import { filterPokemon, type SortOrder, type TypeFilter } from '../lib/pokemonFilters';
const PAGE_SIZE=12;
export function PokedexPage() {
  const [search,setSearch]=useState('');const [type,setType]=useState<TypeFilter>('all');
  const [order,setOrder]=useState<SortOrder>('number');const [page,setPage]=useState(1);
  const [selectedId,setSelectedId]=useState<number|null>(null);const [filtersOpen,setFiltersOpen]=useState(false);
  const filtered=useMemo(()=>filterPokemon(samplePokemon,{search,type,order}),[search,type,order]);
  const pages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));const safePage=Math.min(page,pages);
  const results=filtered.slice((safePage-1)*PAGE_SIZE,safePage*PAGE_SIZE);
  const selectedPokemon=selectedId===null?null:samplePokemon.find(p=>p.id===selectedId)??null;
  const changeType=(value:TypeFilter)=>{setType(value);setPage(1);setFiltersOpen(false)};
  return <section className="dex-page">
    <div className="dex-topbar"><div className="dex-topbar-inner"><div className="dex-heading"><span className="dex-heading-emblem">◉</span><div><span className="dex-top-kicker">DEXLAB / EXPLORAR</span><h1>Pokédex<span>.</span></h1></div></div><label className="dex-search"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}} placeholder="Buscar Pokémon pelo nome ou número..." aria-label="Buscar Pokémon pelo nome ou número"/><span className="search-shortcut">⌘ K</span></label><span className="dex-top-status"><span/> PROTÓTIPO UI</span></div></div>
    <div className="dex-layout">
      <aside className={`dex-sidebar ${filtersOpen?'filters-open':''}`} aria-label="Filtros da Pokédex"><div className="sidebar-heading"><span>EXPLORAR</span><button onClick={()=>setFiltersOpen(!filtersOpen)} className="mobile-filter-toggle" aria-expanded={filtersOpen}>{filtersOpen?'Ocultar filtros':'Mostrar filtros'} ☷</button></div><div className="sidebar-body"><div className="sidebar-subtitle">⌖ <strong>Região</strong></div><div className="region-list"><button className="region-active" type="button">◉ <span>Todas as regiões</span><span>✓</span></button><span className="region-hint">A seleção por região será integrada pela equipe.</span></div><div className="sidebar-separator"/><div className="sidebar-subtitle">◈ <strong>Tipos</strong> <span className="filter-count">{type==='all'?'TODOS':'01'}</span></div><button type="button" className={`filter-all ${type==='all'?'active':''}`} onClick={()=>changeType('all')}>Todos os tipos <span>↗</span></button><div className="type-filter-grid">{allTypes.map(t=><button key={t} type="button" onClick={()=>changeType(t)} className={`filter-type ${type===t?'active':''}`}><span className={`type-icon type-${t}`}>{typeGlyphs[t]}</span>{typeLabels[t]}</button>)}</div></div><div className="sidebar-bottom"><span>CATÁLOGO DE EXEMPLO</span><strong>{String(samplePokemon.length).padStart(3,'0')} <small>registros</small></strong><div className="sidebar-progress"><span/></div><p>Dados locais · Integração pendente</p></div></aside>
      <main className="dex-center" id="catalogo"><div className="catalog-intro"><div><div className="catalog-kicker">COLEÇÃO / REGISTROS</div><h2>Explore o universo <em>Pokémon</em></h2><p>Encontre seus favoritos e descubra detalhes de cada espécie.</p></div><span className="catalog-sigil" aria-hidden="true">✳</span></div><div className="catalog-toolbar"><div className="catalog-label"><span className="list-symbol">▦</span> <strong>Pokémon</strong><span className="results-count">{filtered.length} encontrados</span></div><label className="sort-label">Ordenar por <select value={order} onChange={e=>{setOrder(e.target.value as typeof order);setPage(1)}}><option value="number">Nº crescente</option><option value="descending">Nº decrescente</option><option value="name">Nome A–Z</option></select></label></div>
      {results.length?<div className="pokemon-grid">{results.map(p=><PokemonCard key={p.id} pokemon={p} selected={p.id===selectedId} onSelect={p=>setSelectedId(p.id)}/>)}</div>:<div className="dex-empty"><span>⌕</span><h3>Nenhum Pokémon encontrado</h3><p>Tente outro nome ou selecione um tipo diferente.</p><button onClick={()=>{setSearch('');changeType('all')}}>Limpar filtros</button></div>}
      <div className="catalog-bottom"><span>Exibindo {filtered.length?`${(safePage-1)*PAGE_SIZE+1}–${Math.min(safePage*PAGE_SIZE,filtered.length)}`:'0'} de {filtered.length}</span><nav className="pagination" aria-label="Paginação do catálogo"><button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={safePage===1} aria-label="Página anterior">‹</button>{Array.from({length:pages},(_,i)=><button key={i} className={safePage===i+1?'current':''} onClick={()=>setPage(i+1)} aria-label={`Página ${i+1}`} aria-current={safePage===i+1?'page':undefined}>{i+1}</button>)}<button onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={safePage===pages} aria-label="Próxima página">›</button></nav></div>
      <div className="catalog-footnote"><span>✧</span> Interface de demonstração — as informações serão carregadas pela API após a integração.</div>
      </main>
    </div>
    {selectedPokemon&&<PokemonDetailModal pokemon={selectedPokemon} open onClose={()=>setSelectedId(null)} onPokemonChange={p=>setSelectedId(p.id)}/>}
  </section>;
}
