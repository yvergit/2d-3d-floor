"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * LandingOverlay.jsx
 * - CSS-only “map” background + big lens
 * - showOnce: false by default (always shows while dev)
 * - ESC closes, locks scroll while open
 * - Get Started routes to ctaHref
 *
 * Put your logo here: /public/logo.png
 */
export default function LandingOverlay({ ctaHref = "/app", showOnce = false }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const mounted = useRef(false);

  // Show overlay (optionally only once)
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    try {
      if (!showOnce) {
        setOpen(true);
        return;
      }
      const dismissed = window.localStorage.getItem("landing_dismissed");
      if (!dismissed) setOpen(true);
    } catch (e) {
      setOpen(true);
    }
  }, [showOnce]);

  // Lock scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const dismiss = () => {
    try {
      if (showOnce) window.localStorage.setItem("landing_dismissed", "1");
    } catch (e) {}
    setOpen(false);
  };

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const go = () => {
    dismiss();
    router.push(ctaHref);
  };

  if (!open) return null;

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="3dfloor landing overlay">
      {/* CSS-only “map” background */}
      <div className="map" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <button className="close" onClick={dismiss} aria-label="Close">
        ✕
      </button>

      <div className="layout">
        {/* Big “lens” */}
        <div className="lens">
          <div className="lensRing" aria-hidden="true" />
          <div className="lensInner">
            <div className="brand">
              <span className="logoWrap" aria-hidden="true">
                <img className="logoImg" src="/logo.png" alt="" />
              </span>
              <span className="name">3dfloor</span>
            </div>

            <h1 className="title">Bring your floor plans to life in 3D</h1>
            <p className="subtitle">
              Convert 2D floor designs into immersive 3D spaces with fast tools, clean exports, and a
              drag-and-drop workflow.
            </p>

            <div className="actions">
              
              <button className="ghost" onClick={dismiss}>
                Let's Go!
              </button>
            </div>

            <div className="mini">
              <span className="pill">2D → 3D in minutes</span>
              <span className="pill">Realistic lighting</span>
              <span className="pill">Share & export</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="features" aria-label="Key features">
          <div className="card">
            <div className="icon" aria-hidden="true">⚡</div>
            <div>
              <div className="cardTitle">Instant 2D → 3D</div>
              <div className="cardText">Auto-generate 3D from your 2D layout and iterate fast.</div>
            </div>
          </div>

          <div className="card">
            <div className="icon" aria-hidden="true">🧱</div>
            <div>
              <div className="cardTitle">Drag-and-drop building</div>
              <div className="cardText">Click 3d object before adding furniture.</div>
            </div>
          </div>

          <div className="card">
            <div className="icon" aria-hidden="true">🎥</div>
            <div>
              <div className="cardTitle">Soon</div>
              <div className="cardText">Walkthrough preview like a game.</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
          font-family: Nunito, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }

        /* ===== CSS-ONLY MAP BACKGROUND ===== */
        .map {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 8% 25%, rgba(0, 0, 0, 0.24) 0 1.2%, transparent 1.3%),
            radial-gradient(circle at 12% 30%, rgba(0, 0, 0, 0.18) 0 0.8%, transparent 0.9%),
            radial-gradient(circle at 86% 78%, rgba(0, 0, 0, 0.2) 0 1%, transparent 1.1%),
            radial-gradient(circle at 78% 15%, rgba(0, 0, 0, 0.16) 0 0.7%, transparent 0.8%),

            radial-gradient(closest-side at 18% 28%, rgba(92, 170, 95, 0.95) 0 60%, transparent 61%),
            radial-gradient(closest-side at 26% 40%, rgba(78, 155, 86, 0.95) 0 55%, transparent 56%),
            radial-gradient(closest-side at 32% 30%, rgba(110, 190, 110, 0.85) 0 45%, transparent 46%),

            radial-gradient(closest-side at 72% 34%, rgba(92, 170, 95, 0.95) 0 62%, transparent 63%),
            radial-gradient(closest-side at 82% 46%, rgba(78, 155, 86, 0.95) 0 52%, transparent 53%),
            radial-gradient(closest-side at 70% 52%, rgba(110, 190, 110, 0.85) 0 40%, transparent 41%),

            radial-gradient(closest-side at 62% 78%, rgba(92, 170, 95, 0.95) 0 50%, transparent 51%),
            radial-gradient(closest-side at 76% 80%, rgba(110, 190, 110, 0.85) 0 38%, transparent 39%),

            linear-gradient(180deg, rgba(18, 120, 170, 0.92), rgba(10, 90, 135, 0.92));

          filter: saturate(1.08) contrast(1.08);
          transform: scale(1.02);
        }

        .map::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(0deg, rgba(255, 240, 210, 0.33), rgba(255, 240, 210, 0.33)),
            repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.08) 0 1px, transparent 1px 28px),
            repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.06) 0 1px, transparent 1px 36px),
            repeating-linear-gradient(12deg, rgba(255, 255, 255, 0.06) 0 2px, transparent 2px 10px);
          mix-blend-mode: overlay;
          opacity: 0.95;
          pointer-events: none;
        }

        .map::after {
          content: "";
          position: absolute;
          inset: -10%;
          background:
            radial-gradient(circle at 0% 0%, rgba(0, 0, 0, 0.35), transparent 45%),
            radial-gradient(circle at 100% 0%, rgba(0, 0, 0, 0.35), transparent 45%),
            radial-gradient(circle at 0% 100%, rgba(0, 0, 0, 0.35), transparent 45%),
            radial-gradient(circle at 100% 100%, rgba(0, 0, 0, 0.35), transparent 45%);
          opacity: 0.55;
          pointer-events: none;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 55%, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.55));
          pointer-events: none;
        }

        /* ===== LAYOUT ===== */
        .layout {
          position: relative;
          height: 100%;
          width: min(1280px, 94vw);
          margin: 0 auto;
          display: grid;
          grid-template-rows: 1fr auto;
          align-items: center;
          gap: 18px;
          padding: 24px 0 28px;
        }

        .close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(0, 0, 0, 0.52);
          color: #fff;
          cursor: pointer;
          display: grid;
          place-items: center;
          font-size: 18px;
          backdrop-filter: blur(6px);
        }
        .close:hover { background: rgba(0, 0, 0, 0.68); }

        /* ===== LENS ===== */
        .lens {
          position: relative;
          width: min(860px, 74vmin);
          height: min(860px, 74vmin);
          margin: 0 auto;
          display: grid;
          place-items: center;
        }

        .lensRing {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background:
            radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 28%),
            radial-gradient(circle at 70% 75%, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0) 35%),
            linear-gradient(135deg, #9a6a2c, #f0d19a 28%, #6a3f14 55%, #f2d7a8 78%, #8a5a22);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.55),
            inset 0 0 0 10px rgba(0, 0, 0, 0.28),
            inset 0 0 0 18px rgba(255, 255, 255, 0.16);
        }

        .lensInner {
          position: relative;
          width: calc(100% - 80px);
          height: calc(100% - 80px);
          border-radius: 999px;
          display: grid;
          place-items: center;
          text-align: center;
          padding: 56px 54px;
          background:
            radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.96), rgba(240, 230, 210, 0.92)),
            radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1.2px);
          background-size: auto, 7px 7px;
          background-position: center, 2px 3px;
          box-shadow:
            inset 0 0 0 1px rgba(0, 0, 0, 0.18),
            inset 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          opacity: 0.95;
        }

        .logoWrap {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: linear-gradient(180deg, #ffe08a, #ffb647);
          border: 1px solid rgba(0, 0, 0, 0.18);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
          overflow: hidden;
        }

        .logoImg {
          width: 22px;
          height: 22px;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.15));
        }

        .name {
          font-weight: 900;
          letter-spacing: 0.2px;
          color: rgba(35, 20, 8, 0.92);
          font-size: 18px;
        }

        .title {
          margin: 6px 0 10px;
          font-weight: 950;
          letter-spacing: -0.5px;
          color: rgba(30, 18, 8, 0.92);
          font-size: clamp(28px, 4.2vmin, 46px);
          line-height: 1.05;
        }

        .subtitle {
          margin: 0 auto 18px;
          max-width: 560px;
          color: rgba(35, 20, 8, 0.78);
          font-size: 15px;
          line-height: 1.5;
        }

        .actions {
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .cta {
          appearance: none;
          border: none;
          cursor: pointer;
          padding: 14px 26px;
          border-radius: 999px;
          font-weight: 950;
          letter-spacing: 0.2px;
          color: #1a1205;
          background: linear-gradient(180deg, #ffe08a, #ffb647);
          border: 1px solid rgba(0, 0, 0, 0.22);
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);
          transition: transform 120ms ease, filter 120ms ease;
        }
        .cta:hover { transform: translateY(-2px); filter: brightness(1.02); }
        .cta:active { transform: translateY(0px); }

        .ghost {
          appearance: none;
          cursor: pointer;
          padding: 14px 18px;
          border-radius: 999px;
          font-weight: 800;
          background: rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.12);
          color: rgba(30, 18, 8, 0.78);
        }
        .ghost:hover { background: rgba(0, 0, 0, 0.09); }

        .mini {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .pill {
          font-size: 12px;
          font-weight: 800;
          color: rgba(35, 20, 8, 0.78);
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.55);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .features {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          padding-bottom: 6px;
        }

        .card {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 14px 14px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.22);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(10px);
          color: rgba(255, 255, 255, 0.92);
        }

        .icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: rgba(0, 0, 0, 0.28);
          border: 1px solid rgba(255, 255, 255, 0.14);
          font-size: 18px;
        }

        .cardTitle {
          font-weight: 900;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .cardText {
          font-size: 13px;
          line-height: 1.35;
          color: rgba(255, 255, 255, 0.82);
        }

        @media (max-width: 980px) {
          .features { grid-template-columns: 1fr; }
          .lensInner { padding: 46px 26px; }
        }

        @media (max-width: 520px) {
          .lens { width: 92vmin; height: 92vmin; }
          .lensInner { width: calc(100% - 56px); height: calc(100% - 56px); }
        }
      `}</style>
    </div>
  );
}
