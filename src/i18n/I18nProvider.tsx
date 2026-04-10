import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { messages, type Language } from "./messages";

const STORAGE_KEY = "er-route-language";

type TranslateVars = Record<string, string | number>;

type I18nContextValue = {
  language: Language;
  setLanguage: (next: Language) => void;
  t: (key: string, vars?: TranslateVars) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "es" || stored === "ko" || stored === "fr" || stored === "ja") {
    return stored;
  }

  const locale = window.navigator.language.toLowerCase();
  if (locale.startsWith("ko")) {
    return "ko";
  }
  if (locale.startsWith("fr")) {
    return "fr";
  }
  if (locale.startsWith("ja")) {
    return "ja";
  }
  return locale.startsWith("es") ? "es" : "en";
}

function interpolate(template: string, vars?: TranslateVars): string {
  if (!vars) {
    return template;
  }

  return template.replace(/\{\{(\w+)\}\}/g, (_, token: string) => {
    const value = vars[token];
    return value === undefined ? "" : String(value);
  });
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
  }, []);

  const t = useCallback(
    (key: string, vars?: TranslateVars): string => {
      const template = messages[language][key] ?? messages.en[key] ?? key;
      return interpolate(template, vars);
    },
    [language]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t
    }),
    [language, setLanguage, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
