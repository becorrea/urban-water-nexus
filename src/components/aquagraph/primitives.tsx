import type { LucideIcon } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export type Severity = "normal" | "attention" | "high" | "critical" | "info";
export const severityLabel: Record<Severity, string> = { normal: "Normal", attention: "Atenção", high: "Alto", critical: "Crítico", info: "Informativo" };

export function StatusBadge({ level, children }: { level: Severity; children?: React.ReactNode }) {
  return <span className={cn("status-badge", `status-${level}`)}>{children ?? severityLabel[level]}</span>;
}

export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("surface-panel", className)}>{children}</section>;
}

export function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return <div className="section-header"><h2>{title}</h2>{action}</div>;
}

export function KpiCard({ label, value, delta, icon: Icon, tone = "cyan", data = [18, 26, 22, 34, 31, 45, 42] }: { label: string; value: string; delta: string; icon: LucideIcon; tone?: "cyan" | "red" | "amber" | "green"; data?: number[] }) {
  const chart = data.map((v, i) => ({ i, v }));
  return <div className="kpi-card">
    <div className={cn("kpi-icon", `tone-${tone}`)}><Icon /></div>
    <div className="kpi-copy"><span>{label}</span><strong>{value}</strong><small className={cn(`text-${tone}`)}>{delta}</small></div>
    <div className="spark"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chart}><defs><linearGradient id={`spark-${tone}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity={0.35}/><stop offset="100%" stopColor="currentColor" stopOpacity={0}/></linearGradient></defs><Area type="monotone" dataKey="v" stroke="currentColor" fill={`url(#spark-${tone})`} strokeWidth={2} isAnimationActive /></AreaChart></ResponsiveContainer></div>
  </div>;
}

export function PageTitle({ title, subtitle, actions }: { title: string; subtitle: string; actions?: React.ReactNode }) {
  return <div className="page-title"><div><h1>{title}</h1><p>{subtitle}</p></div>{actions && <div className="page-actions">{actions}</div>}</div>;
}
