export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/[,#\s]+/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 8);
}

export function extractPalette(seed: string): string[] {
  const palettes = [
    ["#0b1a2b", "#1e3a5f", "#c9a227", "#f0e6d2"],
    ["#e8a87c", "#c38d9e", "#41b3a3", "#f5f0e8"],
    ["#1a1a1a", "#8b3a4a", "#f5f0e8", "#c9a227"],
    ["#6b8f71", "#d4c4a8", "#3d3d3d", "#f0ebe3"],
    ["#e07a5f", "#3d405b", "#81b29a", "#f2cc8f"],
    ["#2d1b0e", "#c45c26", "#f4a261", "#1a1a2e"],
    ["#f5f0e8", "#1a1a1a", "#c9a227", "#5c6b8a"],
    ["#b56b45", "#d4a574", "#8b5e3c", "#f5e6d3"],
  ];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palettes[Math.abs(hash) % palettes.length];
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
