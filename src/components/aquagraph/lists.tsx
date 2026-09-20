import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { StatusBadge, type Severity } from "./primitives";

export function EventList({ items }: { items: ReadonlyArray<{ place: string; issue: string; metric: string; level: string }> }) {
  return <div className="event-list">{items.map((item) => <div className="event-row" key={item.place}><span className={`event-icon text-${item.level === "critical" ? "red" : item.level === "high" || item.level === "attention" ? "amber" : "cyan"}`}><AlertTriangle/></span><div><strong>{item.place}</strong><p>{item.issue}</p></div><div className="event-metric"><span>{item.metric}</span><br/><StatusBadge level={item.level as Severity}/></div></div>)}</div>;
}
export function ActionList({ items }: { items: ReadonlyArray<{ action: string; reason?: string; time?: string; level?: string }> }) {
  return <div className="action-list">{items.map((item, i) => <div className="action-row" key={item.action}><span>{i + 1}</span><div><strong>{item.action}</strong>{item.reason && <p>{item.reason}</p>}</div>{item.level ? <div><StatusBadge level={item.level as Severity}/>{item.time && <p>{item.time}</p>}</div> : <ArrowUpRight/>}</div>)}</div>;
}
