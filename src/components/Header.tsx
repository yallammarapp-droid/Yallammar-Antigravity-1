'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الخدمات', path: '/services' },
    { name: 'معرض الأعمال', path: '/gallery' },
    { name: 'من نحن', path: '/about' },
    { name: 'تواصل معنا', path: '/contact' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            يلا <span>عمار</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {links.map((link) => (
              <li key={link.path}>
                <Link 
                  href={link.path} 
                  className={`${styles.link} ${pathname === link.path ? styles.active : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.cta}>
          <Link href="/contact" className={styles.ctaButton}>
            احصل على عرض سعر
          </Link>
        </div>
      </div>
    </header>
  );
}
