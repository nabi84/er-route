import { HeaderBar } from "../components/HeaderBar";
import { VoiceControls } from "../components/VoiceControls";
import { ProgressivePrompt } from "../components/ProgressivePrompt";
import { AssetImage } from "../components/AssetImage";
import { assets } from "../data/assets";
import { useI18n } from "../i18n/I18nProvider";
import type { VoiceScreenControls } from "./screenTypes";

export function InfoSentScreen(props: VoiceScreenControls) {
  const { t } = useI18n();
  const prompt = t("infoSent.prompt");

  return (
    <section className="screen intake-screen" aria-label={t("infoSent.aria")}>
      <AssetImage src={assets.gradientIntake} alt="" className="intake-gradient" imgClassName="fill-image" />
      <HeaderBar title={t("header.saveSpot")} />
      <main className="screen-content flow-content">
        <div className="flow-prompt-slot">
          <ProgressivePrompt text={prompt} durationMs={1500} className="text-subtitle" />
        </div>

        <article className="confirm-summary-card info-sent-card followup-card followup-card-visible">
          <div className="confirm-summary-row">
            <p className="confirm-summary-label">{t("infoSent.label.patient")}</p>
            <p className="confirm-summary-value">{t("infoSent.value.patient")}</p>
          </div>
          <div className="confirm-summary-row">
            <p className="confirm-summary-label">{t("intakeConfirm.label.symptom")}</p>
            <p className="confirm-summary-value">{t("infoSent.value.symptom")}</p>
          </div>
          <div className="confirm-summary-row info-sent-last-row">
            <p className="confirm-summary-label">{t("infoSent.label.eta")}</p>
            <p className="confirm-summary-value">{t("infoSent.value.eta")}</p>
          </div>

          <div className="tag info-sent-tag" aria-label={t("infoSent.tag.sentAt")}>
            <span className="info-sent-tag-icon" aria-hidden="true">☑</span>
            <span>{t("infoSent.tag.sentAt")}</span>
          </div>
        </article>
      </main>
      <VoiceControls {...props} centerIcon="check" />
    </section>
  );
}
