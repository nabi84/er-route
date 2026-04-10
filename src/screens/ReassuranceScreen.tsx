import { HeaderBar } from "../components/HeaderBar";
import { VoiceControls } from "../components/VoiceControls";
import { ProgressivePrompt } from "../components/ProgressivePrompt";
import { AssetImage } from "../components/AssetImage";
import { assets } from "../data/assets";
import { recommendation } from "../data/mockData";
import { useI18n } from "../i18n/I18nProvider";
import type { VoiceScreenControls } from "./screenTypes";

export function ReassuranceScreen(props: VoiceScreenControls) {
  const { t } = useI18n();
  const prompt = t("reassurance.prompt");

  return (
    <section className="screen intake-screen" aria-label={t("reassurance.aria")}>
      <AssetImage src={assets.gradientSaveSpot} alt="" className="save-spot-gradient" imgClassName="fill-image" />
      <HeaderBar title={t("header.saveSpot")} />
      <main className="screen-content flow-content">
        <div className="flow-prompt-slot">
          <ProgressivePrompt text={prompt} durationMs={1600} className="text-subtitle" />
        </div>

        <article className="confirm-summary-card reassurance-card followup-card followup-card-visible">
          <h2 className="reassurance-facility">{recommendation?.facilityName ?? "AdventHealth Apopka ER"}</h2>

          <div className="reassurance-rating-row">
            <img src={assets.iconStar} alt="" className="star-icon" aria-hidden="true" />
            <span className="reassurance-rating-text">
              {recommendation?.rating ?? 4.5} ({recommendation?.reviewCount ?? 57})
            </span>
          </div>

          <p className="reassurance-address">{recommendation?.address ?? "2100 Ocoee Apopka Rd, Apopka, FL 32703"}</p>

          <div className="reassurance-tags">
            <span className="tag">{t("common.tag.pediatric")}</span>
            <span className="tag">{t("common.tag.drive8")}</span>
          </div>

          <div className="reassurance-divider" />

          <div className="reassurance-metrics">
            <div className="reassurance-metric-column">
              <p className="confirm-summary-label">{t("reassurance.label.timeToTreatment")}</p>
              <p className="reassurance-metric-value">{recommendation?.timeToTreatmentMinutes ?? 23} min</p>
            </div>
            <div className="reassurance-metric-column">
              <p className="confirm-summary-label">{t("reassurance.label.estimatedWait")}</p>
              <p className="reassurance-metric-value">~{recommendation?.waitMinutes ?? 18} min</p>
            </div>
          </div>

          <div className="reassurance-divider" />

          <div className="confirm-summary-row reassurance-summary-row">
            <p className="confirm-summary-label">{t("reassurance.label.patient")}</p>
            <p className="confirm-summary-value reassurance-summary-value">{t("reassurance.value.patient")}</p>
          </div>
          <div className="confirm-summary-row reassurance-summary-row">
            <p className="confirm-summary-label">{t("reassurance.label.symptom")}</p>
            <p className="confirm-summary-value reassurance-summary-value">{t("reassurance.value.symptom")}</p>
          </div>
        </article>
      </main>
      <VoiceControls {...props} centerIcon="check" className="voice-controls--center-only" />
    </section>
  );
}
