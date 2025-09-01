import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Heart,
  Menu,
  X,
  ShoppingCart,
  LogOut,
  Box,
  Moon,
  Sun
} from 'lucide-react';
import { logout } from '../store/slices/authSlice';

const ModernNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { itemsCount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update document class and localStorage when dark mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navItems = [
    { id: '/', label: 'Home' },
    { id: '/3d', label: '3D Experience', icon: Box },
    { id: '/products', label: 'Products' },
    ...(user ? [{ id: '/orders', label: 'Orders' }] : []),
    ...(user?.role === 'admin' ? [{ id: '/admin', label: 'Admin' }] : []),
  ];

  const isActiveRoute = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">LUXE</h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.id}
                    className={`
                      relative px-4 py-2 transition-all duration-300 group interactive-element flex items-center gap-2
                      ${isActiveRoute(item.id)
                        ? 'text-foreground font-semibold' 
                        : 'text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {item.label}
                    {isActiveRoute(item.id) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform origin-left transition-transform duration-300" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 hover:bg-accent rounded-full transition-colors duration-300">
                <Search className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors duration-300" />
              </button>
              <button className="p-2 hover:bg-accent rounded-full transition-colors duration-300">
                <Heart className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors duration-300" />
              </button>
              
              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 hover:bg-accent rounded-full transition-colors duration-300"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                ) : (
                  <Moon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                )}
              </button>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button className="p-2 hover:bg-accent rounded-full transition-colors duration-300">
                    <User className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="p-2 hover:bg-accent rounded-full transition-colors duration-300">
                  <User className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                </Link>
              )}

              {/* Cart */}
              <Link to="/cart" className="relative p-2 hover:bg-accent rounded-full transition-colors duration-300">
                <ShoppingCart className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                {itemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {itemsCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-accent rounded-full transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute top-0 right-0 w-80 h-full glass-strong border-l border-border">
            <div className="p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-foreground">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-accent rounded-full transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      to={item.id}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                        ${isActiveRoute(item.id)
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-foreground hover:bg-accent'
                        }
                      `}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Actions */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Dark Mode</span>
                  <button 
                    onClick={toggleDarkMode}
                    className="p-2 hover:bg-accent rounded-full transition-colors duration-300"
                  >
                    {isDarkMode ? (
                      <Sun className="w-5 h-5 text-foreground" />
                    ) : (
                      <Moon className="w-5 h-5 text-foreground" />
                    )}
                  </button>
                </div>

                {user && (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-all duration-300"
                    >
                      <User className="w-5 h-5" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-all duration-300 w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModernNavigation;
