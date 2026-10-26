import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import mark from "@/assets/mizan-mark.png";

const nav = [
  { to: "/", label: "الرئيسية" },
  { to: "/about", label: "من نحن" },
  { to: "/challenges", label: "التحديات" },
  { to: "/how-it-works", label: "كيف تعمل" },
  { to: "/solutions", label: "الحلول" },
  { to: "/ai", label: "الذكاء الاصطناعي" },
] as const;

export function MarketingShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={mark} alt="ميزان MIZAN" className="h-8 w-auto" />
            <span className="font-display text-xl font-bold">
              ميزان <span className="text-sm font-medium text-muted-foreground">MIZAN</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={
                  pathname === n.to
                    ? "font-bold text-foreground"
                    : "text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="rounded-full bg-primary px-5 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              تواصل معنا
            </Link>
          </nav>

          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-border px-6 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm ${
                    pathname === n.to ? "bg-muted font-bold" : "text-muted-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
              >
                تواصل معنا
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <img src={mark} alt="" className="h-8 w-auto" />
                <span className="font-display text-lg font-bold">ميزان MIZAN</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                منصة تقنية سعودية قيد التطوير، تهدف إلى مساعدة الشركات على تنظيم أعمالها
                ومستنداتها ومتطلباتها التشغيلية بصورة أوضح وأكثر كفاءة.
              </p>
            </div>
            <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} className="text-muted-foreground transition-colors hover:text-foreground">
                  {n.label}
                </Link>
              ))}
              <Link to="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                تواصل معنا
              </Link>
              <Link to="/dashboard" className="text-muted-foreground transition-colors hover:text-foreground">
                لوحة التحكم
              </Link>
              <Link to="/login" className="text-muted-foreground transition-colors hover:text-foreground">تسجيل الدخول</Link>
              <Link to="/terms" className="text-muted-foreground transition-colors hover:text-foreground">الشروط والأحكام</Link>
              <Link to="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">سياسة الخصوصية</Link>
            </nav>
          </div>
          <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            © 2026 ميزان MIZAN. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}
