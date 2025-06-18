
import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight, MapPin, Mail, Linkedin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import LiquidGlass from './ui/liquid-glass';

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
          <LiquidGlass 
            variant="clear" 
            size="small"
            className="inline-block mb-12 px-8 py-4 rounded-2xl"
          >
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 relative z-10">
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
          </LiquidGlass>

          <div className="relative mb-8">
            <LiquidGlass 
              variant="regular" 
              size="large"
              className="inline-block p-12 rounded-3xl"
            >
              <h1 className="text-6xl md:text-8xl font-thin tracking-tight liquid-glass-text relative z-10">
                {personalInfo.name}
              </h1>
            </LiquidGlass>
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
            <LiquidGlass
              variant="regular"
              size="medium"
              tintColor="#1f2937"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full cursor-pointer group"
            >
              <div className="flex items-center justify-center space-x-2 text-white font-medium relative z-10">
                <span>View My Work</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </LiquidGlass>
            
            <LiquidGlass
              variant="clear"
              size="medium"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full cursor-pointer border-2 border-gray-900"
            >
              <span className="text-gray-900 font-medium relative z-10">Get In Touch</span>
            </LiquidGlass>
          </div>
        </div>

        {/* Scroll Indicator */}
        <LiquidGlass
          variant="clear"
          size="small"
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full cursor-pointer animate-bounce-subtle"
        >
          <ChevronDown size={32} className="text-gray-400 hover:text-gray-600 transition-colors duration-300 relative z-10" />
        </LiquidGlass>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
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
        `
      }} />
    </section>
  );
};

export default Hero;
