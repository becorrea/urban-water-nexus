export const floodEvents = [
  { place: "Rua A — Centro", issue: "Alagamento provável", metric: "43 min", level: "critical" },
  { place: "Avenida B", issue: "Acúmulo previsto", metric: "1h20", level: "high" },
  { place: "Hospital C", issue: "Risco de isolamento", metric: "2h10", level: "attention" },
] as const;
export const floodActions = [
  { action: "Inspecionar galeria 231", reason: "Risco de obstrução identificado", time: "15 min", level: "critical" },
  { action: "Mobilizar equipe para bomba 07", reason: "Nível do rio em elevação", time: "20 min", level: "critical" },
  { action: "Bloquear via Y", reason: "Prevenção de alagamento", time: "35 min", level: "high" },
  { action: "Alertar Defesa Civil", reason: "Áreas de risco a jusante", time: "Imediato", level: "high" },
] as const;
