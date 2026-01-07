import { Link } from "react-router-dom";
import { ArrowRight, Cylinder, Flame, Package, CircleDot, Droplets } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProcessStep from "@/components/ProcessStep";

const Process = () => {
  const steps = [
    {
      icon: <Cylinder className="w-5 h-5 text-primary-foreground" />,
      title: "PET Preform Tube",
      description: "The journey begins with a small PET preform tube—the raw material that will become a bottle.",
    },
    {
      icon: <Flame className="w-5 h-5 text-primary-foreground" />,
      title: "Heating Process",
      description: "The preform is heated to a precise temperature, making it soft and ready for shaping.",
    },
    {
      icon: <Package className="w-5 h-5 text-primary-foreground" />,
      title: "Bottle Shell Formation",
      description: "Air is blown into the heated preform, expanding it into the final bottle shell shape.",
    },
    {
      icon: <CircleDot className="w-5 h-5 text-primary-foreground" />,
      title: "Cap Sealing",
      description: "A secure cap is added to complete the container, ready for water filling.",
    },
    {
      icon: <Droplets className="w-5 h-5 text-primary-foreground" />,
      title: "Ready for Filling",
      description: "The complete bottle package is now ready to hold clean, safe drinking water.",
    },
  ];

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
                From Tube to Bottle
              </h1>
              <p className="text-muted-foreground">
                Every bottle begins as a tube. At New Life, we focus on consistency, cleanliness, and reliable material quality.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="section-padding pt-0">
          <div className="container-narrow">
            <div className="max-w-2xl">
              {steps.map((step, index) => (
                <ProcessStep
                  key={step.title}
                  step={index + 1}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Quality Note */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Quality at Every Step
              </h2>
              <p className="text-muted-foreground mb-8">
                From selecting premium PET materials to the final quality check, we ensure every product meets our strict standards. Our process combines modern manufacturing precision with careful attention to detail.
              </p>
              <Link to="/products" className="btn-primary inline-flex items-center gap-2 group">
                Explore Our Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Process;
