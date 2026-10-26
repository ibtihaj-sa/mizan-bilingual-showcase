import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/mizan/MarketingShell";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/terms")({ head: pageHead("الشروط والأحكام", "مسودة الشروط والأحكام لاستخدام منصة ميزان."), component: Page });

const items: [string, string][] = [["طبيعة الخدمة","ميزان منصة قيد التطوير. النسخة الحالية تجريبية وتعمل داخل متصفحك فقط."],["الاستخدام","يلتزم المستخدم باستخدام المنصة لأغراض مشروعة وإدخال بيانات يملك حق استخدامها."],["المسؤولية","تُقدَّم النسخة الحالية كما هي دون ضمان، والقرارات المتخذة بناءً عليها مسؤولية المستخدم."],["الاشتراك والتجربة","ستُحدد شروط التجربة المجانية والاشتراك المدفوع عند إطلاق الحسابات، ولا توجد رسوم حاليًا."]];

function Page() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl font-bold">الشروط والأحكام</h1>
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
