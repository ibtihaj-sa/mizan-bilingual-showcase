import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Field, MButton, PageHeader, Panel, inputCls } from "@/components/mizan/ui";
import { clearAll } from "@/lib/mizan-store";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/dashboard/settings")({
  head: pageHead("الإعدادات", "إعدادات حساب الشركة في ميزان."),
  component: Settings,
});

function Settings() {
  return (
    <>
      <PageHeader title="الإعدادات" />
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="بيانات الشركة" className="lg:col-span-2">
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <Field label="اسم الشركة"><input className={inputCls} placeholder="مثال: شركة الأفق" /></Field>
            <Field label="السجل التجاري"><input className={inputCls} dir="ltr" /></Field>
            <Field label="المدينة"><input className={inputCls} placeholder="الرياض" /></Field>
            <Field label="البريد الإلكتروني"><input type="email" className={inputCls} dir="ltr" /></Field>
            <p className="text-xs text-muted-foreground sm:col-span-2">حفظ بيانات الشركة يتطلب ربط النظام بخادم، وهو غير مفعل حاليًا.</p>
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
