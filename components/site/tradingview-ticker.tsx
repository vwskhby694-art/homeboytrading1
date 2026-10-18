"use client";

import { RefreshCw, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useConsent } from "./consent-provider";

const TICKER_ELEMENT = "tv-ticker-tape";
const TICKER_MODULE_URL = "https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js";
const TICKER_SCRIPT_ID = "tradingview-ticker-tape-module";
const TICKER_SYMBOLS = "FOREXCOM:SPXUSD,FOREXCOM:NSXUSD,FOREXCOM:DJI,FX:EURUSD,BITSTAMP:BTCUSD,BITSTAMP:ETHUSD,CMCMARKETS:GOLD";
const LOAD_TIMEOUT_MS = 20000;

let tickerModulePromise: Promise<void> | null = null;

function loadTickerModule() {
  if (customElements.get(TICKER_ELEMENT)) return Promise.resolve();
  if (tickerModulePromise) return tickerModulePromise;

  tickerModulePromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(TICKER_SCRIPT_ID) as HTMLScriptElement | null;
    const script = existingScript ?? document.createElement("script");
    let timeout = 0;

    const cleanup = () => {
      window.clearTimeout(timeout);
      script.removeEventListener("error", handleError);
    };

    const handleError = () => {
      cleanup();
      script.remove();
      reject(new Error("TradingView ticker module could not be loaded."));
    };

    customElements.whenDefined(TICKER_ELEMENT).then(() => {
      cleanup();
      resolve();
    });

    script.addEventListener("error", handleError, { once: true });

    if (!existingScript) {
      script.id = TICKER_SCRIPT_ID;
      script.type = "module";
      script.src = TICKER_MODULE_URL;
      document.head.appendChild(script);
    }

    timeout = window.setTimeout(handleError, LOAD_TIMEOUT_MS);
  }).catch((error: unknown) => {
    tickerModulePromise = null;
    throw error;
  });

  return tickerModulePromise;
}

export function TradingViewTicker() {
  const { preferences, ready: consentReady, savePreferences } = useConsent();
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const permitted = Boolean(preferences?.marketEmbeds);

  useEffect(() => {
    if (!consentReady || !permitted) return;

    let active = true;
    setLoadState("loading");

    loadTickerModule().then(
      () => {
        if (active) setLoadState("ready");
      },
      () => {
        if (active) setLoadState("error");
      }
    );

    return () => {
      active = false;
    };
  }, [attempt, consentReady, permitted]);

  const showTicker = consentReady && permitted && loadState === "ready";

  return (
    <section className="market-ticker" aria-label="Selected global market ticker" aria-busy={consentReady && permitted && loadState === "loading"}>
      {showTicker ? (
        <tv-ticker-tape
          symbols={TICKER_SYMBOLS}
          hide-chart=""
          item-size="compact"
          theme="dark"
          transparent=""
        />
      ) : (
        <div className="market-ticker-state" aria-live="polite">
          {!consentReady ? (
            <p>Preparing market privacy controls…</p>
          ) : !permitted ? (
            <>
              <span><ShieldAlert size={17} aria-hidden="true" /> Market data paused</span>
              <button type="button" onClick={() => savePreferences(true)}>Load market data</button>
            </>
          ) : loadState === "error" ? (
            <>
              <span><ShieldAlert size={17} aria-hidden="true" /> TradingView ticker unavailable</span>
              <button type="button" onClick={() => setAttempt((value) => value + 1)}><RefreshCw size={14} aria-hidden="true" /> Retry</button>
            </>
          ) : (
            <p>Loading TradingView market information…</p>
          )}
        </div>
      )}
    </section>
  );
}
