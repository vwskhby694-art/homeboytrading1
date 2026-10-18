"use client";

import { CheckCircle2 } from "lucide-react";
import { useConsent } from "./consent-provider";

export function CookieSettingsControl() {
  const { preferences, ready, savePreferences } = useConsent();
  if (!ready) return <div className="settings-loading">Loading your saved preference…</div>;

  return (
    <div className="cookie-settings-control">
      <div className="preference-row">
        <div><h3>Necessary storage</h3><p>Remembers your privacy choice in this browser. No advertising cookies are used.</p></div>
        <span className="preference-status"><CheckCircle2 size={16} /> Always active</span>
      </div>
      <div className="preference-row">
        <div><h3>TradingView market embeds</h3><p>Loads third-party charts and market information. TradingView receives technical request information described in its own policies.</p></div>
        <label className="switch-control">
          <input type="checkbox" role="switch" checked={Boolean(preferences?.marketEmbeds)} onChange={(event) => savePreferences(event.target.checked)} />
          <span className="switch-track" aria-hidden="true"><i /></span>
          <em>{preferences?.marketEmbeds ? "Allowed" : "Paused"}</em>
          <span className="sr-only">Allow TradingView market embeds</span>
        </label>
      </div>
      <div className="preference-row is-inactive">
        <div><h3>Analytics</h3><p>No analytics provider is currently connected, so there is no analytics preference to activate.</p></div>
        <span className="preference-status">Not in use</span>
      </div>
    </div>
  );
}
