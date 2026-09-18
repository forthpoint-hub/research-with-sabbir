export interface FontPairing {
  id: string;
  label: string;
  googleFontsHref: string;
  serifVar: string;
  sansVar: string;
}

export const FONT_PAIRINGS: FontPairing[] = [
  {
    id: "editorial",
    label: "Editorial — Source Serif 4 + IBM Plex Sans",
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=IBM+Plex+Sans:wght@400;500;600&display=swap",
    serifVar: "'Source Serif 4', Georgia, serif",
    sansVar: "'IBM Plex Sans', system-ui, sans-serif",
  },
  {
    id: "modern",
    label: "Modern — Fraunces + Inter",
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap",
    serifVar: "'Fraunces', Georgia, serif",
    sansVar: "'Inter', system-ui, sans-serif",
  },
  {
    id: "classic",
    label: "Classic — Playfair Display + Source Sans 3",
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Source+Sans+3:wght@400;500;600&display=swap",
    serifVar: "'Playfair Display', Georgia, serif",
    sansVar: "'Source Sans 3', system-ui, sans-serif",
  },
  {
    id: "technical",
    label: "Technical — IBM Plex Serif + IBM Plex Sans",
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap",
    serifVar: "'IBM Plex Serif', Georgia, serif",
    sansVar: "'IBM Plex Sans', system-ui, sans-serif",
  },
];

export function getFontPairing(id: string): FontPairing {
  return FONT_PAIRINGS.find((f) => f.id === id) ?? FONT_PAIRINGS[0];
}
