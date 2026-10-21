import type { ComponentType, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export const mButton = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 [&_svg]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        outline: "border border-border bg-card text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        danger: "text-destructive hover:bg-coral-soft",
      },
      size: { md: "h-10 px-4", sm: "h-8 px-3 text-xs", icon: "h-9 w-9" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);
export type MButtonProps = VariantProps<typeof mButton>;

export function MButton({ variant, size, className, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & MButtonProps) {
  return <button className={cn(mButton({ variant, size }), className)} {...p} />;
}

export function Panel({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-xl border border-border bg-card shadow-soft", className)}>
      {title && (
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-bold text-foreground">{title}</h2>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

const badge = cva("inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-bold", {
  variants: {
    tone: {
      success: "bg-success-soft text-success",
      warning: "bg-warning-soft text-warning",
      danger: "bg-coral-soft text-destructive",
      info: "bg-navy-soft text-primary",
      neutral: "bg-muted text-muted-foreground",
    },
  },
  defaultVariants: { tone: "neutral" },
});
export function Badge({ tone, children }: VariantProps<typeof badge> & { children: ReactNode }) {
  return (
    <span className={badge({ tone })}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function KpiCard({ label, value, icon: Icon, hint, tone = "navy" }: { label: string; value: number | string; icon: ComponentType<{ className?: string }>; hint?: string; tone?: "navy" | "coral" }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className={cn("grid h-9 w-9 place-items-center rounded-lg", tone === "coral" ? "bg-coral-soft text-coral" : "bg-navy-soft text-primary")}>
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-extrabold tabular-nums text-primary">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function EmptyState({ icon: Icon = Inbox, title, text, action }: { icon?: ComponentType<{ className?: string }>; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 font-bold text-foreground">{title}</p>
      {text && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function SkeletonRows({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-5">
      {Array.from({ length: rows }).map((_, i) => <div key={i} className="h-10 animate-pulse rounded-lg bg-muted" />)}
    </div>
  );
}

export function PageHeader({ title, text, actions }: { title: string; text?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-primary md:text-[28px]">{title}</h1>
        {text && <p className="mt-1 text-sm text-muted-foreground">{text}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-foreground">{label}</span>
      {children}
    </label>
  );
}
export const inputCls =
  "h-10 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

export type Column<T> = { key: string; label: string; render: (row: T) => ReactNode; className?: string };
export function DataTable<T extends { id: string }>({ columns, rows, empty }: { columns: Column<T>[]; rows: T[]; empty: ReactNode }) {
  if (!rows.length) return <>{empty}</>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/60">
            {columns.map((c) => <th key={c.key} className={cn("px-5 py-3 text-start text-xs font-bold text-muted-foreground", c.className)}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/40">
              {columns.map((c) => <td key={c.key} className={cn("px-5 py-3.5 text-foreground", c.className)}>{c.render(r)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
