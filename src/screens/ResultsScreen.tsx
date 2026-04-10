import { HeaderBar } from "../components/HeaderBar";
import { ProgressivePrompt } from "../components/ProgressivePrompt";
import { useState } from "react";
import { VoiceControls } from "../components/VoiceControls";
import { assets } from "../data/assets";
import { recommendation } from "../data/mockData";
import { AnimatedTimeToTreatment } from "../components/AnimatedTimeToTreatment";
import { useI18n } from "../i18n/I18nProvider";
import type { VoiceScreenControls } from "./screenTypes";

type ResultsScreenProps = VoiceScreenControls & {
  onPrimaryAction: () => void;
  onRetryFallback: () => void;
};

export function ResultsScreen({ onPrimaryAction, onRetryFallback, ...controls }: ResultsScreenProps) {
  const { t } = useI18n();
  const prompt = t("results.prompt");
  const [showCard, setShowCard] = useState(false);

  return (
    <section className="screen intake-screen" data-node-id="48:362" aria-label={t("results.aria")}>
      <HeaderBar title={t("header.careFaster")} />
      <main className="screen-content flow-content">
        <div className="flow-prompt-slot">
          <ProgressivePrompt
            text={prompt}
            durationMs={1200}
            className="text-subtitle"
            onComplete={() => setShowCard(true)}
          />
        </div>

        {showCard
          ? recommendation ? (
              <div className="primary-card-position followup-card followup-card-visible">
                <button type="button" className="results-card" onClick={onPrimaryAction} aria-label={t("results.openDirectionsAria")}>
                  <div className="results-left">
                    <h2 className="results-facility">{recommendation.facilityName}</h2>
                    <div className="results-rating-row">
                      <img src={assets.iconStar} alt="" className="star-icon" />
                      <span className="text-small">{recommendation.rating}</span>
                      <span className="text-small">({recommendation.reviewCount})</span>
                    </div>
                    <p className="text-small address">{recommendation.address}</p>
                    <div className="results-tags">
                      <span className="tag">{t("common.tag.pediatric")}</span>
                      <span className="tag">{t("common.tag.drive8")}</span>
                    </div>
                  </div>
                  <div className="results-right">
                    <p className="text-small text-white">{t("results.timeToTreatment")}</p>
                    <AnimatedTimeToTreatment minutes={recommendation.timeToTreatmentMinutes} />
                    <p className="text-small text-white">{t("results.estimatedWait", { minutes: recommendation.waitMinutes })}</p>
                  </div>
                </button>
              </div>
            ) : (
              <div className="primary-card-position followup-card followup-card-visible">
                <div className="empty-card results-skeleton-card" role="status" aria-live="polite">
                  <div className="results-left">
                    <span className="skeleton-line s-w-80" aria-hidden="true" />
                    <span className="skeleton-line s-w-52" aria-hidden="true" />
                    <span className="skeleton-line s-w-92" aria-hidden="true" />
                    <span className="skeleton-chip" aria-hidden="true" />
                    <p className="text-body">{t("results.emptyFinding")}</p>
                    <button type="button" className="empty-action" onClick={onRetryFallback}>
                      {t("results.retryFromStart")}
                    </button>
                  </div>
                  <div className="results-right">
                    <span className="skeleton-line s-w-66 on-dark" aria-hidden="true" />
                    <span className="skeleton-line s-w-54 on-dark s-tall" aria-hidden="true" />
                    <span className="skeleton-line s-w-74 on-dark" aria-hidden="true" />
                  </div>
                </div>
              </div>
            )
          : null}
      </main>
      <VoiceControls {...controls} centerIcon="check" />
    </section>
  );
}
