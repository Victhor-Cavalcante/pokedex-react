import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Brand } from './Brand';
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container header-inner"><Brand /><button type="button" className="menu-toggle" aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button><nav id="site-nav" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navegação principal"><NavLink onClick={() => setOpen(false)} to="/pokedex">Pokédex</NavLink><NavLink onClick={() => setOpen(false)} to="/sobre">Sobre</NavLink><NavLink onClick={() => setOpen(false)} to="/guia-visual">Guia visual</NavLink></nav></div></header>;
}
