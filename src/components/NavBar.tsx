
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, ShoppingCart, User, Cloud, Workflow } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Function to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Mock login/logout for demo
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-navora-dark/90 backdrop-blur-md py-2 shadow-md' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/9a594b4c-4890-4009-8d33-b42bca8a1ed4.png" 
            alt="Navora Creative Solutions" 
            className="h-12 md:h-14" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={cn('nav-link', isActive('/') && 'active')}>
            Home
          </Link>
          <Link to="/marketplace" className={cn('nav-link', isActive('/marketplace') && 'active')}>
            Services
          </Link>
          <Link to="/about" className={cn('nav-link', isActive('/about') && 'active')}>
            About
          </Link>
          <Link to="/contact" className={cn('nav-link', isActive('/contact') && 'active')}>
            Contact
          </Link>
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" onClick={toggleAuth}>Logout</Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" className="bg-navora-red hover:bg-navora-red/90">Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-navora-dark/95 z-40 flex flex-col justify-center items-center transition-all duration-300 md:hidden',
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        <nav className="flex flex-col items-center space-y-6 text-xl">
          <Link 
            to="/" 
            className={cn('nav-link', isActive('/') && 'active')}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/marketplace" 
            className={cn('nav-link', isActive('/marketplace') && 'active')}
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link 
            to="/about" 
            className={cn('nav-link', isActive('/about') && 'active')}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={cn('nav-link', isActive('/contact') && 'active')}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          
          <div className="pt-6 flex flex-col items-center space-y-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="button-primary w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    toggleAuth();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="button-outline w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="button-primary w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
