import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { Badge, DataTable, EmptyState, MButton, PageHeader, Panel } from "@/components/mizan/ui";
import { EntityForm } from "@/components/mizan/EntityForm";
import { employeeFields, saveEmployee } from "@/components/mizan/entities";
import { fmtDate, removeItem, useMizan } from "@/lib/mizan-store";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/dashboard/employees")({
  head: pageHead("الموظفون", "سجل موظفي شركتك في ميزان."),
  component: Employees,
});

function Employees() {
  const { employees } = useMizan();
  const [open, setOpen] = useState(false);
  const add = <MButton onClick={() => setOpen(true)}><Plus />إضافة موظف</MButton>;
  return (
    <>
      <PageHeader title="الموظفون" text={`${employees.length} موظف`} actions={add} />
      <Panel>
        <DataTable
          rows={employees}
          empty={<EmptyState icon={Users} title="لا يوجد موظفون بعد" text="أضف موظفيك لبناء سجل موحد للفريق." action={add} />}
          columns={[
            { key: "n", label: "الموظف", render: (e) => (
              <span className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-soft text-xs font-bold text-primary">{e.name.slice(0, 1)}</span>
                <span className="font-bold">{e.name}</span>
              </span>
            ) },
            { key: "r", label: "المسمى الوظيفي", render: (e) => e.role },
            { key: "d", label: "القسم", render: (e) => e.department ? <Badge tone="info">{e.department}</Badge> : "—" },
            { key: "s", label: "تاريخ الالتحاق", render: (e) => fmtDate(e.startDate) },
            { key: "x", label: "", className: "w-12", render: (e) => <MButton size="icon" variant="danger" aria-label="حذف" onClick={() => { removeItem("employees", e.id); toast("تم حذف الموظف"); }}><Trash2 /></MButton> },
          ]}
        />
      </Panel>
      <EntityForm open={open} onOpenChange={setOpen} title="إضافة موظف" fields={employeeFields} onSubmit={(v) => { saveEmployee(v); toast.success("تمت إضافة الموظف"); }} />
    </>
  );
}
