import { useState, type FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, MButton, inputCls } from "./ui";

export type FormField = { name: string; label: string; type?: "text" | "email" | "tel" | "date" | "number" | "select"; options?: { value: string; label: string }[]; required?: boolean };

export function EntityForm({ open, onOpenChange, title, fields, onSubmit }: { open: boolean; onOpenChange: (o: boolean) => void; title: string; fields: FormField[]; onSubmit: (v: Record<string, string>) => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const clean = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim()]));
    const missing = fields.find((f) => f.required && !clean[f.name]);
    if (missing) return setError(`الحقل «${missing.label}» مطلوب.`);
    if (clean.startDate && clean.endDate && clean.endDate < clean.startDate) return setError("تاريخ الانتهاء يجب أن يكون بعد تاريخ البداية.");
    setError("");
    onSubmit(clean);
    setValues({});
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="font-sans sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-start text-lg font-extrabold text-primary">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <Field key={f.name} label={f.label + (f.required ? " *" : "")}>
              {f.type === "select" ? (
                <select required={f.required} className={inputCls} value={values[f.name] ?? ""} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}>
                  <option value="">اختر...</option>
                  {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : (
                <input required={f.required} type={f.type ?? "text"} min={f.type === "number" ? 0 : undefined} className={inputCls} value={values[f.name] ?? ""} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })} />
              )}
            </Field>
          ))}
          {error && <p role="alert" className="text-sm font-medium text-destructive sm:col-span-2">{error}</p>}
          <div className="flex justify-end gap-2 pt-2 sm:col-span-2">
            <MButton type="button" variant="outline" onClick={() => onOpenChange(false)}>إلغاء</MButton>
            <MButton type="submit">حفظ</MButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
