"use client";

import { CircleAlert, Clock3, Activity } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { instrumentGuides } from "@/app/content";
import { siteConfig } from "@/app/site-config";
import { TradingViewTicker } from "./tradingview-ticker";
import { TradingViewWidget } from "./tradingview-widget";

const scripts = {
  overview: "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js",
  chart: "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",
  symbol: "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js"
} as const;

export function MarketTicker() {
  return <TradingViewTicker />;
}

export function HomeMarketOverview() {
  const config = useMemo(() => ({
    colorTheme: "dark",
    dateRange: "3M",
    showChart: true,
    locale: "en",
    width: "100%",
    height: "100%",
    isTransparent: false,
    showSymbolLogo: true,
    showFloatingTooltip: true,
    tabs: [
      {
        title: "Currencies",
        symbols: [
          { s: "FX:EURUSD", d: "EUR / USD" },
          { s: "FX:GBPUSD", d: "GBP / USD" },
          { s: "FX:USDJPY", d: "USD / JPY" },
          { s: "OANDA:XAUUSD", d: "Gold / USD" }
        ]
      },
      {
        title: "Indices",
        symbols: [
          { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
          { s: "FOREXCOM:NSXUSD", d: "NASDAQ 100" },
          { s: "INDEX:DEU40", d: "DAX 40" },
          { s: "FOREXCOM:UKXGBP", d: "FTSE 100" }
        ]
      },
      {
        title: "Crypto",
        symbols: [
          { s: "BITSTAMP:BTCUSD", d: "Bitcoin / USD" },
          { s: "BITSTAMP:ETHUSD", d: "Ether / USD" },
          { s: "COINBASE:SOLUSD", d: "Solana / USD" }
        ]
      }
    ]
  }), []);
  return <TradingViewWidget title="Global market overview" script={scripts.overview} config={config} minHeight={590} />;
}

const symbolGroups = ["Forex", "Gold", "Indices", "Crypto"] as const;

export function MarketsWorkspace() {
  const [symbol, setSymbol] = useState<string>(siteConfig.marketSymbols[0].id);
  const [narrow, setNarrow] = useState(false);
  const selected = siteConfig.marketSymbols.find((item) => item.id === symbol) ?? siteConfig.marketSymbols[0];
  const guide = instrumentGuides[selected.id];

  // Allow links such as /markets?symbol=FX:EURUSD from the Education page.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("symbol");
    if (requested && siteConfig.marketSymbols.some((item) => item.id === requested)) setSymbol(requested);
  }, []);

  // On phones the drawing toolbar takes too much width, so the chart hides it.
  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const sync = () => setNarrow(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const chartConfig = useMemo(() => ({
    autosize: true,
    symbol,
    interval: "60",
    timezone: "Etc/UTC",
    theme: "dark",
    style: "1",
    locale: "en",
    backgroundColor: "#06110c",
    gridColor: "rgba(232, 240, 228, 0.06)",
    hide_side_toolbar: narrow,
    allow_symbol_change: true,
    save_image: false,
    calendar: false,
    details: true,
    hotlist: false,
    studies: []
  }), [narrow, symbol]);

  const symbolConfig = useMemo(() => ({
    symbols: [[symbol]],
    chartOnly: false,
    width: "100%",
    height: "100%",
    locale: "en",
    colorTheme: "dark",
    autosize: true,
    showVolume: true,
    showMA: true,
    hideDateRanges: false,
    hideMarketStatus: false,
    hideSymbolLogo: false,
    scalePosition: "right",
    scaleMode: "Normal",
    fontFamily: "Inter, sans-serif",
    noTimeScale: false,
    valuesTracking: "1",
    changeMode: "price-and-percent",
    chartType: "area",
    lineWidth: 2,
    lineType: 0
  }), [symbol]);

  return (
    <div className="market-workspace">
      <fieldset className="instrument-picker">
        <legend>Choose an instrument</legend>
        <div className="instrument-groups">
          {symbolGroups.map((group) => (
            <div className="instrument-group" key={group}>
              <p className="instrument-group-label">{group}</p>
              <div className="instrument-chips">
                {siteConfig.marketSymbols.filter((item) => item.group === group).map((item) => (
                  <label key={item.id} className={`instrument-chip ${item.id === symbol ? "is-selected" : ""}`}>
                    <input type="radio" name="instrument" value={item.id} checked={item.id === symbol} onChange={() => setSymbol(item.id)} />
                    <span>{item.short}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="workspace-heading" aria-live="polite">
        <div>
          <p className="workspace-group">{selected.group}</p>
          <h2 className="h2">{guide?.name ?? selected.label}</h2>
        </div>
        <p className="workspace-what">{guide?.what}</p>
      </div>

      <TradingViewWidget title={`${selected.label} advanced chart`} script={scripts.chart} config={chartConfig} minHeight={narrow ? 460 : 640} />

      <div className="market-widget-grid">
        <TradingViewWidget title={`${selected.label} symbol overview`} script={scripts.symbol} config={symbolConfig} minHeight={460} />
        {guide ? (
          <section className="instrument-guide" aria-labelledby="instrument-guide-title">
            <p className="instrument-guide-label">Instrument guide</p>
            <h3 id="instrument-guide-title">What tends to move {selected.short}</h3>
            <ul className="check-list">
              {guide.movers.map((item) => <li key={item}><Activity size={18} aria-hidden="true" />{item}</li>)}
            </ul>
            <dl>
              <div><dt><Clock3 size={16} aria-hidden="true" /> Trading hours</dt><dd>{guide.hours}</dd></div>
              <div><dt><CircleAlert size={16} aria-hidden="true" /> Worth knowing</dt><dd>{guide.note}</dd></div>
            </dl>
            <p className="instrument-guide-foot">General information, not a recommendation to buy or sell.</p>
          </section>
        ) : null}
      </div>
    </div>
  );
}
