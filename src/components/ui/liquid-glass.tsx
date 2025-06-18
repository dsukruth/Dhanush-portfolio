
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'regular' | 'clear';
  size?: 'small' | 'medium' | 'large';
  tintColor?: string;
  disabled?: boolean;
  onClick?: () => void;
  onHover?: boolean;
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  className,
  variant = 'regular',
  size = 'medium',
  tintColor,
  disabled = false,
  onClick,
  onHover = true
}) => {
  const glassRef = useRef<HTMLDivElement>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [backgroundLuminance, setBackgroundLuminance] = useState(0.5);

  useEffect(() => {
    const element = glassRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Simulate background content analysis
            const rect = entry.boundingRect;
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Simple luminance calculation based on position
            const normalizedX = centerX / window.innerWidth;
            const normalizedY = centerY / window.innerHeight;
            const calculatedLuminance = (normalizedX + normalizedY) / 2;
            
            setBackgroundLuminance(calculatedLuminance);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getAdaptiveStyles = () => {
    const isDark = backgroundLuminance < 0.4;
    const isLight = backgroundLuminance > 0.7;
    
    let baseOpacity = variant === 'clear' ? 0.15 : 0.25;
    let shadowOpacity = 0.1;
    let blurIntensity = variant === 'clear' ? '20px' : '16px';
    
    // Adaptive adjustments
    if (isDark) {
      baseOpacity += 0.1;
      shadowOpacity += 0.05;
    } else if (isLight) {
      baseOpacity += 0.05;
      shadowOpacity += 0.1;
    }

    // Size-based adjustments
    if (size === 'large') {
      blurIntensity = '24px';
      shadowOpacity += 0.05;
    } else if (size === 'small') {
      blurIntensity = '12px';
      baseOpacity -= 0.05;
    }

    return {
      baseOpacity,
      shadowOpacity,
      blurIntensity,
      isDark,
      isLight
    };
  };

  const adaptiveStyles = getAdaptiveStyles();

  return (
    <div
      ref={glassRef}
      className={cn(
        'liquid-glass-container relative transition-all duration-300 ease-out',
        {
          'cursor-pointer': onClick && !disabled,
          'cursor-not-allowed opacity-60': disabled,
        },
        className
      )}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => onHover && setIsHovered(true)}
      onMouseLeave={() => onHover && setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        transform: isPressed ? 'scale(0.98)' : isHovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Background Layer */}
      <div
        className="absolute inset-0 rounded-inherit"
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, ${adaptiveStyles.baseOpacity}) 0%, 
            rgba(255, 255, 255, ${adaptiveStyles.baseOpacity * 0.8}) 50%, 
            rgba(255, 255, 255, ${adaptiveStyles.baseOpacity * 0.6}) 100%)`,
          backdropFilter: `blur(${adaptiveStyles.blurIntensity}) saturate(1.2)`,
          WebkitBackdropFilter: `blur(${adaptiveStyles.blurIntensity}) saturate(1.2)`,
        }}
      />

      {/* Adaptive Shadow Layer */}
      <div
        className="absolute inset-0 rounded-inherit"
        style={{
          boxShadow: `
            0 ${size === 'large' ? '12px 32px' : size === 'medium' ? '8px 24px' : '4px 16px'} 
            rgba(0, 0, 0, ${adaptiveStyles.shadowOpacity}),
            inset 0 1px 0 rgba(255, 255, 255, ${adaptiveStyles.baseOpacity * 2}),
            0 1px 3px rgba(0, 0, 0, 0.1)
          `,
        }}
      />

      {/* Highlight Layer */}
      <div
        className={cn(
          'absolute inset-0 rounded-inherit opacity-0 transition-opacity duration-300',
          {
            'opacity-30': isHovered,
            'opacity-50': isPressed,
          }
        )}
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.4) 0%, 
            transparent 50%, 
            rgba(255, 255, 255, 0.2) 100%)`,
        }}
      />

      {/* Tint Layer */}
      {tintColor && (
        <div
          className="absolute inset-0 rounded-inherit mix-blend-overlay"
          style={{
            background: `linear-gradient(135deg, 
              ${tintColor}40 0%, 
              ${tintColor}20 50%, 
              ${tintColor}10 100%)`,
          }}
        />
      )}

      {/* Interaction Glow */}
      <div
        className={cn(
          'absolute inset-0 rounded-inherit opacity-0 transition-all duration-500',
          {
            'opacity-60': isPressed,
            'opacity-30': isHovered && !isPressed,
          }
        )}
        style={{
          background: `radial-gradient(circle at center, 
            rgba(255, 255, 255, 0.6) 0%, 
            rgba(255, 255, 255, 0.2) 40%, 
            transparent 70%)`,
          animation: isPressed ? 'glowPulse 0.6s ease-out' : 'none',
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes glowPulse {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 0.3;
            }
          }

          .liquid-glass-container {
            isolation: isolate;
          }

          .liquid-glass-container > * {
            border-radius: inherit;
          }
        `
      }} />
    </div>
  );
};

export default LiquidGlass;
