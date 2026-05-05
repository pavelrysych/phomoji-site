"use client";

import Image from "next/image";
import { Sparkles, Heart, Image as ImageIcon, WandSparkles, Cloud, Type } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PrivacySheetContent, TermsSheetContent } from "./LegalSheets";

type Route = "home" | "terms" | "privacy";

const TITLES: Record<Route, string> = {
  home: "Phomoji — Turn photos into expressive emoji magic.",
  terms: "Terms of Service — Phomoji",
  privacy: "Privacy Policy — Phomoji",
};

const steps = [
  {
    title: "Pick a memory",
    text: "Start with a photo from your camera roll or let Phomoji surface one you forgot.",
  },
  {
    title: "Make it expressive",
    text: "Turn faces, clouds, moods, stickers and text into a playful emoji-style scene.",
  },
  {
    title: "Rediscover daily",
    text: "Get one small emotional time capsule every day and share it when it feels right.",
  },
];

const features = [
  { icon: ImageIcon, title: "Photo remix", text: "Transform portraits and memories into soft, expressive visuals." },
  { icon: Cloud, title: "Cloud characters", text: "A lovable Phomoji companion brings mood and personality to the page." },
  { icon: Heart, title: "Stickers & emotion", text: "Add hearts, rainbows, sparkles and feelings without clutter." },
  { icon: WandSparkles, title: "Magic effects", text: "Gentle AI-style polish that keeps the original memory recognizable." },
  { icon: Type, title: "Text moments", text: "Caption your rediscovered photos with short, personal notes." },
  { icon: Sparkles, title: "Daily surprise", text: "A new photo prompt every day, designed for quick delight." },
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
        <div className="phomoji-orb phomoji-orb--lavender" aria-hidden="true" />
        <div className="phomoji-orb phomoji-orb--peach" aria-hidden="true" />
        <div className="phomoji-float phomoji-float--one" aria-hidden="true">
          ✨
        </div>
        <div className="phomoji-float phomoji-float--two" aria-hidden="true">
          ♡
        </div>
        <div className="phomoji-float phomoji-float--three" aria-hidden="true">
          ☁
        </div>

        <header className="phomoji-nav" aria-label="Primary navigation">
          <a className="phomoji-brand" href="#/" aria-label="Phomoji home">
            <Image src="/icon.png" alt="" width={36} height={36} priority />
            <span>Phomoji</span>
          </a>
          <nav className="phomoji-links" aria-label="Legal links">
            <a href="#/terms">Terms</a>
            <a href="#/privacy">Privacy</a>
          </nav>
        </header>

        <main>
          <section className="phomoji-hero" aria-labelledby="phomoji-hero-title">
            <div className="phomoji-hero-copy">
              <p className="phomoji-kicker">
                <Sparkles size={18} aria-hidden="true" />
                Coming soon for iOS and Android
              </p>
              <h1 id="phomoji-hero-title">
                Phomoji
                <span>Turn photos into expressive emoji magic</span>
              </h1>
              <p className="phomoji-lede">
                Rediscover forgotten photos as soft, playful emoji scenes with faces, clouds,
                stickers, effects and tiny daily surprises.
              </p>

              <div className="phomoji-actions">
                <a className="phomoji-button phomoji-button--primary" href="#how-it-works">
                  See how it works
                </a>
                <a className="phomoji-button phomoji-button--ghost" href="#features">
                  Explore features
                </a>
              </div>

              <aside className="phomoji-store-strip" aria-label="Coming soon on app stores">
                <span>Coming soon on</span>
                <div>
                  <span>App Store</span>
                  <span>Google Play</span>
                </div>
              </aside>
            </div>

            <div className="phomoji-hero-art" aria-label="Phomoji app preview">
              <Image
                src="/phomoji-hero.png"
                alt="Phomoji app preview with a phone mockup and expressive cloud character"
                width={1024}
                height={576}
                priority
                sizes="(max-width: 768px) 100vw, 54vw"
              />
            </div>
          </section>

          <section id="how-it-works" className="phomoji-section phomoji-section--steps">
            <div className="phomoji-section-heading">
              <p>How it works</p>
              <h2>From camera roll to tiny emotional story.</h2>
            </div>
            <div className="phomoji-step-grid">
              {steps.map((step, index) => (
                <article className="phomoji-step-card" key={step.title}>
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
              <h2>Everything in the image, rebuilt as a landing page.</h2>
            </div>
            <div className="phomoji-feature-grid">
              {features.map(({ icon: Icon, title, text }) => (
                <article className="phomoji-feature-card" key={title}>
                  <span aria-hidden="true">
                    <Icon size={22} />
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
                <h2>Every day, a random memory becomes something cute.</h2>
                <p>
                  Phomoji is designed for a tiny daily ritual: open the app, rediscover one
                  forgotten photo, and turn it into a playful expressive moment.
                </p>
              </div>
              <div className="phomoji-mini-gallery" aria-hidden="true">
                <span>☁</span>
                <span>🦄</span>
                <span>😍</span>
                <span>🌈</span>
              </div>
            </div>
          </section>

          <footer className="phomoji-footer">
            <p>Phomoji © 2026. Your forgotten photos, rediscovered.</p>
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
