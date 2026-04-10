import { assets } from "../data/assets";
import { Logo } from "../components/Logo";
import { AssetImage } from "../components/AssetImage";
import { useI18n } from "../i18n/I18nProvider";

export function PreloadingScreen() {
  const { t } = useI18n();

  return (
    <section className="screen preloading-screen" data-node-id="48:329" aria-label={t("preloading.aria")}>
      <AssetImage src={assets.gradientPreload} alt="" className="preload-gradient" imgClassName="fill-image" />
      <div className="preload-logo-wrap">
        <Logo stacked className="preload-logo" />
      </div>
      <div className="preload-progress" aria-hidden="true">
        <span className="preload-progress-fill" />
      </div>
    </section>
  );
}
