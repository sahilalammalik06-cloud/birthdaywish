/**
 * High-performance canvas-based confetti and sparkles effect
 * Optimized for mobile touchscreens with zero external dependencies.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  decay: number;
  shape: 'rect' | 'circle' | 'star' | 'heart';
}

class ConfettiEngine {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;

  private colors = [
    '#f472b6', // soft pink
    '#fbbf24', // warm gold
    '#ec4899', // rose
    '#e0e7ff', // soft lavender
    '#fef08a', // pale gold
    '#ffffff', // crisp white
    '#c084fc', // purple sparkle
  ];

  private initCanvas() {
    if (this.canvas) return;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confetti-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  private resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth * window.devicePixelRatio;
    this.canvas.height = window.innerHeight * window.devicePixelRatio;
  }

  public fire(originX = 0.5, originY = 0.5, count = 75, spread = 'burst') {
    this.initCanvas();
    if (!this.canvas || !this.ctx) return;

    const startX = originX * this.canvas.width;
    const startY = originY * this.canvas.height;

    const shapes: ('rect' | 'circle' | 'star' | 'heart')[] = ['rect', 'circle', 'star', 'heart'];

    for (let i = 0; i < count; i++) {
      const angle = spread === 'burst'
        ? Math.random() * Math.PI * 2
        : -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
      
      const speed = spread === 'burst'
        ? Math.random() * 14 + 6
        : Math.random() * 20 + 8;

      this.particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed * (window.devicePixelRatio || 1),
        vy: (Math.sin(angle) * speed - (spread === 'cannon' ? 10 : 2)) * (window.devicePixelRatio || 1),
        size: (Math.random() * 7 + 4) * (window.devicePixelRatio || 1),
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        decay: Math.random() * 0.012 + 0.008,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }

    if (!this.animationFrameId) {
      this.animate();
    }
  }

  private animate = () => {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35 * (window.devicePixelRatio || 1); // gravity
      p.vx *= 0.985; // friction
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.shape === 'star') {
        this.drawStar(this.ctx, 0, 0, 5, p.size, p.size / 2);
      } else if (p.shape === 'heart') {
        this.drawHeart(this.ctx, 0, 0, p.size);
      } else {
        // Rectangle
        this.ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.7);
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationFrameId = requestAnimationFrame(this.animate);
    } else {
      this.animationFrameId = null;
      if (this.canvas && this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  };

  private drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  private drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    const s = size * 0.6;
    ctx.beginPath();
    ctx.moveTo(x, y + s / 4);
    ctx.quadraticCurveTo(x, y, x + s / 2, y);
    ctx.quadraticCurveTo(x + s, y, x + s, y + s / 2);
    ctx.quadraticCurveTo(x + s, y + (s * 3) / 4, x, y + s * 1.3);
    ctx.quadraticCurveTo(x - s, y + (s * 3) / 4, x - s, y + s / 2);
    ctx.quadraticCurveTo(x - s, y, x - s / 2, y);
    ctx.quadraticCurveTo(x, y, x, y + s / 4);
    ctx.closePath();
    ctx.fill();
  }
}

export const confetti = new ConfettiEngine();
