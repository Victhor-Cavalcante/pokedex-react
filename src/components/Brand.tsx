import { Link } from 'react-router-dom';
export function Brand() {
  return <Link className="brand" to="/pokedex" aria-label="DexLab, acessar Sobre"><span className="brand-symbol" aria-hidden="true"><span /></span><span className="brand-word">dex<span>lab</span><small>PROJETO ACADÊMICO</small></span></Link>;
}
