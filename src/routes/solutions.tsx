import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderOpen, ShieldCheck, ListTodo, BarChart3 } from "lucide-react";
import { MarketingShell } from "@/components/mizan/MarketingShell";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/solutions")({
  head: pageHead(
    "الحلول والاستخدامات",
    "تنظيم الوثائق والإجراءات، دعم الجودة والامتثال، متابعة المهام والمتطلبات التشغيلية، وتحليل المعلومات لتقديم مؤشرات تساعد على اتخاذ القرار.",
  ),
  component: Solutions,
});

const solutions = [
  {
    icon: FolderOpen,
    t: "تنظيم الوثائق والإجراءات",
    d: "مكان واحد لترتيب وثائق المنشأة وإجراءاتها، بحيث يسهل الوصول إليها ومراجعتها وتحديثها.",
    points: ["تجميع السجلات في مكان واحد", "تصنيف واضح يسهل البحث", "تقليل الاعتماد على الملفات المتفرقة"],
  },
  {
    icon: ShieldCheck,
    t: "دعم الجودة والامتثال",
    d: "مساعدة فرق الجودة والامتثال على متابعة المتطلبات والأدلة المرتبطة بها بصورة منظمة.",
    points: ["متابعة المتطلبات وحالتها", "ربط الأدلة بالمتطلبات", "صورة أوضح لجاهزية المنشأة"],
  },
  {
    icon: ListTodo,
    t: "متابعة المهام والمتطلبات التشغيلية",
    d: "رؤية واضحة لما هو مكتمل وما هو قيد التنفيذ وما يحتاج إلى متابعة أو استكمال.",
    points: ["تنبيهات لما يقترب من موعده", "تحديد النواقص والمتابعات", "تقليل ما يضيع بين الفرق"],
  },
  {
    icon: BarChart3,
    t: "تحليل المعلومات ودعم القرار",
    d: "مؤشرات وتقارير مبنية على البيانات المُدخلة تساعد الإدارة على فهم الوضع واتخاذ القرار.",
    points: ["تقارير من بياناتك الفعلية", "مؤشرات تلخص الوضع العام", "أساس أوضح للنقاش والقرار"],
  },
];

function Solutions() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-16 text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-soft">
          <span className="h-2 w-2 rounded-full bg-coral" />
          الحلول والاستخدامات
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
          استخدامات عملية لفرقك اليومية
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          تستهدف ميزان أربعة مجالات استخدام رئيسية، تتطور تدريجيًا مع تطور المنصة.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-2">
        {solutions.map((s) => (
          <div key={s.t} className="rounded-2xl border border-border bg-card p-8">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-soft text-primary">
              <s.icon className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-xl font-bold">{s.t}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{s.d}</p>
            <ul className="mt-5 space-y-2.5">
              {s.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-coral" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground">
          <h2 className="font-display text-3xl font-bold">هل لديك استخدام محدد في ذهنك؟</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-75">
            أخبرنا عن احتياج منشأتك، وسنوضح لك كيف يمكن لميزان أن تخدمه.
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
