import { useState } from "react";
import { Check, Crosshair, LocateFixed, Minus, Plus, Search } from "lucide-react";
import { networkLayers } from "@/data/waterNetwork";
import { sensors } from "@/data/sensors";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type MapMode = "overview" | "leaks" | "flood" | "sensing" | "drought";

const streets = [
  "M8 12 L34 28 L57 18 L92 32", "M3 35 L25 29 L45 43 L70 27 L98 47", "M8 60 L31 45 L55 58 L77 41 L96 63",
  "M5 79 L28 68 L49 76 L72 59 L98 80", "M18 4 L24 92", "M39 6 L44 91", "M61 8 L65 94", "M81 7 L83 90",
  "M12 20 L89 86", "M8 87 L90 17", "M4 49 L95 52", "M30 7 L75 94",
];
const pipes = ["M5 25 C25 19 35 38 52 31 S75 18 96 25", "M2 67 C21 59 31 74 49 65 S77 50 98 64", "M16 3 C20 24 18 48 28 92", "M74 5 C70 26 81 44 75 94", "M8 45 C28 35 42 48 57 44 S77 33 94 41"];
const labels = [{ n: "12-A", x: 31, y: 27 }, { n: "14-B", x: 51, y: 47 }, { n: "08-C", x: 30, y: 69 }, { n: "21-D", x: 78, y: 67 }, { n: "17-C", x: 70, y: 27 }];

export function OperationalMap({ mode = "overview", intensity = 1, selectedSector, onSectorClick, sensorInstalled = false, compact = false }: { mode?: MapMode; intensity?: number; selectedSector?: string; onSectorClick?: (sector: string) => void; sensorInstalled?: boolean; compact?: boolean }) {
  const [layersOpen, setLayersOpen] = useState(!compact);
  const [activeLayers, setActiveLayers] = useState(networkLayers.slice(0, mode === "flood" ? 7 : 5));
  const toggle = (layer: string) => setActiveLayers((current) => current.includes(layer) ? current.filter((l) => l !== layer) : [...current, layer]);
  const isFlood = mode === "flood";
  const isSensing = mode === "sensing";
  const isDrought = mode === "drought";
  return <div className={cn("ops-map", compact && "ops-map-compact", `map-${mode}`)}>
    <div className="map-grid" />
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Mapa operacional de Ribeirão das Águas">
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="1.7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="hot"><stop offset="0" stopColor="var(--critical)" stopOpacity={0.8 * intensity}/><stop offset="0.45" stopColor="var(--high)" stopOpacity={0.42 * intensity}/><stop offset="1" stopColor="var(--high)" stopOpacity="0"/></radialGradient>
        <radialGradient id="wet"><stop offset="0" stopColor="var(--critical)" stopOpacity={0.8 * intensity}/><stop offset="0.34" stopColor="var(--warning)" stopOpacity={0.62 * intensity}/><stop offset="0.68" stopColor="var(--secondary-blue)" stopOpacity=".42"/><stop offset="1" stopColor="var(--secondary-blue)" stopOpacity="0"/></radialGradient>
        <radialGradient id="uncertain"><stop offset="0" stopColor="var(--warning)" stopOpacity=".6"/><stop offset="1" stopColor="var(--critical)" stopOpacity="0"/></radialGradient>
      </defs>
      <g className="districts"><path d="M4 8 L35 7 L42 38 L14 48 Z"/><path d="M35 7 L72 5 L66 40 L42 38 Z"/><path d="M72 5 L96 15 L90 48 L66 40 Z"/><path d="M14 48 L42 38 L52 70 L9 91 Z"/><path d="M42 38 L66 40 L83 89 L52 70 Z"/><path d="M66 40 L90 48 L96 91 L83 89 Z"/></g>
      <g className="streets">{streets.map((d, i) => <path key={i} d={d}/>)}</g>
      <path className="river-shadow" d="M-4 72 C20 50 29 65 47 53 S72 34 104 21"/><path className="river" d="M-4 72 C20 50 29 65 47 53 S72 34 104 21"/>
      {isFlood && <><path className="flood-zone" d="M-3 76 C21 53 30 71 48 57 S73 39 104 25 L104 14 C72 29 60 42 45 48 S19 43 -3 64 Z"/><ellipse cx="49" cy="52" rx="23" ry="20" fill="url(#wet)"/><ellipse cx="73" cy="36" rx="18" ry="16" fill="url(#wet)"/></>}
      {isDrought && <><path className="drought-zone normal-zone" d="M9 47 L39 39 L50 72 L11 91 Z"/><path className="drought-zone attention-zone" d="M4 8 L35 7 L42 38 L14 48 Z"/><path className="drought-zone critical-zone" d="M66 40 L91 47 L96 91 L82 89 Z"/></>}
      <g className="pipes">{pipes.map((d, i) => <path key={i} d={d} className={i < 2 ? "main-pipe" : "secondary-pipe"}/>)}</g>
      {mode === "leaks" && <><circle cx="51" cy="47" r={22} fill="url(#hot)"/><path className="priority-pipe" d="M40 40 L51 47 L63 42"/><path className="priority-pipe pipe-two" d="M51 47 L56 62"/></>}
      {isSensing && <><circle cx="70" cy="29" r="25" fill="url(#uncertain)"/><circle className="coverage" cx="28" cy="62" r={sensorInstalled ? 35 : 25}/><circle className="coverage" cx="53" cy="45" r={sensorInstalled ? 32 : 20}/></>}
      {activeLayers.includes("Sensores IoT") && sensors.map((s) => <g key={s.id} className="sensor"><circle cx={s.x} cy={s.y} r="1.2"/><circle cx={s.x} cy={s.y} r="2.8"/></g>)}
      {(isSensing || sensorInstalled) && <g className={cn("recommended-sensor", sensorInstalled && "installed")}><circle cx="70" cy="29" r="6"/><circle cx="70" cy="29" r="2"/><text x="72" y="25">S-27</text></g>}
      {!isSensing && labels.map((l) => <g key={l.n} className={cn("sector-label", selectedSector === l.n && "selected")} onClick={() => onSectorClick?.(l.n)}><rect x={l.x - 5} y={l.y - 4} width="10" height="6" rx="1"/><text x={l.x} y={l.y}>{l.n}</text></g>)}
      {isFlood && <><g className="map-alert critical-marker"><circle cx="49" cy="51" r="4"/><text x="54" y="49">RUA A</text><text x="54" y="53">crítico · 43 min</text></g><g className="map-alert high-marker"><circle cx="72" cy="38" r="4"/><text x="77" y="37">AVENIDA B</text><text x="77" y="41">alto · 1h20</text></g><g className="map-alert info-marker"><circle cx="42" cy="69" r="4"/><text x="47" y="68">HOSPITAL C</text><text x="47" y="72">área de atenção</text></g></>}
    </svg>
    {!compact && <><div className="map-search"><Search/><span>Buscar endereço, setor ou ativo...</span></div><div className="map-controls"><Button size="icon" variant="ghost" title="Ampliar mapa"><Plus/></Button><Button size="icon" variant="ghost" title="Reduzir mapa"><Minus/></Button><Button size="icon" variant="ghost" title="Centralizar"><LocateFixed/></Button></div><Button className="layers-toggle" size="sm" variant="outline" onClick={() => setLayersOpen((v) => !v)}>Camadas</Button>{layersOpen && <div className="layers-panel"><strong>CAMADAS</strong>{networkLayers.map((layer) => <button key={layer} onClick={() => toggle(layer)} className={cn(activeLayers.includes(layer) && "active")}><span>{activeLayers.includes(layer) && <Check/>}</span>{layer}</button>)}</div>}<div className="map-scale"><span/><small>0</small><small>2</small><small>5 km</small></div><div className="north"><Crosshair/><b>N</b></div></>}
  </div>;
}
