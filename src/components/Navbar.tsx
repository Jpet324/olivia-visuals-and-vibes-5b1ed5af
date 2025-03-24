
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2 bg-white/70 backdrop-blur-md shadow-sm" : "py-4 bg-transparent"}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-medium olivia-gradient-text transition-all duration-300">
          Olivia Branchaud
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={isActive("/") ? "nav-link-active" : "nav-link"}>
            Home
          </Link>
          <Link to="/about" className={isActive("/about") ? "nav-link-active" : "nav-link"}>
            About
          </Link>
          <Link to="/gallery" className={isActive("/gallery") ? "nav-link-active" : "nav-link"}>
            Gallery
          </Link>
          <Link to="/tribute" className={isActive("/tribute") ? "nav-link-active" : "nav-link"}>
            Tribute
          </Link>
          <Link to="/game" className={isActive("/game") ? "nav-link-active" : "nav-link"}>
            Game
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile navigation */}
      <div className={`md:hidden absolute w-full bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? "max-h-96 border-b border-olivia-purple/20" : "max-h-0"}`}>
        <nav className="flex flex-col space-y-4 p-4">
          <Link to="/" className={`text-center py-2 ${isActive("/") ? "text-olivia-purple font-medium" : ""}`}>
            Home
          </Link>
          <Link to="/about" className={`text-center py-2 ${isActive("/about") ? "text-olivia-purple font-medium" : ""}`}>
            About
          </Link>
          <Link to="/gallery" className={`text-center py-2 ${isActive("/gallery") ? "text-olivia-purple font-medium" : ""}`}>
            Gallery
          </Link>
          <Link to="/tribute" className={`text-center py-2 ${isActive("/tribute") ? "text-olivia-purple font-medium" : ""}`}>
            Tribute
          </Link>
          <Link to="/game" className={`text-center py-2 ${isActive("/game") ? "text-olivia-purple font-medium" : ""}`}>
            Game
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
