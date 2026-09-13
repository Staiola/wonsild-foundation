import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import config from '../system.config.json';
import './styles/site-links.css';
import './styles/button-tracing-stroke.css';

/** Navigation for the reference website, separate from installed product UI. */
export function SiteLinks({ style, showComponents = true }: { style: string; showComponents?: boolean }) {
  return <nav className="site-links" aria-label="Main navigation">
    {showComponents && <a href={`/?style=${style}&view=components`}>Components</a>}
    <a href={`${config.repository}/blob/main/README.md`}>Guide</a>
    {/* Temporary experiment: remove button-tracing-stroke to restore the plain outline. */}
    <Button asChild variant="outline" className="button-tracing-stroke"><a href={config.repository}>
      GitHub <ArrowUpRight aria-hidden="true"/>
      <span className="button-tracing-stroke-art" aria-hidden="true">
        <svg width="100%" height="100%" focusable="false">
          <rect className="tracing-stroke-ink" x="1" y="1" pathLength="100"/>
          <rect className="tracing-stroke-accent" x="1" y="1" pathLength="100"/>
        </svg>
      </span>
    </a></Button>
    <Button asChild><a href={`/landing.html?style=${style}#start`}>Get started</a></Button>
  </nav>;
}
