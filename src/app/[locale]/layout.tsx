import "@/scss/index.scss";
import "@/app/globals.css";
import { ThemeProvider } from "@/themecontext";
import initTranslations from "@/i18n/translation";
import I18nProvider from "@/i18n/I18nProvider";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import GTMTrackingSnippet from "@/components/GTMTrackingSnippet";
import SitewideTopAlert from "@/components/sharedPageSections/SitewideTopAlert";
import { config } from "@/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { staticLocales } from "@/i18n/config.cjs";
import { Metadata } from "next";

const namespaces = ["common"];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale = "en" } = await params;
  const { resources } = await initTranslations(locale, namespaces);
  const googleTagManagerID = config.siteMetadata.googleTagManagerID;
  const builderLocale = locale == "en" ? "Default" : locale;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <I18nProvider
          namespaces={namespaces}
          locale={locale}
          resources={resources}
        >
          <ThemeProvider>
            <GTMTrackingSnippet />
            <SitewideTopAlert locale={builderLocale} />
            <CookieConsent />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return staticLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { siteMetadata, siteUrl } = config;
  return {
    other: {
      "docsearch:language": locale,
      language: locale,
    },
    title: {
      template: "%s | Solana",
      default: siteMetadata.title,
    },
    description: siteMetadata.description,
    openGraph: {
      description: siteMetadata.description,
      type: "website",
      images: [siteMetadata.socialShare],
      locale,
    },
    twitter: {
      card: "summary_large_image",
      creator: siteMetadata.author,
    },
    robots: "index, follow",
    manifest: "/site.webmanifest",
    metadataBase: new URL(siteUrl),
    icons: [
      {
        url: "/favicon.png",
        rel: "icon",
        type: "image/png",
      },
      {
        url: "/favicon.svg",
        rel: "icon",
        type: "image/svg+xml",
      },
      {
        url: "/apple-touch-icon.png",
        rel: "apple-touch-icon",
        sizes: "180x180",
      },
    ],
  };
}
