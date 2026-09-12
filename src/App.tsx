import { useEffect, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { PageHeader } from "@/components/foundation/page-header";
import { TextField } from "@/components/foundation/text-field";
import { EditorialHeading, EditorialStack, EditorialCluster } from "@/components/foundation/layout";
import editorialTokens from "./styles/tokens.json";
import stoneTokens from "./styles/stone.tokens.json";
import config from "../system.config.json";
import packageInfo from "../package.json";
import { WorkspaceExample } from './examples/WorkspaceExample';
import { EmptyState } from '@/components/foundation/empty-state';
import { CopyCommand } from '@/components/foundation/copy-command';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ThemeToggle } from "./ThemeToggle";
type Style = "editorial" | "stone";

const VERSION = packageInfo.version;


function FoundationReference({ style }: { style: Style }) {
  const tokens = style === "stone" ? stoneTokens : editorialTokens;
  const gaps = [["Label", 8], ["Related", 12], ["Group", 24], ["Region", 40], ["Section", 64]] as const;
  const [playful, setPlayful] = useState(false);
  return <EditorialStack gap="region">
    <PageHeader eyebrow="Personal design system" title={style === "stone" ? "A different kind of clarity." : "A clear starting point."} description={style === "stone" ? "Stone / Geist, editorial serif and warm neutrals." : "Editorial structure. Thoughtful spacing. Room for a little expression."} actions={<span className="version">Version {VERSION}</span>} />
    <div className="reference-grid">
      <section className="reference-section type-study"><div className="section-label">01 / Typography</div><div className="type-display">{style === "stone" ? <>Built for<br /><em>perspective.</em></> : <>Quietly<br /><em>confident.</em></>}</div><p className="type-body">A good interface makes the next step feel obvious. Give each piece of information enough room to do its job.</p><div className="type-caption">{style === "stone" ? "Geist + Source Serif 4 · Locally bundled" : "DM Sans (bundled) + Georgia italic (system serif)"}</div></section>
      <section className="reference-section"><div className="section-label">02 / Spacing relationships</div><div className="spacing-list">{gaps.map(([name, size]) => <div className="spacing-row" key={name}><span>{name}</span><div className="spacing-track"><span style={{ width: `${size * 2}px` }} /></div><code className="ef-numeric">{size}px</code></div>)}</div><p className="secondary-note">Closer within a group. More space between groups.</p></section>
      <section className="reference-section"><div className="section-label">03 / Semantic colour</div><div className="swatch-grid">{([['Paper','background'],['Ink','foreground'],['Surface','card'],['Accent','accent']] as const).map(([name,token])=><div key={token}><div className="swatch" style={{background:`var(--${token})`}}/><span>{name}</span><code>{tokens.light[token].toUpperCase()}</code></div>)}</div><p className="secondary-note">Light values shown. Switch themes to inspect their dark counterparts.</p></section>
      <section className="reference-section expression-study"><div className="section-label">04 / Optional expression</div><div className={`expression-type ${playful ? 'is-playful' : ''}`} aria-label="Experimental Aa lettering"><span>A</span><span>a</span><span>.</span></div><div className="switch-row"><Label htmlFor="playful">Let the lettering play</Label><Switch id="playful" checked={playful} onCheckedChange={setPlayful} /></div></section>
    </div>
    <div className="reference-end"><span>Consistency lives in the components and rules.</span><span>Build on the foundation; make the product your own.</span></div>
  </EditorialStack>;
}

function ComponentsReference({ style }: { style: Style }) {
  const [empty, setEmpty] = useState(true);
  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState([40]);
  const [saved, setSaved] = useState(false);
  return <EditorialStack gap="region">
    <PageHeader eyebrow="Reusable building blocks" title="The everyday essentials." description="Real shadcn controls, styled with the same foundation." />
    <div className="reference-grid components-grid">
      <section className="reference-section"><EditorialHeading>Actions</EditorialHeading><EditorialStack><EditorialCluster><Button onClick={()=>setSaved(true)}>{saved ? <><Check/> Saved</> : 'Save changes'}</Button><Button variant="outline" onClick={()=>setSaved(false)}>Reset</Button><Button disabled>Unavailable</Button></EditorialCluster><span aria-live="polite" className="secondary-note">{saved ? 'Example action completed.' : 'Primary, secondary and disabled states.'}</span><Dialog><DialogTrigger asChild><Button variant="outline">Open example dialog <ArrowUpRight/></Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>A little more context.</DialogTitle><DialogDescription>Focus stays inside the dialog. Press Escape to close it and return to the trigger.</DialogDescription></DialogHeader><p className="text-sm text-muted-foreground">This is the same dialog used by the example app.</p></DialogContent></Dialog></EditorialStack></section>
      <section className="reference-section"><EditorialHeading>Fields</EditorialHeading><EditorialStack><TextField label="Project name" placeholder="A meaningful name" hint="Keep it short and descriptive."/><TextField label="Contact email" defaultValue="not-an-email" error="Enter a valid email address."/><TextField label="Reference number" defaultValue="Assigned after creation" disabled /></EditorialStack></section>
      <section className="reference-section"><EditorialHeading>Choices</EditorialHeading><EditorialStack><div className="ef-field"><Label htmlFor="sample-select">Visibility</Label><Select defaultValue="team"><SelectTrigger id="sample-select"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="team">Studio team</SelectItem><SelectItem value="private">Only me</SelectItem></SelectContent></Select></div><div className="switch-row"><Label htmlFor="sample-switch">Email notifications</Label><Switch id="sample-switch" checked={checked} onCheckedChange={setChecked}/></div><div className="ef-field"><Label htmlFor="sample-slider">Intensity <span className="ef-numeric ml-auto">{value[0]}%</span></Label><Slider id="sample-slider" aria-label="Intensity" value={value} onValueChange={setValue} max={100} step={5}/></div></EditorialStack></section>
      <section className="reference-section"><EditorialHeading>Feedback</EditorialHeading><EditorialStack><EditorialCluster><Badge>Selected</Badge><Badge variant="outline">In review</Badge><Badge variant="secondary">Draft</Badge></EditorialCluster><Alert><Check/><AlertTitle>Changes saved</AlertTitle><AlertDescription>Your project is ready for the next step.</AlertDescription></Alert><Alert variant="destructive"><AlertTitle>Check the email address</AlertTitle><AlertDescription>There is one field to correct before continuing.</AlertDescription></Alert></EditorialStack></section>
      <section className="reference-section"><EditorialHeading>Empty states</EditorialHeading><div aria-live="polite">{empty ? <EmptyState edge="none" level={3} title="No matching projects" description="Try a different name or clear the current search." action={<Button variant="outline" onClick={()=>setEmpty(false)}>Clear example search</Button>}/> : <EditorialStack><p>A better beginning · Northline</p><Button variant="outline" onClick={()=>setEmpty(true)}>Show empty state</Button></EditorialStack>}</div></section>
      <section className="reference-section"><EditorialHeading>Copy a command</EditorialHeading><p className="secondary-note">Selectable text, clipboard feedback and a manual-copy fallback.</p><CopyCommand value={`npx shadcn@latest add ${new URL(config.repository).pathname.slice(1)}/${style === 'stone' ? 'stone-foundation' : 'foundation'}#v${VERSION}`}/></section>
      <section className="reference-section"><EditorialHeading>Tab navigation</EditorialHeading><Tabs defaultValue="summary"><TabsList><TabsTrigger value="summary">Summary</TabsTrigger><TabsTrigger value="activity">Recent activity</TabsTrigger></TabsList><TabsContent value="summary"><p className="secondary-note">A short overview of the current project.</p></TabsContent><TabsContent value="activity"><p className="secondary-note">Project details updated today.</p></TabsContent></Tabs></section>
      <section className="reference-section"><EditorialHeading>Tabular information</EditorialHeading><Table><TableCaption>Example project milestones</TableCaption><TableHeader><TableRow><TableHead>Milestone</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Design direction</TableCell><TableCell>Approved</TableCell></TableRow><TableRow><TableCell>Component review</TableCell><TableCell>In progress</TableCell></TableRow></TableBody></Table></section>
    </div>
  </EditorialStack>;
}

export default function App() {
  const [style, setStyle] = useState<Style>(() => {
    const requested = new URLSearchParams(location.search).get("style");
    return requested === "stone" || requested === "editorial" ? requested : config.defaultStyle === "stone" ? "stone" : "editorial";
  });
  const readView = () => { const value = new URLSearchParams(location.search).get('view'); return value === 'components' || value === 'workspace' ? value : 'foundation'; };
  const [view, setView] = useState(readView);
  useEffect(() => { const sync = () => { setView(readView()); const value = new URLSearchParams(location.search).get('style'); if (value === 'stone' || value === 'editorial') setStyle(value); }; window.addEventListener('popstate', sync); return () => window.removeEventListener('popstate', sync); }, []);
  function changeView(value: string) { setView(value); const url = new URL(location.href); url.searchParams.set('view', value); history.replaceState(null, '', url); }
  useEffect(() => { document.documentElement.dataset.style = style; }, [style]);
  function changeStyle(value: string) {
    if (value !== "stone" && value !== "editorial") return;
    setStyle(value);
    const url = new URL(location.href); url.searchParams.set("style", value);
    history.replaceState(null, "", url);
  }

  return <div className="ef-system"><a className="skip-link" href="#main-content">Skip to content</a><header className="site-header"><a className="wordmark" href="/" aria-label="Editorial Foundation home">editorial<span>foundation</span><span className="wordmark-dot">.</span></a><div className="header-tools"><div className="style-picker"><Label htmlFor="style-picker">Style</Label><Select value={style} onValueChange={changeStyle}><SelectTrigger id="style-picker"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="editorial">Editorial</SelectItem><SelectItem value="stone">Stone</SelectItem></SelectContent></Select></div><ThemeToggle/></div></header><Tabs value={view} onValueChange={changeView} className="site-tabs"><nav className="site-nav" aria-label="Reference pages"><TabsList><TabsTrigger value="foundation">Foundations</TabsTrigger><TabsTrigger value="components">Components</TabsTrigger><TabsTrigger value="workspace">Example app</TabsTrigger></TabsList><span className="version">v{VERSION}</span></nav><main id="main-content" className="site-main"><TabsContent value="foundation"><FoundationReference style={style}/></TabsContent><TabsContent value="components"><ComponentsReference style={style}/></TabsContent><TabsContent value="workspace"><WorkspaceExample/></TabsContent></main></Tabs><footer className="site-footer"><a href={`/landing.html?style=${style}`}>About Editorial Foundation</a><a href="/checks.html">Component stress checks</a></footer></div>;
}
