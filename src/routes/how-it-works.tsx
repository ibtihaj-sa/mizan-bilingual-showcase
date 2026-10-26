import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderTree, Link2, ListChecks, Sparkles } from "lucide-react";
import { MarketingShell } from "@/components/mizan/MarketingShell";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/how-it-works")({
  head: pageHead(
    "كيف تعمل ميزان",
    "تنظيم المستندات والمعلومات، ربط الأدلة والمتطلبات، تحديد النواقص، والاستفادة من الذكاء الاصطناعي — مع توضيح ما هو متاح حاليًا وما هو ضمن خطة التطوير.",
  ),
  component: HowItWorks,
});

type Capability = {
  icon: typeof FolderTree;
  t: string;
  d: string;
  status: "available" | "planned";
};

const capabilities: Capability[] = [
  {
    icon: FolderTree,
    t: "تنظيم بيانات المنشأة",
    d: "متاح حاليًا: تسجيل بيانات المنشأة والعملاء والموظفين والعقود في مكان واحد. رفع المستندات وتنظيمها ضمن خطة التطوير.",
    status: "available",
  },
  {
    icon: ListChecks,
    t: "تنبيهات انتهاء العقود",
    d: "متاح حاليًا: تنبيه داخل لوحة التحكم بالعقود المنتهية أو التي تنتهي خلال ٣٠ يومًا. إدارة المهام ضمن خطة التطوير.",
    status: "available",
  },
  {
    icon: Link2,
    t: "ربط الأدلة والمتطلبات ذات الصلة",
    d: "ربط كل متطلب بالأدلة والمستندات المرتبطة به، لتسهيل المراجعة وإثبات الامتثال.",
    status: "planned",
  },
  {
    icon: Sparkles,
    t: "تحديد النواقص بالذكاء الاصطناعي",
    d: "تحليل المعلومات للمساعدة في تحديد النواقص ومجالات التحسين، مع بقاء المراجعة والقرار للمستخدم.",
    status: "planned",
  },
];

function HowItWorks() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-16 text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-soft">
          <span className="h-2 w-2 rounded-full bg-coral" />
          كيف تعمل ميزان
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
          من معلومات متفرقة إلى صورة واضحة
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          نعرض كل قدرة بحالتها الفعلية: ما هو متاح في النسخة الحالية، وما لا يزال ضمن
          خطة التطوير.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 font-bold text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            متاح في النسخة الحالية
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-soft px-3 py-1 font-bold text-warning">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            ضمن خطة التطوير
          </span>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-2">
        {capabilities.map((c) => (
          <div key={c.t} className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center justify-between gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-soft text-primary">
                <c.icon className="h-6 w-6" />
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                  c.status === "available"
                    ? "bg-success-soft text-success"
                    : "bg-warning-soft text-warning"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {c.status === "available" ? "متاح حاليًا" : "ضمن خطة التطوير"}
              </span>
            </div>
            <h2 className="mt-5 font-display text-xl font-bold">{c.t}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{c.d}</p>
          </div>
        ))}
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground">
          <h2 className="font-display text-3xl font-bold">ما الاستخدامات التي تخدمها هذه القدرات؟</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-75">
            اطلع على الحلول والاستخدامات العملية التي تستهدفها ميزان.
          </p>
          <Link
            to="/solutions"
            className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 font-medium text-accent-foreground"
          >
            الحلول والاستخدامات
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
