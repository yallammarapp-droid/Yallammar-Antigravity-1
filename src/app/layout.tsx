import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  weight: ['300', '400', '500', '700', '800'],
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "يلا عمار | Yalla Ammar - خدمات الرخام والأرضيات",
  description: "شركة يلا عمار المتخصصة في تركيب وجلي الرخام والسيراميك والبورسلين.",
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
      <body>
        {children}
      </body>
    </html>
  );
}
