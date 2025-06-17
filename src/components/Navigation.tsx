
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100' : 'bg-white/90 backdrop-blur-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-semibold text-gray-900">
            {personalInfo.name.split(' ')[0]}
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="liquid-glass-button text-sm font-medium text-gray-700 transition-all duration-300 relative group px-3 py-2 rounded-full"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="liquid-glass-button md:hidden text-gray-700 p-2 rounded-full transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 animate-fade-in">
            <div className="px-6 py-4 space-y-4">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="liquid-glass-button block w-full text-left text-sm font-medium text-gray-700 transition-all duration-300 py-2 px-3 rounded-lg"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .liquid-glass-button {
            position: relative;
            overflow: hidden;
          }

          .liquid-glass-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.3),
              rgba(255, 255, 255, 0.1),
              transparent
            );
            transition: left 0.6s ease;
            z-index: 1;
          }

          .liquid-glass-button::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
            backdrop-filter: blur(10px);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 0;
          }

          .liquid-glass-button:hover::before {
            left: 100%;
          }

          .liquid-glass-button:hover::after {
            opacity: 1;
          }

          .liquid-glass-button:active {
            transform: scale(0.98);
            box-shadow: 
              inset 0 4px 8px rgba(0, 0, 0, 0.1),
              0 4px 12px rgba(31, 38, 135, 0.2);
          }

          .liquid-glass-button > * {
            position: relative;
            z-index: 2;
          }
        `
      }} />
    </nav>
  );
};

export default Navigation;
