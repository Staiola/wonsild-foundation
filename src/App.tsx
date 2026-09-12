import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Moon, Plus, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
type Style = "editorial" | "stone";

const VERSION = packageInfo.version;

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("editorial-theme") === "dark" || (!localStorage.getItem("editorial-theme") && matchMedia("(prefers-color-scheme: dark)").matches); } catch { return false; }
  });
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  return <Button variant="ghost" size="icon" aria-label={dark ? "Use light theme" : "Use dark theme"} onClick={() => { const value = !dark; setDark(value); try { localStorage.setItem("editorial-theme", value ? "dark" : "light"); } catch { /* Preference remains in memory. */ } }}>{dark ? <Sun /> : <Moon />}</Button>;
}

function FoundationReference({ style }: { style: Style }) {
  const tokens = style === "stone" ? stoneTokens : editorialTokens;
  const gaps = [["Label", 8], ["Related", 12], ["Group", 24], ["Region", 40], ["Section", 64]] as const;
  const [playful, setPlayful] = useState(false);
  return <>
    <PageHeader eyebrow="Personal design system" title={style === "stone" ? "A different kind of clarity." : "A clear starting point."} description={style === "stone" ? "Stone / Geist, editorial serif and warm neutrals." : "Editorial structure. Thoughtful spacing. Room for a little expression."} actions={<span className="version">Version {VERSION}</span>} />
    <div className="reference-grid">
      <section className="reference-section type-study"><div className="section-label">01 / Typography</div><div className="type-display">{style === "stone" ? <>Built for<br /><em>perspective.</em></> : <>Quietly<br /><em>confident.</em></>}</div><p className="type-body">A good interface makes the next step feel obvious. Give each piece of information enough room to do its job.</p><div className="type-caption">{style === "stone" ? "Geist + Source Serif 4 · Locally bundled" : "DM Sans (bundled) + Georgia italic (system serif)"}</div></section>
      <section className="reference-section"><div className="section-label">02 / Spacing relationships</div><div className="spacing-list">{gaps.map(([name, size]) => <div className="spacing-row" key={name}><span>{name}</span><div className="spacing-track"><span style={{ width: `${size * 2}px` }} /></div><code>{size}px</code></div>)}</div><p className="secondary-note">Closer within a group. More space between groups.</p></section>
      <section className="reference-section"><div className="section-label">03 / Semantic colour</div><div className="swatch-grid">{([['Paper','background'],['Ink','foreground'],['Surface','card'],['Accent','accent']] as const).map(([name,token])=><div key={token}><div className="swatch" style={{background:`var(--${token})`}}/><span>{name}</span><code>{tokens.light[token].toUpperCase()}</code></div>)}</div><p className="secondary-note">Light values shown. Switch themes to inspect their dark counterparts.</p></section>
      <section className="reference-section expression-study"><div className="section-label">04 / Optional expression</div><div className={`expression-type ${playful ? 'is-playful' : ''}`} aria-label="Experimental Aa lettering"><span>A</span><span>a</span><span>.</span></div><div className="switch-row"><Label htmlFor="playful">Let the lettering play</Label><Switch id="playful" checked={playful} onCheckedChange={setPlayful} /></div></section>
    </div>
    <div className="reference-end"><span>Consistency lives in the components and rules.</span><span>Build on the foundation; make the product your own.</span></div>
  </>;
}

function ComponentsReference() {
  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState([40]);
  const [saved, setSaved] = useState(false);
  return <>
    <PageHeader eyebrow="Reusable building blocks" title="The everyday essentials." description="Real shadcn controls, styled with the same foundation." />
    <div className="reference-grid components-grid">
      <section className="reference-section"><EditorialHeading>Actions</EditorialHeading><EditorialStack><EditorialCluster><Button onClick={()=>setSaved(true)}>{saved ? <><Check/> Saved</> : 'Save changes'}</Button><Button variant="outline" onClick={()=>setSaved(false)}>Reset</Button><Button disabled>Unavailable</Button></EditorialCluster><span aria-live="polite" className="secondary-note">{saved ? 'Example action completed.' : 'Primary, secondary and disabled states.'}</span><Dialog><DialogTrigger asChild><Button variant="outline">Open example dialog <ArrowUpRight/></Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>A little more context.</DialogTitle><DialogDescription>Focus stays inside the dialog. Press Escape to close it and return to the trigger.</DialogDescription></DialogHeader><p className="text-sm text-muted-foreground">This is the same dialog used by the example app.</p></DialogContent></Dialog></EditorialStack></section>
      <section className="reference-section"><EditorialHeading>Fields</EditorialHeading><EditorialStack><TextField label="Project name" placeholder="A meaningful name" hint="Keep it short and descriptive."/><TextField label="Contact email" defaultValue="not-an-email" error="Enter a valid email address."/><TextField label="Reference number" defaultValue="Assigned after creation" disabled /></EditorialStack></section>
      <section className="reference-section"><EditorialHeading>Choices</EditorialHeading><EditorialStack><div className="ef-field"><Label htmlFor="sample-select">Visibility</Label><Select defaultValue="team"><SelectTrigger id="sample-select"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="team">Studio team</SelectItem><SelectItem value="private">Only me</SelectItem></SelectContent></Select></div><div className="switch-row"><Label htmlFor="sample-switch">Email notifications</Label><Switch id="sample-switch" checked={checked} onCheckedChange={setChecked}/></div><div className="ef-field"><Label htmlFor="sample-slider">Intensity <span className="numeric">{value[0]}%</span></Label><Slider id="sample-slider" aria-label="Intensity" value={value} onValueChange={setValue} max={100} step={5}/></div></EditorialStack></section>
      <section className="reference-section"><EditorialHeading>Feedback</EditorialHeading><EditorialStack><EditorialCluster><Badge>Selected</Badge><Badge variant="outline">In review</Badge><Badge variant="secondary">Draft</Badge></EditorialCluster><Alert><Check/><AlertTitle>Changes saved</AlertTitle><AlertDescription>Your project is ready for the next step.</AlertDescription></Alert><Alert variant="destructive"><AlertTitle>Check the email address</AlertTitle><AlertDescription>There is one field to correct before continuing.</AlertDescription></Alert></EditorialStack></section>
    </div>
  </>;
}

type Project = { id:number; name:string; client:string; status:string; visibility:string; archived:boolean };
function WorkspaceExample() {
  const [projects,setProjects]=useState<Project[]>([{id:1,name:'A better beginning',client:'Northline · Brand platform',status:'In progress',visibility:'team',archived:false},{id:2,name:'Systems for everyday',client:'Form & Field · Product design',status:'In review',visibility:'team',archived:false},{id:3,name:'The human side',client:'Independent · Research',status:'In progress',visibility:'private',archived:false}]);
  const [selected,setSelected]=useState(1),[filter,setFilter]=useState('active'),[name,setName]=useState(projects[0].name),[visibility,setVisibility]=useState('team'),[error,setError]=useState(''),[saved,setSaved]=useState('');
  const [open,setOpen]=useState(false),[newName,setNewName]=useState(''),[newError,setNewError]=useState('');
  const visible=projects.filter(p=>p.archived===(filter==='archive'));
  function selectProject(p:Project){setSelected(p.id);setName(p.name);setVisibility(p.visibility);setError('');setSaved('');}
  return <>
    <PageHeader eyebrow="Example app / Session-only demo" title="Room to do good work." description="Your projects, people and decisions. A clear view of what moves next." actions={<Dialog open={open} onOpenChange={v=>{setOpen(v);setNewError('')}}><DialogTrigger asChild><Button><Plus/> New project</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Start a project</DialogTitle><DialogDescription>A name is enough to get going. You can refine the details later.</DialogDescription></DialogHeader><form onSubmit={e=>{e.preventDefault();if(!newName.trim()){setNewError('Enter a project name.');return}const p={id:Date.now(),name:newName.trim(),client:'Studio · New project',status:'In progress',visibility:'team',archived:false};setProjects([...projects,p]);selectProject(p);setFilter('active');setOpen(false);setNewName('')}} noValidate><TextField label="Project name" value={newName} onChange={e=>{setNewName(e.target.value);setNewError('')}} error={newError} maxLength={64} autoFocus/><DialogFooter className="mt-6"><Button type="button" variant="outline" onClick={()=>setOpen(false)}>Cancel</Button><Button type="submit">Create project</Button></DialogFooter></form></DialogContent></Dialog>} />
    <p className="demo-scope">Demo composition: the navigation, project list and details layout are examples, not installable blocks. Shared controls are included in the registry.</p>
    <div className="workspace-filter" role="group" aria-label="Project status"><Button variant="ghost" aria-pressed={filter==='active'} onClick={()=>setFilter('active')}>Active projects <span>{projects.length}</span></Button><Button variant="ghost" aria-pressed={filter==='archive'} onClick={()=>setFilter('archive')}>Archive <span>0</span></Button></div>
    <div className="workspace-grid"><section aria-label="Projects"><div className="project-list-head"><span>Project / Client</span><span>Status</span></div>{visible.length===0 ? <div className="empty-state"><h2>No archived projects</h2><p>Finished work will have a home here.</p><Button variant="outline" onClick={()=>setFilter('active')}>Back to active projects</Button></div> : visible.map(p=><button key={p.id} type="button" className="project-row" aria-pressed={selected===p.id} onClick={()=>selectProject(p)}><span><span className="project-name">{p.name}</span><span className="project-client">{p.client}</span></span><span className="project-status">{p.status}</span></button>)}</section><section className="project-details"><EditorialHeading>Project details</EditorialHeading>{visible.length>0 ? <form onSubmit={e=>{e.preventDefault();if(!name.trim()){setError('Enter a project name.');return}setProjects(projects.map(p=>p.id===selected?{...p,name:name.trim(),visibility}:p));setSaved('Saved in this preview')}} noValidate><EditorialStack><TextField label="Project name" value={name} onChange={e=>{setName(e.target.value);setError('');setSaved('')}} error={error} maxLength={64}/><div className="ef-field"><Label htmlFor="project-visibility">Visibility</Label><Select value={visibility} onValueChange={v=>{setVisibility(v);setSaved('')}}><SelectTrigger id="project-visibility"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="team">Studio team</SelectItem><SelectItem value="private">Only me</SelectItem></SelectContent></Select><p className="ef-field-hint">Choose who can see this project.</p></div><EditorialCluster><Button type="submit">Save changes</Button><span className="secondary-note" aria-live="polite">{saved}</span></EditorialCluster></EditorialStack></form>:<p className="secondary-note">Select an active project to edit its details.</p>}</section></div>
    <div className="notebook"><div><div className="section-label">From the studio notebook</div><h2>Leave a little<br/>room for play.</h2><p>Experiments, unfinished thoughts, and the things that don’t fit the brief.</p></div><div className="expression-type is-playful" aria-label="Experimental Aa lettering"><span>A</span><span>a</span><span>.</span></div></div>
  </>;
}

export default function App() {
  const [style, setStyle] = useState<Style>(() => {
    const requested = new URLSearchParams(location.search).get("style");
    return requested === "stone" || requested === "editorial" ? requested : config.defaultStyle === "stone" ? "stone" : "editorial";
  });
  useEffect(() => { document.documentElement.dataset.style = style; }, [style]);
  function changeStyle(value: string) {
    if (value !== "stone" && value !== "editorial") return;
    setStyle(value);
    const url = new URL(location.href); url.searchParams.set("style", value);
    history.replaceState(null, "", url);
  }

  return <div className="ef-system"><a className="skip-link" href="#main-content">Skip to content</a><header className="site-header"><a className="wordmark" href="/" aria-label="Editorial Foundation home">editorial<span>foundation</span><span className="wordmark-dot">.</span></a><div className="header-tools"><div className="style-picker"><Label htmlFor="style-picker">Style</Label><Select value={style} onValueChange={changeStyle}><SelectTrigger id="style-picker"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="editorial">Editorial</SelectItem><SelectItem value="stone">Stone</SelectItem></SelectContent></Select></div><ThemeToggle/></div></header><Tabs defaultValue="foundation" className="site-tabs"><nav className="site-nav" aria-label="Reference pages"><TabsList><TabsTrigger value="foundation">Foundations</TabsTrigger><TabsTrigger value="components">Components</TabsTrigger><TabsTrigger value="workspace">Example app</TabsTrigger></TabsList><span className="version">v{VERSION}</span></nav><main id="main-content" className="site-main"><TabsContent value="foundation"><FoundationReference style={style}/></TabsContent><TabsContent value="components"><ComponentsReference/></TabsContent><TabsContent value="workspace"><WorkspaceExample/></TabsContent></main></Tabs><footer className="site-footer"><a href={`/landing.html?style=${style}`}>About Editorial Foundation</a><a href="/checks.html">Component stress checks</a></footer></div>;
}
