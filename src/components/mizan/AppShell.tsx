import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Bell, BarChart3, Building2, FileText, LayoutGrid, Menu, Search, Settings, Users, X } from "lucide-react";
import mark from "@/assets/mizan-mark.png";
import { cn } from "@/lib/utils";
import { deriveAlerts, useMizan } from "@/lib/mizan-store";

export const nav = [
  { to: "/dashboard", label: "نظرة عامة", icon: LayoutGrid },
  { to: "/dashboard/clients", label: "العملاء", icon: Building2 },
  { to: "/dashboard/employees", label: "الموظفون", icon: Users },
  { to: "/dashboard/contracts", label: "العقود", icon: FileText },
  { to: "/dashboard/alerts", label: "التنبيهات", icon: Bell },
  { to: "/dashboard/reports", label: "التقارير", icon: BarChart3 },
  { to: "/dashboard/settings", label: "الإعدادات", icon: Settings },
] as const;

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-sand">
        <img src={mark} alt="" className="h-5 w-auto" />
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-extrabold">ميزان</span>
        <span className="block text-[10px] font-bold tracking-[0.3em] opacity-60">MIZAN</span>
      </span>
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const alerts = deriveAlerts(useMizan()).length;
  return (
    <nav className="space-y-1">
      {nav.map((n) => {
        const active = n.to === "/dashboard" ? path === "/dashboard" || path === "/dashboard/" : path.startsWith(n.to);
        return (
          <Link
            key={n.to}
            to={n.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            )}
          >
            <span className={cn("h-5 w-1 rounded-full", active ? "bg-sidebar-primary" : "bg-transparent")} />
            <n.icon className="h-[18px] w-[18px]" />
            <span className="flex-1">{n.label}</span>
            {n.to === "/dashboard/alerts" && alerts > 0 && <span className="rounded-md bg-sidebar-primary px-1.5 text-xs font-bold text-sidebar-primary-foreground">{alerts}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

function SearchBox() {
  const [q, setQ] = useState("");
  const data = useMizan();
  const term = q.trim();
  const results = term
    ? [
        ...data.clients
          .filter((c) => c.name.includes(term) || c.sector.includes(term) || c.city.includes(term))
          .slice(0, 4)
          .map((c) => ({ to: "/dashboard/clients", label: c.name, kind: "عميل" })),
        ...data.employees
          .filter((e) => e.name.includes(term) || e.role.includes(term) || e.department.includes(term))
          .slice(0, 4)
          .map((e) => ({ to: "/dashboard/employees", label: e.name, kind: "موظف" })),
        ...data.contracts
          .filter((c) => c.title.includes(term))
          .slice(0, 4)
          .map((c) => ({ to: "/dashboard/contracts", label: c.title, kind: "عقد" })),
      ]
    : [];

  return (
    <div className="relative hidden max-w-sm flex-1 md:block">
      <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="ابحث في ميزان..."
        className="h-10 w-full rounded-lg border border-border bg-background pr-10 pl-3 text-sm focus:border-primary focus:outline-none"
      />
      {term && (
        <div className="absolute inset-x-0 top-12 z-40 max-h-80 overflow-auto rounded-xl border border-border bg-card p-2 shadow-soft">
          {results.length === 0 ? (
            <p className="px-3 py-3 text-sm text-muted-foreground">لا نتائج مطابقة.</p>
          ) : (
            results.map((r, i) => (
              <Link
                key={`${r.label}-${i}`}
                to={r.to}
                onClick={() => setQ("")}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
              >
                <span className="truncate font-medium">{r.label}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{r.kind}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const alerts = deriveAlerts(useMizan()).length;
  return (
    <div dir="rtl" className="flex min-h-screen bg-background font-sans text-foreground">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar p-5 text-sidebar-foreground lg:flex">
        <Brand />
        <p className="mb-3 mt-10 px-3 text-xs font-bold text-sidebar-foreground/40">القائمة الرئيسية</p>
        <NavList />
        <div className="mt-auto rounded-lg border border-sidebar-border p-4 text-xs leading-relaxed text-sidebar-foreground/60">
          البيانات محفوظة حاليًا في هذا المتصفح فقط.
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button aria-label="إغلاق القائمة" className="absolute inset-0 bg-primary/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 right-0 flex w-72 flex-col bg-sidebar p-5 text-sidebar-foreground">
            <div className="mb-8 flex items-center justify-between">
              <Brand />
              <button aria-label="إغلاق" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <NavList onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur md:px-8">
          <button aria-label="فتح القائمة" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-muted lg:hidden" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <SearchBox />
          <div className="mr-auto flex items-center gap-2">
            <Link to="/dashboard/alerts" aria-label="التنبيهات" className="relative grid h-10 w-10 place-items-center rounded-lg hover:bg-muted">
              <Bell className="h-5 w-5 text-primary" />
              {alerts > 0 && <span className="absolute left-2 top-2 h-2 w-2 rounded-full bg-coral ring-2 ring-card" />}
            </Link>
            <div className="flex items-center gap-3 border-r border-border pr-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">م</span>
              <span className="hidden leading-tight sm:block">
                <span className="block text-sm font-bold">مدير النظام</span>
                <span className="block text-xs text-muted-foreground">حساب تجريبي</span>
              </span>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
