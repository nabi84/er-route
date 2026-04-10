import { useEffect, useRef, useState } from "react";
import { assets } from "../data/assets";
import { useI18n } from "../i18n/I18nProvider";
import type { Language } from "../i18n/messages";

type LanguageMenuButtonProps = {
  className?: string;
};

export function LanguageMenuButton({ className }: LanguageMenuButtonProps) {
  const { language, setLanguage, t } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  const chooseLanguage = (next: Language) => {
    setLanguage(next);
    setOpen(false);
  };

  return (
    <div className="language-menu" ref={wrapperRef}>
      <button
        type="button"
        className={`language-chip ${className ?? ""}`.trim()}
        aria-label={t("common.languageOptions")}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <img src={assets.iconLanguage} alt="" className="language-icon" />
      </button>

      {open ? (
        <div className="language-menu-popover" role="menu" aria-label={t("common.languageOptions")}>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={language === "en"}
            className={`language-menu-item ${language === "en" ? "is-active" : ""}`.trim()}
            onClick={() => chooseLanguage("en")}
          >
            {t("common.language.english")}
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={language === "es"}
            className={`language-menu-item ${language === "es" ? "is-active" : ""}`.trim()}
            onClick={() => chooseLanguage("es")}
          >
            {t("common.language.spanish")}
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={language === "ko"}
            className={`language-menu-item ${language === "ko" ? "is-active" : ""}`.trim()}
            onClick={() => chooseLanguage("ko")}
          >
            {t("common.language.korean")}
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={language === "fr"}
            className={`language-menu-item ${language === "fr" ? "is-active" : ""}`.trim()}
            onClick={() => chooseLanguage("fr")}
          >
            {t("common.language.french")}
          </button>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={language === "ja"}
            className={`language-menu-item ${language === "ja" ? "is-active" : ""}`.trim()}
            onClick={() => chooseLanguage("ja")}
          >
            {t("common.language.japanese")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
