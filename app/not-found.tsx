import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page surface-deep">
      <div className="container-narrow">
        <p className="eyebrow">404 · Page not found</p>
        <h1 className="display">The market moved. <em>This page didn&apos;t.</em></h1>
        <p className="lead">The page you were looking for does not exist or has moved. These pages may help:</p>
        <div className="button-row">
          <Link className="btn btn-primary btn-lg" href="/">Return home <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <Link className="btn btn-secondary btn-lg" href="/how-it-works">How it works</Link>
          <Link className="btn btn-secondary btn-lg" href="/faq">FAQ</Link>
        </div>
      </div>
    </main>
  );
}
