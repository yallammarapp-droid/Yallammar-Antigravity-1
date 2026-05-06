import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تواصل معنا',
  description: 'تواصل مع شركة يلا عمار للحصول على استشارة مجانية وعروض أسعار لخدمات جلي وتركيب الرخام والسيراميك والبورسلين.',
  alternates: {
    canonical: '/contact',
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
