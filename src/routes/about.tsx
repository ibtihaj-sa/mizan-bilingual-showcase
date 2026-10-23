import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Target, Scale } from "lucide-react";
import { MarketingShell } from "@/components/mizan/MarketingShell";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/about")({
  head: pageHead(
    "من نحن",
    "تعرّف على ميزان MIZAN: منصة تقنية سعودية قيد التطوير لتنظيم الأعمال والمستندات والمتطلبات التشغيلية — رؤيتنا ورسالتنا وقيمنا.",
  ),
  component: About,
});

const values = [
  { t: "الوضوح", d: "نصيغ المعلومة كما هي، ونميز بوضوح بين ما هو متاح وما هو قيد التطوير." },
  { t: "الموثوقية", d: "لا نعرض نتائج أو إحصائيات أو شراكات قبل أن تكون موثقة فعلًا." },
  { t: "البساطة", d: "أدوات منظمة وسهلة تحترم طريقة عمل الشركات المحلية." },
  { t: "المسؤولية", d: "مخرجات المنصة أداة مساعدة للمراجعة، والقرار النهائي دائمًا للإنسان." },
];

function About() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-16 text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-soft">
          <span className="h-2 w-2 rounded-full bg-coral" />
          من نحن
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
          ميزان — منصة تقنية سعودية لتنظيم الأعمال
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          ميزان MIZAN منصة تقنية قيد التطوير، هدفها مساعدة الشركات على تنظيم أعمالها
          وإدارة عملياتها ومستنداتها ومتطلباتها التشغيلية بصورة أكثر وضوحًا وكفاءة،
          بواجهة عربية أولًا صُممت لطريقة عمل الشركات في السعودية والمنطقة.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-8">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-soft text-primary">
            <Eye className="h-5 w-5" />
          </span>
          <h2 className="mt-4 font-display text-xl font-bold text-coral">الرؤية</h2>
          <p className="mt-3 leading-relaxed">
            أن تكون إدارة الأعمال والمستندات والمتطلبات التشغيلية واضحة ومنظمة لكل منشأة،
            مهما كان حجمها أو قطاعها.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-8">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-soft text-primary">
            <Target className="h-5 w-5" />
          </span>
          <h2 className="mt-4 font-display text-xl font-bold text-coral">الرسالة</h2>
          <p className="mt-3 leading-relaxed">
            تبسيط العمل اليومي لفرق الإدارة والعمليات والجودة عبر أدوات منظمة تبدأ باللغة
            العربية، وتجمع المعلومات المتفرقة في صورة واحدة قابلة للمتابعة والمراجعة.
          </p>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-3">
            <Scale className="h-6 w-6 text-coral" />
            <h2 className="font-display text-3xl font-bold">قيمنا</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.t} className="rounded-xl border border-border bg-background p-6">
                <span className="font-display text-sm font-bold text-coral">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-border bg-secondary/50 px-8 py-10">
          <h2 className="font-display text-2xl font-bold">مرحلة المشروع</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
            ميزان في مرحلة التطوير حاليًا. النسخة الحالية تتضمن أساسيات تنظيم البيانات
            والمتابعات والتقارير، بينما لا تزال قدرات أخرى — مثل ربط الأدلة بالمتطلبات
            والمساعد الذكي — ضمن خطة التطوير. نفضل الوضوح على المبالغة: ما تراه في هذا
            الموقع موصوف بحالته الفعلية.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground">
          <h2 className="font-display text-3xl font-bold">هل تريد التعرف على ميزان عن قرب؟</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-75">
            تواصل معنا لأي استفسار تجاري أو لطلب عرض توضيحي.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 font-medium text-accent-foreground"
          >
            تواصل معنا
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
