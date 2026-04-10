import { useEffect, useRef, useState } from "react";
import { AssetImage } from "../components/AssetImage";
import { assets } from "../data/assets";
import { useI18n } from "../i18n/I18nProvider";

export function LoadingScreen() {
  const { t } = useI18n();
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const cycleTimer = window.setInterval(() => {
      setShowSuccess(true);

      successTimeoutRef.current = window.setTimeout(() => {
        setShowSuccess(false);
      }, 520);
    }, 1380);

    return () => {
      window.clearInterval(cycleTimer);
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="screen loading-screen" data-node-id="48:321" aria-label={t("loading.aria")}>
      <AssetImage src={assets.loadingShapeTop} alt="" className="shape shape-top" imgClassName="fill-image" />
      <AssetImage
        src={assets.loadingShapeBottomLeft}
        alt=""
        className="shape shape-bottom-left"
        imgClassName="fill-image"
      />
      <AssetImage
        src={assets.loadingShapeBottomRight}
        alt=""
        className="shape shape-bottom-right"
        imgClassName="fill-image"
      />
      <div className="loading-status" aria-live="polite">
        <div className={`loading-indicator ${showSuccess ? "is-success" : "is-loading"}`} aria-hidden="true">
          <span className="loading-ring" />
          <span className="loading-check">✓</span>
        </div>
        <p className="loading-copy-static text-heading text-white">
          {t("loading.copy")}
        </p>
      </div>
    </section>
  );
}
