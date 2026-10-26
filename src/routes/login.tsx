import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthCard } from "@/components/mizan/AuthCard";
import { isEmail } from "@/lib/validation";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/login")({ head: pageHead("تسجيل الدخول", "الدخول إلى حساب منشأتك في ميزان."), component: Login });

function Login() {
  return (
    <AuthCard title="تسجيل الدخول" text="ادخل إلى حساب منشأتك." submit="دخول"
      fields={[
        { key: "email", label: "البريد الإلكتروني", type: "email", validate: (v) => (!v.trim() ? "البريد الإلكتروني مطلوب." : !isEmail(v) ? "صيغة البريد الإلكتروني غير صحيحة." : null) },
        { key: "password", label: "كلمة المرور", type: "password", validate: (v) => (!v ? "كلمة المرور مطلوبة." : null) },
      ]}
      note={<Link to="/forgot-password" className="block text-sm font-bold text-coral">نسيت كلمة المرور؟</Link>}
      footer={<>ليس لديك حساب؟ <Link to="/signup" className="font-bold text-primary">أنشئ حسابًا</Link></>} />
  );
}
