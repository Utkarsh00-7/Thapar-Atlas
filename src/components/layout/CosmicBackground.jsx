import { useEffect, useRef } from 'react';
import './CosmicBackground.css';

export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Bounding dimensions for 3D stars
    const stars = [];
    const numStars = 80;
    const fov = 400; // Field of View (perspective depth)

    // Generate random 3D stars inside a cube box
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1600,
        z: Math.random() * 1000,
        baseSize: Math.random() * 1.5 + 0.5,
      });
    }

    // Mouse coordinates (smoothly interpolated)
    const mouse = { x: width / 2, y: height / 2 };
    const targetMouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Scroll offset track
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      const isDark = theme === 'dark';

      // Colors matching the cosmic layout
      const starColor = isDark ? 'rgba(245, 235, 230, 0.45)' : 'rgba(24, 24, 27, 0.22)';
      const lineColor = isDark ? 'rgba(34, 211, 238, 0.045)' : 'rgba(8, 145, 178, 0.03)';

      // Interpolate mouse coordinates for smooth rotation inertia
      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;

      // Compute 3D rotation angles based on mouse offset from center
      const angleY = ((mouse.x - width / 2) / (width / 2)) * 0.22; // horizontal rotation
      const angleX = -((mouse.y - height / 2) / (height / 2)) * 0.22; // vertical rotation

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projectedStars = [];

      // Project 3D coordinates onto 2D screen with rotation
      stars.forEach((star) => {
        // Apply scroll parallax (shifts stars in Y axis relative to depth Z)
        // Stars closer (lower Z) move faster than stars further away (higher Z)
        const scrollFactor = 0.35;
        const adjustedY = star.y - (scrollY * scrollFactor * (1 - star.z / 1200));

        // 3D Rotation Y (yaw)
        let rx = star.x * cosY - star.z * sinY;
        let rz = star.x * sinY + star.z * cosY;

        // 3D Rotation X (pitch)
        let ry = adjustedY * cosX - rz * sinX;
        let finalZ = adjustedY * sinX + rz * cosX;

        // Projection formulas
        const scale = fov / (fov + finalZ);
        const projX = width / 2 + rx * scale;
        const projY = height / 2 + ry * scale;

        // Only draw if on screen
        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height && finalZ > -fov) {
          projectedStars.push({
            x: projX,
            y: projY,
            size: star.baseSize * scale * 1.5,
            z: finalZ
          });
        }
      });

      // Draw projected stars
      projectedStars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, Math.max(0.1, star.size), 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.fill();
      });

      // Connect stars with constellation lines in 2D projected space
      for (let i = 0; i < projectedStars.length; i++) {
        const s1 = projectedStars[i];
        for (let j = i + 1; j < projectedStars.length; j++) {
          const s2 = projectedStars[j];
          
          // Draw line if stars are close in 2D space
          const dist2D = Math.hypot(s1.x - s2.x, s1.y - s2.y);
          if (dist2D < 110) {
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = (1 - dist2D / 110) * 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="global-3d-canvas" aria-hidden="true" />;
}
