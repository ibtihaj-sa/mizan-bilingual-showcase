import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import mark from "@/assets/mizan-mark.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن ميزان | About MIZAN" },
      { name: "description", content: "تعرّف على ميزان: منصة عربية أولًا لإدارة الموارد البشرية وعمليات الأعمال للشركات وفرق التشغيل." },
      { property: "og:title", content: "عن ميزان | About MIZAN" },
      { property: "og:description", content: "منصة عربية أولًا لإدارة الموظفين والعقود والتنبيهات والتقارير." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

type Feature = { t: string; d: string; soon?: boolean };

const copy = {
  ar: {
    dir: "rtl" as const, switch: "English", home: "الرئيسية", dash: "لوحة التحكم",
    tag: "عن ميزان",
    title: "منصة عربية أولًا لإدارة الموارد البشرية وعمليات الأعمال",
    intro: "ميزان منصة صُممت للشركات في السعودية والمنطقة، تجمع بيانات الموظفين والعقود والتنبيهات والتقارير في مكان واحد، بواجهة عربية أولًا ودعم كامل للإنجليزية.",
    visionT: "الرؤية", vision: "أن تكون إدارة الموارد البشرية والعمليات واضحة ومتوازنة لكل فريق، مهما كان حجمه.",
    missionT: "الرسالة", mission: "تبسيط العمل اليومي لفرق الموارد البشرية والإدارة عبر أدوات منظمة وسهلة، تبدأ باللغة العربية وتحترم طريقة عمل الشركات المحلية.",
    probT: "المشكلة", prob: "تتوزع بيانات الموظفين والعقود بين جداول ورسائل وملفات متفرقة، فتضيع مواعيد التجديد ويصعب الحصول على صورة واضحة.",
    solT: "الحل", sol: "سجل موحد للموظفين والعملاء والعقود، مع تنبيهات تلقائية قبل انتهاء العقود وتقارير مباشرة من البيانات المُدخلة.",
    featT: "المزايا الأساسية", soon: "قيد التطوير",
    features: [
      { t: "إدارة الموظفين", d: "ملف لكل موظف يشمل القسم والمسمى وتاريخ التعيين." },
      { t: "العقود", d: "تسجيل العقود ومتابعة حالتها: سارٍ، قارب على الانتهاء، منتهٍ." },
      { t: "التنبيهات", d: "تنبيه للعقود المنتهية أو التي تنتهي خلال 30 يومًا." },
      { t: "التقارير", d: "إجماليات العقود وتوزيع الموظفين على الأقسام." },
      { t: "المستندات", d: "حفظ وثائق الموظفين والعقود في مكان واحد.", soon: true },
      { t: "البحث الذكي", d: "البحث في بيانات المنصة بلغتك الطبيعية.", soon: true },
    ] as Feature[],
    aiT: "دور الذكاء الاصطناعي",
    ai: "نعمل على إضافة مساعد ذكي يساعد في البحث داخل البيانات وتلخيص المعلومات واقتراح ما يحتاج إلى متابعة. هذه الميزة غير متاحة بعد في النسخة الحالية، وسنعلن عنها عند جاهزيتها.",
    audT: "لمن صُمم ميزان؟",
    aud: ["الشركات الصغيرة والمتوسطة", "فرق الموارد البشرية", "الإدارة العليا", "فرق التشغيل"],
    contactT: "التواصل",
    contact: "بيانات التواصل الرسمية لم تُضف بعد.",
    ctaT: "هل تريد التعرف على ميزان عن قرب؟", ctaS: "جرّب لوحة التحكم الآن، أو تواصل مع فريقنا لطلب عرض توضيحي عند توفر بيانات التواصل.",
    ctaB: "جرّب لوحة التحكم",
  },
  en: {
    dir: "ltr" as const, switch: "العربية", home: "Home", dash: "Dashboard",
    tag: "About MIZAN",
    title: "An Arabic-first platform for HR and business operations",
    intro: "Mizan is built for companies in Saudi Arabia and the region. It brings employee records, contracts, alerts and reports into one place, Arabic-first with full English support.",
    visionT: "Vision", vision: "Clear, balanced HR and operations for every team, whatever its size.",
    missionT: "Mission", mission: "Simplify daily work for HR and management teams with organised, easy tools that start in Arabic and respect how local companies work.",
    probT: "The problem", prob: "Employee and contract data is scattered across spreadsheets, messages and files, so renewals get missed and the full picture is hard to see.",
    solT: "The solution", sol: "One record for employees, clients and contracts, with automatic alerts before contracts end and reports built directly from your data.",
    featT: "Core features", soon: "In development",
    features: [
      { t: "Employee management", d: "A file per employee with department, title and hire date." },
      { t: "Contracts", d: "Track each contract's status: active, expiring, or expired." },
      { t: "Alerts", d: "Alerts for contracts that have ended or end within 30 days." },
      { t: "Reports", d: "Contract totals and employees by department." },
      { t: "Documents", d: "Keep employee and contract documents in one place.", soon: true },
      { t: "Smart search", d: "Search your data in natural language.", soon: true },
    ] as Feature[],
    aiT: "The role of AI",
    ai: "We are working on a smart assistant to help search your data, summarise information and suggest what needs follow-up. It is not available in the current version yet; we will announce it when it is ready.",
    audT: "Who is Mizan for?",
    aud: ["Small and medium companies", "HR teams", "Management", "Operations teams"],
    contactT: "Contact",
    contact: "Official contact details have not been added yet.",
    ctaT: "Want to see Mizan up close?", ctaS: "Try the dashboard now, or contact our team for a demo once contact details are available.",
    ctaB: "Try the dashboard",
  },
};

function About() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const c = copy[lang];
  return (
    <div dir={c.dir} lang={lang} className="min-h-screen bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={mark} alt="Mizan" className="h-8 w-auto" />
          <span className="font-display text-xl font-bold">{lang === "ar" ? "ميزان" : "MIZAN"}</span>
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link to="/" className="hidden text-muted-foreground hover:text-foreground sm:inline">{c.home}</Link>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="rounded-full border border-border px-4 py-2 transition-colors hover:bg-muted">{c.switch}</button>
          <Link to="/dashboard" className="rounded-full bg-primary px-5 py-2 font-medium text-primary-foreground">{c.dash}</Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-16 pt-10 text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-soft">
          <span className="h-2 w-2 rounded-full bg-coral" />{c.tag}
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">{c.title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{c.intro}</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-2">
        {[[c.visionT, c.vision], [c.missionT, c.mission]].map(([h, d]) => (
          <div key={h} className="rounded-xl border border-border bg-card p-7">
            <h2 className="font-display text-xl font-bold text-coral">{h}</h2>
            <p className="mt-3 leading-relaxed">{d}</p>
          </div>
        ))}
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
          {[[c.probT, c.prob], [c.solT, c.sol]].map(([h, d], i) => (
            <div key={h} className={`border-t-2 pt-5 ${i === 0 ? "border-coral" : "border-primary"}`}>
              <h2 className="font-display text-2xl font-bold">{h}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-3xl font-bold">{c.featT}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.features.map((f, i) => (
            <div key={f.t} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold text-coral">0{i + 1}</span>
                {f.soon && <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{c.soon}</span>}
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 lg:grid-cols-2">
        <div className="rounded-xl bg-primary p-8 text-primary-foreground">
          <h2 className="font-display text-2xl font-bold">{c.aiT}</h2>
          <p className="mt-3 leading-relaxed opacity-85">{c.ai}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-8">
          <h2 className="font-display text-2xl font-bold">{c.audT}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {c.aud.map((a) => (
              <li key={a} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-coral" />{a}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-xl border border-dashed border-border p-8 text-center">
          <h2 className="font-display text-2xl font-bold">{c.contactT}</h2>
          <p className="mt-2 text-muted-foreground">{c.contact}</p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-2xl bg-primary px-8 py-14 text-center text-primary-foreground">
          <img src={mark} alt="" className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 font-display text-3xl font-bold">{c.ctaT}</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-75">{c.ctaS}</p>
          <Link to="/dashboard" className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 font-medium text-accent-foreground">{c.ctaB}</Link>
        </div>
      </section>
    </div>
  );
}
