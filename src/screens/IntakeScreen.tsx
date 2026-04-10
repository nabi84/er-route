import { useState } from "react";
import { HeaderBar } from "../components/HeaderBar";
import { VoiceControls } from "../components/VoiceControls";
import { assets } from "../data/assets";
import { AssetImage } from "../components/AssetImage";
import { ProgressivePrompt } from "../components/ProgressivePrompt";
import { useI18n } from "../i18n/I18nProvider";
import type { VoiceScreenControls } from "./screenTypes";

export function IntakeScreen(props: VoiceScreenControls) {
  const { t } = useI18n();
  const prompt = t("intake.prompt");
  const [showCard, setShowCard] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [inputMode, setInputMode] = useState<"voice" | "type">("voice");
  const [typedInput, setTypedInput] = useState("");

  const handleMicAction = () => {
    if (inputMode === "type") {
      if (typedInput.trim().length > 0) {
        props.onNext();
      }
      return;
    }

    if (!showCard) {
      return;
    }

    if (!showTranscript) {
      setShowTranscript(true);
      return;
    }

    props.onNext();
  };

  return (
    <section className="screen intake-screen" data-node-id="48:97" aria-label={t("intake.aria")}>
      <AssetImage src={assets.gradientIntake} alt="" className="intake-gradient" imgClassName="fill-image" />
      <HeaderBar title={t("header.careFaster")} />
      <main className="screen-content flow-content">
        <div className="flow-prompt-slot">
          <ProgressivePrompt
            text={prompt}
            durationMs={1850}
            className="text-subtitle"
            onComplete={() => setShowCard(true)}
          />
        </div>

        {showCard ? (
          <section className={`listening-card followup-card followup-card-visible ${inputMode === "type" ? "typing-card" : ""}`} aria-live="polite">
            {inputMode === "voice" ? (
              <div className="listening-row">
                <p className="listening-label">{t("intake.listening")}</p>
                <div className="voice-bars" aria-hidden="true">
                  <span className="voice-bar bar-1" />
                  <span className="voice-bar bar-2" />
                  <span className="voice-bar bar-3" />
                  <span className="voice-bar bar-4" />
                  <span className="voice-bar bar-5" />
                </div>
              </div>
            ) : null}
            <div className="listening-response">
              {inputMode === "voice" ? (
                showTranscript ? (
                  <ProgressivePrompt
                    text={t("intake.transcript")}
                    durationMs={2600}
                    initialDelayMs={240}
                    cadence="transcript"
                    className="text-body quote-text"
                  />
                ) : (
                  <div className="listening-input-space" aria-label={t("intake.readyAria")} />
                )
              ) : (
                <div className="typing-mode-content">
                  <textarea
                    className="typing-input"
                    value={typedInput}
                    onChange={(event) => setTypedInput(event.target.value)}
                    placeholder={t("intake.typePlaceholder")}
                  />
                  <button
                    type="button"
                    className="typing-continue-btn"
                    onClick={() => props.onNext()}
                    disabled={typedInput.trim().length === 0}
                  >
                    {t("intake.continue")}
                  </button>
                </div>
              )}
            </div>
          </section>
        ) : null}
        {showCard ? (
          <button
            type="button"
            className="input-mode-toggle input-mode-toggle-below"
            onClick={() => {
              setInputMode((current) => (current === "voice" ? "type" : "voice"));
              setShowTranscript(false);
            }}
          >
            {inputMode === "voice" ? t("intake.useKeyboard") : t("intake.useVoice")}
          </button>
        ) : null}
      </main>
      <VoiceControls {...props} onNext={handleMicAction} centerIcon={inputMode === "type" ? "check" : "mic"} />
    </section>
  );
}
