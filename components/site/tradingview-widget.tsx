"use client";

import { RefreshCw, ShieldAlert } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useConsent } from "./consent-provider";

type TradingViewWidgetProps = {
  title: string;
  script: string;
  config: Record<string, unknown>;
  className?: string;
  minHeight?: number;
  lazy?: boolean;
  compactState?: boolean;
};

export function TradingViewWidget({
  title,
  script,
  config,
  className = "",
  minHeight = 460,
  lazy = true,
  compactState = false
}: TradingViewWidgetProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [nearViewport, setNearViewport] = useState(!lazy);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [attempt, setAttempt] = useState(0);
  const { preferences, ready: consentReady, savePreferences } = useConsent();
  const configKey = useMemo(() => JSON.stringify(config), [config]);
  const permitted = Boolean(preferences?.marketEmbeds);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !lazy || nearViewport) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNearViewport(true);
      },
      { rootMargin: "320px 0px" }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [lazy, nearViewport]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (!consentReady || !permitted || !nearViewport) {
      host.replaceChildren();
      setState("idle");
      return;
    }

    let cancelled = false;
    let loaded = false;
    let frame: HTMLIFrameElement | null = null;
    let observer: MutationObserver | null = null;
    let timeout = 0;

    setState("loading");
    host.replaceChildren();

    const markReady = () => {
      loaded = true;
      window.clearTimeout(timeout);
      observer?.disconnect();
      if (!cancelled) setState("ready");
    };

    const markError = () => {
      window.clearTimeout(timeout);
      observer?.disconnect();
      if (!cancelled) setState("error");
    };

    // React Strict Mode runs an extra setup/cleanup cycle in development.
    // Deferring one task prevents that first cycle from starting an orphaned embed.
    const initialize = window.setTimeout(() => {
      if (cancelled) return;

      const embed = document.createElement("script");
      embed.type = "text/javascript";
      embed.src = script;
      embed.async = true;
      embed.textContent = configKey;
      embed.onerror = markError;

      observer = new MutationObserver(() => {
        const nextFrame = host.querySelector("iframe");
        if (!nextFrame || nextFrame === frame) return;
        frame = nextFrame;
        frame.addEventListener("load", markReady, { once: true });
        frame.addEventListener("error", markError, { once: true });
      });
      observer.observe(host, { childList: true, subtree: true });
      host.appendChild(embed);
    }, 0);

    timeout = window.setTimeout(() => {
      if (!cancelled && !loaded) setState("error");
    }, 20000);

    return () => {
      cancelled = true;
      window.clearTimeout(initialize);
      window.clearTimeout(timeout);
      observer?.disconnect();
      frame?.removeEventListener("load", markReady);
      frame?.removeEventListener("error", markError);
      host.replaceChildren();
    };
  }, [attempt, configKey, consentReady, nearViewport, permitted, script]);

  return (
    <section
      className={`tradingview-shell ${compactState ? "tradingview-shell-compact" : ""} ${className}`}
      aria-label={title}
      aria-busy={state === "loading"}
      style={{ height: minHeight }}
    >
      <div className="tradingview-frame" ref={hostRef} />

      {!consentReady ? (
        <div className="widget-state widget-loading" aria-live="polite">
          <div className="widget-state-copy">
            <span className="loading-line" />
            <p>Preparing market privacy controls…</p>
          </div>
        </div>
      ) : !permitted ? (
        <div className="widget-state">
          <div className="widget-state-copy">
            <ShieldAlert size={22} />
            <div><h3>Market data paused</h3><p>Allow third-party market embeds to display this TradingView view.</p></div>
          </div>
          <button className="btn btn-secondary" type="button" onClick={() => savePreferences(true)}>
            Load market data
          </button>
        </div>
      ) : state === "loading" || state === "idle" ? (
        <div className="widget-state widget-loading" aria-live="polite">
          <div className="widget-state-copy">
            <span className="loading-line" />
            <span className="loading-line short" />
            <p>Loading TradingView market information…</p>
          </div>
        </div>
      ) : state === "error" ? (
        <div className="widget-state" role="status">
          <div className="widget-state-copy">
            <ShieldAlert size={22} />
            <div><h3>Market view unavailable</h3><p>TradingView may be blocked or temporarily unavailable. Check this site’s browser permissions, then retry.</p></div>
          </div>
          <button className="btn btn-secondary" type="button" onClick={() => setAttempt((value) => value + 1)}>
            <RefreshCw size={16} /> Retry
          </button>
        </div>
      ) : null}

    </section>
  );
}
