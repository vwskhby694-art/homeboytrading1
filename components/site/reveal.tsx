"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Content renders visible in the server HTML, so it stays readable if JavaScript never runs.
// After hydration, only blocks that start below the viewport are hidden and then revealed on scroll.
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [stage, setStage] = useState<"static" | "pending" | "visible">("static");

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setStage("pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStage("visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const stageClass = stage === "pending" ? "is-pending" : stage === "visible" ? "is-visible" : "";
  return <div ref={ref} className={`reveal ${stageClass} ${className}`}>{children}</div>;
}
