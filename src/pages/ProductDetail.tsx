import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductById, getCategoryById } from "@/data/products";

const ProductDetail = () => {
  const { productId } = useParams();
  const product = productId ? getProductById(productId) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Product not found</p>
            <Link to="/products" className="btn-secondary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const category = getCategoryById(product.category);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="section-padding py-6 bg-secondary/30">
          <div className="container-narrow">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                Products
              </Link>
              <span className="text-muted-foreground">/</span>
              {category && (
                <>
                  <Link
                    to={`/products/${category.id}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                  <span className="text-muted-foreground">/</span>
                </>
              )}
              <span className="text-foreground font-medium">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Content */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="w-16 h-16 text-primary" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                {/* Title */}
                <div>
                  <div className="industrial-line mb-4" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {product.name}
                  </h1>
                  <p className="text-muted-foreground mb-4">
                    {product.description_en}
                  </p>
                  <p className="text-muted-foreground text-sm" lang="my">
                    {product.description_mm}
                  </p>
                </div>

                {/* Specifications */}
                <div className="card-industrial p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Specifications</h3>
                  
                  <div className="grid gap-4">
                    {/* Sizes */}
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-foreground w-24 flex-shrink-0">Sizes</span>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <span key={size} className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-foreground w-24 flex-shrink-0">Colors</span>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                          <span key={color} className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Material */}
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-foreground w-24 flex-shrink-0">Material</span>
                      <span className="text-sm text-muted-foreground">{product.material}</span>
                    </div>
                  </div>
                </div>

                {/* Usage */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Usage</h3>
                  <ul className="space-y-2">
                    {product.usage.map((use) => (
                      <li key={use} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Note */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-sm text-foreground font-medium">
                    {product.priceNote}
                  </p>
                </div>

                {/* Back Button */}
                <Link
                  to={`/products/${product.category}`}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to {category?.name || "Products"}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
