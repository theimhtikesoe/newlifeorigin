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
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: "bottle-shells",
    name: "Bottle Shells",
    description: "Empty water bottles, ready for filling",
    icon: "bottle",
  },
  {
    id: "caps",
    name: "Caps",
    description: "Secure sealing for every bottle",
    icon: "cap",
  },
  {
    id: "preform-tubes",
    name: "Preform Tubes",
    description: "Raw material before the bottle",
    icon: "tube",
  },
];

export const products: Product[] = [
  {
    id: "bottle-shell-300ml",
    name: "New Life Bottle Shell – 300ml",
    category: "bottle-shells",
    description_en: "Empty water bottle shell produced for daily water packaging. Lightweight, clean finish, consistent shape.",
    description_mm: "ရေဖြည့်သွင်းမထားသော ရေသန့်ဘူးအခွံဖြစ်ပြီး စက်မှုစံနှုန်းအတိုင်း ထုတ်လုပ်ထားပါသည်။",
    material: "Food-grade PET",
    colors: ["White", "Blue"],
    sizes: ["300ml / 0.3L"],
    usage: ["Drinking water filling", "Events", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
  },
  {
    id: "bottle-shell-500ml",
    name: "New Life Bottle Shell – 500ml",
    category: "bottle-shells",
    description_en: "Standard size empty water bottle shell. Perfect for everyday use. Clean, durable, and consistent quality.",
    description_mm: "နေ့စဉ်အသုံးပြုရန် သင့်တော်သော စံအရွယ်အစား ရေသန့်ဘူးအခွံ။ သန့်ရှင်းပြီး အရည်အသွေးကောင်းမွန်ပါသည်။",
    material: "Food-grade PET",
    colors: ["White", "Blue", "Clear"],
    sizes: ["500ml / 0.5L"],
    usage: ["Drinking water filling", "Daily use", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
  },
  {
    id: "bottle-shell-1l",
    name: "New Life Bottle Shell – 1L",
    category: "bottle-shells",
    description_en: "Large capacity empty water bottle shell for family or office use. Ergonomic design for easy handling.",
    description_mm: "မိသားစုနှင့် ရုံးသုံးအတွက် အရွယ်အစားကြီး ရေသန့်ဘူးအခွံ။ ကိုင်တွယ်ရလွယ်ကူသော ဒီဇိုင်း။",
    material: "Food-grade PET",
    colors: ["White", "Blue"],
    sizes: ["1000ml / 1L"],
    usage: ["Family use", "Office", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
  },
  {
    id: "cap-standard",
    name: "New Life Bottle Cap",
    category: "caps",
    description_en: "Durable bottle caps designed for secure sealing and clean finish.",
    description_mm: "ရေသန့်ဘူးအတွက် သေချာစွာ ပိတ်နိုင်သော အဖုံးများဖြစ်ပါသည်။",
    material: "Food-grade PP",
    colors: ["White", "Blue", "Black", "Mixed colors"],
    sizes: ["Standard (28mm)", "Wide mouth (38mm)"],
    usage: ["Standard water bottles", "All bottle sizes"],
    priceNote: "Factory pricing available. Please contact our counter.",
  },
  {
    id: "preform-tube-standard",
    name: "New Life Preform Tube",
    category: "preform-tubes",
    description_en: "Preform tubes are the raw material used before blowing into water bottles.",
    description_mm: "Preform Tube သည် ရေသန့်ဘူးမဖြစ်ခင် အသုံးပြုသော ကုန်ကြမ်းဖြစ်ပါသည်။",
    material: "PET",
    colors: ["White", "Blue", "Clear"],
    sizes: ["Multiple gram sizes (customizable)"],
    usage: ["Bottle blowing process", "Manufacturing"],
    priceNote: "Factory pricing available. Bulk orders welcome.",
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
