import { HeaderBar } from "../components/HeaderBar";
import { ProgressivePrompt } from "../components/ProgressivePrompt";
import { useState } from "react";
import { VoiceControls } from "../components/VoiceControls";
import { assets } from "../data/assets";
import { navigationInfo } from "../data/mockData";
import { AssetImage } from "../components/AssetImage";
import { useI18n } from "../i18n/I18nProvider";
import type { VoiceScreenControls } from "./screenTypes";

type DirectionScreenProps = VoiceScreenControls & {
  onPrimaryAction: () => void;
};

export function DirectionScreen({ onPrimaryAction, ...controls }: DirectionScreenProps) {
  const { t } = useI18n();
  const prompt = t("direction.prompt");
  const [showCard, setShowCard] = useState(false);

  return (
    <section className="screen intake-screen" data-node-id="48:334" aria-label={t("direction.aria")}>
      <HeaderBar title={t("header.direction")} />
      <main className="screen-content flow-content">
        <div className="flow-prompt-slot">
          <ProgressivePrompt
            text={prompt}
            durationMs={1300}
            className="text-subtitle"
            onComplete={() => setShowCard(true)}
          />
        </div>

        {showCard ? (
          <div className="primary-card-position followup-card followup-card-visible">
            <button type="button" className="direction-card" onClick={onPrimaryAction} aria-label={t("direction.openSaveSpotAria")}>
              <div className="map-wrap">
                <AssetImage src={assets.mapImage} alt={t("direction.mapAlt")} className="map-image" imgClassName="fill-image" />
                <span className="map-tag origin">{navigationInfo.originLabel}</span>
                <span className="map-tag home">{t("common.homeLabel")}</span>
              </div>
              <div className="direction-body">
                <div className="direction-copy">
                  <p className="text-body-large">{t("common.ctaDirection")}</p>
                  <p className="text-body">{t("common.eta")}</p>
                  <span className="tag">{t("common.tag.drive8")}</span>
                </div>
                <img src={assets.iconChevron} alt="" className="chevron-icon" />
              </div>
            </button>
          </div>
        ) : null}
      </main>
      <VoiceControls {...controls} />
    </section>
  );
}
