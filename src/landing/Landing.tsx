import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { TextField } from '@/components/foundation/text-field';
import { EditorialPage, EditorialStack, EditorialCluster, EditorialHeading } from '@/components/foundation/layout';
import config from '../../system.config.json';
import packageInfo from '../../package.json';
import editorialTokens from '../styles/tokens.json';
import stoneTokens from '../styles/stone.tokens.json';

type Style = 'editorial' | 'stone';
const repository = config.repository;
function sampleStyle(tokens: typeof editorialTokens.light): CSSProperties {
  return {
    '--sample-paper': tokens.background, '--sample-ink': tokens.foreground,
    '--sample-accent': tokens.accent, '--sample-border': tokens.border,
    '--sample-sans': tokens['ef-font-sans'], '--sample-serif': tokens['ef-font-serif'],
  } as CSSProperties;
}

export function Landing() {
  const [style, setStyle] = useState<Style>(() => new URLSearchParams(location.search).get('style') === 'stone' ? 'stone' : 'editorial');
  const [playful, setPlayful] = useState(false);
  const [project, setProject] = useState('Something good');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const item = style === 'stone' ? 'stone-foundation' : 'foundation';
  const command = `npx shadcn@latest add Staiola/editorial-foundation/${item}#v${packageInfo.version}`;
  const reference = `/?style=${style}`;

  useEffect(() => {
    document.documentElement.dataset.style = style;
    document.documentElement.classList.remove('dark');
    const url = new URL(location.href);
    url.searchParams.set('style', style);
    history.replaceState(null, '', url);
    setCopyStatus('');
  }, [style]);

  async function copyCommand() {
    try { await navigator.clipboard.writeText(command); setCopyStatus('Command copied.'); }
    catch { setCopyStatus('Select and copy the command above. Clipboard access is unavailable.'); }
  }

  return <div className="ef-system landing">
    <a className="landing-skip" href="#landing-main">Skip to content</a>
    <EditorialPage className="landing-shell">
      <header className="landing-header">
        <a href="#" className="landing-wordmark" aria-label="Editorial Foundation home">editorial<span>foundation</span><span className="landing-dot">.</span></a>
        <nav aria-label="Main navigation"><a href="#approach">The approach</a><a href={reference}>Explore the system <ArrowUpRight size={14}/></a></nav>
        <Button asChild variant="outline"><a href="#start">Start building <ArrowRight/></a></Button>
      </header>

      <main id="landing-main">
        <section className="landing-hero" aria-labelledby="hero-title">
          <EditorialStack gap="region" className="landing-intro">
            <p className="landing-kicker">A personal design system for the web</p>
            <EditorialHeading level={1} size="display" id="hero-title">A considered start.<br/><em>A character<br className="landing-title-break"/> of your own.</em></EditorialHeading>
            <p className="landing-lede">Good type. Thoughtful spacing. Controls that feel familiar. A foundation for the things you haven’t made yet.</p>
            <EditorialCluster><Button asChild><a href={reference}>Explore the system <ArrowUpRight/></a></Button><a className="landing-text-link" href="#styles">Find your starting point <ArrowDown size={16}/></a></EditorialCluster>
          </EditorialStack>

          <div className="landing-specimen">
            <div className={`landing-letterpress ${playful ? 'is-playful' : ''}`} aria-hidden="true"><span>A</span><span>a</span><span className="landing-letter-dot">.</span></div>
            <form className="landing-live-form" onSubmit={event => { event.preventDefault(); if (!project.trim()) { setError('Give your project a name.'); setSaved(false); return; } setError(''); setSaved(true); }} noValidate>
              <div className="landing-sample-heading"><span>A little structure. A little you.</span><span className="landing-live-indicator">Live sample</span></div>
              <TextField label="Your next project" value={project} onChange={event => { setProject(event.target.value); setSaved(false); setError(''); }} error={error} maxLength={64}/>
              <div className="landing-sample-controls"><Label htmlFor="landing-play">Room for play</Label><Switch id="landing-play" checked={playful} onCheckedChange={setPlayful}/></div>
              <div className="landing-sample-actions"><Button type="submit">{saved ? <><Check/> Saved</> : <>Make a start <ArrowRight/></>}</Button><p role="status">{saved ? 'Saved in this preview.' : 'Try it. This is the real thing.'}</p></div>
            </form>
          </div>
        </section>

        <div className="landing-colophon"><p>Built with the same foundation you can use.</p><p>React <span aria-hidden="true">·</span> Tailwind <span aria-hidden="true">·</span> shadcn</p></div>

        <section id="approach" className="landing-section landing-approach" aria-labelledby="approach-title">
          <EditorialStack gap="group"><p className="landing-kicker">Less starting over</p><EditorialHeading size="page" id="approach-title">Keep the good decisions.<br/>Make the interesting ones.</EditorialHeading><p className="landing-body">Every project needs a little structure. Carry the useful decisions with you, then spend your attention on what makes this one different.</p><a className="landing-text-link" href={`${repository}/blob/main/DESIGN.md`}>Read the design principles <ArrowUpRight size={16}/></a></EditorialStack>
          <dl className="landing-principles">
            <div><dt>Type with a point of view</dt><dd>A deliberate hierarchy, readable everyday text and room for an expressive headline.</dd></div>
            <div><dt>Space that means something</dt><dd>Closer within a group. More room between ideas. Shared spacing rules keep a page connected.</dd></div>
            <div><dt>Familiar where it matters</dt><dd>Styled shadcn controls, shared layouts and keyboard behaviour you can build on.</dd></div>
          </dl>
        </section>

        <section id="styles" className="landing-section" aria-labelledby="styles-title">
          <div className="landing-section-heading"><EditorialStack gap="related"><p className="landing-kicker">Two points of view</p><EditorialHeading size="page" id="styles-title">Same structure.<br/>Different instincts.</EditorialHeading></EditorialStack><p className="landing-body">Choose a style to see this whole page change. The components and spacing stay familiar.</p></div>
          <div className="landing-style-grid" role="group" aria-label="Choose the page style">
            <button className="landing-style-choice landing-style-editorial" style={sampleStyle(editorialTokens.light)} aria-pressed={style === 'editorial'} onClick={() => setStyle('editorial')}>
              <span className="landing-style-top"><span>Editorial</span><span>{style === 'editorial' ? <><Check size={16}/> Selected</> : <>Try Editorial <ArrowUpRight size={16}/></>}</span></span>
              <span className="landing-style-type">Quietly<br/><em>confident.</em></span>
              <span className="landing-style-bottom"><span>DM Sans · Paper · Olive</span><span className="landing-palette" aria-hidden="true"><i/><i/><i/></span></span>
            </button>
            <button className="landing-style-choice landing-style-stone" style={sampleStyle(stoneTokens.light)} aria-pressed={style === 'stone'} onClick={() => setStyle('stone')}>
              <span className="landing-style-top"><span>Stone</span><span>{style === 'stone' ? <><Check size={16}/> Selected</> : <>Try Stone <ArrowUpRight size={16}/></>}</span></span>
              <span className="landing-style-type">A different<br/><em>perspective.</em></span>
              <span className="landing-style-bottom"><span>Geist · Source Serif 4 · Warm stone</span><span className="landing-palette" aria-hidden="true"><i/><i/><i/></span></span>
            </button>
          </div>
          <p className="landing-style-note" role="status">Now viewing {style === 'stone' ? 'Stone' : 'Editorial'}. Change a font or colour in your project whenever you like. Your source system stays intact.</p>
        </section>

        <section id="start" className="landing-section landing-start" aria-labelledby="start-title">
          <EditorialStack gap="group"><p className="landing-kicker">Take it into your next project</p><EditorialHeading size="page" id="start-title">A starting point.<br/>Yours from here.</EditorialHeading><p className="landing-body">Start a new app from the GitHub template, or add the foundation to an existing shadcn project. The code becomes part of your app.</p><Button asChild><a href={repository}>Open the GitHub template <ArrowUpRight/></a></Button><p className="landing-access">The repository is private. GitHub access is required.</p></EditorialStack>
          <EditorialStack gap="group" className="landing-install"><div className="landing-install-heading"><h3>Add {style === 'stone' ? 'Stone' : 'Editorial'} to an existing app</h3><span>v{packageInfo.version}</span></div><p>For a configured React, Tailwind v4 and shadcn project:</p><div className="landing-code"><code>{command}</code><Button variant="outline" size="icon" aria-label="Copy installation command" onClick={copyCommand}>{copyStatus === 'Command copied.' ? <Check/> : <Copy/>}</Button></div><p className="landing-copy-status" role="status">{copyStatus}</p><p className="landing-install-note">Your installed copy is yours to change. Updates are deliberate, so a new system release won’t overwrite your work.</p><a className="landing-text-link" href={`${repository}/blob/main/README.md`}>Installation &amp; update guide <ArrowUpRight size={16}/></a></EditorialStack>
        </section>
      </main>

      <footer className="landing-footer"><div><a href="#" className="landing-wordmark">editorial<span>foundation</span>.</a><p>A little structure. More possibility.</p></div><nav aria-label="Footer navigation"><a href={reference}>Component reference</a><a href="/checks.html">System checks</a><a href={repository}>GitHub <ArrowUpRight size={14}/></a></nav></footer>
    </EditorialPage>
  </div>;
}
