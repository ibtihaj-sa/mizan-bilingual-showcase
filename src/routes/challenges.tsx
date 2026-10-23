import { createFileRoute, Link } from "@tanstack/react-router";
import { Files, ClipboardList, SearchX, Clock } from "lucide-react";
import { MarketingShell } from "@/components/mizan/MarketingShell";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/challenges")({
  head: pageHead(
    "التحديات التي نعالجها",
    "تشتت المستندات والمعلومات، صعوبة متابعة المتطلبات والإجراءات، غياب الرؤية الواضحة للنواقص، والوقت المستهلك في التنظيم — هذه التحديات التي تستهدفها ميزان.",
  ),
  component: Challenges,
});

const challenges = [
  {
    icon: Files,
    t: "تشتت المستندات والمعلومات",
    d: "تتوزع المستندات والبيانات بين ملفات وجداول ورسائل متفرقة، فيصعب الوصول إلى المعلومة الصحيحة في الوقت المناسب.",
  },
  {
    icon: ClipboardList,
    t: "صعوبة متابعة المتطلبات والإجراءات",
    d: "تتعدد المتطلبات والإجراءات وتتشابك، ومع غياب أداة منظمة تضيع المواعيد وتتكرر الأخطاء.",
  },
  {
    icon: SearchX,
    t: "غياب الرؤية الواضحة للنواقص",
    d: "يصعب معرفة ما هو مكتمل وما هو ناقص وما يحتاج إلى متابعة، فتتأخر القرارات أو تُبنى على صورة غير مكتملة.",
  },
  {
    icon: Clock,
    t: "الوقت المستهلك في التنظيم",
    d: "يستهلك ترتيب الأعمال والمعلومات يدويًا وقتًا وجهدًا كان يمكن توجيههما إلى عمل أكثر قيمة.",
  },
];

function Challenges() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-16 text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-soft">
          <span className="h-2 w-2 rounded-full bg-coral" />
          التحديات
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
          مشكلات مألوفة لدى كثير من المنشآت
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          وُلدت فكرة ميزان من ملاحظة تحديات متكررة تواجه الشركات في تنظيم أعمالها
          ومعلوماتها. هذه هي التحديات التي نركز على معالجتها.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-2">
        {challenges.map((c, i) => (
          <div key={c.t} className="rounded-2xl border border-border bg-card p-8">
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-coral-soft text-coral">
                <c.icon className="h-6 w-6" />
              </span>
              <span className="font-display text-3xl font-bold text-muted">0{i + 1}</span>
            </div>
            <h2 className="mt-5 font-display text-xl font-bold">{c.t}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{c.d}</p>
          </div>
        ))}
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground">
          <h2 className="font-display text-3xl font-bold">كيف تتعامل ميزان مع هذه التحديات؟</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-75">
            تعرّف على طريقة عمل المنصة والقدرات التي تستهدف معالجة هذه المشكلات.
          </p>
          <Link
            to="/how-it-works"
            className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 font-medium text-accent-foreground"
          >
            كيف تعمل ميزان
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
