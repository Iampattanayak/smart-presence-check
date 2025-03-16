
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Track scroll position to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Register', path: '/register' },
    { name: 'Attendance', path: '/attendance' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-apple py-4 border-b",
      isScrolled ? "bg-background/80 backdrop-blur-md border-border/50" : "bg-transparent border-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">SP</span>
            </div>
            <span className="font-medium">Smart Presence</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <Link 
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm transition-colors ease-apple",
                  location.pathname === item.path 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild size="sm" className="rounded-full">
              <Link to="/register">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-40 animate-fade-in">
          <nav className="container mx-auto px-4 py-8 flex flex-col space-y-6">
            {navItems.map(item => (
              <Link 
                key={item.path}
                to={item.path}
                className={cn(
                  "text-lg p-2 transition-colors",
                  location.pathname === item.path 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild size="lg" className="mt-6 rounded-full">
              <Link to="/register">Get Started</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
