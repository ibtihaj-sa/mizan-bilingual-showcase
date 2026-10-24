import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Field, MButton, PageHeader, Panel, inputCls } from "@/components/mizan/ui";
import { clearAll, saveCompany, useMizan } from "@/lib/mizan-store";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/dashboard/settings")({
  head: pageHead("الإعدادات", "إعدادات حساب الشركة في ميزان."),
  component: Settings,
});

type CompanyForm = { name: string; cr: string; city: string; email: string };

function Settings() {
  const { company } = useMizan();
  const [form, setForm] = useState<CompanyForm>({ name: "", cr: "", city: "", email: "" });

  // Seed the form from the store after mount (store is empty during SSR).
  useEffect(() => {
    setForm({ name: company.name, cr: company.cr, city: company.city, email: company.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (k: keyof CompanyForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const save = () => {
    saveCompany({
      name: form.name.trim(),
      cr: form.cr.trim(),
      city: form.city.trim(),
      email: form.email.trim(),
    });
    toast.success("تم حفظ بيانات الشركة في هذا المتصفح.");
  };

  return (
    <>
      <PageHeader title="الإعدادات" />
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="بيانات الشركة" className="lg:col-span-2">
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <Field label="اسم الشركة"><input className={inputCls} value={form.name} onChange={set("name")} placeholder="مثال: شركة الأفق" /></Field>
            <Field label="السجل التجاري"><input className={inputCls} dir="ltr" value={form.cr} onChange={set("cr")} /></Field>
            <Field label="المدينة"><input className={inputCls} value={form.city} onChange={set("city")} placeholder="الرياض" /></Field>
            <Field label="البريد الإلكتروني"><input type="email" className={inputCls} dir="ltr" value={form.email} onChange={set("email")} /></Field>
            <div className="sm:col-span-2">
              <MButton onClick={save}>حفظ بيانات الشركة</MButton>
              <p className="mt-3 text-xs text-muted-foreground">تُحفظ بيانات الشركة في هذا المتصفح فقط ولا تُرسل لأي خادم؛ مزامنتها بين الأجهزة تتطلب ربط النظام بخادم.</p>
            </div>
          </div>
        </Panel>
        <Panel title="البيانات">
          <div className="space-y-4 p-5 text-sm text-muted-foreground">
            <p>بياناتك محفوظة في هذا المتصفح فقط ولا تُرسل لأي خادم.</p>
            <MButton variant="outline" className="w-full text-destructive" onClick={() => { if (confirm("حذف جميع البيانات؟")) { clearAll(); toast("تم حذف جميع البيانات"); } }}>حذف جميع البيانات</MButton>
          </div>
        </Panel>
      </div>
    </>
  );
}
