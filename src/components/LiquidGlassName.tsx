import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

interface LiquidGlassNameProps {
  text: string;
  /** Font family applied to both the measured canvas and the sr-only H1. */
  fontFamily?: string;
  /** Min / max font size in px. Auto-fits between these by measuring with pretext. */
  minFontSize?: number;
  maxFontSize?: number;
  /** Multiplier applied to font size for line-height. */
  lineHeightRatio?: number;
  className?: string;
}

const GRADIENT_STOPS: Array<[number, string]> = [
  [0.0, '#667eea'],
  [0.25, '#764ba2'],
  [0.5, '#f093fb'],
  [0.75, '#f5576c'],
  [1.0, '#4facfe'],
];

/**
 * Renders the hero name into a <canvas> using @chenglou/pretext for line layout.
 * Animates a flowing liquid-glass gradient frame by frame.
 * Keeps an off-screen <h1> for SEO + accessibility.
 */
const LiquidGlassName: React.FC<LiquidGlassNameProps> = ({
  text,
  fontFamily = 'system-ui, -apple-system, "Segoe UI", sans-serif',
  minFontSize = 40,
  maxFontSize = 112,
  lineHeightRatio = 1.05,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [dpr, setDpr] = useState(() =>
    typeof window === 'undefined' ? 1 : Math.min(window.devicePixelRatio || 1, 3)
  );

  // Observe container width for responsive auto-fit.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      setContainerWidth(Math.floor(w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Track devicePixelRatio changes (e.g. dragging the window between monitors,
  // browser zoom). matchMedia fires once when the current dpr stops matching.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let mql: MediaQueryList | null = null;
    let cancelled = false;

    const attach = () => {
      if (cancelled) return;
      const current = Math.min(window.devicePixelRatio || 1, 3);
      setDpr(current);
      mql = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      const onChange = () => {
        mql?.removeEventListener('change', onChange);
        attach();
      };
      mql.addEventListener('change', onChange);
    };

    attach();
    return () => {
      cancelled = true;
      mql?.removeEventListener('change', () => {});
    };
  }, []);

  useEffect(() => {
    if (!containerWidth || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Auto-fit: pick the largest font size where pretext lays out the text in
    // a single line that fits the container.
    let chosenSize = minFontSize;
    let chosenLayout: ReturnType<typeof layoutWithLines> | null = null;

    for (let size = maxFontSize; size >= minFontSize; size -= 2) {
      const font = `300 ${size}px ${fontFamily}`;
      const prepared = prepareWithSegments(text, font);
      const lineHeight = Math.round(size * lineHeightRatio);
      const result = layoutWithLines(prepared, containerWidth, lineHeight);
      const widest = result.lines.reduce((m, l) => Math.max(m, l.width), 0);
      if (result.lineCount === 1 && widest <= containerWidth) {
        chosenSize = size;
        chosenLayout = result;
        break;
      }
      if (size === minFontSize) {
        chosenSize = size;
        chosenLayout = result;
      }
    }

    if (!chosenLayout) return;

    const font = `300 ${chosenSize}px ${fontFamily}`;
    const lineHeight = Math.round(chosenSize * lineHeightRatio);
    const padX = Math.round(chosenSize * 0.15);
    const padY = Math.round(chosenSize * 0.1);
    const cssWidth = containerWidth;
    const cssHeight = chosenLayout.height + padY * 2;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;

    let start = performance.now();

    const draw = (now: number) => {
      const t = ((now - start) / 8000) % 1; // 8s cycle, matches old keyframes
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      ctx.font = font;
      ctx.textBaseline = 'top';

      // Build an animated horizontal gradient. Shift stops by `t`.
      const grad = ctx.createLinearGradient(0, 0, cssWidth, cssHeight);
      for (const [pos, color] of GRADIENT_STOPS) {
        const p = (pos + t) % 1;
        grad.addColorStop(p, color);
      }
      // Re-add stops at 0 and 1 so the gradient is always defined at the ends.
      grad.addColorStop(0, GRADIENT_STOPS[Math.floor(t * GRADIENT_STOPS.length) % GRADIENT_STOPS.length][1]);
      grad.addColorStop(1, GRADIENT_STOPS[(Math.floor(t * GRADIENT_STOPS.length) + 1) % GRADIENT_STOPS.length][1]);

      ctx.fillStyle = grad;

      for (let i = 0; i < chosenLayout!.lines.length; i++) {
        const line = chosenLayout!.lines[i];
        // Center each line horizontally.
        const x = Math.max(padX, (cssWidth - line.width) / 2);
        const y = padY + i * lineHeight;
        ctx.fillText(line.text, x, y);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [text, containerWidth, fontFamily, minFontSize, maxFontSize, lineHeightRatio]);

  return (
    <div ref={containerRef} className={className}>
      {/* Accessible / SEO heading, visually hidden but present for crawlers & SR */}
      <h1 className="sr-only">{text}</h1>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
};

export default LiquidGlassName;
