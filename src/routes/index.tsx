import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import mark from "@/assets/mizan-mark.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ميزان Mizan — AI-powered HR & operations platform" },
      { name: "description", content: "Mizan is an AI-powered HR and operations platform: employees, contracts, payroll and reports in one balanced place." },
      { property: "og:title", content: "ميزان Mizan — AI-powered HR platform" },
      { property: "og:description", content: "Employees, contracts, payroll and reports, balanced by AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const t = {
  ar: {
    dir: "rtl", switch: "English", nav: ["المزايا", "كيف يعمل", "تواصل"], cta: "ادخل إلى لوحة التحكم",
    tag: "منصة إدارة الموارد البشرية بالذكاء الاصطناعي",
    h1a: "إدارة فريقك", h1b: "بتوازن تام.",
    sub: "ميزان يجمع الموظفين والعقود والرواتب والتقارير في مكان واحد، ويستخدم الذكاء الاصطناعي ليساعدك على اتخاذ قرارات أوضح وأسرع.",
    second: "شاهد كيف يعمل",
    stats: [["موظف", "1,247"], ["عقد نشط", "89"], ["رضا", "94%"]],
    overview: "نظرة عامة", side: ["الموظفون", "التقارير", "الإعدادات"],
    fTitle: "كل ما يحتاجه فريق الموارد البشرية",
    features: [
      ["ملفات الموظفين", "سجل موحد لكل موظف، من التعيين إلى التقييم."],
      ["العقود والامتثال", "تنبيهات ذكية قبل انتهاء العقود والوثائق."],
      ["تقارير ذكية", "اسأل بلغتك واحصل على تقرير جاهز خلال ثوانٍ."],
      ["العمليات اليومية", "طلبات الإجازات والموافقات في سير عمل واضح."],
    ],
    steps: ["اربط بياناتك", "دع ميزان ينظمها", "اتخذ القرار"], howTitle: "ثلاث خطوات للتوازن",
    finalTitle: "جاهز لإدارة أكثر توازناً؟", finalSub: "احجز عرضاً مع فريقنا وابدأ خلال أيام.",
    foot: "© 2026 ميزان. جميع الحقوق محفوظة.",
  },
  en: {
    dir: "ltr", switch: "العربية", nav: ["Features", "How it works", "Contact"], cta: "Open the dashboard",
    tag: "AI-powered HR & operations platform",
    h1a: "Run your team", h1b: "in perfect balance.",
    sub: "Mizan brings employees, contracts, payroll and reports into one place, and uses AI to help you make clearer, faster decisions.",
    second: "See how it works",
    stats: [["Employees", "1,247"], ["Active contracts", "89"], ["Satisfaction", "94%"]],
    overview: "Overview", side: ["Employees", "Reports", "Settings"],
    fTitle: "Everything your HR team needs",
    features: [
      ["Employee records", "One unified file per person, from hiring to review."],
      ["Contracts & compliance", "Smart alerts before contracts and documents expire."],
      ["Smart reports", "Ask in your own words and get a ready report in seconds."],
      ["Daily operations", "Leave requests and approvals in one clear workflow."],
    ],
    steps: ["Connect your data", "Let Mizan organise it", "Make the call"], howTitle: "Three steps to balance",
    finalTitle: "Ready for more balanced HR?", finalSub: "Book a demo with our team and get started in days.",
    foot: "© 2026 Mizan. All rights reserved.",
  },
} as const;

function Index() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const c = t[lang];
  return (
    <div dir={c.dir} lang={lang} className="min-h-screen bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <img src={mark} alt="Mizan" className="h-8 w-auto" />
          <span className="font-display text-xl font-bold">{lang === "ar" ? "ميزان" : "MIZAN"}</span>
        </div>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          {c.nav.map((n, i) => <a key={n} href={["#features", "#how", "#contact"][i]} className="transition-colors hover:text-foreground">{n}</a>)}
          <Link to="/about" className="transition-colors hover:text-foreground">{lang === "ar" ? "عن ميزان" : "About"}</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-muted">{c.switch}</button>
          <a href="/dashboard" className="hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground sm:inline-block">{c.cta}</a>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-12 lg:grid-cols-2">
        <div className="animate-rise">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-soft">
            <span className="h-2 w-2 rounded-full bg-coral" />{c.tag}
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight md:text-6xl">
            {c.h1a}<br /><span className="text-coral">{c.h1b}</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{c.sub}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="/dashboard" className="rounded-full bg-accent px-7 py-3.5 font-medium text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5">{c.cta}</a>
            <a href="#how" className="rounded-full border border-border px-7 py-3.5 font-medium transition-colors hover:bg-muted">{c.second}</a>
          </div>
        </div>

        <div className="animate-rise overflow-hidden rounded-3xl border border-border bg-card shadow-soft" style={{ animationDelay: "0.15s" }}>
          <div className="flex gap-1.5 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-coral" /><span className="h-2.5 w-2.5 rounded-full bg-muted" /><span className="h-2.5 w-2.5 rounded-full bg-muted" />
          </div>
          <div className="flex">
            <aside className="w-36 space-y-4 bg-primary p-5 text-sm text-primary-foreground">
              <img src={mark} alt="" className="mb-6 h-7 w-auto" />
              {c.side.map((s, i) => <div key={s} className={i === 0 ? "font-medium" : "opacity-60"}>{s}</div>)}
            </aside>
            <div className="flex-1 p-6">
              <h3 className="font-display text-lg font-semibold">{c.overview}</h3>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {c.stats.map(([l, v], i) => (
                  <div key={l} className="rounded-xl bg-background p-3">
                    <div className="font-display text-xl font-bold">{v}</div>
                    <div className="text-xs text-muted-foreground">{l}</div>
                    <div className="mt-2 h-1 rounded-full bg-muted"><div className="h-1 rounded-full bg-coral" style={{ width: `${[60, 45, 94][i]}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex h-32 items-end gap-2 rounded-xl bg-background p-4">
                {[40, 65, 50, 80, 60, 90, 72].map((h, i) => <div key={i} className={`flex-1 rounded-t-md ${i === 5 ? "bg-coral" : "bg-primary/80"}`} style={{ height: `${h}%` }} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-card py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl font-bold">{c.fTitle}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.features.map(([h, d], i) => (
              <div key={h} className="rounded-2xl border border-border bg-background p-6">
                <div className="font-display text-sm font-bold text-coral">0{i + 1}</div>
                <h3 className="mt-4 font-display text-lg font-semibold">{h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-4xl font-bold">{c.howTitle}</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {c.steps.map((s, i) => (
            <div key={s} className="border-t-2 border-primary pt-6">
              <span className="font-display text-5xl font-bold text-coral/80">{i + 1}</span>
              <p className="mt-3 font-display text-xl font-semibold">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
          <img src={mark} alt="" className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 font-display text-4xl font-bold">{c.finalTitle}</h2>
          <p className="mt-3 opacity-75">{c.finalSub}</p>
          <a href="mailto:hello@mizan.sa" className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 font-medium text-accent-foreground">{c.cta}</a>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">{c.foot}</footer>
    </div>
  );
}
