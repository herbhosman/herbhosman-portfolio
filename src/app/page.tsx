/**
 * Portfolio experience switcher.
 *
 * Rollback: set PORTFOLIO_EXPERIENCE to "classic" and redeploy.
 * - "snap"    → full-viewport scroll lock + project swipe carousel
 * - "classic" → previous continuous scrolling layout
 */
import { ClassicHome } from "@/experiences/classic/ClassicHome";
import { SnapHome } from "@/experiences/snap/SnapHome";

export const PORTFOLIO_EXPERIENCE: "snap" | "classic" = "snap";

export default function Home() {
  if (PORTFOLIO_EXPERIENCE === "classic") {
    return <ClassicHome />;
  }
  return <SnapHome />;
}
