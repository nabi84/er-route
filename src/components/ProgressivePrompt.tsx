import { useEffect, useMemo, useRef, useState } from "react";

type ProgressivePromptProps = {
  text: string;
  durationMs?: number;
  initialDelayMs?: number;
  cadence?: "default" | "transcript";
  className?: string;
  onComplete?: () => void;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProgressivePrompt({
  text,
  durationMs = 1700,
  initialDelayMs = 0,
  cadence = "default",
  className,
  onComplete
}: ProgressivePromptProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const didCompleteRef = useRef(false);

  useEffect(() => {
    didCompleteRef.current = false;
    if (prefersReducedMotion()) {
      setVisibleChars(text.length);
      return;
    }

    setVisibleChars(0);
    const timers: number[] = [];
    let isActive = true;

    const weightForChar = (char: string): number => {
      if (char === "\n") {
        return cadence === "transcript" ? 10 : 8;
      }
      if (char === "." || char === "!" || char === "?") {
        return cadence === "transcript" ? 9 : 7;
      }
      if (char === "," || char === ";" || char === ":") {
        return cadence === "transcript" ? 5.5 : 4;
      }
      if (char === " ") {
        return cadence === "transcript" ? 1.8 : 1.2;
      }
      return 1;
    };

    const weights = Array.from(text, weightForChar);
    const totalWeight = weights.reduce((sum, value) => sum + value, 0);
    const transcriptPaceMultiplier = cadence === "transcript" ? 1.2 : 1;
    const baseStepMs = totalWeight > 0 ? (durationMs * transcriptPaceMultiplier) / totalWeight : durationMs;

    let elapsedMs = initialDelayMs;
    let wordCount = 0;
    for (let i = 0; i < text.length; i += 1) {
      const currentChar = text[i];
      elapsedMs += weights[i] * baseStepMs;

      if (cadence === "transcript") {
        if (currentChar === " ") {
          wordCount += 1;
          if (wordCount > 0 && wordCount % 3 === 0) {
            elapsedMs += 145;
          }
        } else if (currentChar === "," || currentChar === ";" || currentChar === ":") {
          elapsedMs += 110;
        } else if (currentChar === "." || currentChar === "!" || currentChar === "?") {
          elapsedMs += 190;
        }
      }

      const timerId = window.setTimeout(() => {
        if (!isActive) {
          return;
        }
        setVisibleChars(i + 1);
      }, elapsedMs);
      timers.push(timerId);
    }

    return () => {
      isActive = false;
      timers.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, [cadence, durationMs, initialDelayMs, text]);

  const visibleText = useMemo(() => text.slice(0, visibleChars), [text, visibleChars]);
  const completed = visibleChars >= text.length;

  useEffect(() => {
    if (!completed || didCompleteRef.current) {
      return;
    }
    didCompleteRef.current = true;
    onComplete?.();
  }, [completed, onComplete]);

  return (
    <div className={`progressive-text-shell ${className ?? ""}`}>
      <span className="progressive-text-ghost" aria-hidden="true">
        {text}
      </span>
      <span className="progressive-text-live" aria-live="polite">
        {visibleText}
        {!completed ? <span className="progressive-caret" aria-hidden="true" /> : null}
      </span>
    </div>
  );
}
