import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthCard } from "@/components/mizan/AuthCard";
import { isEmail } from "@/lib/validation";
import { pageHead } from "@/lib/mizan-head";

export const Route = createFileRoute("/forgot-password")({ head: pageHead("استعادة كلمة المرور", "طلب رابط لإعادة تعيين كلمة مرور حسابك في ميزان."), component: Forgot });

function Forgot() {
  return (
    <AuthCard title="استعادة كلمة المرور" text="أدخل بريدك لإرسال رابط إعادة التعيين." submit="إرسال الرابط"
      fields={[{ key: "email", label: "البريد الإلكتروني", type: "email", validate: (v) => (!v.trim() ? "البريد الإلكتروني مطلوب." : !isEmail(v) ? "صيغة البريد الإلكتروني غير صحيحة." : null) }]}
      footer={<Link to="/login" className="font-bold text-primary">العودة لتسجيل الدخول</Link>} />
  );
}
