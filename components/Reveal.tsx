"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + lifts children in once they scroll into view. Stagger via
 * `delayMs`. Motion is transform/opacity only (GPU-cheap) and collapses
 * to an instant, non-animated appearance under prefers-reduced-motion —
 * handled globally in globals.css, not duplicated here.
 */
export default function Reveal({
  children,
  delayMs = 0,
  className,
}: {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${className ?? ""}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
