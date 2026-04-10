import { useEffect, useState } from "react";
import { HeaderBar } from "../components/HeaderBar";
import { ProgressivePrompt } from "../components/ProgressivePrompt";
import { VoiceControls } from "../components/VoiceControls";
import { assets } from "../data/assets";
import { AssetImage } from "../components/AssetImage";
import { useI18n } from "../i18n/I18nProvider";
import type { VoiceScreenControls } from "./screenTypes";

export function SaveSpotScreen(props: VoiceScreenControls) {
  const { t } = useI18n();
  const saveSpotPrompts = [t("saveSpot.prompt.intro"), t("saveSpot.prompt.q1"), t("saveSpot.prompt.q2")];
  const saveSpotAnswers = ["", t("saveSpot.answer.q1"), t("saveSpot.answer.q2")];

  const [stepIndex, setStepIndex] = useState(0);
  const [showListening, setShowListening] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerComplete, setAnswerComplete] = useState(false);
  const [inputMode, setInputMode] = useState<"voice" | "type">("voice");
  const [typedResponses, setTypedResponses] = useState<Record<number, string>>({});
  const isLastStep = stepIndex >= saveSpotPrompts.length - 1;

  useEffect(() => {
    setShowListening(false);
    setShowAnswer(false);
    setAnswerComplete(false);
  }, [stepIndex]);

  const handleNext = () => {
    if (stepIndex >= 1) {
      if (inputMode === "type") {
        const currentTyped = (typedResponses[stepIndex] ?? "").trim();
        if (!currentTyped) {
          return;
        }

        if (isLastStep) {
          props.onNext();
          return;
        }

        setStepIndex((current) => Math.min(current + 1, saveSpotPrompts.length - 1));
        return;
      }

      if (!showListening) {
        return;
      }

      if (!showAnswer) {
        setShowAnswer(true);
        return;
      }

      if (!answerComplete) {
        return;
      }
    }

    if (isLastStep) {
      props.onNext();
      return;
    }

    setStepIndex((current) => Math.min(current + 1, saveSpotPrompts.length - 1));
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex((current) => Math.max(current - 1, 0));
      return;
    }

    props.onPrev();
  };

  const handleReset = () => {
    setStepIndex(0);
    props.onReset();
  };

  return (
    <section className="screen intake-screen" data-node-id="54:1165" aria-label={t("saveSpot.aria")}>
      <AssetImage src={assets.gradientSaveSpot} alt="" className="save-spot-gradient" imgClassName="fill-image" />
      <HeaderBar title={t("header.saveSpot")} />
      <main className="screen-content flow-content">
        <div className="flow-prompt-slot">
          <ProgressivePrompt
            key={`save-spot-prompt-${stepIndex}`}
            text={saveSpotPrompts[stepIndex]}
            durationMs={1900}
            className="text-subtitle preserve-lines"
            onComplete={() => {
              if (stepIndex >= 1) {
                setShowListening(true);
              }
            }}
          />
        </div>
        {stepIndex >= 1 && showListening ? (
          <section className="listening-card followup-card followup-card-visible" aria-live="polite">
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
                showAnswer ? (
                  <ProgressivePrompt
                    key={`save-spot-answer-${stepIndex}`}
                    text={saveSpotAnswers[stepIndex]}
                    durationMs={stepIndex === 1 ? 3200 : 1600}
                    initialDelayMs={160}
                    cadence="transcript"
                    className="text-body quote-text"
                    onComplete={() => setAnswerComplete(true)}
                  />
                ) : (
                  <div className="listening-input-space" aria-label={t("intake.readyAria")} />
                )
              ) : (
                <div className="typing-mode-content">
                  <textarea
                    className="typing-input"
                    value={typedResponses[stepIndex] ?? ""}
                    onChange={(event) =>
                      setTypedResponses((current) => ({
                        ...current,
                        [stepIndex]: event.target.value
                      }))
                    }
                    placeholder={t("saveSpot.typePlaceholder")}
                  />
                  <button
                    type="button"
                    className="typing-continue-btn"
                    onClick={handleNext}
                    disabled={(typedResponses[stepIndex] ?? "").trim().length === 0}
                  >
                    {t("intake.continue")}
                  </button>
                </div>
              )}
            </div>
          </section>
        ) : null}
        {stepIndex >= 1 && showListening ? (
          <button
            type="button"
            className="input-mode-toggle input-mode-toggle-below"
            onClick={() => {
              setInputMode((current) => (current === "voice" ? "type" : "voice"));
              setShowAnswer(false);
              setAnswerComplete(false);
            }}
          >
            {inputMode === "voice" ? t("intake.useKeyboard") : t("intake.useVoice")}
          </button>
        ) : null}
      </main>
      <VoiceControls {...props} onPrev={handlePrev} onNext={handleNext} onReset={handleReset} centerIcon="check" />
    </section>
  );
}
