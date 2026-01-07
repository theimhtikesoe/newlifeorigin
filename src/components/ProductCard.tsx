import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductCardProps {
  product: Product;
  index: number;
}

// Color translations
const getColorMM = (color: string): string => {
  const colors: Record<string, string> = {
    "White": "အဖြူ",
    "Blue": "အပြာ",
    "Black": "အမည်း",
    "Clear": "ကြည်လင်",
    "Mixed colors": "ရောစပ်အရောင်များ",
  };
  return colors[color] || color;
};

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { t, language } = useLanguage();

  return (
    <Link
      to={`/product/${product.id}`}
      className="card-industrial p-6 flex flex-col group animate-slide-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Product Image */}
      <div className="aspect-square rounded-lg bg-gradient-to-br from-secondary to-muted flex items-center justify-center mb-5 group-hover:from-primary/5 group-hover:to-primary/10 transition-colors overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {product.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="font-semibold text-foreground mb-2 text-lg leading-tight">
        {product.name}
      </h3>
      
      <p className="text-muted-foreground text-sm line-clamp-2 flex-1 mb-4">
        {language === "en" ? product.description_en : product.description_mm}
      </p>

      {/* Colors */}
      <div className="flex items-center gap-2 mb-4">
        {product.colors.slice(0, 3).map((color) => (
          <span
            key={color}
            className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
          >
            {t(color, getColorMM(color))}
          </span>
        ))}
        {product.colors.length > 3 && (
          <span className="text-xs text-muted-foreground">
            +{product.colors.length - 3}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
        <span>{t("View Specs", "အသေးစိတ်ကြည့်ရန်")}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
};

export default ProductCard;
