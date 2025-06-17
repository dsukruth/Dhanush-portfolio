
import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: `https://${personalInfo.linkedin}`, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-6 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="text-3xl font-semibold text-gray-900 mb-3">
              {personalInfo.name}
            </div>
            <p className="text-gray-600 font-light">{personalInfo.title}</p>
            <p className="text-gray-500 text-sm mt-1">{personalInfo.location}</p>
          </div>

          <div className="flex items-center space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="liquid-glass-button p-3 text-gray-600 transition-all duration-300 rounded-full"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-gray-600">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span>© {currentYear} {personalInfo.name}. Made with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>using React & Tailwind CSS</span>
          </div>

          <button
            onClick={scrollToTop}
            className="liquid-glass-button text-gray-600 transition-all duration-300 font-medium px-4 py-2 rounded-full"
          >
            Back to Top ↑
          </button>
        </div>
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
    </footer>
  );
};

export default Footer;
