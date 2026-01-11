// 0.9L images
import bottle09LBlue from "@/assets/0.9L-blue.jpg";
import bottle09LBlueCap from "@/assets/0.9L-blue-cap.jpg";
import bottle09LWhite from "@/assets/0.9L-white.jpg";
import bottle09LWhiteCap from "@/assets/0.9L-white-cap.jpg";

// 1L images
import bottle1LBlue from "@/assets/1L-blue.jpg";
import bottle1LBlueCap from "@/assets/1L-blue-cap.jpg";
import bottle1LWhite from "@/assets/1L-white.jpg";
import bottle1LWhiteCap from "@/assets/1L-white-cap.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  description_en: string;
  description_mm: string;
  material: string;
  colors: string[];
  sizes: string[];
  usage: string[];
  priceNote: string;
  images: string[]; // [without cap, with cap]
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
}

export const categories: Category[] = [
  {
    id: "bottle-shells",
    name: "Bottle Shells",
    description: "Empty water bottles, ready for filling",
    icon: "bottle",
    image: bottle09LBlueCap,
  },
];

export const products: Product[] = [
  {
    id: "0.9L-blue",
    name: "0.9L Blue",
    category: "bottle-shells",
    description_en: "0.9 Liter blue bottle shell. Lightweight and durable.",
    description_mm: "၀.၉ လီတာ အပြာရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.9L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle09LBlue, bottle09LBlueCap],
  },
  {
    id: "0.9L-white",
    name: "0.9L White",
    category: "bottle-shells",
    description_en: "0.9 Liter white/clear bottle shell. Clean and versatile.",
    description_mm: "၀.၉ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.9L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle09LWhite, bottle09LWhiteCap],
  },
  {
    id: "1L-blue",
    name: "1L Blue",
    category: "bottle-shells",
    description_en: "1 Liter blue bottle shell. Popular size for everyday use.",
    description_mm: "၁ လီတာ အပြာရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Daily use", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle1LBlue, bottle1LBlueCap],
  },
  {
    id: "1L-white",
    name: "1L White",
    category: "bottle-shells",
    description_en: "1 Liter white/clear bottle shell. Clean look for premium branding.",
    description_mm: "၁ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Daily use", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle1LWhite, bottle1LWhiteCap],
  },
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

export const getProductById = (productId: string): Product | undefined => {
  return products.find((product) => product.id === productId);
};

export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find((category) => category.id === categoryId);
};
