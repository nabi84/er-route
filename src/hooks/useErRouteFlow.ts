import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FlowState, Screen } from "../types";

const FLOW_ORDER: Screen[] = [
  "preloading",
  "preIntake",
  "intake",
  "intakeConfirm",
  "loading",
  "results",
  "direction",
  "saveSpot",
  "infoSent",
  "parkingInfo",
  "reassurance"
];

const AUTO_ADVANCE_MS: Partial<Record<Screen, number>> = {
  preloading: 1400,
  loading: 1900
};

const QA_ALIAS: Record<string, Screen> = {
  preloading: "preloading",
  "pre-intake": "preIntake",
  intake: "intake",
  "intake-speaking": "intake",
  "intake-confirm": "intakeConfirm",
  loading: "loading",
  results: "results",
  direction: "direction",
  "save-spot": "saveSpot",
  "info-sent": "infoSent",
  "parking-info": "parkingInfo",
  reassurance: "reassurance"
};

const AUTO_ADVANCE_SCREENS = new Set<Screen>(Object.keys(AUTO_ADVANCE_MS) as Screen[]);

function getScreenFromQuery(): Screen | null {
  const url = new URL(window.location.href);
  const value = url.searchParams.get("screen");
  if (!value) {
    return null;
  }
  return QA_ALIAS[value] ?? null;
}

function getIndex(screen: Screen): number {
  return FLOW_ORDER.indexOf(screen);
}

export function useErRouteFlow() {
  const queryScreenRef = useRef<Screen | null>(getScreenFromQuery());
  const [screen, setScreen] = useState<Screen>(queryScreenRef.current ?? "preloading");
  const [paused, setPaused] = useState(false);

  const isQaOverride = Boolean(queryScreenRef.current);

  const goNext = useCallback(() => {
    if (isQaOverride) {
      return;
    }
    setScreen((current) => {
      const idx = getIndex(current);
      if (idx === FLOW_ORDER.length - 1) {
        return current;
      }
      return FLOW_ORDER[idx + 1];
    });
    setPaused(false);
  }, [isQaOverride]);

  const goPrev = useCallback(() => {
    if (isQaOverride) {
      return;
    }
    setScreen((current) => {
      const idx = getIndex(current);
      if (idx <= 0) {
        return current;
      }
      return FLOW_ORDER[idx - 1];
    });
    setPaused(false);
  }, [isQaOverride]);

  const reset = useCallback(() => {
    if (isQaOverride) {
      return;
    }
    setScreen("preloading");
    setPaused(false);
  }, [isQaOverride]);

  const togglePause = useCallback(() => {
    if (isQaOverride || !AUTO_ADVANCE_SCREENS.has(screen)) {
      return;
    }
    setPaused((prev) => !prev);
  }, [isQaOverride, screen]);

  useEffect(() => {
    if (isQaOverride || paused) {
      return;
    }

    const timeout = AUTO_ADVANCE_MS[screen];
    if (!timeout) {
      return;
    }

    const timer = window.setTimeout(() => {
      goNext();
    }, timeout);

    return () => {
      window.clearTimeout(timer);
    };
  }, [goNext, isQaOverride, paused, screen]);

  const state: FlowState = useMemo(
    () => ({
      screen,
      paused,
      isQaOverride
    }),
    [isQaOverride, paused, screen]
  );

  return {
    state,
    goNext,
    goPrev,
    reset,
    togglePause,
    canPause: AUTO_ADVANCE_SCREENS.has(screen),
    isLastScreen: screen === "reassurance"
  };
}
