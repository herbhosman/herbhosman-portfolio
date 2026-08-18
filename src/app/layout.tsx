import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Herb Hosman — AEM Architect | Open to Work",
  description:
    "Herbert Hosman — Adobe Experience Manager architect and engineering leader. Open to AEM Architect, Solution Architect, Engineering Manager, and Director of Engineering roles. Ventura, CA · Remote / Hybrid.",
  openGraph: {
    title: "Herb Hosman — AEM Architect | Open to Work",
    description:
      "Selected work across Adobe, Pluralsight, Hoodoo, and Caesars. Open to full-time AEM and platform leadership roles.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-[family-name:var(--font-body)] text-foreground">
        {children}
      </body>
    </html>
  );
}
