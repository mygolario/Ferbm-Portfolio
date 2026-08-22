export type Work = {
  slug: string;
  title: string;
  glaze: string;
  year: string;
  kind: string;
  story: string;
  src: string;
  span: "tall" | "wide" | "square";
};

export const works: Work[] = [
  {
    slug: "stalagmite",
    title: "Stalagmite Holder",
    glaze: "Amber drip over peacock teal",
    year: "2026",
    kind: "Candle vessel",
    story:
      "A column that looks poured rather than built — glaze pooling like tidewater in the folds of the clay.",
    src: "/images/stalagmite-holder.jpg",
    span: "tall",
  },
  {
    slug: "trio",
    title: "Sunlit Trio",
    glaze: "Teal, midnight, speckled stone",
    year: "2026",
    kind: "Bowls",
    story:
      "Three shallow vessels, each rim slightly irregular, catching hard afternoon light like still water.",
    src: "/images/trio-bowls.jpg",
    span: "tall",
  },
  {
    slug: "flame-bowl",
    title: "Flame Rim",
    glaze: "Honey interior, navy-amber shell",
    year: "2026",
    kind: "Sculptural bowl",
    story:
      "The rim is coral and fire at once — pierced, pointed, and glossy enough to hold a second sky.",
    src: "/images/flame-bowl.jpg",
    span: "tall",
  },
  {
    slug: "cups",
    title: "Crumpled Cups",
    glaze: "Navy, blush, mahogany",
    year: "2026",
    kind: "Tumblers",
    story:
      "Clay pinched while wet until the walls remember the grip. Four small cups, four different weathers.",
    src: "/images/crumpled-cups.jpg",
    span: "tall",
  },
  {
    slug: "guardian",
    title: "Guardian",
    glaze: "Periwinkle with ochre crown",
    year: "2026",
    kind: "Sculptural vessel",
    story:
      "A small animal spirit — ears, slit eyes, a flared opening — meant to sit in the palm and watch the room.",
    src: "/images/guardian-vessel.jpg",
    span: "tall",
  },
  {
    slug: "midnight",
    title: "Midnight Form",
    glaze: "Black-blue with copper vein",
    year: "2026",
    kind: "Sculpture",
    story:
      "Gnarled, mineral, almost geological. Gold-brown veins break the dark glaze like ore in night stone.",
    src: "/images/midnight-form.jpg",
    span: "tall",
  },
  {
    slug: "star",
    title: "Star Vessel",
    glaze: "Speckled cream, silver studs",
    year: "2026",
    kind: "Cup",
    story:
      "A raised four-point star and scattered metal points — a quiet constellation pressed into the wall of the cup.",
    src: "/images/star-vessel.jpg",
    span: "wide",
  },
  {
    slug: "watchful",
    title: "Watchful Totem",
    glaze: "Gloss crimson, moss, crystal",
    year: "2026",
    kind: "Narrative sculpture",
    story:
      "A darker chapter: a fleshy column of eyes on a mossed stone base, horned at the crown. Clay as myth.",
    src: "/images/watchful-totem.jpg",
    span: "wide",
  },
];
