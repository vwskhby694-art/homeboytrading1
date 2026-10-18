import { Landmark, ShieldCheck, Sparkles, UserRound } from "lucide-react";

// The signature NexaAI diagram: you decide, NexaAI's technology works within your rules,
// and your money stays at your broker on the other side of a line you control.
export function BoundaryDiagram() {
  return (
    <div className="boundary" role="group" aria-label="How responsibilities are separated">
      <article className="boundary-card">
        <header>
          <span className="boundary-icon"><UserRound size={22} aria-hidden="true" /></span>
          <div>
            <p className="boundary-role">You</p>
            <h3>Decide</h3>
          </div>
        </header>
        <ul>
          <li>Choose the markets and limits</li>
          <li>Grant or withdraw permission</li>
          <li>Pause at any time</li>
        </ul>
      </article>

      <article className="boundary-card boundary-card-tech">
        <header>
          <span className="boundary-icon"><Sparkles size={22} aria-hidden="true" /></span>
          <div>
            <p className="boundary-role">NexaAI technology</p>
            <h3>Analyzes and trades within your rules</h3>
          </div>
        </header>
        <ul>
          <li>Analyzes market conditions</li>
          <li>Trades within your risk settings</li>
          <li>Activity visible in your broker account</li>
        </ul>
      </article>

      <div className="boundary-divider" aria-hidden="true">
        <span className="boundary-line" />
        <span className="boundary-lock"><ShieldCheck size={18} /></span>
      </div>
      <p className="boundary-divider-label">Only with your authorization</p>

      <article className="boundary-card boundary-card-broker">
        <header>
          <span className="boundary-icon"><Landmark size={22} aria-hidden="true" /></span>
          <div>
            <p className="boundary-role">Independent partner broker</p>
            <h3>Holds your money</h3>
          </div>
        </header>
        <ul>
          <li>Funds held in your own name</li>
          <li>Carries out permitted orders</li>
          <li>Provides your statements</li>
        </ul>
      </article>
    </div>
  );
}
