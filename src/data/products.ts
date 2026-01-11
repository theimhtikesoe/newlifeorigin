// 0.85L images
import bottle085LWhite from "@/assets/0.85L-white.jpg";
import bottle085LWhiteCap from "@/assets/0.85L-white-cap.jpg";
import bottle085LWineWhite from "@/assets/0.85L-wine-white.jpg";
import bottle085LWineWhiteCap from "@/assets/0.85L-wine-white-cap.jpg";

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
import bottle1LWineWhite from "@/assets/1L-wine-white.jpg";
import bottle1LWineWhiteCap from "@/assets/1L-wine-white-cap.jpg";

// Special bottles
import nwarnoegyi from "@/assets/nwarnoegyi.jpg";
import nwarnoeGyiCap from "@/assets/nwarnoegyi-cap.jpg";
import nwarnoetay from "@/assets/nwarnoetay.jpg";
import nwarnoeHtayCap from "@/assets/nwarnoetay-cap.jpg";

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
  // 0.85L Products
  {
    id: "0.85L-white",
    name: "0.85L White",
    category: "bottle-shells",
    description_en: "0.85 Liter white/clear bottle shell.",
    description_mm: "၀.၈၅ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.85L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle085LWhite, bottle085LWhiteCap],
  },
  {
    id: "0.85L-wine-white",
    name: "0.85L Wine White",
    category: "bottle-shells",
    description_en: "0.85 Liter wine-style white bottle shell.",
    description_mm: "၀.၈၅ လီတာ ဝိုင်ပုံစံ အဖြူရောင် ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.85L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle085LWineWhite, bottle085LWineWhiteCap],
  },
  // 0.9L Products
  {
    id: "0.9L-blue",
    name: "0.9L Blue",
    category: "bottle-shells",
    description_en: "0.9 Liter blue bottle shell.",
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
    description_en: "0.9 Liter white/clear bottle shell.",
    description_mm: "၀.၉ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.9L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle09LWhite, bottle09LWhiteCap],
  },
  // 1L Products
  {
    id: "1L-blue",
    name: "1L Blue",
    category: "bottle-shells",
    description_en: "1 Liter blue bottle shell.",
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
    description_en: "1 Liter white/clear bottle shell.",
    description_mm: "၁ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Daily use", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle1LWhite, bottle1LWhiteCap],
  },
  {
    id: "1L-wine-white",
    name: "1L Wine White",
    category: "bottle-shells",
    description_en: "1 Liter wine-style white bottle shell.",
    description_mm: "၁ လီတာ ဝိုင်ပုံစံ အဖြူရောင် ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Daily use", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle1LWineWhite, bottle1LWineWhiteCap],
  },
  // Special Bottles
  {
    id: "nwarnoegyi",
    name: "Nwar Noe Gyi",
    category: "bottle-shells",
    description_en: "Nwar Noe Gyi bottle shell.",
    description_mm: "နွားနို့ကြီး ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [nwarnoegyi, nwarnoeGyiCap],
  },
  {
    id: "nwarnoetay",
    name: "Nwar Noe Tay",
    category: "bottle-shells",
    description_en: "Nwar Noe Tay bottle shell.",
    description_mm: "နွားနို့တေ ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [nwarnoetay, nwarnoeHtayCap],
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
