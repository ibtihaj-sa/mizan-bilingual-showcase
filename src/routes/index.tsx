import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Link2, ListChecks, BarChart3, Building2, ShieldCheck, Settings2, FolderOpen } from "lucide-react";
import { MarketingShell } from "@/components/mizan/MarketingShell";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/")({
  head: pageHead(
    "منصة تقنية سعودية لتنظيم الأعمال والمستندات",
    "ميزان MIZAN منصة تقنية سعودية قيد التطوير تساعد الشركات على تنظيم أعمالها ومستنداتها ومتطلباتها التشغيلية بصورة أوضح وأكثر كفاءة.",
  ),
  component: Home,
});

const capabilities = [
  { icon: FileText, t: "تنظيم المستندات والمعلومات", d: "تجميع بيانات المنشأة وسجلاتها في مكان واحد منظم بدل تشتتها بين الملفات والرسائل." },
  { icon: Link2, t: "ربط المتطلبات ذات الصلة", d: "ربط الأدلة والمتطلبات والإجراءات المترابطة لتسهيل المتابعة والمراجعة." },
  { icon: ListChecks, t: "متابعة المهام والنواقص", d: "رؤية أوضح لما هو مكتمل وما يحتاج إلى متابعة أو استكمال." },
  { icon: BarChart3, t: "مؤشرات تدعم القرار", d: "تقارير ومؤشرات مبنية على البيانات المُدخلة تساعد الإدارة على اتخاذ القرار." },
];

const audience = [
  { icon: Building2, t: "الشركات والمنشآت", d: "التي تبحث عن طريقة أوضح لتنظيم أعمالها ومعلوماتها." },
  { icon: ShieldCheck, t: "فرق الجودة والامتثال", d: "التي تتابع المتطلبات والأدلة والإجراءات باستمرار." },
  { icon: Settings2, t: "فرق العمليات والإدارة", d: "التي تحتاج إلى رؤية واضحة للمهام والمتابعات." },
  { icon: FolderOpen, t: "الجهات متعددة المستندات", d: "التي تتعامل مع مستندات ومتطلبات متعددة ومتشعبة." },
];

function Home() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-2">
        <div className="animate-rise">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-soft">
            <span className="h-2 w-2 rounded-full bg-coral" />
            منصة تقنية سعودية — قيد التطوير
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight md:text-6xl">
            وضوح أكبر في<br />
            <span className="text-coral">تنظيم أعمالك.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            ميزان منصة تقنية تهدف إلى مساعدة الشركات على تنظيم أعمالها وإدارة عملياتها
            ومستنداتها ومتطلباتها التشغيلية بصورة أكثر وضوحًا وكفاءة — من مكان واحد.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-accent px-7 py-3.5 font-medium text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              تواصل معنا
            </Link>
            <Link
              to="/how-it-works"
              className="rounded-full border border-border px-7 py-3.5 font-medium transition-colors hover:bg-muted"
            >
              استكشف ميزان
            </Link>
          </div>
        </div>

        {/* Abstract visual: organised documents */}
        <div className="animate-rise overflow-hidden rounded-3xl border border-border bg-card shadow-soft" style={{ animationDelay: "0.15s" }}>
          <div className="flex gap-1.5 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-coral" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          </div>
          <div className="space-y-4 p-6">
            {[
              { label: "المستندات", w: "82%", tone: "bg-primary/80" },
              { label: "المتطلبات", w: "64%", tone: "bg-coral" },
              { label: "المهام", w: "74%", tone: "bg-primary/80" },
              { label: "المتابعات", w: "52%", tone: "bg-coral" },
            ].map((r) => (
              <div key={r.label} className="rounded-xl bg-background p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{r.label}</span>
                  <span className="text-xs text-muted-foreground">منظمة</span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-muted">
                  <div className={`h-1.5 rounded-full ${r.tone}`} style={{ width: r.w }} />
                </div>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-3">
              {["أدلة مربوطة", "نواقص محددة", "رؤية واضحة"].map((s) => (
                <div key={s} className="rounded-xl border border-border bg-background p-3 text-center text-xs font-medium text-muted-foreground">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-card py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-bold text-coral">ماذا تقدم ميزان</p>
          <h2 className="mt-3 font-display text-4xl font-bold">من التشتت إلى التنظيم</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            تركز ميزان على تحويل المعلومات المتفرقة إلى صورة واضحة قابلة للمتابعة والمراجعة،
            مع الاستفادة من الذكاء الاصطناعي في التحليل والتنظيم.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((f) => (
              <div key={f.t} className="rounded-2xl border border-border bg-background p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-soft text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/how-it-works" className="text-sm font-bold text-coral transition-colors hover:text-coral/80">
              تعرّف على كيفية عمل ميزان ←
            </Link>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-bold text-coral">لمن صُممت ميزان</p>
        <h2 className="mt-3 font-display text-4xl font-bold">للجهات التي تتعامل مع تفاصيل كثيرة</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audience.map((a) => (
            <div key={a.t} className="border-t-2 border-primary pt-6">
              <a.icon className="h-6 w-6 text-coral" />
              <h3 className="mt-4 font-display text-lg font-semibold">{a.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Honesty band */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-2xl border border-border bg-secondary/50 px-8 py-10">
          <h2 className="font-display text-2xl font-bold">أين نقف اليوم؟</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
            ميزان مشروع في مرحلة التطوير. بعض القدرات متاحة في النسخة الحالية، وبعضها لا يزال
            ضمن خطة التطوير — ونحرص على توضيح الفرق بينهما في كل صفحات هذا الموقع. لا نعرض
            إحصائيات أو نتائج أو شراكات قبل أن تكون موثقة فعلًا.
          </p>
          <Link to="/about" className="mt-5 inline-block text-sm font-bold text-coral transition-colors hover:text-coral/80">
            اقرأ المزيد عن ميزان ←
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <h2 className="font-display text-4xl font-bold">هل تناسب ميزان منشأتك؟</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-75">
            يسعدنا التعرف على احتياجك والإجابة عن استفساراتك حول المنصة وتوجهاتها.
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
