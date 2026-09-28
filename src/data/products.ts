export type Category =
  | "cocina"
  | "linea-blanca"
  | "climatizacion"
  | "televisores"
  | "electronica";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  brand: string;
  price: number | null;
  sizes: string[];
  colors: string[];
  images: string[];
  description: string;
};

export const categoryLabels: Record<Category, string> = {
  cocina: "Cocina",
  "linea-blanca": "Línea Blanca",
  climatizacion: "Climatización",
  televisores: "Televisores",
  electronica: "Electrónica",
};

export const products: Product[] = [
  {
    id: "p01",
    slug: "licuadora-vaso-cristal",
    name: "Licuadora de Vaso",
    category: "cocina",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["1.5L", "2L"],
    colors: ["Negro"],
    images: ["/products/licuadora-1.jpg"],
    description: "Vaso resistente con asa ergonómica, ideal para batidos, salsas y sopas.",
  },
  {
    id: "p02",
    slug: "procesador-alimentos",
    name: "Procesador de Alimentos",
    category: "cocina",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["Único"],
    colors: ["Blanco/Gris"],
    images: ["/products/procesador-alimentos-1.jpg"],
    description: "Pica, tritura y mezcla en segundos. Recipiente transparente de gran capacidad.",
  },
  {
    id: "p03",
    slug: "horno-tostador-compacto",
    name: "Horno Tostador Compacto",
    category: "cocina",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["Único"],
    colors: ["Rosado", "Gris", "Blanco"],
    images: ["/products/horno-tostador-1.jpg"],
    description: "Diseño compacto con perillas de control y bandeja antiadherente.",
  },
  {
    id: "p04",
    slug: "cafetera-espresso",
    name: "Cafetera Espresso",
    category: "cocina",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["Único"],
    colors: ["Negro/Acero"],
    images: ["/products/cafetera-espresso-1.jpg"],
    description: "Extracción a presión con vaporizador de leche y depósito de agua extraíble.",
  },
  {
    id: "p05",
    slug: "hervidor-electrico-vidrio",
    name: "Hervidor Eléctrico de Vidrio",
    category: "cocina",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["1.7L"],
    colors: ["Negro"],
    images: ["/products/hervidor-vidrio-1.jpg", "/products/hervidor-vidrio-2.jpg"],
    description: "Vidrio borosilicato, apagado automático y base giratoria 360°.",
  },
  {
    id: "p06",
    slug: "nevera-retro",
    name: "Nevera Retro",
    category: "linea-blanca",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["Único"],
    colors: ["Turquesa"],
    images: ["/products/nevera-retro-2.jpg"],
    description: "Diseño retro con acabado brillante y amplio espacio interior.",
  },
  {
    id: "p07",
    slug: "nevera-side-by-side",
    name: "Nevera Side by Side",
    category: "linea-blanca",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["Único"],
    colors: ["Acero inoxidable"],
    images: ["/products/nevera-sbs-1.jpg"],
    description: "Doble puerta con dispensador de agua y hielo en la puerta.",
  },
  {
    id: "p08",
    slug: "lavadora-carga-frontal",
    name: "Lavadora de Carga Frontal",
    category: "linea-blanca",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["7 kg", "8 kg", "10 kg"],
    colors: ["Blanco"],
    images: ["/products/lavadora-frontal-1.jpg"],
    description: "Múltiples programas de lavado, bajo consumo de agua y energía.",
  },
  {
    id: "p09",
    slug: "ventilador-mesa-recargable",
    name: "Ventilador de Mesa",
    category: "climatizacion",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["Único"],
    colors: ["Gris oscuro"],
    images: ["/products/ventilador-mesa-1.jpg"],
    description: "Silencioso, con varias velocidades y cabezal ajustable.",
  },
  {
    id: "p10",
    slug: "ventilador-clasico",
    name: "Ventilador Clásico",
    category: "climatizacion",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["Único"],
    colors: ["Crema/Negro"],
    images: ["/products/ventilador-clasico-1.jpg"],
    description: "Aspas metálicas, oscilación y estructura resistente.",
  },
  {
    id: "p11",
    slug: "ventilador-de-pie",
    name: "Ventilador de Pie",
    category: "climatizacion",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["Único"],
    colors: ["Negro"],
    images: ["/products/ventilador-pie-1.jpg"],
    description: "Altura regulable con base estable y tres velocidades.",
  },
  {
    id: "p12",
    slug: "televisor-smart",
    name: "Televisor Smart",
    category: "televisores",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["43 pulg.", "50 pulg.", "55 pulg.", "65 pulg."],
    colors: ["Negro"],
    images: ["/products/televisor-smart-3.jpg", "/products/televisor-smart-2.jpg"],
    description: "Pantalla plana con acceso a aplicaciones de streaming y control remoto.",
  },
  {
    id: "p13",
    slug: "mini-bocina-bluetooth",
    name: "Mini Bocina Bluetooth",
    category: "electronica",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["Único"],
    colors: ["Blanco"],
    images: ["/products/mini-bocina-1.jpg"],
    description: "Compacta y portátil, con correa y conexión inalámbrica.",
  },
  {
    id: "p14",
    slug: "aspiradora-robot",
    name: "Aspiradora Robot",
    category: "electronica",
    brand: "ELECTRONOVA",
    price: null,
    sizes: ["Único"],
    colors: ["Negro"],
    images: ["/products/aspiradora-robot-1.jpg"],
    description: "Limpieza automática con sensores y regreso a la base de carga.",
  },
];
