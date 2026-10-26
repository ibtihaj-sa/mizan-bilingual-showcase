import { Link } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { Info } from "lucide-react";
import { MarketingShell } from "@/components/mizan/MarketingShell";
import { Field, MButton, inputCls } from "@/components/mizan/ui";

export type AuthField = { key: string; label: string; type: string; validate: (v: string, all: Record<string, string>) => string | null };

export function AuthCard({ title, text, fields, submit, note, footer }: { title: string; text: string; fields: AuthField[]; submit: string; note?: ReactNode; footer: ReactNode }) {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [blocked, setBlocked] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    for (const f of fields) { const m = f.validate(vals[f.key] ?? "", vals); if (m) errs[f.key] = m; }
    setErrors(errs);
    setBlocked(Object.keys(errs).length === 0);
  };
  return (
    <MarketingShell>
      <section className="mx-auto max-w-md px-6 py-16">
        <h1 className="font-display text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-muted-foreground">{text}</p>
        <form noValidate onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6">
          {fields.map((f) => (
            <Field key={f.key} label={f.label}>
              <input type={f.type} dir={f.type === "text" ? undefined : "ltr"} className={inputCls} value={vals[f.key] ?? ""} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })} aria-invalid={!!errors[f.key]} />
              {errors[f.key] && <p className="mt-1 text-xs text-destructive">{errors[f.key]}</p>}
            </Field>
          ))}
          {note}
          <MButton type="submit" className="w-full">{submit}</MButton>
          {blocked && (
            <p role="status" className="flex gap-2 rounded-lg bg-warning-soft p-3 text-sm text-warning">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              نظام الحسابات لم يُربط بعد، لذلك لم يُرسل أي طلب ولم يُنشأ أو يُفتح أي حساب. يمكنك استخدام <Link to="/dashboard" className="font-bold underline">لوحة التحكم المحلية</Link> مؤقتًا.
            </p>
          )}
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
      </section>
    </MarketingShell>
  );
}
