
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Toggle navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? 'py-2 glass' : 'py-4 bg-transparent'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/home" className="text-xl font-semibold tracking-tight heading-gradient">
            Portfolio
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink 
              to="/home" 
              className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/skills" 
              className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Skills
            </NavLink>
            <NavLink 
              to="/projects" 
              className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Projects
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Contact
            </NavLink>
            <NavLink 
              to="/" 
              className="ml-2 px-4 py-2 border border-portfolio-secondary rounded-md text-portfolio-secondary hover:bg-portfolio-secondary/10 transition-colors duration-300"
            >
              Terminal
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 glass border-t border-white/10 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="px-4 py-4 space-y-3 flex flex-col">
          <NavLink 
            to="/home" 
            className={({isActive}) => `py-2 px-4 rounded-md ${isActive ? 'bg-portfolio-accent/20 text-white' : 'text-white/80 hover:text-white'}`}
          >
            Home
          </NavLink>
          <NavLink 
            to="/skills" 
            className={({isActive}) => `py-2 px-4 rounded-md ${isActive ? 'bg-portfolio-accent/20 text-white' : 'text-white/80 hover:text-white'}`}
          >
            Skills
          </NavLink>
          <NavLink 
            to="/projects" 
            className={({isActive}) => `py-2 px-4 rounded-md ${isActive ? 'bg-portfolio-accent/20 text-white' : 'text-white/80 hover:text-white'}`}
          >
            Projects
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({isActive}) => `py-2 px-4 rounded-md ${isActive ? 'bg-portfolio-accent/20 text-white' : 'text-white/80 hover:text-white'}`}
          >
            Contact
          </NavLink>
          <NavLink 
            to="/" 
            className="py-2 px-4 rounded-md text-portfolio-secondary border border-portfolio-secondary/50"
          >
            Terminal
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
