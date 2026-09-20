export const sensors = Array.from({ length: 18 }, (_, index) => ({
  id: `S-${String(index + 1).padStart(2, "0")}`,
  x: 12 + ((index * 19) % 76),
  y: 16 + ((index * 23) % 68),
  status: index === 6 ? "attention" : "normal",
}));
export const sensorRecommendation = {
  id: "S-27", location: "Interseção hidráulica — Setor 17-C", type: "Pressão + vazão",
  coverageBefore: 68, coverageAfter: 89, uncertaintyBefore: 31, uncertaintyAfter: 13,
  earlyDetection: 24, sectors: 3, confidence: 86,
};
