export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image_url: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Olive Velvet Accent Chair",
    category: "Seating",
    description: "A sculptural silhouette wrapped in deep olive velvet, finished with a softly curved back and considered proportion.",
    price: "₹48,500",
    image_url:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=88",
    badge: "Signature piece",
  },
  {
    id: 2,
    name: "Handcrafted Walnut Dining Table",
    category: "Dining",
    description: "Solid American walnut shaped by hand into a generous, quietly architectural centrepiece for long, unhurried meals.",
    price: "₹1,85,000",
    image_url:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=88",
    badge: "Made to order",
  },
  {
    id: 3,
    name: "Bespoke Brown Leather Sofa",
    category: "Seating",
    description: "Full-grain leather, generous depth and tailored cushions come together in a sofa designed to age with grace.",
    price: "₹2,40,000",
    image_url:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=88",
  },
  {
    id: 4,
    name: "Minimalist Cream Credenza",
    category: "Storage",
    description: "A serene study in line and texture, with fluted detailing, concealed storage and a softly honed cream finish.",
    price: "₹96,000",
    image_url:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=88",
  },
  {
    id: 5,
    name: "Travertine Form Side Table",
    category: "Tables",
    description: "A monolithic side table carved from natural travertine, bringing warmth, tactility and an elemental presence to the room.",
    price: "₹62,500",
    image_url:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=88",
  },
  {
    id: 6,
    name: "Brushed Brass Floor Lamp",
    category: "Lighting",
    description: "A slender brass form with a linen shade, casting a quiet pool of light across reading corners and evening rooms.",
    price: "₹38,000",
    image_url:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=88",
  },
];

export const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];

export const getWhatsappUrl = (product: Product) => {
  const message = `Hello, I am interested in purchasing the ${product.name} listed at ${product.price}.`;
  return `https://wa.me/9436022202?text=${encodeURIComponent(message)}`;
};
