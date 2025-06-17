
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

          <div className="relative mb-8">
            <div className="glassmorphism-container inline-block p-8 rounded-3xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl">
              <h1 className="text-6xl md:text-8xl font-thin tracking-tight liquid-glass-text">
                {personalInfo.name}
              </h1>
            </div>
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

      <style dangerouslySetInnerHTML={{
        __html: `
          .glassmorphism-container {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 
              0 25px 45px rgba(31, 38, 135, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              0 1px 3px rgba(0, 0, 0, 0.05);
            animation: glassFloat 6s ease-in-out infinite;
          }

          .liquid-glass-text {
            background: linear-gradient(
              135deg,
              #667eea 0%,
              #764ba2 25%,
              #f093fb 50%,
              #f5576c 75%,
              #4facfe 100%
            );
            background-size: 300% 300%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: liquidFlow 8s ease-in-out infinite;
            position: relative;
            margin: 0;
          }

          @keyframes liquidFlow {
            0%, 100% {
              background-position: 0% 50%;
              filter: hue-rotate(0deg) brightness(1.1);
            }
            25% {
              background-position: 100% 50%;
              filter: hue-rotate(90deg) brightness(1.2);
            }
            50% {
              background-position: 100% 100%;
              filter: hue-rotate(180deg) brightness(1.3);
            }
            75% {
              background-position: 0% 100%;
              filter: hue-rotate(270deg) brightness(1.2);
            }
          }

          @keyframes glassFloat {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              box-shadow: 
                0 25px 45px rgba(31, 38, 135, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            }
            50% {
              transform: translateY(-10px) rotate(0.5deg);
              box-shadow: 
                0 35px 55px rgba(31, 38, 135, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.25);
            }
          }
        `
      }} />
    </section>
  );
};

export default Hero;
