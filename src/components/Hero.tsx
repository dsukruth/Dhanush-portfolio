
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

          <h1 className="text-6xl md:text-8xl font-thin text-gray-900 mb-8 tracking-tight">
            {personalInfo.name}
          </h1>
          
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
    </section>
  );
};

export default Hero;
