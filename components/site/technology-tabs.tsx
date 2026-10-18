"use client";

import { Check, CircleAlert } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

const tabs = [
  {
    id: "context",
    label: "AI analysis",
    title: "Reads the market, so you don't have to watch it.",
    text: "NexaAI's models follow price movement, volatility and scheduled news across the markets in your strategy, and its algorithms decide when conditions meet the strategy's rules.",
    points: ["Analysis across forex, gold, indices and crypto", "Rules-based decisions, applied consistently", "Takes volatility and market hours into account"],
    limit: "AI analysis describes conditions and probabilities. It cannot predict the future, and it can be wrong."
  },
  {
    id: "rules",
    label: "Your risk settings",
    title: "Your limits, applied every time.",
    text: "During onboarding, our team discusses the markets your account trades and the level of risk that suits you. The system then trades within the settings agreed with you.",
    points: ["Risk settings discussed during onboarding", "Markets agreed with you", "Settings changed only with your agreement"],
    limit: "Risk settings help control exposure, but they cannot prevent losses."
  },
  {
    id: "oversight",
    label: "Full visibility",
    title: "Your account, always in view.",
    text: "Trading happens in your own account at an independent broker, so every position, balance and statement is available to you directly, and our team is there to help.",
    points: ["Positions and statements from your broker", "Your funds stay in your name", "Support from the NexaAI team"],
    limit: "Automated trading still needs you to check on it. Technology and connections can fail."
  }
] as const;

type TabId = (typeof tabs)[number]["id"];

function TabVisual({ id }: { id: TabId }) {
  if (id === "context") {
    return (
      <div className="tech-visual" aria-hidden="true">
        <p className="tech-visual-title">Market context <span>Example</span></p>
        <ul className="tech-rows">
          <li><i className="dot-neutral" /><b>EUR/USD</b><span>Within recent range</span></li>
          <li><i className="dot-amber" /><b>Gold</b><span>Moving more than usual</span></li>
          <li><i className="dot-neutral" /><b>S&amp;P 500</b><span>Quiet before the US session</span></li>
          <li><i className="dot-amber" /><b>Bitcoin</b><span>Weekend trading, thinner volume</span></li>
        </ul>
      </div>
    );
  }
  if (id === "rules") {
    return (
      <div className="tech-visual" aria-hidden="true">
        <p className="tech-visual-title">Risk settings <span>Example</span></p>
        <div className="tech-meters">
          <div><span>Risk per position</span><b>1% of balance</b><i style={{ "--fill": "22%" } as React.CSSProperties} /></div>
          <div><span>Daily loss limit</span><b>Pause at 3%</b><i style={{ "--fill": "48%" } as React.CSSProperties} /></div>
          <div><span>Open positions</span><b>No more than 3</b><i style={{ "--fill": "60%" } as React.CSSProperties} /></div>
        </div>
      </div>
    );
  }
  return (
    <div className="tech-visual" aria-hidden="true">
      <p className="tech-visual-title">Broker account activity <span>Example</span></p>
      <ol className="tech-log">
        <li><time>08:00</time>Risk limits checked</li>
        <li><time>09:14</time>Position opened · EUR/USD</li>
        <li><time>11:02</time>Position closed · EUR/USD</li>
        <li><time>22:00</time>Daily statement from your broker</li>
      </ol>
    </div>
  );
}

export function TechnologyTabs() {
  const [active, setActive] = useState<TabId>("context");
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ context: null, rules: null, oversight: null });

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((tab) => tab.id === active);
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    const id = tabs[next].id;
    setActive(id);
    tabRefs.current[id]?.focus();
  }

  return (
    <div className="tech-tabs">
      <div className="tech-tablist" role="tablist" aria-label="NexaAI technology" onKeyDown={onKeyDown}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(node) => { tabRefs.current[tab.id] = node; }}
            id={`tech-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`tech-panel-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            className={active === tab.id ? "is-active" : undefined}
            onClick={() => setActive(tab.id)}
          >
            <span className="tabular">{String(index + 1).padStart(2, "0")}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`tech-panel-${tab.id}`}
          className="tech-panel"
          role="tabpanel"
          aria-labelledby={`tech-tab-${tab.id}`}
          hidden={active !== tab.id}
          tabIndex={0}
        >
          <div className="tech-copy">
            <h3 className="h2">{tab.title}</h3>
            <p className="lead">{tab.text}</p>
            <ul className="check-list">
              {tab.points.map((point) => <li key={point}><Check size={18} aria-hidden="true" />{point}</li>)}
            </ul>
            <p className="tech-limit"><CircleAlert size={18} aria-hidden="true" /><span>{tab.limit}</span></p>
          </div>
          <TabVisual id={tab.id} />
        </div>
      ))}
    </div>
  );
}
