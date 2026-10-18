import { Ban, Check, KeyRound } from "lucide-react";

const columns = [
  {
    badge: "badge-live",
    label: "What NexaAI provides",
    icon: Check,
    items: ["AI-powered market analysis", "Automated trading in your broker account", "Personal onboarding and client support"]
  },
  {
    badge: "badge-live",
    label: "What stays with you",
    icon: KeyRound,
    items: ["Your own broker account, in your name", "Full view of positions and statements", "Agreement on your markets and risk limits"]
  },
  {
    badge: "badge-tbc",
    label: "What we never do",
    icon: Ban,
    items: ["Hold your trading funds", "Take deposits through this website", "Promise or guarantee returns"]
  }
] as const;

export function StatusPanel() {
  return (
    <div className="status-panel">
      {columns.map(({ badge, label, icon: Icon, items }) => (
        <section className="status-column" key={label} aria-label={label}>
          <span className={`badge ${badge}`}>{label}</span>
          <ul>
            {items.map((item) => <li key={item}><Icon size={18} aria-hidden="true" />{item}</li>)}
          </ul>
        </section>
      ))}
    </div>
  );
}
