"use client";

import { useEffect, useRef } from "react";

interface GradientBorderProps {
  color: string;
  className?: string;
  children: React.ReactNode;
}

const DEFAULT_ANGLE = 118.65;
const DEFAULT_SPEED = 90;
const RESET_DURATION = 1000;

const GradientBorderBox = ({
  color,
  className = "",
  children,
}: GradientBorderProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let angle = DEFAULT_ANGLE;
    const speed =
      Number.parseFloat(el.dataset.gradientSpeed ?? "") || DEFAULT_SPEED;

    let running = false;
    let rafId: number | null = null;
    let lastTime = 0;

    const frame = (now: number) => {
      if (!running) {
        rafId = null;
        return;
      }

      if (!lastTime) lastTime = now;

      const dt = (now - lastTime) / 1000;
      lastTime = now;

      angle = (angle + speed * dt) % 360;
      el.style.setProperty("--gradient-angle", `${angle}deg`);

      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;

      running = true;
      lastTime = 0;

      if (!rafId) {
        rafId = requestAnimationFrame(frame);
      }
    };

    const stop = () => {
      running = false;
      lastTime = 0;

      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      const startAngle = angle;
      const startTime = performance.now();

      const resetStep = (now: number) => {
        const t = Math.min((now - startTime) / RESET_DURATION, 1);
        const newAngle = startAngle + (DEFAULT_ANGLE - startAngle) * t;

        el.style.setProperty("--gradient-angle", `${newAngle}deg`);

        if (t < 1) {
          requestAnimationFrame(resetStep);
        } else {
          angle = DEFAULT_ANGLE;
        }
      };

      requestAnimationFrame(resetStep);
    };

    el.addEventListener("pointerenter", start, { passive: true });
    el.addEventListener("pointerleave", stop, { passive: true });
    el.addEventListener("pointercancel", stop, { passive: true });
    el.addEventListener("focus", start);
    el.addEventListener("blur", stop);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      el.removeEventListener("pointerenter", start);
      el.removeEventListener("pointerleave", stop);
      el.removeEventListener("pointercancel", stop);
      el.removeEventListener("focus", start);
      el.removeEventListener("blur", stop);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`gradient-border gradient-border-${color} rotate-on-hover ${className}`}
    >
      {children}
    </div>
  );
};

export default GradientBorderBox;
