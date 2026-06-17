/* ═══════════════════════════════════════════════════════════════
   📦 PRODUCT DATA — Edit this file to customize your store
   ═══════════════════════════════════════════════════════════════ */

export type Product = {
  id: string;
  name: string;
  parentCategory: "Women" | "Men" | "Atelier" | "Gifts" | "Stories";
  subCategory: string;
  price: number;
  currency: "USD";
  images: string[];
  alt: string;
  badge?: "New" | "Limited" | "Bespoke";
  colors: string[];        // hex swatches
  colorNames: string[];    // matching names per hex
  material: string;        // for filtering
  artisan: string;
  description: string;
};

export const PARENT_CATEGORIES = ["Women", "Men", "Atelier", "Gifts", "Stories"] as const;
export type ParentCategory = (typeof PARENT_CATEGORIES)[number];

export const SUB_CATEGORIES: Record<ParentCategory, string[]> = {
  Women: ["Bags", "Clothing", "Shoes", "Accessories", "Jewelry"],
  Men: ["Bags", "Clothing", "Shoes", "Accessories", "Jewelry"],
  Atelier: ["Ceramics", "Objects", "Furniture"],
  Gifts: ["All Gifts", "Under $500", "Under $1,000", "Bespoke"],
  Stories: ["Latest", "Behind the Atelier", "Craftsmanship"],
};

export const PRODUCTS: Product[] = [
  // ───── WOMEN ─────
  {
    id: "w-bag-001",
    name: "Sienna Saddle Tote — Vegetable Tanned",
    parentCategory: "Women",
    subCategory: "Bags",
    price: 1480,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/26316185/pexels-photo-26316185.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/20380733/pexels-photo-20380733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/20380732/pexels-photo-20380732.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Hand-stitched brown leather tote bag",
    badge: "New",
    colors: ["#3a2418", "#0a0a0a", "#c9a37a"],
    colorNames: ["Sienna Brown", "Obsidian Black", "Warm Beige"],
    material: "Leather",
    artisan: "Atelier Firenze",
    description: "Hand-stitched from a single piece of vegetable-tanned Tuscan leather. Each saddle tote develops a unique patina over time. Lined in unbleached organic cotton.",
  },
  {
    id: "w-bag-002",
    name: "Plinth Carry — Edition of 40",
    parentCategory: "Women",
    subCategory: "Bags",
    price: 2240,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/5706269/pexels-photo-5706269.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/26316185/pexels-photo-26316185.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Brown leather handbags on pedestals",
    badge: "Limited",
    colors: ["#5a3a26", "#e8dccb"],
    colorNames: ["Tobacco Brown", "Cream"],
    material: "Leather",
    artisan: "Maison Arté",
    description: "A sculptural carry piece limited to 40 numbered editions. Formed over a solid maple mold, then finished with a hand-applied wax seal.",
  },
  {
    id: "w-bag-003",
    name: "Veiled Top-Handle — Cocoa",
    parentCategory: "Women",
    subCategory: "Bags",
    price: 1980,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/20380733/pexels-photo-20380733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/20380732/pexels-photo-20380732.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Brown leather top handle bag",
    colors: ["#4a2e1f", "#0a0a0a"],
    colorNames: ["Cocoa", "Black"],
    material: "Leather",
    artisan: "Atelier Firenze",
    description: "A restrained top-handle silhouette with a concealed magnetic closure. The leather is dyed using natural bark extracts over three weeks.",
  },
  {
    id: "w-shoes-001",
    name: "Sculpted Mule — Calf Leather",
    parentCategory: "Women",
    subCategory: "Shoes",
    price: 890,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/9463353/pexels-photo-9463353.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Sculpted leather mule shoe",
    badge: "New",
    colors: ["#0a0a0a", "#3a2418"],
    colorNames: ["Black", "Sienna"],
    material: "Leather",
    artisan: "Atelier Firenze",
    description: "Carved from a single block of calf leather by master last-makers in Tuscany. The stacked heel is finished with a hand-burnished edge.",
  },
  {
    id: "w-cloth-001",
    name: "Linen Tunic — Hand-Loomed",
    parentCategory: "Women",
    subCategory: "Clothing",
    price: 620,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/8767269/pexels-photo-8767269.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Elegant linen tunic",
    colors: ["#f4ede1", "#0a0a0a"],
    colorNames: ["Natural Linen", "Black"],
    material: "Linen",
    artisan: "Maison Arté",
    description: "Woven on a hand-operated loom in Northern Italy. The irregular slub texture is a signature of artisanal production — no two pieces are identical.",
  },
  {
    id: "w-jewel-001",
    name: "Verde Bead Cuff — Hand-Strung",
    parentCategory: "Women",
    subCategory: "Jewelry",
    price: 320,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/34372582/pexels-photo-34372582.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Green beaded bracelet on white stone",
    badge: "New",
    colors: ["#2f5a3a", "#0a0a0a", "#c9a37a"],
    colorNames: ["Jade Green", "Black", "Gold"],
    material: "Beaded",
    artisan: "Maison Arté",
    description: "Each bead is individually hand-strung on waxed cotton cord. The central jade bead is ethically sourced from a family-run atelier in Kyoto.",
  },
  {
    id: "w-jewel-002",
    name: "Sterling Signet Stack — Set of Four",
    parentCategory: "Women",
    subCategory: "Jewelry",
    price: 760,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/9463353/pexels-photo-9463353.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Four sterling silver signet rings",
    colors: ["#c0c0c0", "#0a0a0a"],
    colorNames: ["Silver", "Black Rhodium"],
    material: "Silver",
    artisan: "Maison Arté",
    description: "Four sterling silver signet rings designed to be worn together or individually. Each is cast using the lost-wax method in a London foundry.",
  },

  // ───── MEN ─────
  {
    id: "m-bag-001",
    name: "Weekender — Waxed Canvas & Leather",
    parentCategory: "Men",
    subCategory: "Bags",
    price: 1320,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/20380733/pexels-photo-20380733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/26316185/pexels-photo-26316185.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Waxed canvas weekend bag",
    colors: ["#3a2418", "#0a0a0a"],
    colorNames: ["Tobacco", "Black"],
    material: "Canvas",
    artisan: "Atelier Firenze",
    description: "Heavy-duty waxed canvas with bridle leather handles. Made to last decades — the wax patina deepens with each journey.",
  },
  {
    id: "m-bag-002",
    name: "Document Folio — Slim Profile",
    parentCategory: "Men",
    subCategory: "Bags",
    price: 680,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/26316185/pexels-photo-26316185.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Slim leather document folio",
    colors: ["#0a0a0a", "#5a3a26"],
    colorNames: ["Black", "Tobacco"],
    material: "Leather",
    artisan: "Atelier Firenze",
    description: "A minimal leather folio with hand-stitched detailing. Fits a 14\" laptop with room for notebooks.",
  },
  {
    id: "m-shoes-001",
    name: "Goodyear Welted Oxford — Cordovan",
    parentCategory: "Men",
    subCategory: "Shoes",
    price: 1650,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/37443512/pexels-photo-37443512.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Cordovan leather oxford shoes",
    badge: "Bespoke",
    colors: ["#2a1e14", "#0a0a0a"],
    colorNames: ["Cordovan", "Black"],
    material: "Leather",
    artisan: "Atelier Firenze",
    description: "Shell cordovan leather, Goodyear welted by hand over 8 weeks. Resoleable for life.",
  },
  {
    id: "m-cloth-001",
    name: "Wool Field Jacket — Donegal Tweed",
    parentCategory: "Men",
    subCategory: "Clothing",
    price: 1780,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/37443512/pexels-photo-37443512.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Wool field jacket in Donegal tweed",
    colors: ["#6b5a48", "#3a2a1e"],
    colorNames: ["Herringbone", "Charcoal"],
    material: "Wool",
    artisan: "Maison Arté",
    description: "Woven in County Donegal, Ireland, from raw wool. Cut and sewn in a single atelier in the West of Ireland.",
  },
  {
    id: "m-jewel-001",
    name: "Curb Chain Bracelet — Sterling Silver",
    parentCategory: "Men",
    subCategory: "Jewelry",
    price: 480,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/34372582/pexels-photo-34372582.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Sterling silver curb chain bracelet",
    colors: ["#c0c0c0"],
    colorNames: ["Silver"],
    material: "Silver",
    artisan: "Maison Arté",
    description: "Hand-assembled curb chain in polished sterling silver. Each link is soldered and finished by a single silversmith.",
  },

  // ───── ATELIER ─────
  {
    id: "atl-cer-001",
    name: "Obsidian Vessel — Hand-Thrown",
    parentCategory: "Atelier",
    subCategory: "Ceramics",
    price: 640,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/31203857/pexels-photo-31203857.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/31203863/pexels-photo-31203863.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Dark hand-thrown ceramic vessel",
    colors: ["#0a0a0a", "#2a2a2a"],
    colorNames: ["Obsidian", "Charcoal"],
    material: "Ceramic",
    artisan: "Studio Lasaeva",
    description: "Stoneware vessel thrown on a wheel, then wood-fired for 72 hours. The ash glaze forms naturally in the kiln.",
  },
  {
    id: "atl-cer-002",
    name: "Patina Bowl Set — Six Pieces",
    parentCategory: "Atelier",
    subCategory: "Ceramics",
    price: 880,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/31203863/pexels-photo-31203863.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      "https://images.pexels.com/photos/31203857/pexels-photo-31203857.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Earthenware bowls with metallic patina",
    badge: "Bespoke",
    colors: ["#8a7560", "#c9b89a"],
    colorNames: ["Bronze", "Golden"],
    material: "Ceramic",
    artisan: "Studio Lasaeva",
    description: "Six earthenware bowls finished with a copper-infused patina. Each piece is fired three times to achieve the metallic sheen.",
  },
  {
    id: "atl-cer-003",
    name: "Relief Fragment — Sculptural Object",
    parentCategory: "Atelier",
    subCategory: "Ceramics",
    price: 520,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/31203669/pexels-photo-31203669.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Pottery with sculpted texture",
    colors: ["#6b5a48"],
    colorNames: ["Terracotta"],
    material: "Ceramic",
    artisan: "Studio Lasaeva",
    description: "A ceramic wall object with hand-carved relief. Inspired by geological strata and ancient pottery fragments.",
  },
  {
    id: "atl-obj-001",
    name: "Silentium Porcelain — Editioned Vase",
    parentCategory: "Atelier",
    subCategory: "Objects",
    price: 1180,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/8767269/pexels-photo-8767269.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Sculpted ceramic vase editorial",
    badge: "Limited",
    colors: ["#f4ede1", "#0a0a0a"],
    colorNames: ["Porcelain White", "Black"],
    material: "Porcelain",
    artisan: "Studio Lasaeva",
    description: "Porcelain vase with a matte, unglazed surface. The form is thrown in two parts and joined by hand.",
  },

  // ───── GIFTS ─────
  {
    id: "gft-001",
    name: "Artisan Gift Box — Curated Set",
    parentCategory: "Gifts",
    subCategory: "All Gifts",
    price: 380,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/31203863/pexels-photo-31203863.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Curated artisan gift box",
    badge: "New",
    colors: ["#8a7560"],
    colorNames: ["Bronze"],
    material: "Mixed",
    artisan: "Maison Arté",
    description: "A curated set of three artisan pieces — a ceramic bowl, linen napkin, and hand-poured candle. Presented in a archival-quality box.",
  },
  {
    id: "gft-002",
    name: "Mini Vessel — Under $500",
    parentCategory: "Gifts",
    subCategory: "Under $500",
    price: 420,
    currency: "USD",
    images: [
      "https://images.pexels.com/photos/31203669/pexels-photo-31203669.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    ],
    alt: "Small hand-thrown ceramic vessel",
    colors: ["#6b5a48"],
    colorNames: ["Terracotta"],
    material: "Ceramic",
    artisan: "Studio Lasaeva",
    description: "A smaller edition of our Obsidian Vessel. Perfect as an entry point into the collection.",
  },
];

// ───── Helpers for filtering ─────

export const ALL_MATERIALS = Array.from(new Set(PRODUCTS.map((p) => p.material))).sort();
export const ALL_COLORS = Array.from(new Set(PRODUCTS.flatMap((p) => p.colorNames))).sort();
export const ALL_ARTISANS = Array.from(new Set(PRODUCTS.map((p) => p.artisan))).sort();

export const ALL_PRICE_RANGES = [
  { label: "All Prices", min: 0, max: 100000 },
  { label: "Under $500", min: 0, max: 500 },
  { label: "$500 – $1,000", min: 500, max: 1000 },
  { label: "$1,000 – $2,000", min: 1000, max: 2000 },
  { label: "Over $2,000", min: 2000, max: 100000 },
] as const;

// Map from colorName to its closest hex for swatch rendering
export const COLOR_NAME_TO_HEX: Record<string, string> = {};
PRODUCTS.forEach((p) => {
  p.colorNames.forEach((name, i) => {
    if (p.colors[i]) COLOR_NAME_TO_HEX[name] = p.colors[i];
  });
});
