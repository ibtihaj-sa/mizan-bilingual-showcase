import { useSyncExternalStore } from "react";

// Local, browser-only data store. Swap this module for API calls when connecting a real backend.

export type Client = { id: string; name: string; sector: string; city: string; phone: string; email: string; createdAt: string };
export type Employee = { id: string; name: string; role: string; department: string; email: string; startDate: string; createdAt: string };
export type Contract = { id: string; title: string; clientId: string; value: number; startDate: string; endDate: string; createdAt: string };
export type Activity = { id: string; text: string; at: string };

export type Company = { name: string; cr: string; city: string; email: string };
export type MizanData = { clients: Client[]; employees: Employee[]; contracts: Contract[]; activity: Activity[]; company: Company };

const KEY = "mizan-data-v1";
const empty: MizanData = { clients: [], employees: [], contracts: [], activity: [], company: { name: "", cr: "", city: "", email: "" } };
let state: MizanData = empty;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...empty, ...JSON.parse(raw) };
  } catch {
    state = empty;
  }
}

function set(next: MizanData) {
  state = next;
  localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}

const uid = () => Math.random().toString(36).slice(2, 10);
const now = () => new Date().toISOString();
const log = (text: string): Activity => ({ id: uid(), text, at: now() });

export function useMizan(): MizanData {
  return useSyncExternalStore(
    (cb) => {
      load();
      listeners.add(cb);
      cb();
      return () => listeners.delete(cb);
    },
    () => state,
    () => empty,
  );
}

type Kind = "clients" | "employees" | "contracts";
const labels: Record<Kind, string> = { clients: "عميل", employees: "موظف", contracts: "عقد" };

export function addItem<K extends Kind>(kind: K, item: Omit<MizanData[K][number], "id" | "createdAt">) {
  load();
  const full = { ...item, id: uid(), createdAt: now() } as MizanData[K][number];
  const name = "name" in full ? full.name : (full as Contract).title;
  set({ ...state, [kind]: [full, ...state[kind]], activity: [log(`تمت إضافة ${labels[kind]} جديد: ${name}`), ...state.activity].slice(0, 50) });
}

export function removeItem(kind: Kind, id: string) {
  load();
  const list = state[kind] as { id: string }[];
  set({ ...state, [kind]: list.filter((x) => x.id !== id), activity: [log(`تم حذف ${labels[kind]}`), ...state.activity].slice(0, 50) });
}

export function clearAll() {
  set(empty);
}

export function saveCompany(c: Company) {
  load();
  set({ ...state, company: c, activity: [log("تم تحديث بيانات الشركة"), ...state.activity].slice(0, 50) });
}

export const DAY = 86_400_000;
export function daysUntil(date: string) {
  return Math.ceil((new Date(date).getTime() - Date.now()) / DAY);
}

export type Alert = { id: string; level: "critical" | "warning"; title: string; detail: string };
export function deriveAlerts(d: MizanData): Alert[] {
  return d.contracts
    .map((c) => ({ c, days: daysUntil(c.endDate) }))
    .filter(({ days }) => days <= 30)
    .sort((a, b) => a.days - b.days)
    .map(({ c, days }) => ({
      id: c.id,
      level: days < 0 ? "critical" : "warning",
      title: days < 0 ? `انتهى العقد: ${c.title}` : `العقد ينتهي قريبًا: ${c.title}`,
      detail: days < 0 ? `منذ ${Math.abs(days)} يوم` : days === 0 ? "ينتهي اليوم" : `خلال ${days} يوم`,
    }));
}

export function contractStatus(c: Contract): "active" | "expiring" | "expired" | "upcoming" {
  const d = daysUntil(c.endDate);
  if (d < 0) return "expired";
  if (new Date(c.startDate).getTime() > Date.now()) return "upcoming";
  return d <= 30 ? "expiring" : "active";
}

export const fmtDate = (s: string) => (s ? new Date(s).toLocaleDateString("ar-SA-u-ca-gregory", { year: "numeric", month: "short", day: "numeric" }) : "—");
export const fmtSAR = (n: number) => new Intl.NumberFormat("ar-SA", { style: "currency", currency: "SAR", maximumFractionDigits: 0 }).format(n || 0);
