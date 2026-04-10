import Link from 'next/link';
import styles from './Footer.module.css';
import { Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.logo}>
            يلا <span>عمار</span>
          </div>
          <p className={styles.desc}>
            نحن شركة متخصصة في تركيب وجلي الرخام والسيراميك والبورسلين، نحول أرضياتك لتبدو كتحفة فنية.
          </p>
        </div>
        <div className={styles.column}>
          <h3 className={styles.title}>روابط سريعة</h3>
          <ul className={styles.links}>
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/services">الخدمات</Link></li>
            <li><Link href="/gallery">معرض الأعمال</Link></li>
            <li><Link href="/about">من نحن</Link></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3 className={styles.title}>تواصل معنا</h3>
          <ul className={styles.contactInfo}>
            <li><Phone className={styles.icon} size={18} /> <span dir="ltr">+966503351279</span></li>
            <li><Mail className={styles.icon} size={18} /> <span>info@yallaammar.com</span></li>
            <li><MapPin className={styles.icon} size={18} /> <span>جدة, مكة, الطائف, الباحة, ينبع السعودية</span></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} شركة يلا عمار</p>
      </div>
    </footer>
  );
}
