import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { categories, getProductsByCategory, getCategoryById } from "@/data/products";

const Products = () => {
  const { categoryId } = useParams();
  
  // If no category selected, show all categories
  if (!categoryId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Page Header */}
          <section className="hero-section section-padding py-16">
            <div className="container-narrow">
              <div className="max-w-xl">
                <div className="industrial-line mb-4" />
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Product Range
                </h1>
                <p className="text-muted-foreground">
                  Three essential categories for complete water bottle packaging. Select a category to explore our products.
                </p>
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="section-padding pt-0">
            <div className="container-narrow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {categories.map((category, index) => (
                  <CategoryCard key={category.id} category={category} index={index} />
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  // Show products in selected category
  const category = getCategoryById(categoryId);
  const products = getProductsByCategory(categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Category not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="hero-section section-padding py-16">
          <div className="container-narrow">
            <div className="max-w-xl">
              <div className="industrial-line mb-4" />
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {category.name}
              </h1>
              <p className="text-muted-foreground">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding pt-0">
          <div className="container-narrow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
