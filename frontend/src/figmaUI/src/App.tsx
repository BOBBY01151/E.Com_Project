import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { CategoryShowcase } from "./components/CategoryShowcase";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-0">
        <HeroSection />
        
        {/* Category Showcases */}
        <section id="tshirts">
          <CategoryShowcase category="tshirts" />
        </section>
        
        <section id="trousers">
          <CategoryShowcase category="trousers" />
        </section>
        
        <section id="sneakers">
          <CategoryShowcase category="sneakers" />
        </section>
        
        {/* Featured Products Section */}
        <section id="featured">
          <FeaturedProducts />
        </section>
        
        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}