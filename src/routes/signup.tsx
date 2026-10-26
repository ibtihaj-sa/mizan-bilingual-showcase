import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthCard } from "@/components/mizan/AuthCard";
import { isEmail, isStrongPassword, TRIAL_DAYS } from "@/lib/validation";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/signup")({ head: pageHead("إنشاء حساب", `أنشئ حساب منشأتك في ميزان مع تجربة مجانية لمدة ${TRIAL_DAYS} يومًا.`), component: Signup });

function Signup() {
  return (
    <AuthCard title="إنشاء حساب" text="سجّل منشأتك في ميزان." submit="إنشاء الحساب"
      fields={[
        { key: "name", label: "الاسم الكامل", type: "text", validate: (v) => (!v.trim() ? "الاسم مطلوب." : null) },
        { key: "company", label: "اسم المنشأة", type: "text", validate: (v) => (!v.trim() ? "اسم المنشأة مطلوب." : null) },
        { key: "email", label: "البريد الإلكتروني", type: "email", validate: (v) => (!v.trim() ? "البريد الإلكتروني مطلوب." : !isEmail(v) ? "صيغة البريد الإلكتروني غير صحيحة." : null) },
        { key: "password", label: "كلمة المرور", type: "password", validate: (v) => (isStrongPassword(v) ? null : "٨ أحرف على الأقل وتحتوي على حرف ورقم.") },
        { key: "confirm", label: "تأكيد كلمة المرور", type: "password", validate: (v, a) => (v !== (a["password"] ?? "") || !v ? "كلمتا المرور غير متطابقتين." : null) },
      ]}
      note={<p className="rounded-lg bg-muted p-3 text-sm">يشمل التسجيل تجربة مجانية لمدة {TRIAL_DAYS} يومًا، وتُفعّل بعد ربط نظام الحسابات. بالمتابعة توافق على <Link to="/terms" className="underline">الشروط</Link> و<Link to="/privacy" className="underline">سياسة الخصوصية</Link>.</p>}
      footer={<>لديك حساب؟ <Link to="/login" className="font-bold text-primary">سجّل الدخول</Link></>} />
  );
}
