import { HeaderBar } from "../components/HeaderBar";
import { VoiceControls } from "../components/VoiceControls";
import { ProgressivePrompt } from "../components/ProgressivePrompt";
import { AssetImage } from "../components/AssetImage";
import { assets } from "../data/assets";
import { useI18n } from "../i18n/I18nProvider";
import type { VoiceScreenControls } from "./screenTypes";

export function ParkingInfoScreen(props: VoiceScreenControls) {
  const { t } = useI18n();
  const prompt = t("parking.prompt");

  return (
    <section className="screen intake-screen" aria-label={t("parking.aria")}>
      <AssetImage src={assets.gradientIntake} alt="" className="intake-gradient" imgClassName="fill-image" />
      <HeaderBar title={t("header.careFaster")} />
      <main className="screen-content flow-content">
        <div className="flow-prompt-slot">
          <ProgressivePrompt text={prompt} durationMs={1500} className="text-subtitle" />
        </div>

        <article className="confirm-summary-card parking-info-card followup-card followup-card-visible">
          <div className="confirm-summary-row parking-info-row">
            <p className="confirm-summary-label">{t("parking.label.entrance")}</p>
            <p className="confirm-summary-value">{t("parking.value.entrance")}</p>
          </div>

          <div className="confirm-summary-row parking-info-row parking-info-last-row">
            <p className="confirm-summary-label">{t("parking.label.lot")}</p>
            <p className="confirm-summary-value">{t("parking.value.lot")}</p>
          </div>

          <div className="parking-info-tags">
            <span className="tag parking-info-tag">
              <span className="parking-info-tag-icon" aria-hidden="true">
                <img src={assets.iconAccessible} alt="" className="parking-info-tag-icon-img" />
              </span>
              {t("parking.tag.accessible")}
            </span>
            <span className="tag parking-info-tag">
              <span className="parking-info-tag-icon" aria-hidden="true">
                <img src={assets.iconParkingValet} alt="" className="parking-info-tag-icon-img" />
              </span>
              {t("parking.tag.valet")}
            </span>
          </div>
        </article>
      </main>
      <VoiceControls {...props} centerIcon="check" />
    </section>
  );
}
