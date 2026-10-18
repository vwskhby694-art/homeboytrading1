"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Check, X } from "lucide-react";
import { containTabKey, inertOutside } from "./focus-containment";

const STORAGE_KEY = "nexaai-consent-v1";

export type ConsentPreferences = {
  necessary: true;
  marketEmbeds: boolean;
  updatedAt: string;
};

type ConsentContextValue = {
  preferences: ConsentPreferences | null;
  ready: boolean;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  savePreferences: (marketEmbeds: boolean) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [ready, setReady] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const primaryActionRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const dialogOpen = ready && (!preferences || panelOpen);
  const dismissible = Boolean(preferences);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<ConsentPreferences>;
        if (typeof parsed.marketEmbeds === "boolean") {
          setPreferences({
            necessary: true,
            marketEmbeds: parsed.marketEmbeds,
            updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString()
          });
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!dialogOpen || !backdrop || !panel) return;

    const releaseInert = inertOutside([backdrop]);
    primaryActionRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dismissible) {
        event.preventDefault();
        setPanelOpen(false);
      } else if (event.key === "Tab") {
        containTabKey(event, [panel]);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      releaseInert();
      const opener = openerRef.current;
      openerRef.current = null;
      if (opener?.isConnected) opener.focus();
    };
  }, [dialogOpen, dismissible]);

  const openPanel = useCallback(() => {
    openerRef.current = document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : null;
    setPanelOpen(true);
  }, []);

  const savePreferences = useCallback((marketEmbeds: boolean) => {
    const next: ConsentPreferences = {
      necessary: true,
      marketEmbeds,
      updatedAt: new Date().toISOString()
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setPreferences(next);
    setPanelOpen(false);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      preferences,
      ready,
      panelOpen,
      openPanel,
      closePanel: () => preferences && setPanelOpen(false),
      savePreferences
    }),
    [openPanel, panelOpen, preferences, ready, savePreferences]
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {dialogOpen ? (
        <div className="consent-backdrop" role="presentation" ref={backdropRef}>
          <section
            ref={panelRef}
            className="consent-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-title"
            aria-describedby="consent-description"
          >
            <div className="consent-copy">
              <p className="kicker">Privacy controls</p>
              <h2 id="consent-title">Choose how market data loads.</h2>
              <p id="consent-description">
                Necessary local storage remembers this choice. TradingView embeds connect to a third party and load only
                with your permission. No analytics provider is active.
              </p>
              <a href="/cookie-settings">Review the full cookie and embed notice</a>
            </div>
            {preferences ? (
              <button className="icon-control consent-close" type="button" onClick={() => setPanelOpen(false)} aria-label="Close privacy controls">
                <X size={18} />
              </button>
            ) : null}
            <div className="consent-actions">
              <button className="btn btn-secondary" type="button" onClick={() => savePreferences(false)}>
                Necessary only
              </button>
              <button className="btn btn-primary" type="button" onClick={() => savePreferences(true)} ref={primaryActionRef}>
                <Check size={17} /> Allow market embeds
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const value = useContext(ConsentContext);
  if (!value) throw new Error("useConsent must be used inside ConsentProvider");
  return value;
}
