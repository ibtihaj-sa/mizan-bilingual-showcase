import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/mizan/MarketingShell";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/privacy")({ head: pageHead("سياسة الخصوصية", "مسودة سياسة الخصوصية لمنصة ميزان وكيفية حفظ البيانات حاليًا."), component: Page });

const items: [string, string][] = [["أين تُحفظ بياناتك","بيانات لوحة التحكم ونموذج التواصل تُحفظ في متصفحك على جهازك فقط، ولا تُرسل إلى أي خادم تابع لميزان."],["ما لا نجمعه","لا توجد حسابات مستخدمين حاليًا، ولا نجمع كلمات مرور أو بيانات دفع."],["حذف البيانات","يمكنك حذف جميع بيانات لوحة التحكم من صفحة الإعدادات، أو بمسح بيانات الموقع من متصفحك."],["التحديثات","ستُحدّث هذه السياسة عند ربط المنصة بخادم ونظام حسابات."]];

function Page() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl font-bold">سياسة الخصوصية</h1>
        <p className="mt-4 rounded-lg bg-warning-soft p-3 text-sm text-warning">مسودة أولية للمراجعة القانونية ولم تُعتمد بعد.</p>
        {items.map(([h, t]) => (
          <section key={h} className="mt-8">
            <h2 className="text-xl font-bold">{h}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{t}</p>
          </section>
        ))}
      </article>
    </MarketingShell>
  );
}
