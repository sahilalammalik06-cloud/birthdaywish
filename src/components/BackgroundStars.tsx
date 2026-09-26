import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
  direction: number;
}

interface BackgroundStarsProps {
  currentStep?: number;
  totalSteps?: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpRgba(
  c1: [number, number, number, number],
  c2: [number, number, number, number],
  t: number
): string {
  const r = Math.round(lerp(c1[0], c2[0], t));
  const g = Math.round(lerp(c1[1], c2[1], t));
  const b = Math.round(lerp(c1[2], c2[2], t));
  const a = +(lerp(c1[3], c2[3], t)).toFixed(3);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export const BackgroundStars: React.FC<BackgroundStarsProps> = ({
  currentStep = 1,
  totalSteps = 10,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Track target progress based on steps (0 = deep charcoal at Step 1, 1 = subtle lavender at Step 10)
  const targetProgress = Math.max(0, Math.min(1, (currentStep - 1) / Math.max(1, totalSteps - 1)));
  const progressRef = useRef<number>(targetProgress);
  const targetRef = useRef<number>(targetProgress);

  useEffect(() => {
    targetRef.current = targetProgress;
  }, [targetProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const starCount = Math.min(85, Math.floor((width * height) / 12000));
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.015 + 0.005,
        direction: Math.random() > 0.5 ? 1 : -1,
      });
    }

    // Palette Definitions:
    // Deep Charcoal (Step 1) -> Subtle Romantic Lavender (Step 10)
    const charcoalCenter: [number, number, number, number] = [24, 24, 30, 0.45];
    const lavenderCenter: [number, number, number, number] = [64, 44, 90, 0.65];

    const charcoalMid: [number, number, number, number] = [15, 15, 20, 0.35];
    const lavenderMid: [number, number, number, number] = [36, 26, 56, 0.45];

    const charcoalOuter: [number, number, number, number] = [9, 9, 12, 0];
    const lavenderOuter: [number, number, number, number] = [16, 14, 26, 0];

    const charcoalStarShadow: [number, number, number, number] = [180, 185, 205, 0.3];
    const lavenderStarShadow: [number, number, number, number] = [216, 180, 254, 0.7];

    const render = () => {
      // Smoothly drift current progress towards target
      progressRef.current += (targetRef.current - progressRef.current) * 0.035;
      const t = progressRef.current;

      ctx.clearRect(0, 0, width, height);

      // Primary radial ambiance transitioning from charcoal to lavender
      const radialGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        50,
        width * 0.5,
        height * 0.35,
        Math.max(width, height) * 0.8
      );
      radialGlow.addColorStop(0, lerpRgba(charcoalCenter, lavenderCenter, t));
      radialGlow.addColorStop(0.5, lerpRgba(charcoalMid, lavenderMid, t));
      radialGlow.addColorStop(1, lerpRgba(charcoalOuter, lavenderOuter, t));
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Secondary soft lavender aura blooming in the lower corner as the journey progresses
      if (t > 0.02) {
        const secondaryBloom = ctx.createRadialGradient(
          width * 0.75,
          height * 0.7,
          30,
          width * 0.75,
          height * 0.7,
          Math.max(width, height) * 0.65
        );
        secondaryBloom.addColorStop(0, `rgba(168, 125, 225, ${(0.16 * t).toFixed(3)})`);
        secondaryBloom.addColorStop(0.6, `rgba(110, 75, 175, ${(0.08 * t).toFixed(3)})`);
        secondaryBloom.addColorStop(1, 'rgba(9, 9, 12, 0)');
        ctx.fillStyle = secondaryBloom;
        ctx.fillRect(0, 0, width, height);
      }

      // Current star glow & fill color
      const currentStarShadow = lerpRgba(charcoalStarShadow, lavenderStarShadow, t);
      const starR = Math.round(lerp(240, 248, t));
      const starG = Math.round(lerp(240, 238, t));
      const starB = Math.round(lerp(248, 255, t));

      // Render stars with organic twinkle
      stars.forEach((star) => {
        star.alpha += star.speed * star.direction;
        if (star.alpha > 0.9) {
          star.alpha = 0.9;
          star.direction = -1;
        } else if (star.alpha < 0.15) {
          star.alpha = 0.15;
          star.direction = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starR}, ${starG}, ${starB}, ${star.alpha.toFixed(3)})`;
        ctx.shadowBlur = star.size * (3 + t * 2);
        ctx.shadowColor = currentStarShadow;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85 transition-opacity duration-700"
    />
  );
};
