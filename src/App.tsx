import { useEffect, useMemo, useRef, useState } from "react";
import { useErRouteFlow } from "./hooks/useErRouteFlow";
import { PreloadingScreen } from "./screens/PreloadingScreen";
import { PreIntakeLandingScreen } from "./screens/PreIntakeLandingScreen";
import { IntakeScreen } from "./screens/IntakeScreen";
import { IntakeConfirmScreen } from "./screens/IntakeConfirmScreen";
import { LoadingScreen } from "./screens/LoadingScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { DirectionScreen } from "./screens/DirectionScreen";
import { SaveSpotScreen } from "./screens/SaveSpotScreen";
import { InfoSentScreen } from "./screens/InfoSentScreen";
import { ParkingInfoScreen } from "./screens/ParkingInfoScreen";
import { ReassuranceScreen } from "./screens/ReassuranceScreen";
import { EmergencyFooter } from "./components/EmergencyFooter";
import type { Screen } from "./types";

type ScreenLayer = {
  key: number;
  screen: Screen;
  status: "active" | "entering" | "exiting";
};

type TransitionPair = {
  from: Screen;
  to: Screen;
};

const SCREEN_TRANSITION_MS = 190;

function App() {
  const { state, goNext, goPrev, reset, togglePause } = useErRouteFlow();
  const layerIdRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const [layers, setLayers] = useState<ScreenLayer[]>([{ key: 0, screen: state.screen, status: "active" }]);
  const [transitionPair, setTransitionPair] = useState<TransitionPair | null>(null);

  const controls = useMemo(
    () => ({
      paused: state.paused,
      onInterrupt: togglePause,
      onPrev: goPrev,
      onNext: goNext,
      onReset: reset
    }),
    [goNext, goPrev, reset, state.paused, togglePause]
  );

  useEffect(() => {
    const current = layers[layers.length - 1];
    if (!current || current.screen === state.screen) {
      return;
    }

    const nextKey = layerIdRef.current + 1;
    layerIdRef.current = nextKey;
    setTransitionPair({ from: current.screen, to: state.screen });

    setLayers((prev) => {
      const exiting = prev[prev.length - 1];
      const next: ScreenLayer[] = [];
      if (exiting) {
        next.push({ ...exiting, status: "exiting" });
      }
      next.push({ key: nextKey, screen: state.screen, status: "entering" });
      return next;
    });

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setLayers([{ key: nextKey, screen: state.screen, status: "active" }]);
      setTransitionPair(null);
      timeoutRef.current = null;
    }, SCREEN_TRANSITION_MS);
  }, [layers, state.screen]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const renderScreen = (screen: Screen) => {
    if (screen === "preloading") {
      return <PreloadingScreen />;
    }
    if (screen === "preIntake") {
      return <PreIntakeLandingScreen startVoiceFlow={goNext} startManualFlow={goNext} />;
    }
    if (screen === "intake") {
      return <IntakeScreen {...controls} />;
    }
    if (screen === "intakeConfirm") {
      return <IntakeConfirmScreen {...controls} />;
    }
    if (screen === "loading") {
      return <LoadingScreen />;
    }
    if (screen === "results") {
      return <ResultsScreen {...controls} onPrimaryAction={goNext} onRetryFallback={reset} />;
    }
    if (screen === "direction") {
      return <DirectionScreen {...controls} onPrimaryAction={goNext} />;
    }
    if (screen === "saveSpot") {
      return <SaveSpotScreen {...controls} />;
    }
    if (screen === "infoSent") {
      return <InfoSentScreen {...controls} />;
    }
    if (screen === "parkingInfo") {
      return <ParkingInfoScreen {...controls} />;
    }
    if (screen === "reassurance") {
      return <ReassuranceScreen {...controls} />;
    }
    return <PreloadingScreen />;
  };

  return (
    <div className="app-shell">
      <div className="ios-canvas" data-screen={state.screen}>
        <div
          className="screen-stack"
          aria-live="polite"
          data-transition-from={transitionPair?.from}
          data-transition-to={transitionPair?.to}
        >
          {layers.map((layer) => (
            <div
              key={layer.key}
              className={`screen-layer layer-${layer.status}`}
              data-screen-layer={layer.screen}
              aria-hidden={layer.status === "exiting"}
            >
              {renderScreen(layer.screen)}
            </div>
          ))}
        </div>
        {state.screen !== "preloading" ? <EmergencyFooter /> : null}
      </div>
    </div>
  );
}

export default App;
