import { Navigate, Route, Routes } from 'react-router-dom';
import { ChatWidget } from './chatbot';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { StyleGuidePage } from './pages/StyleGuidePage';
import { PokedexPage } from './pages/PokedexPage';
export default function App() {
  return <div className="app-shell"><a className="skip-link" href="#conteudo">Ir para o conteúdo</a><Header /><main id="conteudo"><Routes><Route path="/" element={<Navigate to="/pokedex" replace />} /><Route path="/pokedex" element={<PokedexPage />} /><Route path="/sobre" element={<AboutPage />} /><Route path="/guia-visual" element={<StyleGuidePage />} /><Route path="*" element={<Navigate to="/sobre" replace />} /></Routes></main><ChatWidget /><Footer /></div>;
}
