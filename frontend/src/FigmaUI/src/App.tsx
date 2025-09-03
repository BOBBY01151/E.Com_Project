import { useState } from 'react';
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { CategoryShowcase } from "./components/CategoryShowcase";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";
import { UserProfilePage } from "./components/UserProfilePage";
import { ShopCollection } from "./components/ShopCollection";
import { AboutUsPage } from "./components/AboutUsPage";
import { ContactUsPage } from "./components/ContactUsPage";
import { Button } from "./components/ui/button";
import { User, Home, ShoppingBag, Info, Mail } from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'profile' | 'shop' | 'about' | 'contact'>('home');

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Navigation Demo */}
      <div className="fixed top-20 right-4 z-40 flex flex-col gap-2">
        <Button
          onClick={() => setCurrentPage('home')}
          variant={currentPage === 'home' ? 'default' : 'outline'}
          size="sm"
          className="shadow-lg"
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        <Button
          onClick={() => setCurrentPage('shop')}
          variant={currentPage === 'shop' ? 'default' : 'outline'}
          size="sm"
          className="shadow-lg"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Shop
        </Button>
        <Button
          onClick={() => setCurrentPage('about')}
          variant={currentPage === 'about' ? 'default' : 'outline'}
          size="sm"
          className="shadow-lg"
        >
          <Info className="w-4 h-4 mr-2" />
          About
        </Button>
        <Button
          onClick={() => setCurrentPage('contact')}
          variant={currentPage === 'contact' ? 'default' : 'outline'}
          size="sm"
          className="shadow-lg"
        >
          <Mail className="w-4 h-4 mr-2" />
          Contact
        </Button>
        <Button
          onClick={() => setCurrentPage('profile')}
          variant={currentPage === 'profile' ? 'default' : 'outline'}
          size="sm"
          className="shadow-lg"
        >
          <User className="w-4 h-4 mr-2" />
          Profile
        </Button>
      </div>

      <Header />
      
      {currentPage === 'home' ? (
        <main className="pt-0">
          <HeroSection onShopClick={() => setCurrentPage('shop')} />
          
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
      ) : currentPage === 'shop' ? (
        <main className="pt-16">
          <ShopCollection />
        </main>
      ) : currentPage === 'about' ? (
        <main className="pt-16">
          <AboutUsPage />
        </main>
      ) : currentPage === 'contact' ? (
        <main className="pt-16">
          <ContactUsPage />
        </main>
      ) : (
        <main className="pt-16">
          <UserProfilePage />
        </main>
      )}
      
      <Footer />
    </div>
  );
}