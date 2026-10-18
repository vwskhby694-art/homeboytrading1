import { Eye, Landmark, ShieldCheck } from "lucide-react";

// A coded demonstration of the NexaAI console. It uses example values only — never live account
// data — and deliberately shows settings and controls rather than balances or profits.
export function ProductConcept() {
  return (
    <figure className="concept" aria-labelledby="concept-caption" aria-describedby="concept-description">
      <p className="sr-only" id="concept-description">
        Demonstration of the NexaAI console with example values. It shows a client&apos;s settings: chosen markets, a
        limit of one percent of the balance per position, and a daily loss limit that pauses automation. Automation is
        active within those limits, and trading funds stay in the client&apos;s own broker account. This is not live
        account data.
      </p>
      <div className="concept-window" aria-hidden="true">
        <div className="concept-bar">
          <span className="concept-title"><i /> NexaAI <b>Strategy console</b></span>
          <span className="concept-tag">Demo · example values</span>
        </div>

        <div className="concept-body">
          <section className="concept-panel concept-rules">
            <header>
              <strong>Your risk settings</strong>
              <span>Trading stays within these</span>
            </header>
            <div className="concept-row">
              <span>Markets</span>
              <div className="concept-chips">
                <em className="is-on">EUR/USD</em>
                <em className="is-on">Gold</em>
                <em className="is-on">S&amp;P 500</em>
                <em>Bitcoin</em>
              </div>
            </div>
            <div className="concept-row">
              <span>Risk per position</span>
              <div className="concept-meter"><b>1% of balance</b><i style={{ "--fill": "22%" } as React.CSSProperties} /></div>
            </div>
            <div className="concept-row">
              <span>Daily loss limit</span>
              <div className="concept-meter"><b>Pause at 3%</b><i style={{ "--fill": "48%" } as React.CSSProperties} /></div>
            </div>
            <div className="concept-row">
              <span>Trading window</span>
              <div className="concept-value">London &amp; New York sessions</div>
            </div>
          </section>

          <div className="concept-split">
            <section className="concept-panel concept-context">
              <header>
                <strong>Market context</strong>
                <span className="concept-example">Example</span>
              </header>
              <ul>
                <li><i className="dot-neutral" />EUR/USD <span>Within recent range</span></li>
                <li><i className="dot-amber" />Gold <span>More active than usual</span></li>
                <li><i className="dot-signal" />Rule check <span>Within your limits</span></li>
              </ul>
            </section>

            <section className="concept-panel concept-oversight">
              <header>
                <strong>Automation</strong>
              </header>
              <div className="concept-toggle">
                <span className="concept-switch"><i /></span>
                <span className="concept-state"><b className="state-active">Active</b></span>
              </div>
              <p><ShieldCheck size={14} /> Within your risk limits</p>
            </section>
          </div>
        </div>

        <div className="concept-boundary">
          <span className="concept-line" />
          <div className="concept-broker">
            <Landmark size={18} />
            <div>
              <strong>Your broker account</strong>
              <span>Your funds stay in your name</span>
            </div>
            <em><Eye size={12} /> Positions visible to you</em>
          </div>
        </div>
      </div>
      <figcaption id="concept-caption">
        Demonstration interface with example values. It does not show live account data.
      </figcaption>
    </figure>
  );
}
