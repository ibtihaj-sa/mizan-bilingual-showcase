import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { EmptyState, KpiCard, PageHeader, Panel } from "@/components/mizan/ui";
import { contractStatus, fmtSAR, useMizan } from "@/lib/mizan-store";
import { pageHead } from "@/lib/mizan-head";
import { Building2, FileText, Wallet } from "lucide-react";

export const Route = createFileRoute("/dashboard/reports")({
  head: pageHead("التقارير", "ملخص أداء العقود والعملاء والموظفين."),
  component: Reports,
});

const labels = { active: "نشط", expiring: "ينتهي قريبًا", expired: "منتهٍ", upcoming: "لم يبدأ" } as const;

function Reports() {
  const d = useMizan();
  const total = d.contracts.reduce((s, c) => s + c.value, 0);
  const byStatus = (Object.keys(labels) as (keyof typeof labels)[]).map((k) => ({ k, n: d.contracts.filter((c) => contractStatus(c) === k).length }));
  const depts = Object.entries(d.employees.reduce<Record<string, number>>((m, e) => ({ ...m, [e.department || "غير محدد"]: (m[e.department || "غير محدد"] ?? 0) + 1 }), {}));
  const max = Math.max(1, ...depts.map(([, n]) => n));
  return (
    <>
      <PageHeader title="التقارير" text="أرقام محسوبة مباشرة من بياناتك المسجلة." />
      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="إجمالي قيمة العقود" value={fmtSAR(total)} icon={Wallet} />
        <KpiCard label="عدد العقود" value={d.contracts.length} icon={FileText} />
        <KpiCard label="متوسط العقود لكل عميل" value={d.clients.length ? (d.contracts.length / d.clients.length).toFixed(1) : "0"} icon={Building2} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="العقود حسب الحالة">
          {d.contracts.length ? (
            <ul className="space-y-4 p-5">
              {byStatus.map(({ k, n }) => (
                <li key={k}>
                  <div className="mb-1.5 flex justify-between text-sm"><span>{labels[k]}</span><span className="font-bold tabular-nums">{n}</span></div>
                  <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${(n / d.contracts.length) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          ) : <EmptyState icon={BarChart3} title="لا توجد بيانات كافية" text="أضف عقودًا لعرض التوزيع." />}
        </Panel>
        <Panel title="الموظفون حسب القسم">
          {depts.length ? (
            <ul className="space-y-4 p-5">
              {depts.map(([k, n]) => (
                <li key={k}>
                  <div className="mb-1.5 flex justify-between text-sm"><span>{k}</span><span className="font-bold tabular-nums">{n}</span></div>
                  <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-coral" style={{ width: `${(n / max) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          ) : <EmptyState icon={BarChart3} title="لا توجد بيانات كافية" text="أضف موظفين لعرض التوزيع." />}
        </Panel>
      </div>
    </>
  );
}
