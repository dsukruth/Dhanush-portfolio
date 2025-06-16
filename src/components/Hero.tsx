
import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight, MapPin, Mail, Linkedin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = personalInfo.title;
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-50 to-white pt-16">
      <div className="text-center z-10 max-w-6xl mx-auto px-6">
        <div className="animate-fade-in">
          {/* Contact Info Bar */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin size={16} />
              <span>{personalInfo.linkedin}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Liquid Glass Name Effect */}
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-8xl font-thin tracking-tight relative z-10 liquid-glass-text">
              {personalInfo.name}
            </h1>
            <div className="absolute inset-0 liquid-glass-bg"></div>
          </div>
          
          <div className="text-2xl md:text-3xl text-gray-600 mb-6 font-light">
            <span className="border-r-2 border-gray-400 pr-1 animate-pulse">
              {text}
            </span>
          </div>

          <div className="text-lg md:text-xl text-gray-500 mb-12 font-medium">
            {personalInfo.subtitle}
          </div>
          
          <p className="text-lg md:text-xl text-gray-500 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            {personalInfo.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>View My Work</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 animate-bounce-subtle"
        >
          <ChevronDown size={32} />
        </button>
      </div>

      <style jsx>{`
        .liquid-glass-text {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 0.4) 25%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.4) 75%,
            rgba(255, 255, 255, 0.8) 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
          filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
          animation: liquid-shimmer 3s ease-in-out infinite;
        }

        .liquid-glass-bg {
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0.1) 25%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.1) 75%,
            rgba(255, 255, 255, 0.25) 100%
          );
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px 0 rgba(31, 38, 135, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.3);
          animation: glass-float 4s ease-in-out infinite;
        }

        @keyframes liquid-shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes glass-float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-5px) scale(1.02);
            opacity: 0.9;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
