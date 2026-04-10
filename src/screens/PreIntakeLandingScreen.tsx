import { useEffect, useMemo, useRef, useState } from "react";
import { assets } from "../data/assets";
import { navigationInfo } from "../data/mockData";
import { AssetImage } from "../components/AssetImage";
import { AnimatedTimeToTreatment } from "../components/AnimatedTimeToTreatment";
import { useI18n } from "../i18n/I18nProvider";
import { LanguageMenuButton } from "../components/LanguageMenuButton";

type PreIntakeLandingScreenProps = {
  startVoiceFlow: () => void;
  startManualFlow: () => void;
};

export function PreIntakeLandingScreen({ startVoiceFlow }: PreIntakeLandingScreenProps) {
  const { t } = useI18n();
  const [visibleReveals, setVisibleReveals] = useState<Record<string, boolean>>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const revealRefs = useRef<Record<string, HTMLElement | null>>({});
  const revealOrder = useMemo(
    () => ["preview-photo", "preview-time", "preview-direction", "testimonials", "faq", "footer"],
    []
  );
  const faqItems = useMemo(
    () => [
      {
        q: t("landing.faq.q1"),
        a: t("landing.faq.a1")
      },
      {
        q: t("landing.faq.q2"),
        a: t("landing.faq.a2"),
        bullets: [t("landing.faq.a2.b1"), t("landing.faq.a2.b2"), t("landing.faq.a2.b3")],
        after: t("landing.faq.a2.after")
      },
      {
        q: t("landing.faq.q3"),
        a: t("landing.faq.a3")
      },
      {
        q: t("landing.faq.q4"),
        a: t("landing.faq.a4")
      },
      {
        q: t("landing.faq.q5"),
        a: t("landing.faq.a5"),
        bullets: [t("landing.faq.a5.b1"), t("landing.faq.a5.b2"), t("landing.faq.a5.b3")]
      }
    ],
    [t]
  );
  const testimonialItems = useMemo(
    () => [
      {
        quote: t("landing.testimonials.quote1"),
        name: "Greg Dickson",
        photo: "/assets/testimonials/greg-dickson.avif"
      },
      {
        quote: t("landing.testimonials.quote2"),
        name: "Rahul Vohra",
        photo: "/assets/testimonials/rahul-vohra.avif"
      },
      {
        quote: t("landing.testimonials.quote3"),
        name: "Rich Pankey",
        photo: "/assets/testimonials/rich-pankey.avif"
      },
      {
        quote: t("landing.testimonials.quote4"),
        name: "Shashank Vemuri",
        photo: "/assets/testimonials/shashank-vemuri.avif"
      },
      {
        quote: t("landing.testimonials.quote5"),
        name: "Tara Tan",
        photo: "/assets/testimonials/tara-tan.avif"
      }
    ],
    [t]
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setVisibleReveals(
        revealOrder.reduce<Record<string, boolean>>((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const key = (entry.target as HTMLElement).dataset.revealKey;
          if (!key) {
            return;
          }

          setVisibleReveals((current) => ({ ...current, [key]: true }));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.24, rootMargin: "0px 0px -4% 0px" }
    );

    revealOrder.forEach((key) => {
      const node = revealRefs.current[key];
      if (!node) {
        return;
      }
      observer.observe(node);
    });

    return () => {
      observer.disconnect();
    };
  }, [revealOrder]);

  const revealClass = (key: string) => `scroll-reveal ${visibleReveals[key] ? "is-visible" : ""}`.trim();

  return (
    <section className="screen intake-screen pre-intake-screen" aria-label={t("preIntake.aria")}>
      <AssetImage src={assets.gradientSaveSpot} alt="" className="pre-intake-gradient" imgClassName="fill-image" />
      <main className="pre-intake-wrap">
        <div className="pre-intake-top">
          <div className="pre-intake-brand">
            <img src={assets.logoSymbol} alt={t("common.appName")} className="pre-intake-brand-logo" />
            <p className="pre-intake-brand-name">{t("common.appName")}</p>
          </div>
          <LanguageMenuButton className="pre-intake-language" />
        </div>

        <div className="pre-intake-copy">
          <h1 className="pre-intake-heading">{t("preIntake.heading")}</h1>
          <p className="pre-intake-subtext">{t("preIntake.subtext")}</p>
        </div>

        <div className="pre-intake-actions">
          <button type="button" onClick={startVoiceFlow} className="pre-intake-btn pre-intake-btn-primary">
            {t("preIntake.cta")}
          </button>
        </div>

        <ul className="pre-intake-benefits" aria-label={t("preIntake.benefitsAria")}>
          <li className="pre-intake-benefit-item">
            <span className="pre-intake-benefit-check" aria-hidden="true">✓</span>
            <span>{t("preIntake.benefit1")}</span>
          </li>
          <li className="pre-intake-benefit-item">
            <span className="pre-intake-benefit-check" aria-hidden="true">✓</span>
            <span>{t("preIntake.benefit2")}</span>
          </li>
          <li className="pre-intake-benefit-item">
            <span className="pre-intake-benefit-check" aria-hidden="true">✓</span>
            <span>{t("preIntake.benefit3")}</span>
          </li>
        </ul>

        <section className="pre-intake-preview" aria-hidden="true">
          <AssetImage src={assets.gradientSaveSpot} alt="" className="pre-intake-preview-gradient" imgClassName="fill-image" />

          <article
            className={`pre-intake-photo-card ${revealClass("preview-photo")}`}
            data-reveal-key="preview-photo"
            ref={(node) => {
              revealRefs.current["preview-photo"] = node;
            }}
          >
            <AssetImage src="/assets/landing-card.png" alt="" className="pre-intake-photo-image" imgClassName="fill-image" />
          </article>

          <div className="pre-intake-connector pre-intake-connector-top">
            <span className="pre-intake-connector-dot" />
            <span className="pre-intake-connector-line" />
            <span className="pre-intake-connector-dot" />
          </div>

          <article
            className={`pre-intake-time-card ${revealClass("preview-time")}`}
            data-reveal-key="preview-time"
            ref={(node) => {
              revealRefs.current["preview-time"] = node;
            }}
          >
            <div className="pre-intake-time-copy">
              <p className="text-small text-white">{t("preIntake.timeToTreatment")}</p>
              {visibleReveals["preview-time"] ? (
                <AnimatedTimeToTreatment minutes={24} mode="down" startMinutes={28} durationMs={1600} />
              ) : (
                <p className="time-gradient is-settled">24 min</p>
              )}
              <p className="text-small text-white">{t("preIntake.estimatedWait14")}</p>
            </div>
          </article>

          <div className="pre-intake-connector pre-intake-connector-bottom">
            <span className="pre-intake-connector-dot" />
            <span className="pre-intake-connector-line" />
            <span className="pre-intake-connector-dot" />
          </div>

          <article
            className={`pre-intake-direction-preview pre-intake-direction-preview-landing ${revealClass("preview-direction")}`}
            data-reveal-key="preview-direction"
            ref={(node) => {
              revealRefs.current["preview-direction"] = node;
            }}
          >
            <div className="pre-intake-map-wrap">
              <AssetImage src={assets.mapImage} alt="" className="pre-intake-map-image" imgClassName="fill-image" />
              <span className="map-tag origin">{navigationInfo.originLabel}</span>
              <span className="map-tag home">{t("common.homeLabel")}</span>
            </div>
            <div className="pre-intake-direction-body">
              <p className="pre-intake-direction-title">{t("common.ctaDirection")}</p>
              <p className="text-body">{t("common.eta")}</p>
              <span className="tag">{t("common.tag.drive8")}</span>
              <img src={assets.iconChevron} alt="" className="pre-intake-chevron" />
            </div>
          </article>
        </section>

        <section
          className={`pre-intake-testimonials ${revealClass("testimonials")}`}
          data-reveal-key="testimonials"
          ref={(node) => {
            revealRefs.current.testimonials = node;
          }}
          aria-label="Testimonials"
        >
          <h2 className="pre-intake-section-title">{t("landing.testimonials.title")}</h2>
          <div className="pre-intake-testimonials-viewport">
            <div className="pre-intake-testimonials-track">
              {[...testimonialItems, ...testimonialItems].map((item, index) => {
                const isClone = index >= testimonialItems.length;
                return (
                  <article className="pre-intake-quote-card pre-intake-quote-card-slide" key={`${index}-${item.name}`} aria-hidden={isClone}>
                    <img src={item.photo} alt="" className="pre-intake-quote-avatar-image" />
                    <p className="pre-intake-quote-text">{item.quote}</p>
                    <p className="pre-intake-quote-meta">{item.name}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className={`pre-intake-faq ${revealClass("faq")}`}
          data-reveal-key="faq"
          ref={(node) => {
            revealRefs.current.faq = node;
          }}
          aria-label={t("landing.faq.title")}
        >
          <h2 className="pre-intake-section-title">{t("landing.faq.title")}</h2>
          {faqItems.map((item, index) => {
            const isOpen = openFaqIndex === index;
            const triggerId = `pre-intake-faq-trigger-${index}`;
            const panelId = `pre-intake-faq-panel-${index}`;
            return (
              <article className={`pre-intake-faq-item ${isOpen ? "is-open" : ""}`} key={item.q}>
                <button
                  id={triggerId}
                  type="button"
                  className="pre-intake-faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenFaqIndex((current) => (current === index ? null : index))}
                >
                  <h3 className="pre-intake-faq-question">{item.q}</h3>
                  <span className="pre-intake-faq-icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen ? (
                  <div className="pre-intake-faq-answer-wrap" id={panelId} role="region" aria-labelledby={triggerId}>
                    <p className="pre-intake-faq-answer">{item.a}</p>
                    {item.bullets ? (
                      <ul className="pre-intake-faq-bullets">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                    {item.after ? <p className="pre-intake-faq-answer">{item.after}</p> : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </section>

        <footer
          className={`pre-intake-footer ${revealClass("footer")}`}
          data-reveal-key="footer"
          ref={(node) => {
            revealRefs.current.footer = node;
          }}
          aria-label={t("landing.footer.aria")}
        >
          <p className="pre-intake-footer-brand">{t("landing.footer.brand")}</p>
          <p className="pre-intake-footer-copy">{t("landing.footer.copy")}</p>
          <div className="pre-intake-footer-links">
            <span>{t("landing.footer.privacy")}</span>
            <span>{t("landing.footer.terms")}</span>
            <span>{t("landing.footer.contact")}</span>
          </div>
        </footer>
      </main>
    </section>
  );
}
