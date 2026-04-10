import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { ArrowLeft, CheckCircle } from "lucide-react";
import db from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: images } = await db.from('gallery').select('*').order('created_at', { ascending: false }).limit(6);
  const homeImages = images || [];

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            احصل على أرضيات تنبض <span>بالفخامة والجمال</span>
          </h1>
          <p className={styles.subtitle}>
            نحن المتخصصون في تركيب وجلي الرخام، السيراميك، والبورسلين بخبرة طويلة واحترافية عالية تضمن لك أفضل النتائج لمشروعك السكني أو التجاري.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/contact" className={styles.primaryBtn}>
              احصل على عرض سعر
            </Link>
            <Link href="/services" className={styles.secondaryBtn}>
              اكتشف خدماتنا <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
        <div className={styles.heroImageWrapper}>
          <div className={styles.heroImageBorder}>
            <Image 
              src="/hero.png" 
              alt="أرضية رخامية فاخرة" 
              fill 
              className={styles.heroImage}
              priority
            />
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className={styles.features}>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard} style={{ '--card-color': 'var(--sunset-yellow)' } as React.CSSProperties}>
            <CheckCircle className={styles.featureIcon} size={40} />
            <h3>دقة متناهية</h3>
            <p>اهتمام بالغ بأدق التفاصيل لضمان استواء مثالي ولمعان فائق.</p>
          </div>
          <div className={styles.featureCard} style={{ '--card-color': 'var(--sunset-orange)' } as React.CSSProperties}>
            <CheckCircle className={styles.featureIcon} size={40} />
            <h3>أسعار تنافسية</h3>
            <p>نقدم أفضل الأسعار في السوق مع الحفاظ على الجودة العالية للفنش النهائي.</p>
          </div>
          <div className={styles.featureCard} style={{ '--card-color': 'var(--sunset-dark)' } as React.CSSProperties}>
            <CheckCircle className={styles.featureIcon} size={40} />
            <h3>التزام بالمواعيد</h3>
            <p>ندرك أهمية وقتك، لذلك نلتزم بإنهاء الأعمال في الوقت المتفق عليه.</p>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className={styles.gallerySection}>
        <div className={styles.sectionHeader}>
          <h2>أحدث <span>أعمالنا</span></h2>
          <p>شاهد تحول الأماكن من العادية إلى الفخامة الاستثنائية بفضل أعمالنا في الرخام والسيراميك.</p>
        </div>
        <div className={styles.galleryGrid}>
          {homeImages.map((img) => (
            <div key={img.id} className={styles.galleryCard}>
              <div className={styles.galleryImageWrapper}>
                <Image src={img.image_url} alt={img.description || "معرض أعمال يلا عمار"} fill className={styles.galleryImage} />
              </div>
              {img.category === 'before' && <span className={styles.badge}>قبل التنفيذ</span>}
              {img.category === 'after' && <span className={styles.badgeAfter}>بعد التنفيذ</span>}
              {img.description && (
                <div className={styles.description}>
                  <p>{img.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.viewMoreWrapper}>
          <Link href="/gallery" className={styles.viewMoreBtn}>
            عرض كل الأعمال <ArrowLeft size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
