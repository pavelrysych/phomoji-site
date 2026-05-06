"use client";

import Image from "next/image";
import { Sparkles, Heart, Image as ImageIcon, WandSparkles, Cloud, Type } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PrivacySheetContent, TermsSheetContent } from "./LegalSheets";

type Route = "home" | "terms" | "privacy";

const TITLES: Record<Route, string> = {
  home: "Phomoji — Emoji memories that reveal the original photo.",
  terms: "Terms of Service — Phomoji",
  privacy: "Privacy Policy — Phomoji",
};

const steps = [
  {
    title: "See the emoji first",
    text: "Each memory opens as a playful emoji-style version, so the feeling comes before the exact photo.",
    image: "/assets/story/step-child-emoji.png",
  },
  {
    title: "Tap to reveal",
    text: "One tap brings back the original image, turning every reveal into a tiny surprise.",
    image: "/assets/story/step-puppy-emoji.png",
  },
  {
    title: "Rediscover daily",
    text: "A forgotten photo becomes a small emotional time capsule you can enjoy, save or share.",
    image: "/assets/story/step-family-reveal.png",
  },
];

const features = [
  {
    icon: ImageIcon,
    title: "Emoji-first memories",
    text: "Photos appear as soft expressive emoji scenes before the original is shown.",
    image: "/assets/story/feature-emoji-first.png",
  },
  {
    icon: Cloud,
    title: "Cloud characters",
    text: "A lovable Phomoji companion brings mood and personality to the page.",
    image: "/assets/story/feature-cloud-character.png",
  },
  {
    icon: Heart,
    title: "Stickers & emotion",
    text: "Add hearts, rainbows, sparkles and feelings without clutter.",
    image: "/assets/story/feature-stickers-emotion.png",
  },
  {
    icon: WandSparkles,
    title: "Magic effects",
    text: "Gentle AI-style polish that keeps the original memory recognizable.",
    image: "/assets/story/feature-magic-effects.png",
  },
  {
    icon: Type,
    title: "Tap-to-reveal",
    text: "Reveal the real photo only when you are ready to compare it with the emoji version.",
    image: "/assets/story/feature-tap-reveal.png",
  },
  {
    icon: Sparkles,
    title: "Daily surprise",
    text: "A new hidden memory every day, designed for a quick moment of delight.",
    image: "/assets/story/feature-daily-surprise.png",
  },
];

function parseRoute(): Route {
  if (typeof window === "undefined") return "home";
  const raw = (window.location.hash || "#").replace(/^#/, "").replace(/^\//, "") || "";
  if (raw === "terms") return "terms";
  if (raw === "privacy") return "privacy";
  return "home";
}

function closeSheets() {
  window.location.hash = "#/";
}

export function PhomojiLanding() {
  const termsPanelRef = useRef<HTMLDivElement>(null);
  const privacyPanelRef = useRef<HTMLDivElement>(null);
  const [route, setRoute] = useState<Route>("home");

  const applyRoute = useCallback((next: Route) => {
    const termsOpen = next === "terms";
    const privacyOpen = next === "privacy";
    const anyOpen = termsOpen || privacyOpen;

    document.body.classList.toggle("phomoji-sheet-open", anyOpen);
    document.title = TITLES[next] ?? TITLES.home;
    if (next !== "home") window.scrollTo(0, 0);

    const activePanel = termsOpen
      ? termsPanelRef.current
      : privacyOpen
        ? privacyPanelRef.current
        : null;
    if (activePanel) activePanel.scrollTop = 0;
  }, []);

  useEffect(() => {
    const initial = parseRoute();
    setRoute(initial);
    applyRoute(initial);

    const onHash = () => {
      const next = parseRoute();
      setRoute(next);
      applyRoute(next);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [applyRoute]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("phomoji-sheet-open");
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.body.classList.contains("phomoji-sheet-open")) {
        closeSheets();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const termsOpen = route === "terms";
  const privacyOpen = route === "privacy";
  const anyOpen = termsOpen || privacyOpen;

  return (
    <>
      <div className="phomoji-root">
        <main>
          <section className="phomoji-hero" aria-labelledby="phomoji-hero-title">
            <div className="phomoji-hero-glow phomoji-hero-glow--purple" aria-hidden="true" />
            <div className="phomoji-hero-glow phomoji-hero-glow--peach" aria-hidden="true" />

            <div className="phomoji-hero-content">
              <div className="phomoji-hero-copy">
                <a className="phomoji-hero-brand" href="#/" aria-label="Phomoji home">
                  <Image src="/assets/hero/hero-cloud-main.png" alt="" width={536} height={401} priority aria-hidden="true" />
                  <Image
                    className="phomoji-wordmark"
                    src="/assets/brand/phomoji-wordmark-final-provided.png"
                    alt="Phomoji"
                    width={696}
                    height={316}
                    priority
                  />
                </a>

                <h1 id="phomoji-hero-title">
                  <span>Emoji first.</span>
                  <span>Photo on tap.</span>
                </h1>

                <p className="phomoji-hero-lede">
                  Turn your photos into playful emoji covers — tap to reveal the original.
                </p>

                <a className="phomoji-app-store" href="#/" aria-label="Download on the App Store">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M17.05 12.35c-.03-3.02 2.47-4.47 2.58-4.54-1.4-2.05-3.58-2.33-4.35-2.36-1.85-.19-3.61 1.09-4.55 1.09-.94 0-2.39-1.06-3.93-1.03-2.02.03-3.88 1.17-4.92 2.98-2.1 3.65-.54 9.06 1.51 12.02 1 1.45 2.2 3.08 3.77 3.02 1.51-.06 2.08-.98 3.91-.98 1.82 0 2.34.98 3.94.95 1.63-.03 2.66-1.48 3.65-2.93 1.15-1.68 1.62-3.31 1.65-3.39-.04-.02-3.18-1.22-3.26-4.83ZM14.08 3.5c.83-1 1.39-2.4 1.24-3.79-1.2.05-2.65.8-3.51 1.8-.77.89-1.44 2.31-1.26 3.67 1.34.1 2.7-.68 3.53-1.68Z"
                    />
                  </svg>
                  <span>
                    <small>Download on the</small>
                    App Store
                  </span>
                </a>
              </div>

              <div className="phomoji-hero-stage" aria-label="Phomoji app preview">
                <div className="phomoji-phone" aria-hidden="true">
                  <Image src="/assets/hero/hero-phone-toy.png" alt="" width={763} height={1488} priority />
                </div>

                <div className="phomoji-photo-card phomoji-photo-card--emoji" aria-hidden="true">
                  <Image src="/assets/hero/hero-emoji-card.png" alt="" width={437} height={500} priority />
                  <span className="phomoji-tap-badge">
                    <Sparkles size={14} aria-hidden="true" />
                    Tap to reveal
                  </span>
                </div>

                <div className="phomoji-photo-card phomoji-photo-card--photo" aria-hidden="true">
                  <Image src="/assets/hero/hero-photo-card.png" alt="" width={417} height={500} priority />
                </div>

                <div className="phomoji-reveal-arrow" aria-hidden="true">
                  <Image src="/assets/hero/hero-reveal-arrow-glossy.png" alt="" width={420} height={165} />
                </div>

                <button className="phomoji-touch" type="button" aria-label="Reveal photo preview">
                  <Image src="/assets/hero/hero-hand-tap.png" alt="" width={361} height={395} priority aria-hidden="true" />
                </button>

                <span className="phomoji-sticker phomoji-sticker--top" aria-hidden="true">
                  <Image src="/assets/hero/hero-cloud-heart-v2.png" alt="" width={1079} height={821} />
                </span>
                <span className="phomoji-sticker phomoji-sticker--bottom" aria-hidden="true">
                  <Image src="/assets/hero/hero-cloud-star-v2.png" alt="" width={793} height={691} />
                </span>
              </div>

              <Image className="phomoji-cloud-mascot" src="/assets/hero/hero-cloud-main.png" alt="" width={536} height={401} priority aria-hidden="true" />
            </div>
          </section>

          <section id="how-it-works" className="phomoji-section phomoji-section--steps">
            <div className="phomoji-section-heading">
              <p>How it works</p>
              <h2>A small reveal ritual for forgotten photos.</h2>
            </div>
            <div className="phomoji-step-grid">
              {steps.map((step, index) => (
                <article className="phomoji-step-card" key={step.title}>
                  <Image className="phomoji-step-image" src={step.image} alt="" width={333} height={345} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="features" className="phomoji-section">
            <div className="phomoji-section-heading">
              <p>Features</p>
              <h2>Designed around the moment before the reveal.</h2>
            </div>
            <div className="phomoji-feature-grid">
              {features.map(({ icon: Icon, title, text, image }) => (
                <article className="phomoji-feature-card" key={title}>
                  <Image className="phomoji-feature-image" src={image} alt="" width={332} height={343} />
                  <span className="phomoji-feature-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="phomoji-section phomoji-section--preview">
            <div className="phomoji-preview-card">
              <div>
                <p className="phomoji-kicker">Daily memory drop</p>
                <h2>Every day, one hidden photo starts as an emoji.</h2>
                <p>
                  Open Phomoji, meet the emoji version first, then tap when curiosity wins and
                  bring the original memory back.
                </p>
              </div>
              <div className="phomoji-preview-visual" aria-hidden="true">
                <Image src="/assets/story/preview-family-pets.png" alt="" width={384} height={350} />
              </div>
            </div>
          </section>

          <footer className="phomoji-footer">
            <p>Phomoji © 2026. Emoji first, original on tap.</p>
            <nav aria-label="Footer links">
              <a href="#/terms">Terms of Service</a>
              <a href="#/privacy">Privacy Policy</a>
            </nav>
          </footer>
        </main>
      </div>

      <div
        hidden={!anyOpen}
        className={`sheet-backdrop ${anyOpen ? "is-visible" : ""}`}
        id="sheet-backdrop"
        tabIndex={-1}
        aria-hidden={!anyOpen}
        inert={!anyOpen || undefined}
        data-close-sheet
        onClick={() => {
          if (anyOpen) closeSheets();
        }}
      />

      <div
        hidden={!termsOpen}
        className={`legal-sheet ${termsOpen ? "is-open" : ""}`}
        id="sheet-terms"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-title"
        aria-hidden={!termsOpen}
        inert={!termsOpen || undefined}
      >
        <article ref={termsPanelRef} className="legal-panel legal-panel--sheet">
          <button
            type="button"
            className="sheet-close"
            data-nav="home"
            aria-label="Close"
            onClick={(e) => {
              e.preventDefault();
              closeSheets();
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
          <TermsSheetContent />
        </article>
      </div>

      <div
        hidden={!privacyOpen}
        className={`legal-sheet ${privacyOpen ? "is-open" : ""}`}
        id="sheet-privacy"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        aria-hidden={!privacyOpen}
        inert={!privacyOpen || undefined}
      >
        <article ref={privacyPanelRef} className="legal-panel legal-panel--sheet">
          <button
            type="button"
            className="sheet-close"
            data-nav="home"
            aria-label="Close"
            onClick={(e) => {
              e.preventDefault();
              closeSheets();
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
          <PrivacySheetContent />
        </article>
      </div>
    </>
  );
}
