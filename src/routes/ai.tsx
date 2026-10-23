import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, SearchCheck, UserCheck } from "lucide-react";
import { MarketingShell } from "@/components/mizan/MarketingShell";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/ai")({
  head: pageHead(
    "الذكاء الاصطناعي في ميزان",
    "دور الذكاء الاصطناعي في تنظيم المعلومات وتحليلها ودعم المستخدم — أداة مساعدة للمراجعة واتخاذ القرار، وليست بديلًا عن المسؤول البشري.",
  ),
  component: AiPage,
});

function AiPage() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-16 text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-soft">
          <span className="h-2 w-2 rounded-full bg-coral" />
          الذكاء الاصطناعي
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
          ذكاء اصطناعي يخدم المستخدم، ولا يحل محله
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          نرى الذكاء الاصطناعي أداة مساعدة في تنظيم المعلومات وتحليلها، بينما تبقى
          المراجعة والمسؤولية والقرار النهائي للإنسان.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-7">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-soft text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          <h2 className="mt-4 font-display text-lg font-bold">التنظيم والتحليل</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            مساعدة المستخدم في ترتيب المعلومات وتحليلها واستخراج ما يحتاج إلى انتباه،
            بدلًا من المراجعة اليدوية الكاملة.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-7">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-soft text-primary">
            <SearchCheck className="h-5 w-5" />
          </span>
          <h2 className="mt-4 font-display text-lg font-bold">تحديد النواقص</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            اقتراح ما يبدو ناقصًا أو يحتاج إلى متابعة، ليراجعه المستخدم ويتحقق منه قبل
            اعتماده.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-7">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-soft text-primary">
            <UserCheck className="h-5 w-5" />
          </span>
          <h2 className="mt-4 font-display text-lg font-bold">القرار للإنسان</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            مخرجات الذكاء الاصطناعي في ميزان أداة مساعدة للمراجعة واتخاذ القرار، وليست
            بديلًا عن المسؤول البشري في أي حال.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-border bg-secondary/50 px-8 py-10">
          <h2 className="font-display text-2xl font-bold">الحالة الحالية</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
            قدرات الذكاء الاصطناعي في ميزان لا تزال ضمن خطة التطوير ولم تُطرح في النسخة
            الحالية. سنعلن عنها عند جاهزيتها، وسنوضح حينها بالتفصيل ما تقوم به وما لا
            تقوم به، وحدود الاعتماد عليها.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground">
          <h2 className="font-display text-3xl font-bold">مهتم بمستقبل ميزان؟</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-75">
            تواصل معنا لمعرفة المزيد عن خطة التطوير وتوجهات المنصة.
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
