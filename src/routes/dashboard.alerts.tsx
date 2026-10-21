import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Bell } from "lucide-react";
import { Badge, EmptyState, PageHeader, Panel } from "@/components/mizan/ui";
import { deriveAlerts, useMizan } from "@/lib/mizan-store";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/dashboard/alerts")({
  head: pageHead("التنبيهات", "تنبيهات العقود المنتهية والقريبة من الانتهاء."),
  component: Alerts,
});

function Alerts() {
  const alerts = deriveAlerts(useMizan());
  return (
    <>
      <PageHeader title="التنبيهات" text="تنبيهات تلقائية للعقود المنتهية أو التي تنتهي خلال ٣٠ يومًا." />
      <Panel>
        {alerts.length ? (
          <ul className="divide-y divide-border">
            {alerts.map((a) => (
              <li key={a.id} className="flex items-center gap-4 px-5 py-4">
                <span className={a.level === "critical" ? "grid h-10 w-10 place-items-center rounded-lg bg-coral-soft text-destructive" : "grid h-10 w-10 place-items-center rounded-lg bg-warning-soft text-warning"}>
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-bold">{a.title}</p>
                  <p className="text-sm text-muted-foreground">{a.detail}</p>
                </div>
                <Badge tone={a.level === "critical" ? "danger" : "warning"}>{a.level === "critical" ? "عاجل" : "متابعة"}</Badge>
              </li>
            ))}
          </ul>
        ) : <EmptyState icon={Bell} title="كل شيء على ما يرام" text="لا توجد تنبيهات مفتوحة حاليًا." />}
      </Panel>
    </>
  );
}
