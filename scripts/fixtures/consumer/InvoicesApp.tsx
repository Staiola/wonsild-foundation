import { useState } from "react";
import { Plus, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/foundation/page-header";
import { TextField } from "@/components/foundation/text-field";
import { EmptyState } from "@/components/foundation/empty-state";
import { CopyCommand } from "@/components/foundation/copy-command";
import { EditorialPage, EditorialStack, EditorialCluster, EditorialGrid, EditorialHeading } from "@/components/foundation/layout";

// A freshly composed screen using ONLY shipped registry pieces: no reference.css, no app CSS.
type Invoice = { id: string; client: string; amount: number; due: string; status: "Draft" | "Sent" | "Paid" | "Overdue" };

const seed: Invoice[] = [
  { id: "2026-041", client: "Northline Brand Platform ApS", amount: 18500, due: "2026-09-02", status: "Overdue" },
  { id: "2026-042", client: "Form & Field", amount: 4200, due: "2026-09-20", status: "Sent" },
  { id: "2026-043", client: "Independent research — long client name that keeps going to test wrapping behaviour in cells", amount: 950, due: "2026-09-28", status: "Draft" },
  { id: "2026-040", client: "Studio Rerunner", amount: 12000, due: "2026-08-15", status: "Paid" },
];

const money = new Intl.NumberFormat("da-DK", { style: "currency", currency: "DKK", maximumFractionDigits: 0 });

export default function InvoicesApp() {
  const [invoices, setInvoices] = useState(seed);
  const [filter, setFilter] = useState("all");
  const [reminders, setReminders] = useState(true);
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);

  const visible = invoices.filter((i) => filter === "all" || i.status.toLowerCase() === filter);
  const overdue = invoices.filter((i) => i.status === "Overdue");
  const outstanding = invoices.filter((i) => i.status !== "Paid" && i.status !== "Draft").reduce((s, i) => s + i.amount, 0);

  function create(e: React.FormEvent) {
    e.preventDefault();
    if (!client.trim()) { setError("Enter a client name."); return; }
    setInvoices([{ id: `2026-0${44 + invoices.length}`, client: client.trim(), amount: Number(amount) || 0, due: "2026-10-12", status: "Draft" }, ...invoices]);
    setOpen(false); setClient(""); setAmount(""); setError("");
  }

  return (
    <main className="ef-system">
      <EditorialPage>
        <EditorialStack gap="region">
          <PageHeader
            eyebrow="Staiola Studio"
            title="Invoices"
            description="Everything sent, paid and still waiting. Reminders go out automatically when enabled."
            actions={
              <>
                <Button variant="ghost" size="icon" aria-label={dark ? "Use light theme" : "Use dark theme"} onClick={() => { setDark(!dark); document.documentElement.classList.toggle("dark", !dark); }}>{dark ? <Sun /> : <Moon />}</Button>
                <Dialog open={open} onOpenChange={(v) => { setOpen(v); setError(""); }}>
                  <DialogTrigger asChild><Button data-test="trigger"><Plus /> New invoice</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>New invoice</DialogTitle><DialogDescription>A client and an amount is enough to start a draft.</DialogDescription></DialogHeader>
                    <form onSubmit={create} noValidate>
                      <EditorialStack>
                        <TextField label="Client" value={client} onChange={(e) => { setClient(e.target.value); setError(""); }} error={error} autoFocus />
                        <TextField label="Amount (DKK)" type="number" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} hint="Excluding VAT." />
                      </EditorialStack>
                      <DialogFooter className="mt-6"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Create draft</Button></DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </>
            }
          />

          {overdue.length > 0 && (
            <Alert variant="destructive">
              <AlertTitle>{overdue.length} invoice{overdue.length > 1 ? "s are" : " is"} overdue</AlertTitle>
              <AlertDescription>{overdue.map((i) => `${i.client} (${money.format(i.amount)})`).join(", ")}. A reminder was sent 3 days ago.</AlertDescription>
            </Alert>
          )}

          <EditorialGrid>
            <EditorialStack gap="label">
              <span className="ef-eyebrow" style={{ marginBottom: 0 }}>Outstanding</span>
              <EditorialHeading level={2} size="page">{money.format(outstanding)}</EditorialHeading>
            </EditorialStack>
            <EditorialStack gap="label">
              <span className="ef-eyebrow" style={{ marginBottom: 0 }}>Paid this quarter</span>
              <EditorialHeading level={2} size="page">{money.format(12000)}</EditorialHeading>
            </EditorialStack>
            <EditorialStack gap="label">
              <Label htmlFor="reminders">Automatic reminders</Label>
              <EditorialCluster><Switch id="reminders" checked={reminders} onCheckedChange={setReminders} /><span className="ef-field-hint">{reminders ? "On — 7 days after due date" : "Off"}</span></EditorialCluster>
            </EditorialStack>
          </EditorialGrid>

          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">All invoices</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <EditorialStack>
                <EditorialCluster>
                  <div className="ef-field" >
                    <Label htmlFor="status-filter">Status</Label>
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger id="status-filter"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </EditorialCluster>
                <Table data-test="table" aria-label="Invoices">
                  <TableHeader>
                    <TableRow><TableHead>Invoice</TableHead><TableHead>Client</TableHead><TableHead>Due</TableHead><TableHead>Status</TableHead><TableHead className="text-right ef-numeric whitespace-nowrap">Amount</TableHead></TableRow>
                  </TableHeader>
                  <TableBody>
                    {visible.map((i) => (
                      <TableRow key={i.id}>
                        <TableCell className="whitespace-nowrap">{i.id}</TableCell>
                        <TableCell>{i.client}</TableCell>
                        <TableCell className="whitespace-nowrap">{i.due}</TableCell>
                        <TableCell><Badge variant={i.status === "Overdue" ? "destructive" : i.status === "Paid" ? "default" : i.status === "Sent" ? "secondary" : "outline"}>{i.status}</Badge></TableCell>
                        <TableCell className="text-right ef-numeric whitespace-nowrap">{money.format(i.amount)}</TableCell>
                      </TableRow>
                    ))}
                    
                  </TableBody>
                </Table>
                {visible.length === 0 && <EmptyState edge="bottom" level={3} title="No invoices with this status" description="Change the filter or create a new draft." action={<Button variant="outline" onClick={() => setFilter("all")}>Show all statuses</Button>} />}
                <Button variant="outline" data-test="lone-button">Export as CSV</Button>
              </EditorialStack>
            </TabsContent>
            <TabsContent value="settings">
              <EditorialStack>
                <TextField label="Payment terms (days)" type="number" defaultValue="14" hint="Applied to new invoices." />
                <TextField label="Reminder email subject" defaultValue="Friendly reminder about your invoice" />
                <CopyCommand value="npx staiola-invoices export --format csv --since 2026-01-01" label="Copy export command" />
                <EditorialCluster><Button>Save settings</Button><Button variant="ghost">Reset</Button></EditorialCluster>
              </EditorialStack>
            </TabsContent>
          </Tabs>
        </EditorialStack>
      </EditorialPage>
    </main>
  );
}
