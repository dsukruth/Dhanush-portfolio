
import { useCallback, useEffect, useRef, useState } from 'react';

interface LiquidGlassState {
  isHovered: boolean;
  isPressed: boolean;
  isFocused: boolean;
  backgroundLuminance: number;
  interactionIntensity: number;
}

interface UseLiquidGlassOptions {
  variant?: 'regular' | 'clear';
  adaptToBackground?: boolean;
  enableMotion?: boolean;
  tintColor?: string;
}

export const useLiquidGlass = (options: UseLiquidGlassOptions = {}) => {
  const {
    variant = 'regular',
    adaptToBackground = true,
    enableMotion = true,
    tintColor
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<LiquidGlassState>({
    isHovered: false,
    isPressed: false,
    isFocused: false,
    backgroundLuminance: 0.5,
    interactionIntensity: 0
  });

  const updateBackgroundLuminance = useCallback(() => {
    if (!adaptToBackground || !elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Enhanced luminance calculation
    const normalizedX = centerX / window.innerWidth;
    const normalizedY = centerY / window.innerHeight;
    const scrollPosition = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
    const calculatedLuminance = (normalizedX + normalizedY + scrollPosition) / 3;
    
    setState(prev => ({
      ...prev,
      backgroundLuminance: Math.max(0.1, Math.min(0.9, calculatedLuminance))
    }));
  }, [adaptToBackground]);

  useEffect(() => {
    if (!adaptToBackground) return;

    updateBackgroundLuminance();
    
    const handleScroll = () => updateBackgroundLuminance();
    const handleResize = () => updateBackgroundLuminance();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateBackgroundLuminance, adaptToBackground]);

  const getGlassStyles = useCallback(() => {
    const { backgroundLuminance, isHovered, isPressed, interactionIntensity } = state;
    
    const isDark = backgroundLuminance < 0.4;
    const isLight = backgroundLuminance > 0.7;
    
    let baseOpacity = variant === 'clear' ? 0.12 : 0.22;
    let shadowOpacity = 0.08;
    let blurStrength = variant === 'clear' ? 24 : 18;
    
    // Adaptive adjustments
    if (isDark) {
      baseOpacity += 0.08;
      shadowOpacity += 0.04;
    } else if (isLight) {
      baseOpacity += 0.03;
      shadowOpacity += 0.08;
    }

    // Interaction adjustments
    if (isHovered) {
      baseOpacity += 0.05;
      blurStrength += 2;
    }
    
    if (isPressed) {
      baseOpacity += 0.1;
      shadowOpacity += 0.05;
    }

    const scale = isPressed ? 0.98 : isHovered ? 1.01 : 1;
    
    return {
      background: `linear-gradient(135deg, 
        rgba(255, 255, 255, ${baseOpacity + interactionIntensity * 0.1}) 0%, 
        rgba(255, 255, 255, ${baseOpacity * 0.8}) 50%, 
        rgba(255, 255, 255, ${baseOpacity * 0.6}) 100%)`,
      backdropFilter: `blur(${blurStrength}px) saturate(1.3)`,
      WebkitBackdropFilter: `blur(${blurStrength}px) saturate(1.3)`,
      boxShadow: `
        0 8px 32px rgba(0, 0, 0, ${shadowOpacity}),
        inset 0 1px 0 rgba(255, 255, 255, ${baseOpacity * 1.5}),
        0 1px 3px rgba(0, 0, 0, 0.05)
      `,
      transform: enableMotion ? `scale(${scale})` : 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      ...(tintColor && {
        borderColor: `${tintColor}40`,
        borderWidth: '1px',
        borderStyle: 'solid'
      })
    };
  }, [state, variant, enableMotion, tintColor]);

  const handlers = {
    onMouseEnter: () => setState(prev => ({ ...prev, isHovered: true })),
    onMouseLeave: () => setState(prev => ({ ...prev, isHovered: false, isPressed: false })),
    onMouseDown: () => setState(prev => ({ ...prev, isPressed: true })),
    onMouseUp: () => setState(prev => ({ ...prev, isPressed: false })),
    onFocus: () => setState(prev => ({ ...prev, isFocused: true })),
    onBlur: () => setState(prev => ({ ...prev, isFocused: false }))
  };

  return {
    ref: elementRef,
    styles: getGlassStyles(),
    state,
    handlers
  };
};
