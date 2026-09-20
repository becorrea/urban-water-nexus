import { createContext, useContext, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Activity, Bell, BrainCircuit, ChevronLeft, ChevronRight, Droplets, FileChartColumn, Gauge, Menu, Network, Play, RadioTower, Settings, ShieldAlert, Waves, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { city } from "@/data/city";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const nav = [
  { label: "Visão Geral", to: "/", icon: Gauge },
  { group: "OPERAÇÃO" },
  { label: "Perdas e Vazamentos", to: "/perdas", icon: Activity },
  { label: "Seca e Resiliência", to: "/seca", icon: Droplets },
  { label: "Enchentes e Resposta", to: "/enchentes", icon: Waves },
  { group: "INTELIGÊNCIA" },
  { label: "Active Sensing", to: "/active-sensing", icon: RadioTower },
  { label: "Infraestrutura", to: "/", icon: Network, muted: true },
  { label: "Consumo", to: "/", icon: FileChartColumn, muted: true },
  { group: "GESTÃO" },
  { label: "Centro de Decisões", to: "/decisoes", icon: BrainCircuit },
  { label: "Manutenção", to: "/decisoes", icon: ShieldAlert, muted: true },
] as const;
const demoSteps = [
  { to: "/", title: "Visão Geral", copy: "Uma cidade inteira vista como um único sistema hídrico." },
  { to: "/perdas", title: "Vazamento", copy: "Sinais combinados antecipam uma possível perda física." },
  { to: "/seca", title: "Seca", copy: "Cenários transformam projeção em resposta preventiva." },
  { to: "/enchentes", title: "Enchente", copy: "Risco hidrológico priorizado em tempo quase real." },
  { to: "/active-sensing", title: "Active Sensing", copy: "A IA indica onde observar para reduzir a incerteza." },
] as const;

type DemoContextValue = { active: boolean; step: number; start: () => void; stop: () => void };
const DemoContext = createContext<DemoContextValue>({ active: false, step: 0, start: () => {}, stop: () => {} });
export const useDemo = () => useContext(DemoContext);

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false); const [active, setActive] = useState(false); const [step, setStep] = useState(0); const [ending, setEnding] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname }); const navigate = useNavigate();
  const go = (next: number) => { if (next >= demoSteps.length) { setEnding(true); return; } const safe = Math.max(0, next); setStep(safe); navigate({ to: demoSteps[safe].to }); };
  const start = () => { setActive(true); setEnding(false); setStep(0); navigate({ to: "/" }); };
  const stop = () => { setActive(false); setEnding(false); setStep(0); };
  return <DemoContext.Provider value={{ active, step, start, stop }}><TooltipProvider delayDuration={200}><div className={cn("app-shell", collapsed && "sidebar-collapsed")}>
    <aside className="sidebar"><div className="brand"><Droplets/><div><strong>Aqua<span>Graph</span></strong><small>Sistema Nervoso Digital<br/>da Água Urbana</small></div></div><nav>{nav.map((item, index) => "group" in item ? <div key={`${item.group}-${index}`} className="nav-group">{!collapsed && item.group}</div> : <Tooltip key={`${item.label}-${index}`}><TooltipTrigger asChild><Link to={item.to} className={cn("nav-item", pathname === item.to && !item.muted && "active", item.muted && "muted")}><item.icon/><span>{item.label}</span></Link></TooltipTrigger>{collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}</Tooltip>)}</nav><div className="sidebar-bottom"><Link to="/configuracoes" className={cn("nav-item", pathname === "/configuracoes" && "active")}><Settings/><span>Configurações</span></Link><Button variant="ghost" size="icon" onClick={() => setCollapsed((v) => !v)} title={collapsed ? "Expandir menu" : "Recolher menu"}>{collapsed ? <ChevronRight/> : <ChevronLeft/>}</Button></div></aside>
    <div className="app-main"><header className="topbar"><div className="topbar-left"><Button variant="ghost" size="icon" className="mobile-menu" onClick={() => setCollapsed((v) => !v)}><Menu/></Button><span className="system-dot"/><span className="system-status">Operação normal</span></div><div className="topbar-right"><Button variant="outline" size="sm" onClick={start}><Play/>Iniciar Demo</Button><div className="city-meta"><strong>{city.name} — {city.state}</strong><span>{city.date} · {city.time}</span></div><Button variant="ghost" size="icon" className="notification" title="3 notificações"><Bell/><b>3</b></Button><div className="operator"><span>{city.operator.initials}</span><div><strong>{city.operator.name}</strong><small>{city.operator.role}</small></div></div></div></header><main>{children}</main></div>
    <AnimatePresence>{active && !ending && <motion.div className="demo-bar" initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }}><div><span>ETAPA {step + 1} DE 5</span><strong>{demoSteps[step].title}</strong><small>{demoSteps[step].copy}</small></div><div className="demo-progress">{demoSteps.map((_, i) => <i key={i} className={cn(i <= step && "done")}/>)}</div><div className="demo-actions"><Button variant="ghost" size="sm" disabled={step === 0} onClick={() => go(step - 1)}><ChevronLeft/>Anterior</Button><Button size="sm" onClick={() => go(step + 1)}>Próximo<ChevronRight/></Button><Button variant="ghost" size="sm" onClick={stop}><X/>Encerrar</Button></div></motion.div>}{ending && <motion.div className="demo-ending" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Droplets/><h2>Aqua<span>Graph</span></h2><p>De monitoramento para decisão.</p><strong>Antecipar. Priorizar. Agir.</strong><Button onClick={stop}>Encerrar demonstração</Button></motion.div>}</AnimatePresence>
  </div></TooltipProvider></DemoContext.Provider>;
}
