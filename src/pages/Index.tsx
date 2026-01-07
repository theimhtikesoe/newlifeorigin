import { Link } from "react-router-dom";
import { ArrowRight, Package, Shield, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/products";

const Index = () => {
  const features = [
    {
      icon: Package,
      title: "Quality Materials",
      description: "Food-grade PET materials meeting international standards",
    },
    {
      icon: Shield,
      title: "Consistent Production",
      description: "Industrial precision ensuring uniform quality every batch",
    },
    {
      icon: Sparkles,
      title: "Clean Finish",
      description: "Crystal clear bottles ready for clean water packaging",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="hero-section section-padding py-20 sm:py-28 lg:py-32">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary" />
              6 Miles, Taunggyi
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              New Life
              <span className="block text-gradient">Packaging</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
              Raw materials for clean water packaging.
              <span className="block mt-1">Bottles begin here.</span>
            </p>

            {/* CTA */}
            <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Link to="/products" className="btn-primary inline-flex items-center gap-2 group">
                View Product Range
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-6 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <div className="industrial-line mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Product Range
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Everything you need to package clean water, from raw materials to finished components.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-foreground">
        <div className="container-narrow text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-background mb-4">
            Ready to see our products?
          </h2>
          <p className="text-background/70 mb-8 max-w-md mx-auto">
            Explore our complete range of bottle shells, caps, and preform tubes.
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2 group">
            Browse All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
