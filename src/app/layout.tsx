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
    default: "يلا عمار | افضل شركة تركيب وجلي رخام وسيراميك في السعودية",
    template: "%s | يلا عمار"
  },
  description: "شركة يلا عمار المتخصصة في تركيب، جلي، وتلميع الرخام، السيراميك، والبورسلين بأعلى جودة. مقاول رخام محترف في جدة، مكة، والطائف بأسعار تنافسية ودقة متناهية.",
  keywords: [
    "تركيب رخام", "جلي رخام", "سيراميك", "بورسلين", "يلا عمار", "شركة جلي بلاط",
    "مقاول رخام", "تلميع رخام", "تركيب سيراميك وبورسلين", "معلم رخام جدة", 
    "افضل شركة جلي رخام بجدة", "السعودية", "جدة", "مكة", "الطائف", "اسعار تركيب الرخام"
  ],
  openGraph: {
    title: "يلا عمار | افضل شركة تركيب وجلي رخام وسيراميك",
    description: "شركة يلا عمار رائدة في تركيب وتلميع الرخام والسيراميك والبورسلين. خبرة طويلة، أسعار منافسة، وجودة عالية في جدة ومكة.",
    url: 'https://yallammar.com',
    siteName: 'يلا عمار - Yalla Ammar',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "يلا عمار | مقاول رخام وسيراميك في السعودية",
    description: "أفضل خدمات تركيب وجلي الرخام والسيراميك والبورسلين في السعودية. تواصل معنا الآن للحصول على عرض سعر.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N47993TJ');
            `
          }}
        />
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
        <Script
          id="google-ads-whatsapp-conversion"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.gtag_report_whatsapp_conversion = function(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                    'send_to': 'AW-18071421889/HSVtCI6pqKgcEMGHkKlD',
                    'event_callback': callback
                });
                return false;
              };
            `,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N47993TJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
