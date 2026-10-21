import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Building2, CalendarClock, FileText, History, Plus, Users } from "lucide-react";
import { toast } from "sonner";
import { Badge, EmptyState, KpiCard, MButton, PageHeader, Panel } from "@/components/mizan/ui";
import { EntityForm } from "@/components/mizan/EntityForm";
import { clientFields, contractFields, employeeFields, saveClient, saveContract, saveEmployee } from "@/components/mizan/entities";
import { contractStatus, daysUntil, deriveAlerts, fmtDate, useMizan } from "@/lib/mizan-store";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/dashboard/")({
  head: pageHead("نظرة عامة", "لوحة ميزان: العملاء والموظفون والعقود والتنبيهات في مكان واحد."),
  component: Overview,
});

type Modal = null | "client" | "employee" | "contract";

function Overview() {
  const d = useMizan();
  const alerts = deriveAlerts(d);
  const [modal, setModal] = useState<Modal>(null);
  const active = d.contracts.filter((c) => ["active", "expiring"].includes(contractStatus(c))).length;
  const renewals = d.contracts.filter((c) => { const n = daysUntil(c.endDate); return n >= 0 && n <= 90; }).sort((a, b) => a.endDate.localeCompare(b.endDate)).slice(0, 5);
  const clientName = (id: string) => d.clients.find((c) => c.id === id)?.name ?? "—";

  return (
    <>
      <PageHeader
        title="مرحبًا بك في ميزان"
        text="كل أعمالك في مكان واحد، ورؤية أوضح لاتخاذ القرار."
        actions={<MButton variant="accent" onClick={() => setModal("contract")}><Plus />عقد جديد</MButton>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="إجمالي العملاء" value={d.clients.length} icon={Building2} />
        <KpiCard label="إجمالي الموظفين" value={d.employees.length} icon={Users} />
        <KpiCard label="العقود النشطة" value={active} icon={FileText} hint={`من أصل ${d.contracts.length} عقد`} />
        <KpiCard label="التنبيهات المفتوحة" value={alerts.length} icon={Bell} tone="coral" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel title="إجراءات سريعة" className="xl:col-span-1">
          <div className="grid gap-2 p-5">
            {([["client", "إضافة عميل", Building2], ["employee", "إضافة موظف", Users], ["contract", "إضافة عقد", FileText]] as const).map(([k, l, I]) => (
              <button key={k} onClick={() => setModal(k)} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-start text-sm font-bold transition-colors hover:border-primary hover:bg-muted/50">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-navy-soft text-primary"><I className="h-4 w-4" /></span>
                <span className="flex-1">{l}</span>
                <Plus className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="تنبيهات مهمة" action={<Link to="/dashboard/alerts" className="text-sm font-bold text-coral">عرض الكل</Link>} className="xl:col-span-2">
          {alerts.length ? (
            <ul className="divide-y divide-border">
              {alerts.slice(0, 4).map((a) => (
                <li key={a.id} className="flex items-center gap-3 px-5 py-3.5">
                  <Badge tone={a.level === "critical" ? "danger" : "warning"}>{a.level === "critical" ? "عاجل" : "تنبيه"}</Badge>
                  <span className="flex-1 text-sm font-medium">{a.title}</span>
                  <span className="text-xs text-muted-foreground">{a.detail}</span>
                </li>
              ))}
            </ul>
          ) : <EmptyState icon={Bell} title="لا توجد تنبيهات مفتوحة" text="سنُنبهك هنا عند اقتراب انتهاء أي عقد خلال ٣٠ يومًا." />}
        </Panel>

        <Panel title="تجديدات العقود القادمة" className="xl:col-span-2">
          {renewals.length ? (
            <ul className="divide-y divide-border">
              {renewals.map((c) => (
                <li key={c.id} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-primary"><CalendarClock className="h-4 w-4" /></span>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{clientName(c.clientId)}</p>
                  </div>
                  <div className="text-end">
                    <p className="text-sm font-medium tabular-nums">{fmtDate(c.endDate)}</p>
                    <p className="text-xs text-muted-foreground">بعد {daysUntil(c.endDate)} يوم</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : <EmptyState icon={CalendarClock} title="لا توجد تجديدات خلال ٩٠ يومًا" text="ستظهر هنا العقود التي يقترب موعد تجديدها." />}
        </Panel>

        <Panel title="آخر النشاطات">
          {d.activity.length ? (
            <ol className="space-y-4 p-5">
              {d.activity.slice(0, 6).map((a) => (
                <li key={a.id} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral" />
                  <div>
                    <p className="text-sm">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{fmtDate(a.at)}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : <EmptyState icon={History} title="لا يوجد نشاط بعد" text="ابدأ بإضافة أول عميل أو موظف." />}
        </Panel>
      </div>

      <EntityForm open={modal === "client"} onOpenChange={(o) => !o && setModal(null)} title="إضافة عميل" fields={clientFields} onSubmit={(v) => { saveClient(v); toast.success("تمت إضافة العميل"); }} />
      <EntityForm open={modal === "employee"} onOpenChange={(o) => !o && setModal(null)} title="إضافة موظف" fields={employeeFields} onSubmit={(v) => { saveEmployee(v); toast.success("تمت إضافة الموظف"); }} />
      <EntityForm open={modal === "contract"} onOpenChange={(o) => !o && setModal(null)} title="إضافة عقد" fields={contractFields(d.clients)} onSubmit={(v) => { saveContract(v); toast.success("تمت إضافة العقد"); }} />
    </>
  );
}
