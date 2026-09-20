export const leakEvents = [
  { place: "Setor 14-B", issue: "Possível vazamento", metric: "87%", level: "critical" },
  { place: "Setor 08-C", issue: "Vazão anômala", metric: "76%", level: "high" },
  { place: "Setor 21-D", issue: "Consumo acima da faixa", metric: "62%", level: "attention" },
  { place: "Setor 12-A", issue: "Padrão noturno atípico", metric: "58%", level: "info" },
] as const;
export const leakEvidence = ["Queda anormal de pressão", "Vazão incompatível com consumo", "Comportamento noturno atípico", "Histórico de manutenção"];
