// Maps a category label to an accent color used for card edges and
// the generated cover panel. Add new categories here as needed —
// falls back to gold for anything not listed.

const COLORS: Record<string, string> = {
  FMCG: "#C99A4B",
  Commodities: "#4FA490",
  Business: "#8AA0C9",
  Bangladesh: "#C99A4B",
  "Competitor Research": "#C96B4B",
  Consumer: "#8AA0C9",
  "Consumer Behavior": "#8AA0C9",
  Template: "#4FA490",
};

export function categoryColor(category: string): string {
  return COLORS[category] ?? "#C99A4B";
}
