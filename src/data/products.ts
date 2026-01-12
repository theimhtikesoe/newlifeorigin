// 0.3L images
import bottle03LBlueS1 from "@/assets/0.3L-blue-s1.jpg";
import bottle03LBlueS1Cap from "@/assets/0.3L-blue-s1-cap.jpg";
import bottle03LShalShal from "@/assets/0.3L-shal-shal.jpg";
import bottle03LShalShalCap from "@/assets/0.3L-shal-shal-cap.jpg";
import bottle03LWhite from "@/assets/0.3L-white.jpg";
import bottle03LWhiteCap from "@/assets/0.3L-white-cap.jpg";
import bottle03LWhiteWine from "@/assets/0.3L-white-wine.jpg";
import bottle03LWhiteWineCap from "@/assets/0.3L-white-wine-cap.jpg";

// 0.5L images
import bottle05LWhite from "@/assets/0.5L-white.jpg";
import bottle05LWhiteCap from "@/assets/0.5L-white-cap.jpg";

// 0.6L images
import bottle06LBlue from "@/assets/0.6L-blue.jpg";
import bottle06LBlueCap from "@/assets/0.6L-blue-cap.jpg";
import bottle06LWhite from "@/assets/0.6L-white.jpg";
import bottle06LWhiteCap from "@/assets/0.6L-white-cap.jpg";
import bottle06LWineWhite from "@/assets/0.6L-wine-white.jpg";
import bottle06LWineWhiteCap from "@/assets/0.6L-wine-white-cap.jpg";

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
import kyarthar25 from "@/assets/25kyarthar.jpg";
import kyarthar25Cap from "@/assets/25kyarthar-cap.jpg";
import thar30 from "@/assets/30thar.jpg";
import thar30Cap from "@/assets/30thar-cap.jpg";
import dount8BlueShalShal from "@/assets/8dount-blue-shal-shal.jpg";
import dount8BlueShalShalCap from "@/assets/8dount-blue-shal-shal-cap.jpg";
import dount8S1 from "@/assets/8dount-s1.jpg";
import dount8S1Cap from "@/assets/8dount-s1-cap.jpg";
import choChinWhite from "@/assets/cho-chin-white.jpg";
import choChinWhiteCap from "@/assets/cho-chin-white-cap.jpg";
import daneWineGyiWhite from "@/assets/dane-wine-gyi-white.jpg";
import daneWineGyiWhiteCap from "@/assets/dane-wine-gyi-white-cap.jpg";
import daneWineTayWhite from "@/assets/dane-wine-tay-white.jpg";
import daneWineTayWhiteCap from "@/assets/dane-wine-tay-white-cap.jpg";
import shweWine from "@/assets/shwe-wine.jpg";
import shweWineCap from "@/assets/shwe-wine-cap.jpg";
import dount8White from "@/assets/8dount-white.jpg";
import dount8WhiteCap from "@/assets/8dount-white-cap.jpg";
import daneWineTayBlue from "@/assets/dane-wine-tay-blue.jpg";
import daneWineTayBlueCap from "@/assets/dane-wine-tay-blue-cap.jpg";

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
  // 0.3L Products
  {
    id: "0.3L-blue-s1",
    name: "0.3L Blue S1",
    category: "bottle-shells",
    description_en: "0.3 Liter blue S1 bottle shell.",
    description_mm: "၀.၃ လီတာ အပြာရောင် S1 ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle03LBlueS1, bottle03LBlueS1Cap],
  },
  {
    id: "0.3L-shal-shal",
    name: "0.3L Shal Shal",
    category: "bottle-shells",
    description_en: "0.3 Liter Shal Shal bottle shell.",
    description_mm: "၀.၃ လီတာ ရှယ်ရှယ် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle03LShalShal, bottle03LShalShalCap],
  },
  {
    id: "0.3L-white",
    name: "0.3L White",
    category: "bottle-shells",
    description_en: "0.3 Liter white/clear bottle shell.",
    description_mm: "၀.၃ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle03LWhite, bottle03LWhiteCap],
  },
  {
    id: "0.3L-white-wine",
    name: "0.3L White Wine",
    category: "bottle-shells",
    description_en: "0.3 Liter white wine-style bottle shell.",
    description_mm: "၀.၃ လီတာ ဝိုင်ပုံစံ အဖြူရောင် ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle03LWhiteWine, bottle03LWhiteWineCap],
  },
  // 0.5L Products
  {
    id: "0.5L-white",
    name: "0.5L White",
    category: "bottle-shells",
    description_en: "0.5 Liter white/clear bottle shell.",
    description_mm: "၀.၅ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.5L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle05LWhite, bottle05LWhiteCap],
  },
  // 0.6L Products
  {
    id: "0.6L-blue",
    name: "0.6L Blue",
    category: "bottle-shells",
    description_en: "0.6 Liter blue bottle shell.",
    description_mm: "၀.၆ လီတာ အပြာရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.6L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle06LBlue, bottle06LBlueCap],
  },
  {
    id: "0.6L-white",
    name: "0.6L White",
    category: "bottle-shells",
    description_en: "0.6 Liter white/clear bottle shell.",
    description_mm: "၀.၆ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.6L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle06LWhite, bottle06LWhiteCap],
  },
  {
    id: "0.6L-wine-white",
    name: "0.6L Wine White",
    category: "bottle-shells",
    description_en: "0.6 Liter wine-style white bottle shell.",
    description_mm: "၀.၆ လီတာ ဝိုင်ပုံစံ အဖြူရောင် ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.6L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle06LWineWhite, bottle06LWineWhiteCap],
  },
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
    id: "25kyarthar",
    name: "25 Kyar Thar",
    category: "bottle-shells",
    description_en: "25 Kyar Thar bottle shell.",
    description_mm: "၂၅ ကျပ်သား ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [kyarthar25, kyarthar25Cap],
  },
  {
    id: "30thar",
    name: "30 Thar",
    category: "bottle-shells",
    description_en: "30 Thar bottle shell.",
    description_mm: "၃၀ သား ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [thar30, thar30Cap],
  },
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
  {
    id: "8dount-blue-shal-shal",
    name: "8 Dount Blue Shal Shal",
    category: "bottle-shells",
    description_en: "8 Dount Blue Shal Shal bottle shell.",
    description_mm: "၈ ထောင့် အပြာ ရှယ်ရှယ် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.5L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [dount8BlueShalShal, dount8BlueShalShalCap],
  },
  {
    id: "8dount-s1",
    name: "8 Dount S1",
    category: "bottle-shells",
    description_en: "8 Dount S1 bottle shell.",
    description_mm: "၈ ထောင့် S1 ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.5L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [dount8S1, dount8S1Cap],
  },
  {
    id: "cho-chin-white",
    name: "Cho Chin White",
    category: "bottle-shells",
    description_en: "Cho Chin White bottle shell.",
    description_mm: "ချိုချဉ် အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.5L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [choChinWhite, choChinWhiteCap],
  },
  {
    id: "dane-wine-gyi-white",
    name: "Dane Wine Gyi White",
    category: "bottle-shells",
    description_en: "Dane Wine Gyi White bottle shell.",
    description_mm: "ဒိန်ခဲဝိုင်ကြီး အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.5L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [daneWineGyiWhite, daneWineGyiWhiteCap],
  },
  {
    id: "dane-wine-tay-white",
    name: "Dane Wine Tay White",
    category: "bottle-shells",
    description_en: "Dane Wine Tay White bottle shell.",
    description_mm: "ဒိန်ခဲဝိုင်တေ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.5L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [daneWineTayWhite, daneWineTayWhiteCap],
  },
  {
    id: "shwe-wine",
    name: "Shwe Wine",
    category: "bottle-shells",
    description_en: "Shwe Wine bottle shell.",
    description_mm: "ရွှေဝိုင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.5L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [shweWine, shweWineCap],
  },
  {
    id: "8dount-white",
    name: "8 Dount White",
    category: "bottle-shells",
    description_en: "8 Dount White bottle shell.",
    description_mm: "၈ ထောင့် အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.5L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [dount8White, dount8WhiteCap],
  },
  {
    id: "dane-wine-tay-blue",
    name: "Dane Wine Tay Blue",
    category: "bottle-shells",
    description_en: "Dane Wine Tay Blue bottle shell.",
    description_mm: "ဒိန်ခဲဝိုင်တေ အပြာရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.5L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [daneWineTayBlue, daneWineTayBlueCap],
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
