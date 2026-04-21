"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { PrivacySheetContent, TermsSheetContent } from "./LegalSheets";
type Route = "home" | "terms" | "privacy";

const TITLES: Record<Route, string> = {
  home: "Phomoji — Your forgotten photos, rediscovered daily.",
  terms: "Terms of Service — Phomoji",
  privacy: "Privacy Policy — Phomoji",
};

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
  const rootRef = useRef<HTMLDivElement>(null);
  const termsPanelRef = useRef<HTMLDivElement>(null);
  const privacyPanelRef = useRef<HTMLDivElement>(null);
  const [route, setRoute] = useState<Route>("home");
  const appStoreGradId = `appstore-grad-${useId().replace(/:/g, "")}`;

  const applyRoute = useCallback((next: Route) => {
    const termsOpen = next === "terms";
    const privacyOpen = next === "privacy";
    const anyOpen = termsOpen || privacyOpen;

    document.body.classList.toggle("phomoji-sheet-open", anyOpen);
    document.title = TITLES[next] ?? TITLES.home;
    window.scrollTo(0, 0);

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
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rootRef.current?.classList.add("frame-ready");
      return;
    }
    const t = window.setTimeout(() => {
      rootRef.current?.classList.add("frame-ready");
    }, 550);
    return () => window.clearTimeout(t);
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
      <div ref={rootRef} className="phomoji-root">
        <div className="video-layer" aria-hidden="true">
          <video autoPlay muted loop playsInline>
            <source src="/assets/background.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="page">
          <main className="hero">
            <h1 className="hero-title">Phomoji</h1>
            <div className="hero-bottom">
              <div className="hero-actions">
                <a className="btn btn--ghost" href="#/terms">
                  Terms of Service
                </a>{" "}
                <a className="btn btn--ghost" href="#/privacy">
                  Privacy Policy
                </a>
              </div>
              <aside
                className="coming-soon"
                aria-label="Coming soon on App Store and Google Play"
              >
                <p className="coming-soon-label">Coming Soon on</p>
                <div className="coming-soon-stores" role="group" aria-label="App Store and Google Play">
                  <span
                    className="coming-soon-store coming-soon-store--appstore"
                    title="App Store — coming soon"
                  >
                    <svg
                      className="coming-soon-icon coming-soon-icon--appstore"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 800 800"
                      width={28}
                      height={28}
                      aria-hidden="true"
                    >
                      <linearGradient
                        id={appStoreGradId}
                        gradientUnits="userSpaceOnUse"
                        x1="400.05"
                        y1="798.77"
                        x2="400.05"
                        y2="-1.23"
                        gradientTransform="matrix(1 0 0 -1 0 798.77)"
                      >
                        <stop offset="0" stopColor="#18BFFB" />
                        <stop offset="1" stopColor="#2072F3" />
                      </linearGradient>
                      <path
                        fill={`url(#${appStoreGradId})`}
                        d="M638.4 0H161.6C72.3 0 0 72.3 0 161.6v476.9C0 727.7 72.3 800 161.6 800h476.9c89.2 0 161.6-72.3 161.6-161.6V161.6C800 72.3 727.7 0 638.4 0z"
                      />
                      <path
                        fill="#FFFFFF"
                        d="M396.6,183.8l16.2-28c10-17.5,32.3-23.4,49.8-13.4s23.4,32.3,13.4,49.8L319.9,462.4h112.9c36.6,0,57.1,43,41.2,72.8H143c-20.2,0-36.4-16.2-36.4-36.4c0-20.2,16.2-36.4,36.4-36.4h92.8l118.8-205.9l-37.1-64.4c-10-17.5-4.1-39.6,13.4-49.8c17.5-10,39.6-4.1,49.8,13.4L396.6,183.8L396.6,183.8z M256.2,572.7l-35,60.7c-10,17.5-32.3,23.4-49.8,13.4S148,614.5,158,597l26-45C213.4,542.9,237.3,549.9,256.2,572.7L256.2,572.7z M557.6,462.6h94.7c20.2,0,36.4,16.2,36.4,36.4c0,20.2-16.2,36.4-36.4,36.4h-52.6l35.5,61.6c10,17.5,4.1,39.6-13.4,49.8c-17.5,10-39.6,4.1-49.8-13.4c-59.8-103.7-104.7-181.3-134.5-233c-30.5-52.6-8.7-105.4,12.8-123.3C474.2,318.1,509.9,380,557.6,462.6L557.6,462.6z"
                      />
                    </svg>
                    <span className="visually-hidden">App Store</span>
                  </span>
                  <span
                    className="coming-soon-store coming-soon-store--google"
                    title="Google Play — coming soon"
                  >
                    <svg
                      className="coming-soon-icon coming-soon-icon--google"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="30 336.7 120.9 129.2"
                      width={26}
                      height={28}
                      aria-hidden="true"
                    >
                      <path
                        fill="#FFD400"
                        d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                      />
                      <path
                        fill="#FF3333"
                        d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                      />
                      <path
                        fill="#48FF48"
                        d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                      />
                      <path
                        fill="#3BCCFF"
                        d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                      />
                    </svg>
                    <span className="visually-hidden">Google Play</span>
                  </span>
                </div>
              </aside>
            </div>
          </main>
        </div>
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
