import { useState } from "react";
import { assets } from "../data/assets";
import { useI18n } from "../i18n/I18nProvider";

type VoiceControlsProps = {
  paused: boolean;
  onInterrupt: () => void;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
  className?: string;
  centerIcon?: "mic" | "stop" | "check";
};

export function VoiceControls({
  paused,
  onInterrupt,
  onPrev,
  onNext,
  onReset,
  className,
  centerIcon = "stop"
}: VoiceControlsProps) {
  const { t } = useI18n();
  const [burstKey, setBurstKey] = useState(0);
  const [hapticKey, setHapticKey] = useState(0);
  const voiceState = paused ? "idle" : centerIcon === "mic" ? "listening" : "processing";
  const nextActionAria = centerIcon === "mic" ? t("voice.nextAria") : t("voice.nextStepAria");

  const handleNext = () => {
    setBurstKey((value) => value + 1);
    if (centerIcon === "mic") {
      setHapticKey((value) => value + 1);
    }
    onNext();
  };

  return (
    <section className={`voice-controls ${className ?? ""}`} data-paused={paused}>
      <button type="button" className="interrupt-text" onClick={onInterrupt}>
        {paused ? t("voice.pausedResume") : t("voice.tapInterrupt")}
      </button>
      <div className="voice-pill" data-voice-state={voiceState} role="group" aria-label={t("voice.controlsAria")}>
        <div className="voice-pill-main">
          <button type="button" className="control-btn light" aria-label={t("voice.prevAria")} onClick={onPrev}>
            <span className="control-glyph">+</span>
          </button>
          <div className={`center-control ${paused ? "is-paused" : "is-listening"}`}>
            <span key={`burst-${burstKey}`} className="control-burst" aria-hidden="true" />
            {centerIcon === "mic" ? <span key={`haptic-${hapticKey}`} className="control-haptic" aria-hidden="true" /> : null}
            <button type="button" className="control-btn dark mic-btn" aria-label={nextActionAria} onClick={handleNext}>
              {centerIcon === "check" ? (
                <span className="center-control-check" aria-hidden="true">
                  ✓
                </span>
              ) : (
                <img
                  src={centerIcon === "mic" ? assets.iconMicControl : assets.iconStopControl}
                  alt=""
                  className="center-control-icon"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
          <button type="button" className="control-btn light" aria-label={t("voice.resetAria")} onClick={onReset}>
            <span className="control-glyph">×</span>
          </button>
        </div>
      </div>
    </section>
  );
}
