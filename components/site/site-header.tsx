"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/app/site-config";
import { containTabKey, inertOutside } from "./focus-containment";
import { WordmarkMark } from "./wordmark";

// Matches the 900px breakpoint where the mobile menu is replaced by desktop navigation.
const DESKTOP_QUERY = "(min-width: 901px)";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const wordmarkRef = useRef<HTMLAnchorElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const restoreFocusRef = useRef(false);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    restoreFocusRef.current = restoreFocus;
    setOpen(false);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const header = headerRef.current;
    const wordmark = wordmarkRef.current;
    const toggle = toggleRef.current;
    const menu = menuRef.current;
    if (!open || !header || !wordmark || !toggle || !menu) return;

    restoreFocusRef.current = false;
    document.body.classList.add("menu-open");
    const releaseInert = inertOutside([wordmark, toggle, menu]);

    // The open state skips the visibility transition, so focus normally lands at once. If a transition
    // ever keeps the links hidden for a moment, retry when it ends.
    const focusFirstLink = () => {
      const link = firstLinkRef.current;
      link?.focus();
      return !link || document.activeElement === link;
    };
    const onMenuTransitionEnd = () => {
      const active = document.activeElement;
      if ((active !== toggle && active !== document.body) || focusFirstLink()) {
        menu.removeEventListener("transitionend", onMenuTransitionEnd);
      }
    };
    if (!focusFirstLink()) menu.addEventListener("transitionend", onMenuTransitionEnd);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      } else if (event.key === "Tab") {
        containTabKey(event, [wordmark, toggle, menu]);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.contains(event.target)) closeMenu(false);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onViewportChange);
    return () => {
      document.body.classList.remove("menu-open");
      releaseInert();
      menu.removeEventListener("transitionend", onMenuTransitionEnd);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onViewportChange);
      if (restoreFocusRef.current) toggle.focus();
    };
  }, [closeMenu, open]);

  return (
    <header className="site-header" ref={headerRef}>
      <Link ref={wordmarkRef} className="wordmark" href="/" aria-label="NexaAI home" onClick={() => closeMenu(false)}>
        <WordmarkMark />
        <span>NexaAI</span>
      </Link>

      <nav className="desktop-navigation" aria-label="Primary navigation">
        {siteConfig.navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? "is-current" : undefined}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="header-enquiry" href="/#enquiry">
        Speak to our team <ArrowUpRight size={16} aria-hidden="true" />
      </Link>

      <button
        ref={toggleRef}
        className="icon-control menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => (open ? closeMenu(true) : setOpen(true))}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div ref={menuRef} id="mobile-navigation" className={`mobile-navigation ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {siteConfig.navigation.map((item, index) => (
            <Link
              ref={index === 0 ? firstLinkRef : undefined}
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={() => closeMenu(false)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
          <Link className="mobile-enquiry" href="/#enquiry" tabIndex={open ? 0 : -1} onClick={() => closeMenu(false)}>
            Speak to our team <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </nav>
        <p>AI-powered trading technology for forex, gold, indices and crypto.</p>
      </div>
    </header>
  );
}
