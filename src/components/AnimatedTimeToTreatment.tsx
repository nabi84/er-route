import { useEffect, useMemo, useState } from "react";

type AnimatedTimeToTreatmentProps = {
  minutes: number;
  className?: string;
  durationMs?: number;
  mode?: "up" | "down";
  startMinutes?: number;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedTimeToTreatment({
  minutes,
  className,
  durationMs = 900,
  mode = "up",
  startMinutes
}: AnimatedTimeToTreatmentProps) {
  const initialMinutes = useMemo(() => {
    if (typeof startMinutes === "number") {
      return startMinutes;
    }
    return mode === "down" ? minutes + 3 : 0;
  }, [mode, minutes, startMinutes]);
  const [displayMinutes, setDisplayMinutes] = useState(initialMinutes);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplayMinutes(minutes);
      setIsAnimating(false);
      return;
    }

    let frameId = 0;
    let startTs = 0;
    setDisplayMinutes(initialMinutes);
    setIsAnimating(true);

    const step = (timestamp: number) => {
      if (!startTs) {
        startTs = timestamp;
      }
      const elapsed = timestamp - startTs;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutCubic(progress);
      const value = initialMinutes + (minutes - initialMinutes) * eased;
      setDisplayMinutes(Math.max(0, Math.round(value)));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      } else {
        setDisplayMinutes(minutes);
        setIsAnimating(false);
      }
    };

    frameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [durationMs, initialMinutes, minutes]);

  const classes = useMemo(() => {
    const base = className ?? "time-gradient";
    return `${base} ${isAnimating ? "is-animating" : "is-settled"}`;
  }, [className, isAnimating]);

  return <p className={classes}>{displayMinutes} min</p>;
}
