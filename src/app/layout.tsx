import type { Metadata } from "next";
import { CivicInfoBar } from "@/components/CivicInfoBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { SITE_URL } from "@/lib/site";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BetterMaddela",
    template: "%s · BetterMaddela",
  },
  description:
    "Independent, source-linked civic information about Maddela, Quirino.",
  openGraph: {
    type: "website",
    siteName: "BetterMaddela",
    locale: "en_PH",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
        <link rel="stylesheet" href="/assets/css/accessibility.css" />
        <link rel="stylesheet" href="/assets/css/footer.css" />
        <link rel="stylesheet" href="/assets/css/statistics.css" />
        <link rel="stylesheet" href="/assets/css/legal.css" />
        <link rel="stylesheet" href="/assets/css/legislative.css" />
        <link rel="stylesheet" href="/assets/css/transparency-v2.css" />
        <link rel="stylesheet" href="/assets/css/maddela.css" />
        <link rel="stylesheet" href="/assets/css/legal-history.css" />
      </head>
      <body>
        <LanguageProvider>
          <SkipLink />
          <SiteHeader />
          <CivicInfoBar />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
