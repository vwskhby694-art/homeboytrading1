const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

function focusableWithin(roots: HTMLElement[]) {
  return roots
    .flatMap((root) => [root, ...Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))])
    .filter(
      (element) =>
        element.matches(FOCUSABLE_SELECTOR) &&
        element.tabIndex >= 0 &&
        !element.closest("[inert]") &&
        element.getClientRects().length > 0 &&
        window.getComputedStyle(element).visibility !== "hidden"
    );
}

/** Marks everything outside the kept elements inert and returns a function that restores it. */
export function inertOutside(keep: HTMLElement[]) {
  const changed: HTMLElement[] = [];

  const visit = (parent: Element) => {
    for (const child of Array.from(parent.children)) {
      if (!(child instanceof HTMLElement) || keep.includes(child)) continue;
      if (keep.some((element) => child.contains(element))) {
        visit(child);
      } else if (!child.inert && child.tagName !== "SCRIPT") {
        child.inert = true;
        changed.push(child);
      }
    }
  };

  visit(document.body);
  return () => changed.forEach((element) => { element.inert = false; });
}

/** Wraps Tab and Shift+Tab so keyboard focus cycles within the given roots, in the order given. */
export function containTabKey(event: KeyboardEvent, roots: HTMLElement[]) {
  const focusable = focusableWithin(roots);
  if (!focusable.length) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  const inside = active instanceof HTMLElement && roots.some((root) => root.contains(active));

  if (event.shiftKey && (!inside || active === first)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (!inside || active === last)) {
    event.preventDefault();
    first.focus();
  }
}
