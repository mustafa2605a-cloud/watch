export interface WatchVariant {
  id: string;
  name: string;
  strapMaterial: string;
  priceModifier: number;
}

export interface WatchSpec {
  caliber: string;
  movementType: 'Automatic Chronograph' | 'Mechanical Hand-Wound' | 'Automatic Haute Horlogerie';
  powerReserve: string;
  frequency: string;
  caseDiameter: string;
  caseThickness: string;
  caseMaterial: string;
  waterResistance: string;
  crystal: string;
  dialColor: string;
  caseback: string;
  jewels: number;
}

export interface WatchProduct {
  id: string;
  name: string;
  collection: 'Obsidian' | 'Aurum' | 'Apex' | 'Chronos';
  tagline: string;
  priceUSD: number;
  featured: boolean;
  isNewArrival?: boolean;
  isLimitedEdition?: boolean;
  editionLimit?: number;
  primaryImage: string;
  secondaryImages: string[];
  shortDescription: string;
  overviewStory: string;
  craftsmanshipNotes: string;
  specs: WatchSpec;
  variants: WatchVariant[];
  inStock: boolean;
  boxIncludes: string[];
}

export const WATCH_COLLECTIONS = [
  {
    id: 'Obsidian',
    title: 'VELTRON Obsidian',
    tagline: 'Stealth Ceramic & Precision Nocturne Engineering',
    description: 'Forged from deep obsidian black DLC, brushed steel, and high-frequency chronograph movements. Built for absolute power and nocturnal elegance.',
    heroImage: '/assets/aistudio/watch1_9d5552dd.jpg',
    accentColor: '#38bdf8',
  },
  {
    id: 'Aurum',
    title: 'VELTRON Aurum',
    tagline: '18K Rose & Champagne Gold Radiance',
    description: 'An homage to perpetual radiance. Triple-register chronographs encased in solid gold alloys with mirror-polished bevels and sapphire casebacks.',
    heroImage: '/assets/aistudio/watch2_fc738d32.jpg',
    accentColor: '#c5a059',
  },
  {
    id: 'Apex',
    title: 'VELTRON Apex',
    tagline: 'Architectural Titanium & Mineral Dominance',
    description: 'Engineered alongside aerospace metallurgists. Grade 5 titanium, high-contrast luminescent indices, and 300-meter extreme depth resilience.',
    heroImage: '/assets/aistudio/watch4_bf70b33a.jpg',
    accentColor: '#f97316',
  },
  {
    id: 'Chronos',
    title: 'VELTRON Chronos',
    tagline: 'Heritage Enamel & Patinated Leather Complications',
    description: 'Echoing the classical tradition of Haute Horlogerie. Grand Feu enamel dials, blued hands, Roman numerals, and hand-stitched Horween calfskin straps.',
    heroImage: '/assets/aistudio/watch3_180dc88e.jpg',
    accentColor: '#e2e8f0',
  },
] as const;

export const WATCH_PRODUCTS: WatchProduct[] = [
  {
    id: 'veltron-obsidian-chrono',
    name: 'Obsidian Chrono Grand Prix',
    collection: 'Obsidian',
    tagline: 'Black PVD Steel & Dual-Tone Tachymètre',
    priceUSD: 14800,
    featured: true,
    isNewArrival: true,
    isLimitedEdition: true,
    editionLimit: 250,
    primaryImage: '/assets/aistudio/watch1_9d5552dd.jpg',
    secondaryImages: [
      '/assets/aistudio/watch1_9d5552dd.jpg',
      '/assets/aistudio/watch6_0d9e46c7.jpg',
      '/assets/aistudio/watch2_fc738d32.jpg',
    ],
    shortDescription: 'Precision 3-register chronograph set within a satin-finished 316L black stainless steel case with gold luminescent indices.',
    overviewStory: 'The Obsidian Chrono Grand Prix represents the pinnacle of VELTRON racing heritage and contemporary mechanical mastery. Each dial features diamond-cut faceted hour markers coated with warm champagne Super-LumiNova, offering instantaneous readability under any light conditions.',
    craftsmanshipNotes: 'Every case undergoes 48 hours of manual brushing followed by high-vacuum PVD treatment to yield an enduring deep obsidian sheen resistant to scratches and marine corrosion.',
    specs: {
      caliber: 'VEL-8820 Column-Wheel Automatic',
      movementType: 'Automatic Chronograph',
      powerReserve: '72 Hours',
      frequency: '28,800 vph (4 Hz)',
      caseDiameter: '42.0 mm',
      caseThickness: '12.8 mm',
      caseMaterial: '316L Stainless Steel & Black PVD Coating',
      waterResistance: '100 Meters / 10 ATM',
      crystal: 'Double-Domed Anti-Reflective Sapphire',
      dialColor: 'Matte Obsidian Black with Sunray Subdials',
      caseback: 'Exhibition Sapphire with 22K Gold Rotor',
      jewels: 33,
    },
    variants: [
      { id: 'steel-bracelet', name: 'Integrated Two-Tone Oyster Bracelet', strapMaterial: 'Solid Steel & PVD Links', priceModifier: 0 },
      { id: 'leather-strap', name: 'Hand-Stitched Black Alligator Strap', strapMaterial: 'Louisiana Alligator Leather', priceModifier: 450 },
      { id: 'rubber-strap', name: 'FKM High-Performance Ribbed Rubber', strapMaterial: 'Vulcanized FKM Elastomer', priceModifier: 200 },
    ],
    inStock: true,
    boxIncludes: [
      'VELTRON Piano-Lacquered Wooden Presentation Vault',
      'Certificate of Authenticity & 5-Year Global Guarantee Card',
      'Spring Bar Ergonomic Strap-Changing Tool',
      'Handcrafted Suede Travel Pouch',
    ],
  },
  {
    id: 'veltron-aurum-royale',
    name: 'Aurum Chronomaster Royale',
    collection: 'Aurum',
    tagline: '18K Champagne Rose Gold & Ceramic Bezel',
    priceUSD: 28500,
    featured: true,
    isLimitedEdition: true,
    editionLimit: 100,
    primaryImage: '/assets/aistudio/watch2_fc738d32.jpg',
    secondaryImages: [
      '/assets/aistudio/watch2_fc738d32.jpg',
      '/assets/aistudio/watch1_9d5552dd.jpg',
    ],
    shortDescription: 'Cast in proprietary 18K rose gold alloy with a ceramic tachymeter bezel and mirror-finished bracelet links.',
    overviewStory: 'The Aurum Chronomaster Royale bridges the gap between sculptural haute joaillerie and high-performance horology. Its triple-register chronograph movement reflects the highest tier of Geneva finishing, featuring hand-beveled bridges and circular graining.',
    craftsmanshipNotes: 'The 18K gold alloy is blended in-house with palladium to ensure the metal never tarnishes or fades over generations of wear.',
    specs: {
      caliber: 'VEL-9100 Flyback Chronograph',
      movementType: 'Automatic Haute Horlogerie',
      powerReserve: '68 Hours',
      frequency: '28,800 vph (4 Hz)',
      caseDiameter: '41.5 mm',
      caseThickness: '13.1 mm',
      caseMaterial: 'Proprietary 18K Rose Gold Alloy',
      waterResistance: '100 Meters / 10 ATM',
      crystal: 'Scratch-Proof Curved Sapphire Crystal',
      dialColor: 'Onyx Black Lacquer with Rose Gold Applied Indices',
      caseback: 'Transparent Sapphire Exhibition Caseback',
      jewels: 37,
    },
    variants: [
      { id: 'gold-bracelet', name: 'Solid 18K Rose Gold 3-Link Bracelet', strapMaterial: '18K Rose Gold Alloy', priceModifier: 0 },
      { id: 'matte-alligator', name: 'Dark Chestnut Matte Alligator Strap', strapMaterial: 'Hand-Rolled Alligator', priceModifier: -1200 },
    ],
    inStock: true,
    boxIncludes: [
      'Handcrafted Italian Calfskin & Walnut Presentation Case',
      'COSC Chronometer Certified Certificate',
      'Digital RFID Warranty Card & VELTRON VIP Atelier Key',
      'Microfiber Polishing Cloth',
    ],
  },
  {
    id: 'veltron-chronos-classique',
    name: 'Chronos Classique 1853',
    collection: 'Chronos',
    tagline: 'Grand Feu White Enamel & Hand-Polished Roman Indices',
    priceUSD: 11900,
    featured: true,
    isNewArrival: true,
    primaryImage: '/assets/aistudio/watch3_180dc88e.jpg',
    secondaryImages: [
      '/assets/aistudio/watch3_180dc88e.jpg',
      '/assets/aistudio/watch5_d6c384c5.jpg',
    ],
    shortDescription: 'Pure understated refinement. Crisp white grand feu enamel dial, elongated Roman numerals, and hand-stitched espresso leather.',
    overviewStory: 'The Chronos Classique honors the architectural proportion of classical watchmaking. Every detail—from the razor-thin blued steel second hand to the discreet date window at 3 o\'clock—exudes poise and serene authority.',
    craftsmanshipNotes: 'The dial is fired at over 800 degrees Celsius in a specialized kiln to produce a vitreous Grand Feu enamel surface that will never oxidize or change hue.',
    specs: {
      caliber: 'VEL-3200 Ultra-Thin Automatic',
      movementType: 'Automatic Haute Horlogerie',
      powerReserve: '55 Hours',
      frequency: '21,600 vph (3 Hz)',
      caseDiameter: '39.0 mm',
      caseThickness: '8.9 mm',
      caseMaterial: 'High-Polished 316L Stainless Steel',
      waterResistance: '50 Meters / 5 ATM',
      crystal: 'Box-Domed Sapphire Crystal with Dual AR Coating',
      dialColor: 'Grand Feu Vitreous White Enamel',
      caseback: 'Engraved Caseback with Côtes de Genève Finish',
      jewels: 26,
    },
    variants: [
      { id: 'brown-croco', name: 'Dark Cognac Hand-Stitched Leather', strapMaterial: 'Vegetable-Tanned Calfskin', priceModifier: 0 },
      { id: 'black-alligator', name: 'Midnight Black Alligator Strap', strapMaterial: 'Glazed Louisiana Alligator', priceModifier: 350 },
      { id: 'steel-mesh', name: 'Milanese Polished Steel Mesh', strapMaterial: '316L Woven Steel Mesh', priceModifier: 200 },
    ],
    inStock: true,
    boxIncludes: [
      'VELTRON Heritage Leather Watch Travel Roll',
      'Engraved 5-Year International Warranty Metal Plate',
      'Atelier Certificate of Testing & Accuracy Log',
    ],
  },
  {
    id: 'veltron-apex-monolith',
    name: 'Apex Monolith Diver',
    collection: 'Apex',
    tagline: 'Grade 5 Satin Titanium & High-Contrast Mineral Grey',
    priceUSD: 16200,
    featured: true,
    isNewArrival: false,
    isLimitedEdition: true,
    editionLimit: 500,
    primaryImage: '/assets/aistudio/watch4_bf70b33a.jpg',
    secondaryImages: [
      '/assets/aistudio/watch4_bf70b33a.jpg',
      '/assets/aistudio/watch1_9d5552dd.jpg',
    ],
    shortDescription: 'Architectural dive timepiece engineered in lightweight Grade 5 titanium, featuring a bidirectional ceramic bezel and vivid orange minute hand.',
    overviewStory: 'Created for extreme depths and architectural purity, the Apex Monolith draws inspiration from monolithic granite and brutalist silhouettes. Its titanium chassis provides unmatched resistance against high atmospheric pressure while remaining astonishingly light on the wrist.',
    craftsmanshipNotes: 'CNC machined from a solid billet of aerospace-grade titanium with micro-bead blasting and satin brushed bevels.',
    specs: {
      caliber: 'VEL-7500 Deep-Sea Automatic',
      movementType: 'Automatic Haute Horlogerie',
      powerReserve: '70 Hours',
      frequency: '28,800 vph (4 Hz)',
      caseDiameter: '42.5 mm',
      caseThickness: '13.4 mm',
      caseMaterial: 'Grade 5 Aerospace Titanium',
      waterResistance: '300 Meters / 30 ATM',
      crystal: '4.2mm Flat Sapphire Crystal with Inner AR',
      dialColor: 'Fumé Slate Grey with Applied Luminous Batons',
      caseback: 'Solid Titanium Screwed Caseback with Relief Compass',
      jewels: 28,
    },
    variants: [
      { id: 'titanium-beads', name: 'Titanium Beads-of-Rice Multi-Link', strapMaterial: 'Grade 5 Titanium', priceModifier: 0 },
      { id: 'nato-orange', name: 'Tactical Technical Ballistic Strap', strapMaterial: 'Military Grade Cordura', priceModifier: -150 },
      { id: 'black-rubber', name: 'Isofrane Natural Diver Rubber', strapMaterial: 'Vented Vulcanized Rubber', priceModifier: 100 },
    ],
    inStock: true,
    boxIncludes: [
      'Watertight Pressure-Sealed Exploration Vault',
      'Auxiliary Cordura Diver Strap & Hex Screwdrivers',
      'Depth & Pressure Certification Sheet',
    ],
  },
  {
    id: 'veltron-chronos-fieldmaster',
    name: 'Chronos Fieldmaster Tactical',
    collection: 'Chronos',
    tagline: 'Vintage Caliber Chronograph & Patinated Horween NATO',
    priceUSD: 13400,
    featured: false,
    isNewArrival: false,
    primaryImage: '/assets/aistudio/watch5_d6c384c5.jpg',
    secondaryImages: [
      '/assets/aistudio/watch5_d6c384c5.jpg',
      '/assets/aistudio/watch6_0d9e46c7.jpg',
    ],
    shortDescription: 'Tactical heritage chronograph with tri-compax matte dial, tachymetric bezel, and patinated distressed leather strap.',
    overviewStory: 'The Fieldmaster Tactical captures the adventurous spirit of mid-century aviation and exploration. Paired with aged saddle leather, it develops an individualized patina with every journey.',
    craftsmanshipNotes: 'Equipped with a column-wheel manual chronograph movement calibrated for exact tactile push-piece engagement.',
    specs: {
      caliber: 'VEL-1861 Hand-Wound Chronograph',
      movementType: 'Mechanical Hand-Wound',
      powerReserve: '48 Hours',
      frequency: '21,600 vph (3 Hz)',
      caseDiameter: '39.7 mm',
      caseThickness: '12.2 mm',
      caseMaterial: 'Brushed 316L Stainless Steel',
      waterResistance: '100 Meters / 10 ATM',
      crystal: 'Hesalite Curved Crystal with Sapphire Caseback Option',
      dialColor: 'Matte Charcoal Black with Cream Patina Luminescence',
      caseback: 'Threaded Steel with Historic Seal Engraving',
      jewels: 21,
    },
    variants: [
      { id: 'horween-leather', name: 'Vintage Distressed Horween Leather', strapMaterial: 'American Chromexcel Leather', priceModifier: 0 },
      { id: 'bund-strap', name: 'Aviator Bund Protective Leather Cuff', strapMaterial: 'Full-Grain Saddle Leather', priceModifier: 250 },
      { id: 'steel-vintage', name: 'Vintage 1960s Riveted Steel Bracelet', strapMaterial: 'Polished Stainless Steel', priceModifier: 400 },
    ],
    inStock: true,
    boxIncludes: [
      'Waxed Canvas & Bridle Leather Traveling Case',
      'Horology History Booklet & Caliber Blueprint',
      'VELTRON 5-Year International Guarantee Card',
    ],
  },
  {
    id: 'veltron-obsidian-nocturne',
    name: 'Obsidian Nocturne Heritage',
    collection: 'Obsidian',
    tagline: 'High-Beat Caliber with Tobacco Suede Strap',
    priceUSD: 15600,
    featured: false,
    isNewArrival: true,
    primaryImage: '/assets/aistudio/watch6_0d9e46c7.jpg',
    secondaryImages: [
      '/assets/aistudio/watch6_0d9e46c7.jpg',
      '/assets/aistudio/watch5_d6c384c5.jpg',
      '/assets/aistudio/watch1_9d5552dd.jpg',
    ],
    shortDescription: 'High-contrast tachymeter scale, triple subdials, and a soft tobacco suede strap creating a striking study in tactile contrast.',
    overviewStory: 'A quiet masterclass in tone and texture. The Nocturne Heritage balances an intensely dark dial with the warmth of hand-stitched roughout suede, evoking late-night cityscapes and private horological salons.',
    craftsmanshipNotes: 'The ceramic bezel insert is laser-engraved with tachymetric numerals filled with liquid platinum.',
    specs: {
      caliber: 'VEL-8820 Column-Wheel Automatic',
      movementType: 'Automatic Chronograph',
      powerReserve: '72 Hours',
      frequency: '28,800 vph (4 Hz)',
      caseDiameter: '40.5 mm',
      caseThickness: '12.5 mm',
      caseMaterial: '316L Stainless Steel with Fine Satin Finish',
      waterResistance: '100 Meters / 10 ATM',
      crystal: 'Double-Domed Sapphire Crystal with Internal AR',
      dialColor: 'Velvet Matte Black with Subtle Contrast Sub-Rings',
      caseback: 'Exhibition Sapphire Display',
      jewels: 33,
    },
    variants: [
      { id: 'tobacco-suede', name: 'Handcrafted Tobacco Roughout Suede', strapMaterial: 'Italian Suede Leather', priceModifier: 0 },
      { id: 'black-cordovan', name: 'Shell Cordovan Black Leather', strapMaterial: 'Genuine Shell Cordovan', priceModifier: 300 },
      { id: 'steel-chrono', name: 'Solid Brushed Steel Links with Micro-Adjustment', strapMaterial: '316L Stainless Steel', priceModifier: 500 },
    ],
    inStock: true,
    boxIncludes: [
      'VELTRON Piano-Lacquered Wooden Presentation Vault',
      'Complimentary Travel Roll in Nubuck Leather',
      'Certificate of Chronometer Testing & Warranty Card',
    ],
  },
];
