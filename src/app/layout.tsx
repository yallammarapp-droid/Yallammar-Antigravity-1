import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const tajawal = Tajawal({
  weight: ['300', '400', '500', '700', '800'],
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yallammar.com'),
  title: {
    default: "يلا عمار | Yalla Ammar - خدمات الرخام والأرضيات",
    template: "%s | يلا عمار"
  },
  description: "شركة يلا عمار المتخصصة في تركيب وجلي الرخام والسيراميك والبورسلين بأعلى جودة في السعودية.",
  keywords: ["تركيب رخام", "جلي رخام", "سيراميك", "بورسلين", "يلا عمار", "السعودية", "جدة", "مكة", "الطائف"],
  openGraph: {
    title: "يلا عمار | Yalla Ammar",
    description: "شركة يلا عمار المتخصصة في تركيب وجلي الرخام والسيراميك والبورسلين.",
    url: 'https://yallammar.com',
    siteName: 'Yalla Ammar',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "يلا عمار | Yalla Ammar",
    description: "شركة يلا عمار المتخصصة في تركيب وجلي الرخام والسيراميك والبورسلين.",
  },
  alternates: {
    canonical: '/',
  }
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=AW-18071421889`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18071421889');
            `,
          }}
        />
        <Script
          id="google-ads-call-conversion"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.gtag_report_conversion = function(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                    'send_to': 'AW-18071421889/0WwTCPmZ-aUcEMGHkKlD',
                    'value': 1.0,
                    'currency': 'SAR',
                    'event_callback': callback
                });
                return false;
              };
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
