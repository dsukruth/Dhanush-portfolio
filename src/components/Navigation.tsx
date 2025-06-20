
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import LiquidGlass from './ui/liquid-glass';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500`}>
      <LiquidGlass 
        variant="regular" 
        size="small"
        className={`transition-all duration-500 ${
          scrolled ? 'shadow-lg border-b border-white/10' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-semibold text-gray-900">
              {personalInfo.name.split(' ')[0]}
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                <LiquidGlass
                  key={item}
                  variant="clear"
                  size="small"
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="px-4 py-2 rounded-xl cursor-pointer"
                >
                  <span className="text-sm font-medium text-gray-700 relative z-10">
                    {item}
                  </span>
                </LiquidGlass>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <LiquidGlass
              variant="clear"
              size="small"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl cursor-pointer"
            >
              <div className="text-gray-700 relative z-10">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </LiquidGlass>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <LiquidGlass 
              variant="regular"
              size="medium"
              className="md:hidden mt-2 mb-4 rounded-2xl overflow-hidden animate-fade-in"
            >
              <div className="px-6 py-4 space-y-2">
                {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                  <LiquidGlass
                    key={item}
                    variant="clear"
                    size="small"
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left py-3 px-4 rounded-xl cursor-pointer"
                  >
                    <span className="text-sm font-medium text-gray-700 relative z-10">
                      {item}
                    </span>
                  </LiquidGlass>
                ))}
              </div>
            </LiquidGlass>
          )}
        </div>
      </LiquidGlass>
    </nav>
  );
};

export default Navigation;
