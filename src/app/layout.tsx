import type { Metadata } from "next";
import { Figtree, Manrope } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://herbhosman.com";

const title = "Herb Hosman | Software Engineer, Engineering Leader, AEM Expert";
const description =
  "Software engineer, engineering leader, and AEM expert based in Ventura, CA. Experience at Adobe, Pluralsight, Hoodoo, and Caesars—Adobe Experience Cloud and high-traffic Experience Manager work. Open to full-time remote or hybrid roles.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Herb Hosman",
  },
  description,
  keywords: [
    "Herb Hosman",
    "Herbert Hosman",
    "Software Engineer",
    "Engineering Leader",
    "AEM Expert",
    "AEM Software Engineer",
    "AEM Architect",
    "Adobe Experience Manager",
    "Adobe Experience Cloud",
    "Document Cloud",
    "AEM Developer",
    "Solution Architect",
    "Engineering Manager",
    "Director of Engineering",
    "Adobe Certified Expert",
    "AEM Sites",
    "Pluralsight",
    "Hoodoo Digital",
    "Caesars",
    "Ventura CA",
    "remote AEM jobs",
    "open to work",
  ],
  authors: [{ name: "Herbert Hosman", url: siteUrl }],
  creator: "Herbert Hosman",
  publisher: "Herbert Hosman",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Herb Hosman",
    title,
    description:
      "Software engineer, engineering leader, AEM expert. Adobe, Pluralsight, Hoodoo, and Caesars. Open to full-time remote or hybrid roles.",
    images: [
      {
        url: "/herb-hosman.jpg",
        width: 764,
        height: 1024,
        alt: "Herbert Hosman — software engineer, engineering leader, AEM expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Software engineer, engineering leader, AEM expert. Adobe, Pluralsight, Hoodoo, Caesars. Open to work — remote or hybrid.",
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
      className={`${manrope.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-[family-name:var(--font-body)] text-foreground">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
