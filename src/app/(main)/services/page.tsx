import supabase from "@/lib/db";
import styles from "./page.module.css";
import { LayoutGrid, Hammer, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "خدماتنا | يلا عمار",
  description: "اكتشف خدماتنا المتكاملة في تركيب وجلي الرخام والسيراميك والبورسلين بأعلى معايير الجودة.",
};

// Map icon strings to components statically for our simple setup
const IconMap: Record<string, any> = {
  LayoutGrid,
  Hammer,
  Sparkles,
};

export default async function ServicesPage() {
  const { data: servicesData } = await supabase.from('services').select('*').order('id', { ascending: true });
  const services = servicesData || [];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>خدماتنا <span>المتميزة</span></h1>
        <p>نقدم مجموعة متكاملة من خدمات الأرضيات الرخامية والسيراميك بأعلى معايير الجودة.</p>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {services.map((service) => {
            const Icon = IconMap[service.icon] || LayoutGrid;
            return (
              <div key={service.id} className={styles.card}>
                {service.image_url ? (
                  <div className={styles.imageWrapper}>
                    <Image src={service.image_url} alt={service.title} fill className={styles.serviceImage} />
                  </div>
                ) : (
                  <div className={styles.iconWrapper}>
                    <Icon size={32} />
                  </div>
                )}
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul className={styles.features}>
                  <li><CheckCircle2 size={16} /> جودة مضمونة وخامات أصلية</li>
                  <li><CheckCircle2 size={16} /> فريق عمل متخصص وخبراء</li>
                  <li><CheckCircle2 size={16} /> سرعة التنفيذ والتسليم</li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.cta}>
        <h2>هل أنت مستعد لبدء مشروعك؟</h2>
        <p>تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر مخصص لمشروعك.</p>
        <Link href="/contact" className={styles.ctaButton}>تواصل معنا الآن</Link>
      </div>
    </div>
  );
}
