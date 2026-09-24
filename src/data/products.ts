export type Category =
  | "cocina"
  | "linea-blanca"
  | "cuidado-personal"
  | "climatizacion";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  brand: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
  description: string;
};

export const categoryLabels: Record<Category, string> = {
  cocina: "Cocina",
  "linea-blanca": "Línea Blanca",
  "cuidado-personal": "Cuidado Personal",
  climatizacion: "Climatización",
};

export const products: Product[] = [
  {
    id: "p01",
    slug: "procesadora-alimentos-milexus",
    name: "Procesadora de Alimentos",
    category: "cocina",
    brand: "MILEXUS",
    price: 45,
    sizes: ["1.5L"],
    colors: ["Plateado", "Negro"],
    images: [
      "https://images.unsplash.com/photo-1780511879762-156c25c75ac2?w=800&q=80",
    ],
    description: "Tritura, pica y mezcla en segundos. Ideal para uso en cocina o negocio.",
  },
  {
    id: "p02",
    slug: "licuadora-oster-clasica",
    name: "Licuadora Clásica",
    category: "cocina",
    brand: "Oster",
    price: 38,
    sizes: ["1.25L"],
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?w=800&q=80",
    ],
    description: "Motor potente de alto torque, vaso de vidrio resistente, 3 velocidades.",
  },
  {
    id: "p03",
    slug: "freidora-aire-black-decker",
    name: "Freidora de Aire",
    category: "cocina",
    brand: "Black+Decker",
    price: 65,
    sizes: ["4L"],
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1695089028114-ce28248f0ab9?w=800&q=80",
    ],
    description: "Cocina con poco o nada de aceite, panel digital, temporizador integrado.",
  },
  {
    id: "p04",
    slug: "cafetera-oster-12-tazas",
    name: "Cafetera 12 Tazas",
    category: "cocina",
    brand: "Oster",
    price: 40,
    sizes: ["12 tazas"],
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1674504866626-fe4f19f68564?w=800&q=80",
    ],
    description: "Jarra de vidrio, filtro permanente, placa de calentamiento antigoteo.",
  },
  {
    id: "p05",
    slug: "batidora-pie-milexus",
    name: "Batidora de Pie",
    category: "cocina",
    brand: "MILEXUS",
    price: 55,
    sizes: ["5L"],
    colors: ["Rojo", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1592542394539-0ce14590941d?w=800&q=80",
    ],
    description: "Bowl de acero inoxidable, varios accesorios, ideal para repostería.",
  },
  {
    id: "p06",
    slug: "tostadora-black-decker",
    name: "Tostadora 2 Rebanadas",
    category: "cocina",
    brand: "Black+Decker",
    price: 28,
    sizes: ["Único"],
    colors: ["Negro", "Plateado"],
    images: [
      "https://images.unsplash.com/photo-1618506408870-64d8bec48248?w=800&q=80",
    ],
    description: "Control de dorado ajustable, bandeja recogemigas extraíble.",
  },
  {
    id: "p07",
    slug: "frigobar-milexus-90l",
    name: "Frigobar 90L",
    category: "linea-blanca",
    brand: "MILEXUS",
    price: 180,
    sizes: ["90L"],
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1540961403310-79825242906e?w=800&q=80",
    ],
    description: "Compacto y eficiente, ideal para apartamentos, oficinas o negocios chicos.",
  },
  {
    id: "p08",
    slug: "microondas-midea-20l",
    name: "Microondas 20L",
    category: "linea-blanca",
    brand: "Midea",
    price: 95,
    sizes: ["20L"],
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&q=80",
    ],
    description: "Panel digital, múltiples funciones de cocción, plato giratorio.",
  },
  {
    id: "p09",
    slug: "dispensador-agua-milexus",
    name: "Dispensador de Agua Frío/Caliente",
    category: "linea-blanca",
    brand: "MILEXUS",
    price: 120,
    sizes: ["Único"],
    colors: ["Blanco"],
    images: [
      "https://images.unsplash.com/photo-1780590107737-9381035b8265?w=800&q=80",
    ],
    description: "Compatible con botellón, mini refrigerador incluido, bajo consumo.",
  },
  {
    id: "p10",
    slug: "lavadora-haceb-semiautomatica",
    name: "Lavadora Semiautomática",
    category: "linea-blanca",
    brand: "Haceb",
    price: 250,
    sizes: ["10kg"],
    colors: ["Blanco"],
    images: [
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80",
    ],
    description: "Doble tina, alta capacidad, ideal para el hogar o lavandería.",
  },
  {
    id: "p11",
    slug: "congelador-vertical-midea",
    name: "Congelador Vertical",
    category: "linea-blanca",
    brand: "Midea",
    price: 300,
    sizes: ["150L"],
    colors: ["Blanco"],
    images: [
      "https://images.unsplash.com/photo-1723661973650-febc670fcea2?w=800&q=80",
    ],
    description: "Gran capacidad de almacenamiento, ideal para comercios y hogares grandes.",
  },
  {
    id: "p12",
    slug: "secadora-cabello-milexus",
    name: "Secadora de Cabello",
    category: "cuidado-personal",
    brand: "MILEXUS",
    price: 22,
    sizes: ["Único"],
    colors: ["Negro", "Rosado"],
    images: [
      "https://images.unsplash.com/photo-1522336284037-91f7da073525?w=800&q=80",
    ],
    description: "1800W, dos velocidades, boquilla concentradora incluida.",
  },
  {
    id: "p13",
    slug: "plancha-cabello-black-decker",
    name: "Plancha de Cabello",
    category: "cuidado-personal",
    brand: "Black+Decker",
    price: 30,
    sizes: ["Único"],
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1527799887038-b2addf7f1913?w=800&q=80",
    ],
    description: "Placas cerámicas, calentamiento rápido, control de temperatura.",
  },
  {
    id: "p14",
    slug: "afeitadora-oster",
    name: "Afeitadora Eléctrica",
    category: "cuidado-personal",
    brand: "Oster",
    price: 25,
    sizes: ["Único"],
    colors: ["Negro", "Plateado"],
    images: [
      "https://images.unsplash.com/photo-1647900893846-e6ab4048e824?w=800&q=80",
    ],
    description: "Cuchillas de acero inoxidable, uso en seco o húmedo, recargable.",
  },
  {
    id: "p15",
    slug: "balanza-corporal-milexus",
    name: "Balanza Corporal Digital",
    category: "cuidado-personal",
    brand: "MILEXUS",
    price: 15,
    sizes: ["Único"],
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1646829873498-e874cfa27933?w=800&q=80",
    ],
    description: "Pantalla LCD, superficie de vidrio templado, alta precisión.",
  },
  {
    id: "p16",
    slug: "ventilador-torre-milexus",
    name: "Ventilador de Torre",
    category: "climatizacion",
    brand: "MILEXUS",
    price: 48,
    sizes: ["Único"],
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1564510182791-29645da7fac4?w=800&q=80",
    ],
    description: "Oscilación automática, control remoto, varias velocidades.",
  },
  {
    id: "p17",
    slug: "aire-split-midea",
    name: "Aire Acondicionado Split",
    category: "climatizacion",
    brand: "Midea",
    price: 380,
    sizes: ["12000 BTU"],
    colors: ["Blanco"],
    images: [
      "https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=800&q=80",
    ],
    description: "Unidad evaporadora y condensadora, alta eficiencia energética.",
  },
  {
    id: "p18",
    slug: "ventilador-pie-royal",
    name: "Ventilador de Pie",
    category: "climatizacion",
    brand: "Royal",
    price: 35,
    sizes: ["16 pulgadas"],
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?w=800&q=80",
    ],
    description: "Altura ajustable, base estable, motor silencioso.",
  },
  {
    id: "p19",
    slug: "calefactor-black-decker",
    name: "Calefactor Eléctrico",
    category: "climatizacion",
    brand: "Black+Decker",
    price: 42,
    sizes: ["Único"],
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1547186577-a3f4fa07c2ef?w=800&q=80",
    ],
    description: "Calentamiento rápido, termostato ajustable, protección de sobrecalentamiento.",
  },
  {
    id: "p20",
    slug: "extractor-aire-milexus",
    name: "Extractor de Aire",
    category: "climatizacion",
    brand: "MILEXUS",
    price: 50,
    sizes: ["8 pulgadas"],
    colors: ["Blanco"],
    images: [
      "https://images.unsplash.com/photo-1572081790780-1a7739896259?w=800&q=80",
    ],
    description: "Ideal para cocinas y baños, instalación sencilla, bajo consumo.",
  },
];
