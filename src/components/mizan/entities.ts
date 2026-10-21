import { addItem, type Client } from "@/lib/mizan-store";
import type { FormField } from "./EntityForm";

export const clientFields: FormField[] = [
  { name: "name", label: "اسم العميل", required: true },
  { name: "sector", label: "القطاع" },
  { name: "city", label: "المدينة" },
  { name: "phone", label: "رقم الجوال", type: "tel" },
  { name: "email", label: "البريد الإلكتروني", type: "email" },
];

export const employeeFields: FormField[] = [
  { name: "name", label: "اسم الموظف", required: true },
  { name: "role", label: "المسمى الوظيفي", required: true },
  { name: "department", label: "القسم" },
  { name: "email", label: "البريد الإلكتروني", type: "email" },
  { name: "startDate", label: "تاريخ الالتحاق", type: "date" },
];

export const contractFields = (clients: Client[]): FormField[] => [
  { name: "title", label: "عنوان العقد", required: true },
  { name: "clientId", label: "العميل", type: "select", options: clients.map((c) => ({ value: c.id, label: c.name })) },
  { name: "value", label: "القيمة (ريال)", type: "number" },
  { name: "startDate", label: "تاريخ البداية", type: "date", required: true },
  { name: "endDate", label: "تاريخ الانتهاء", type: "date", required: true },
];

type V = Record<string, string>;
const g = (v: V, k: string) => v[k] ?? "";

export const saveClient = (v: Record<string, string>) =>
  addItem("clients", { name: g(v, "name"), sector: g(v, "sector"), city: g(v, "city"), phone: g(v, "phone"), email: g(v, "email") });
export const saveEmployee = (v: Record<string, string>) =>
  addItem("employees", { name: g(v, "name"), role: g(v, "role"), department: g(v, "department"), email: g(v, "email"), startDate: g(v, "startDate") });
export const saveContract = (v: Record<string, string>) =>
  addItem("contracts", { title: g(v, "title"), clientId: g(v, "clientId"), value: Number(g(v, "value")) || 0, startDate: g(v, "startDate"), endDate: g(v, "endDate") });
