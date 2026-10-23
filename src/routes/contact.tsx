import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { MarketingShell } from "@/components/mizan/MarketingShell";
import { Field, inputCls, MButton } from "@/components/mizan/ui";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/contact")({
  head: pageHead(
    "تواصل معنا",
    "للاستفسارات التجارية وطلبات العرض التوضيحي حول منصة ميزان MIZAN — أرسل لنا استفسارك وسنعود إليك.",
  ),
  component: Contact,
});

const inquiryTypes = ["استفسار تجاري", "طلب عرض توضيحي", "شراكة", "أخرى"];

type Inquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  type: string;
  message: string;
  createdAt: string;
};

const STORE_KEY = "mizan-inquiries-v1";

function saveInquiry(inquiry: Inquiry) {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const list: Inquiry[] = raw ? JSON.parse(raw) : [];
    list.push(inquiry);
    localStorage.setItem(STORE_KEY, JSON.stringify(list));
  } catch {
    // storage unavailable — ignore
  }
}

function Contact() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<string>("استفسار تجاري");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("يرجى تعبئة الاسم والبريد الإلكتروني والرسالة.");
      return;
    }
    saveInquiry({
      id: crypto.randomUUID(),
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      type,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    });
    setSent(true);
    toast.success("تم حفظ استفسارك.");
  };

  return (
    <MarketingShell>
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-soft">
          <span className="h-2 w-2 rounded-full bg-coral" />
          تواصل معنا
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
          يسعدنا سماعك
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          لأي استفسار تجاري أو طلب عرض توضيحي حول ميزان، اترك لنا رسالتك عبر النموذج
          التالي.
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-24">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
          {sent ? (
            <div className="py-8 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success-soft text-success">
                <Send className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-xl font-bold">تم حفظ استفسارك</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                النموذج حاليًا يحفظ الاستفسارات داخل المتصفح فقط، ولم تُربط بعد بقناة
                إرسال رسمية. ستُفعّل قنوات التواصل الرسمية (البريد الإلكتروني والهاتف)
                فور اعتمادها وإضافتها هنا.
              </p>
              <MButton variant="outline" className="mt-6" onClick={() => setSent(false)}>
                إرسال استفسار آخر
              </MButton>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="الاسم *">
                  <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="اسمك الكامل" />
                </Field>
                <Field label="اسم الشركة">
                  <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="اسم منشأتك" />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="البريد الإلكتروني *">
                  <input className={inputCls} type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
                </Field>
                <Field label="نوع الاستفسار">
                  <select className={inputCls} value={type} onChange={(e) => setType(e.target.value)}>
                    {inquiryTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="الرسالة *">
                <textarea
                  className={`${inputCls} h-32 resize-none py-2.5`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب استفسارك أو احتياجك باختصار"
                />
              </Field>
              <MButton type="submit" variant="accent" className="w-full">
                <Send className="h-4 w-4" />
                إرسال الاستفسار
              </MButton>
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                قنوات التواصل الرسمية (البريد الإلكتروني ورقم الهاتف والعنوان) ستُضاف
                هنا فور اعتمادها.
              </p>
            </form>
          )}
        </div>
      </section>
    </MarketingShell>
  );
}
