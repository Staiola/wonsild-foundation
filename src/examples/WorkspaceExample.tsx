import { useId, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PageHeader } from '@/components/foundation/page-header';
import { TextField } from '@/components/foundation/text-field';
import { EmptyState } from '@/components/foundation/empty-state';
import { EditorialHeading, EditorialStack, EditorialCluster } from '@/components/foundation/layout';
import './workspace.css';

type Project = { id: number; name: string; client: string; status: string; visibility: string; archived: boolean };
const initialProjects: Project[] = [
  { id: 1, name: 'A better beginning', client: 'Northline · Brand platform', status: 'In progress', visibility: 'team', archived: false },
  { id: 2, name: 'Systems for everyday', client: 'Form & Field · Product design', status: 'In review', visibility: 'team', archived: false },
  { id: 3, name: 'The human side', client: 'Independent · Research', status: 'In progress', visibility: 'private', archived: false },
];

function ProjectEditor({ project, onSave, onArchive }: { project: Project; onSave: (project: Project) => void; onArchive: () => void }) {
  const [name, setName] = useState(project.name);
  const [visibility, setVisibility] = useState(project.visibility);
  const [error, setError] = useState('');
  const visibilityId = useId();
  return <form onSubmit={event => {
    event.preventDefault();
    if (!name.trim()) { setError('Enter a project name.'); return; }
    onSave({ ...project, name: name.trim(), visibility });
  }} noValidate>
    <EditorialStack>
      <TextField label="Project name" value={name} onChange={event => { setName(event.target.value); setError(''); }} error={error} maxLength={64}/>
      <div className="ef-field"><Label htmlFor={visibilityId}>Visibility</Label><Select value={visibility} onValueChange={setVisibility}><SelectTrigger id={visibilityId}><SelectValue/></SelectTrigger><SelectContent><SelectItem value="team">Studio team</SelectItem><SelectItem value="private">Only me</SelectItem></SelectContent></Select><p className="ef-field-hint">Choose who can see this project.</p></div>
      <EditorialCluster><Button type="submit">Save changes</Button><Button type="button" variant="outline" onClick={onArchive}>{project.archived ? 'Restore project' : 'Archive project'}</Button></EditorialCluster>
    </EditorialStack>
  </form>;
}

/** A session-only product example, shared by the reference and landing page. */
export function WorkspaceExample({ embedded = false }: { embedded?: boolean }) {
  const searchRef = useRef<HTMLInputElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState(initialProjects);
  const [selected, setSelected] = useState(1);
  const [filter, setFilter] = useState('active');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newError, setNewError] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const visible = projects.filter(project => project.archived === (filter === 'archive') && `${project.name} ${project.client}`.toLowerCase().includes(query.trim().toLowerCase()));
  const current = visible.find(project => project.id === selected) ?? visible[0];
  const headingLevel = embedded ? 4 : 2;
  const activeCount = projects.filter(project => !project.archived).length;
  return <div className="workspace-demo">
    <EditorialStack gap="region">
      <PageHeader level={embedded ? 3 : 1} eyebrow="Example app · Session-only demo" title="Room to do good work." description="Select a project, edit its details, or make a new start." actions={
        <Dialog open={open} onOpenChange={value => { setOpen(value); setNewError(''); }}>
          <DialogTrigger asChild><Button><Plus/> New project</Button></DialogTrigger>
          <DialogContent><DialogHeader><DialogTitle>Start a project</DialogTitle><DialogDescription>A name is enough to get going. You can refine the details later.</DialogDescription></DialogHeader>
            <form onSubmit={event => {
              event.preventDefault();
              if (!newName.trim()) { setNewError('Enter a project name.'); return; }
              const project: Project = { id: Math.max(0, ...projects.map(p => p.id)) + 1, name: newName.trim(), client: 'Studio · New project', status: 'In progress', visibility: 'team', archived: false };
              setProjects([...projects, project]); setSelected(project.id); setFilter('active'); setQuery(''); setOpen(false); setNewName(''); setAnnouncement('Project created in this preview.');
            }} noValidate><TextField label="New project name" value={newName} onChange={event => { setNewName(event.target.value); setNewError(''); }} error={newError} maxLength={64} autoFocus/><DialogFooter className="mt-6"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Create project</Button></DialogFooter></form>
          </DialogContent>
        </Dialog>
      }/>
      <p className="workspace-note">Example composition, not an individually installable block. The controls, layouts and empty state are included in the full foundation.</p>
      <div className="workspace-toolbar">
        <div ref={filtersRef} className="workspace-filters" role="group" aria-label="Project status"><Button variant="ghost" aria-pressed={filter === 'active'} onClick={() => { setFilter('active'); setAnnouncement(''); }}>Active projects <span>{activeCount}</span></Button><Button variant="ghost" aria-pressed={filter === 'archive'} onClick={() => { setFilter('archive'); setAnnouncement(''); }}>Archive <span>{projects.length - activeCount}</span></Button></div>
        <TextField ref={searchRef} label="Find a project" type="search" value={query} onChange={event => { setQuery(event.target.value); setAnnouncement(''); }} placeholder="Search projects or clients"/>
      </div>
      <div className="workspace-columns">
        <section aria-label="Projects"><div className="workspace-list-head"><span>Project / Client</span><span>Status</span></div>
          {visible.length ? visible.map(project => <button key={project.id} type="button" className="workspace-row" aria-pressed={current?.id === project.id} onClick={() => { setSelected(project.id); setAnnouncement(''); }}><span><span className="workspace-name">{project.name}</span><span className="workspace-client">{project.client}</span></span><span className="workspace-status">{project.status}</span></button>) :
            <EmptyState level={headingLevel} title={query.trim() ? 'No matching projects' : filter === 'archive' ? 'No archived projects' : 'No active projects'} description={query.trim() ? 'Try a different project name or client, or clear your search.' : filter === 'archive' ? 'Projects you archive will appear here.' : 'Create a project or restore one from the archive.'} action={query.trim() ? <Button variant="outline" onClick={() => { setQuery(''); searchRef.current?.focus(); }}>Clear search</Button> : <Button variant="outline" onClick={() => setFilter(filter === 'archive' ? 'active' : 'archive')}>{filter === 'archive' ? 'Back to active projects' : 'View archive'}</Button>}/>
          }
        </section>
        <section className="workspace-details"><EditorialHeading level={headingLevel}>Project details</EditorialHeading>
          {current ? <ProjectEditor key={current.id} project={current} onSave={updated => { setProjects(projects.map(project => project.id === updated.id ? updated : project)); setAnnouncement('Changes saved in this preview.'); }} onArchive={() => { filtersRef.current?.querySelector<HTMLButtonElement>('[aria-pressed=true]')?.focus(); setProjects(projects.map(project => project.id === current.id ? { ...project, archived: !project.archived } : project)); setAnnouncement(current.archived ? 'Project restored. Find it under Active projects.' : 'Project archived. Find it in Archive.'); }}/>
            : <p className="workspace-note">Select a project from the list to edit its details.</p>}
        </section>
      </div>
      <p role="status" className="workspace-note workspace-announcement">{announcement || (query.trim() ? `${visible.length} matching ${visible.length === 1 ? 'project' : 'projects'}.` : 'Demo data resets when this page reloads.')}</p>
    </EditorialStack>
  </div>;
}
