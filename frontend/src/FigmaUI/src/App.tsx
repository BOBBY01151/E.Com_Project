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
import { ShoppingCartPage } from "./components/ShoppingCartPage";
import { Button } from "./components/ui/button";
import { User, Home, ShoppingBag, Info, Mail, ShoppingCart } from "lucide-react";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'profile' | 'shop' | 'about' | 'contact' | 'cart'>('home');

  return (
    <CartProvider>
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
          onClick={() => setCurrentPage('cart')}
          variant={currentPage === 'cart' ? 'default' : 'outline'}
          size="sm"
          className="shadow-lg relative"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
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

      <Header 
        onCartClick={() => setCurrentPage('cart')}
        onProfileClick={() => setCurrentPage('profile')}
        cartItemCount={cartItemCount}
      />
      
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
      ) : currentPage === 'cart' ? (
        <main className="pt-16">
          <ShoppingCartPage onCartUpdate={setCartItemCount} />
        </main>
      ) : (
        <main className="pt-16">
          <UserProfilePage />
        </main>
      )}
      
      <Footer />
      </div>
    </CartProvider>
  );
}