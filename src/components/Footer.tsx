
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
                className="p-3 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-110 hover:bg-gray-50 rounded-full"
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
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
