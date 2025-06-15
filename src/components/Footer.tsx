
import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:alex.johnson@email.com', label: 'Email' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Alex Johnson
            </div>
            <p className="text-gray-400">Full Stack Developer & UI/UX Enthusiast</p>
          </div>

          <div className="flex items-center space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="flex items-center space-x-1 mb-4 md:mb-0">
            <span>© {currentYear} Alex Johnson. Made with</span>
            <Heart size={14} className="text-red-400 fill-current" />
            <span>using React & Tailwind CSS</span>
          </div>

          <button
            onClick={scrollToTop}
            className="text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:underline"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
