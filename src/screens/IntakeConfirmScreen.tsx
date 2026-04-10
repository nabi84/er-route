import { HeaderBar } from "../components/HeaderBar";
import { ProgressivePrompt } from "../components/ProgressivePrompt";
import { useState } from "react";
import { VoiceControls } from "../components/VoiceControls";
import { useI18n } from "../i18n/I18nProvider";
import type { VoiceScreenControls } from "./screenTypes";

export function IntakeConfirmScreen(props: VoiceScreenControls) {
  const { t } = useI18n();
  const prompt = t("intakeConfirm.prompt");
  const [showCard, setShowCard] = useState(false);

  return (
    <section className="screen intake-screen" data-node-id="48:563" aria-label={t("intakeConfirm.aria")}>
      <HeaderBar title={t("header.careFaster")} />
      <main className="screen-content flow-content">
        <div className="flow-prompt-slot">
          <ProgressivePrompt
            text={prompt}
            durationMs={1400}
            className="text-subtitle"
            onComplete={() => setShowCard(true)}
          />
        </div>

        {showCard ? (
          <article className="confirm-summary-card intake-confirm-card followup-card followup-card-visible">
            <div className="confirm-summary-row">
              <p className="confirm-summary-label">{t("intakeConfirm.label.visitFor")}</p>
              <p className="confirm-summary-value">{t("common.visitType.child")}</p>
            </div>
            <div className="confirm-summary-row">
              <p className="confirm-summary-label">{t("intakeConfirm.label.symptom")}</p>
              <p className="confirm-summary-value">{t("common.symptom.fever")}</p>
            </div>
            <div className="confirm-summary-row">
              <p className="confirm-summary-label">{t("intakeConfirm.label.location")}</p>
              <p className="confirm-summary-value">{t("common.location.apopka")}</p>
            </div>
          </article>
        ) : null}
      </main>
      <VoiceControls {...props} centerIcon="check" />
    </section>
  );
}
