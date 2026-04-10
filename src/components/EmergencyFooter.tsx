import { useEffect, useState } from "react";
import { useI18n } from "../i18n/I18nProvider";

export function EmergencyFooter() {
  const { t } = useI18n();
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const emergencyConditions = [
    t("emergency.sign1"),
    t("emergency.sign2"),
    t("emergency.sign3"),
    t("emergency.sign4"),
    t("emergency.sign5"),
    t("emergency.sign6")
  ];

  useEffect(() => {
    if (!showEmergencyDialog) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowEmergencyDialog(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showEmergencyDialog]);

  return (
    <>
      <footer className="emergency-footer" role="contentinfo" aria-label={t("emergency.text")}>
        <p className="emergency-copy">
          {t("emergency.prefix")}{" "}
          <button
            type="button"
            className="emergency-inline-link"
            onClick={() => setShowEmergencyDialog(true)}
            aria-label={t("emergency.linkLabel")}
          >
            {t("emergency.linkLabel")}
          </button>
          .
        </p>
        <a className="emergency-call-btn" href="tel:911" aria-label={t("emergency.cta")}>
          {t("emergency.cta")}
        </a>
      </footer>

      {showEmergencyDialog ? (
        <div className="emergency-dialog-backdrop" role="presentation" onClick={() => setShowEmergencyDialog(false)}>
          <div
            className="emergency-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={t("emergency.dialogTitle")}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="emergency-dialog-close"
              onClick={() => setShowEmergencyDialog(false)}
              aria-label={t("emergency.close")}
            >
              ×
            </button>
            <h3 className="emergency-dialog-title">{t("emergency.dialogTitle")}</h3>
            <p className="emergency-dialog-copy">
              <span>{t("emergency.dialogIntro")}</span>
              <span className="emergency-dialog-copy-break">{t("emergency.commonSigns")}</span>
            </p>
            <ul className="emergency-list">
              {emergencyConditions.map((item) => (
                <li key={item} className="emergency-list-item">
                  {item}
                </li>
              ))}
            </ul>
            <p className="emergency-dialog-footnote">
              <span className="emergency-dialog-footnote-strong">{t("emergency.footnoteStrong")}</span>
              <span className="emergency-dialog-copy-break">{t("emergency.footnoteSupport")}</span>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
