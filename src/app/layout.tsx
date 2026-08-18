import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
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

const siteUrl = "https://herbhosman.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Herb Hosman | AEM Architect & Engineering Leader",
    template: "%s | Herb Hosman",
  },
  description:
    "Herbert Hosman is an Adobe Experience Manager (AEM) architect and engineering leader based in Ventura, CA. Experience at Adobe, Pluralsight, Hoodoo, and Caesars. Open to AEM Architect, Solution Architect, Engineering Manager, and Director of Engineering roles — remote or hybrid.",
  keywords: [
    "Herb Hosman",
    "Herbert Hosman",
    "AEM Architect",
    "Adobe Experience Manager",
    "AEM Developer",
    "Solution Architect",
    "Engineering Manager",
    "Director of Engineering",
    "Adobe Certified Expert",
    "Ventura CA",
    "remote AEM jobs",
  ],
  authors: [{ name: "Herbert Hosman", url: siteUrl }],
  creator: "Herbert Hosman",
  publisher: "Herbert Hosman",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Herb Hosman",
    title: "Herb Hosman | AEM Architect & Engineering Leader",
    description:
      "AEM architect and engineering leader. Selected work for Adobe, Pluralsight, Hoodoo, and Caesars. Open to full-time remote or hybrid roles.",
    images: [
      {
        url: "/herb-hosman.jpg",
        width: 764,
        height: 1024,
        alt: "Herbert Hosman — AEM Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Herb Hosman | AEM Architect & Engineering Leader",
    description:
      "AEM architect and engineering leader. Adobe, Pluralsight, Hoodoo, Caesars. Open to work — remote or hybrid.",
    images: ["/herb-hosman.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-[family-name:var(--font-body)] text-foreground">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
