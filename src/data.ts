export const BRAND = {
  name: "TOP",
  tagline: "STREETWEAR CULTURE",
  description: "Premium streetwear brand. Creating an international movement inspiring creativity and expression through worldwide cities.",
  logo: "TOP",
  currency: "€",
}

export interface Product {
  id: number
  name: string
  category: string
  price: number
  images: string[]
  sizes: string[]
  colors: { name: string; hex: string }[]
  badge?: string
  badgeColor?: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "ARCH LOGO HOODIE",
    category: "Sudaderas",
    price: 75,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Black", hex: "#000" }, { name: "Grey", hex: "#555" }],
    badge: "NOVEDAD",
  },
  {
    id: 2,
    name: "ESSENTIALS TEE",
    category: "Camisetas",
    price: 45,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [{ name: "White", hex: "#fff" }, { name: "Black", hex: "#000" }],
    badge: "BEST SELLER",
    badgeColor: "#c10016",
  },
  {
    id: 3,
    name: "CARGO PANTS",
    category: "Pantalones",
    price: 89,
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000" }, { name: "Olive", hex: "#556b2f" }],
  },
  {
    id: 4,
    name: "STAR PATCH HOODIE",
    category: "Sudaderas",
    price: 79,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000" }, { name: "Pink", hex: "#e91e63" }],
    badge: "BACK IN STOCK",
  },
  {
    id: 5,
    name: "BOX LOGO TEE",
    category: "Camisetas",
    price: 49,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [{ name: "White", hex: "#fff" }],
    badge: "BEST SELLER",
    badgeColor: "#c10016",
  },
  {
    id: 6,
    name: "TAPE PARACHUTE PANTS",
    category: "Pantalones",
    price: 95,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000" }, { name: "Camo", hex: "#4a5d23" }],
  },
  {
    id: 7,
    name: "LONG SLEEVE LOGO",
    category: "Manga larga",
    price: 55,
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Black", hex: "#000" }, { name: "Grey", hex: "#888" }],
  },
  {
    id: 8,
    name: "5-PANEL HAT",
    category: "Accesorios",
    price: 35,
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&q=80",
    ],
    sizes: ["One Size"],
    colors: [{ name: "Black", hex: "#000" }, { name: "White", hex: "#fff" }],
  },
  {
    id: 9,
    name: "ZIP UP HOODIE",
    category: "Zips",
    price: 85,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000" }, { name: "Navy", hex: "#1a237e" }],
  },
  {
    id: 10,
    name: "CUFF BEANIE",
    category: "Accesorios",
    price: 25,
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&q=80",
    ],
    sizes: ["One Size"],
    colors: [{ name: "Black", hex: "#000" }, { name: "Grey", hex: "#aaa" }],
  },
  {
    id: 11,
    name: "DISTRESSED DENIM",
    category: "Pantalones",
    price: 99,
    images: [
      "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Blue", hex: "#1565c0" }, { name: "Black", hex: "#000" }],
    badge: "NOVEDAD",
  },
  {
    id: 12,
    name: "CREW NECK SWEATER",
    category: "Jerseis",
    price: 65,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Grey", hex: "#888" }, { name: "Black", hex: "#000" }],
  },
]

export const categories = [
  {
    name: "Novedades",
    link: "#",
  },
  {
    name: "Best Sellers",
    link: "#",
  },
  {
    name: "Ropa",
    subcategories: [
      "Camisetas", "Sudaderas", "Manga larga", "Shorts",
      "Pantalones", "Polos", "Pantalones deportivos", "Jerseis",
      "Camisas", "Abrigos", "Zips", "Sudaderas sin capucha", "Mujer",
    ],
  },
  {
    name: "Accesorios",
    subcategories: [
      "Gorras", "Gorros", "Joyería", "Bolsos",
      "Calcetines", "Llaveros", "GIFT CARD",
    ],
  },
  {
    name: "Zapatillas",
    subcategories: [
      "TOP Classic", "TOP Runner",
    ],
  },
]

export const reviews = [
  { name: "Carlos M.", text: "Best quality hoodies I've ever bought. The material is insane.", rating: 5 },
  { name: "Laura K.", text: "Shipping was fast and the fit is perfect. Definitely copping more.", rating: 5 },
  { name: "Mike R.", text: "TOP is the real deal. Streetwear culture at its finest.", rating: 5 },
  { name: "Sofia L.", text: "The embroidery details are incredible. Worth every euro.", rating: 4 },
  { name: "James W.", text: "My go-to brand for streetwear. Always consistent quality.", rating: 5 },
]
