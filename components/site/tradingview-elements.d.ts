import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "tv-ticker-tape": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        symbols: string;
        "hide-chart"?: string;
        "item-size"?: "compact" | "normal";
        theme?: "dark" | "light";
        transparent?: string;
      };
    }
  }
}
