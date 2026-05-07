import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تواصل معنا | يلا عمار',
  description: 'تواصل مع شركة يلا عمار للحصول على استشارة مجانية وعروض أسعار منافسة لخدمات جلي، تلميع، وتركيب الرخام والسيراميك في جدة ومكة.',
  alternates: {
    canonical: '/contact',
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
