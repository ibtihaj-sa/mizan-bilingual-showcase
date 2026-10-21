import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DataTable, EmptyState, MButton, PageHeader, Panel } from "@/components/mizan/ui";
import { EntityForm } from "@/components/mizan/EntityForm";
import { clientFields, saveClient } from "@/components/mizan/entities";
import { fmtDate, removeItem, useMizan } from "@/lib/mizan-store";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/dashboard/clients")({
  head: pageHead("العملاء", "إدارة عملاء شركتك في ميزان."),
  component: Clients,
});

function Clients() {
  const { clients } = useMizan();
  const [open, setOpen] = useState(false);
  const add = <MButton onClick={() => setOpen(true)}><Plus />إضافة عميل</MButton>;
  return (
    <>
      <PageHeader title="العملاء" text={`${clients.length} عميل مسجل`} actions={add} />
      <Panel>
        <DataTable
          rows={clients}
          empty={<EmptyState icon={Building2} title="لا يوجد عملاء بعد" text="أضف أول عميل لتبدأ بربط العقود به." action={add} />}
          columns={[
            { key: "n", label: "العميل", render: (c) => <span className="font-bold">{c.name}</span> },
            { key: "s", label: "القطاع", render: (c) => c.sector || "—" },
            { key: "c", label: "المدينة", render: (c) => c.city || "—" },
            { key: "p", label: "التواصل", render: (c) => <span className="text-muted-foreground" dir="ltr">{c.phone || c.email || "—"}</span> },
            { key: "d", label: "تاريخ الإضافة", render: (c) => fmtDate(c.createdAt) },
            { key: "x", label: "", className: "w-12", render: (c) => <MButton size="icon" variant="danger" aria-label="حذف" onClick={() => { removeItem("clients", c.id); toast("تم حذف العميل"); }}><Trash2 /></MButton> },
          ]}
        />
      </Panel>
      <EntityForm open={open} onOpenChange={setOpen} title="إضافة عميل" fields={clientFields} onSubmit={(v) => { saveClient(v); toast.success("تمت إضافة العميل"); }} />
    </>
  );
}
