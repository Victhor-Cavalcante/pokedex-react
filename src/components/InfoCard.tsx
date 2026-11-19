import type { ReactNode } from 'react';
type InfoCardProps = { index: string; title: string; description: string; icon: ReactNode };
export function InfoCard({index,title,description,icon}:InfoCardProps){ return <article className="info-card"><div className="card-top"><span className="feature-icon" aria-hidden="true">{icon}</span><span className="card-index">{index}</span></div><h3>{title}</h3><p>{description}</p></article>; }
