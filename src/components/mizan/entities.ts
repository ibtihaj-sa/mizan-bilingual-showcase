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

export const saveClient = (v: Record<string, string>) =>
  addItem("clients", { name: v.name, sector: v.sector ?? "", city: v.city ?? "", phone: v.phone ?? "", email: v.email ?? "" });
export const saveEmployee = (v: Record<string, string>) =>
  addItem("employees", { name: v.name, role: v.role, department: v.department ?? "", email: v.email ?? "", startDate: v.startDate ?? "" });
export const saveContract = (v: Record<string, string>) =>
  addItem("contracts", { title: v.title, clientId: v.clientId ?? "", value: Number(v.value) || 0, startDate: v.startDate, endDate: v.endDate });
