import { Info } from "lucide-react";
import { joinSteps } from "@/app/content";

// The enquiry-led journey: details → review → a representative contacts you → guided onboarding.
export function JoinSteps() {
  const steps = joinSteps.slice(0, 4);
  return (
    <div className="join">
      <ol className="join-steps">
        {steps.map((step, index) => (
          <li key={step.title} className="join-step">
            <span className="join-index tabular" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
      <p className="join-note">
        <Info size={18} aria-hidden="true" />
        <span>Sending an enquiry does not open a trading account or start any trading. It simply lets our team get in touch.</span>
      </p>
    </div>
  );
}
