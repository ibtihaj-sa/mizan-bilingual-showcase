import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge, DataTable, EmptyState, MButton, PageHeader, Panel } from "@/components/mizan/ui";
import { EntityForm } from "@/components/mizan/EntityForm";
import { contractFields, saveContract } from "@/components/mizan/entities";
import { contractStatus, fmtDate, fmtSAR, removeItem, useMizan } from "@/lib/mizan-store";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/dashboard/contracts")({
  head: pageHead("العقود", "متابعة عقود العملاء ومواعيد التجديد في ميزان."),
  component: Contracts,
});

const status = {
  active: { tone: "success", label: "نشط" },
  expiring: { tone: "warning", label: "ينتهي قريبًا" },
  expired: { tone: "danger", label: "منتهٍ" },
  upcoming: { tone: "info", label: "لم يبدأ" },
} as const;

function Contracts() {
  const { contracts, clients } = useMizan();
  const [open, setOpen] = useState(false);
  const add = <MButton onClick={() => setOpen(true)}><Plus />إضافة عقد</MButton>;
  return (
    <>
      <PageHeader title="العقود" text={`${contracts.length} عقد`} actions={add} />
      <Panel>
        <DataTable
          rows={contracts}
          empty={<EmptyState icon={FileText} title="لا توجد عقود بعد" text="أضف عقدًا وحدد تاريخ انتهائه لتصلك تنبيهات التجديد." action={add} />}
          columns={[
            { key: "t", label: "العقد", render: (c) => <span className="font-bold">{c.title}</span> },
            { key: "c", label: "العميل", render: (c) => clients.find((x) => x.id === c.clientId)?.name ?? "—" },
            { key: "v", label: "القيمة", render: (c) => <span className="tabular-nums">{fmtSAR(c.value)}</span> },
            { key: "e", label: "تاريخ الانتهاء", render: (c) => fmtDate(c.endDate) },
            { key: "s", label: "الحالة", render: (c) => { const s = status[contractStatus(c)]; return <Badge tone={s.tone}>{s.label}</Badge>; } },
            { key: "x", label: "", className: "w-12", render: (c) => <MButton size="icon" variant="danger" aria-label="حذف" onClick={() => { removeItem("contracts", c.id); toast("تم حذف العقد"); }}><Trash2 /></MButton> },
          ]}
        />
      </Panel>
      <EntityForm open={open} onOpenChange={setOpen} title="إضافة عقد" fields={contractFields(clients)} onSubmit={(v) => { saveContract(v); toast.success("تمت إضافة العقد"); }} />
    </>
  );
}
