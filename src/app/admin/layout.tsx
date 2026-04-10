'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';
import { LayoutDashboard, Images, Settings, LogOut, MessageSquare } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          لوحة <span>الإدارة</span>
        </div>
        <ul className={styles.navList}>
          <li>
            <Link href="/admin" className={`${styles.navItem} ${pathname === '/admin' ? styles.active : ''}`}>
              <LayoutDashboard size={20} /> نظرة عامة (الرسائل)
            </Link>
          </li>
          <li>
            <Link href="/admin/gallery" className={`${styles.navItem} ${pathname === '/admin/gallery' ? styles.active : ''}`}>
              <Images size={20} /> إدارة المعرض
            </Link>
          </li>
          <li>
            <Link href="/admin/services" className={`${styles.navItem} ${pathname === '/admin/services' ? styles.active : ''}`}>
              <Settings size={20} /> إدارة الخدمات
            </Link>
          </li>
          <li>
            <Link href="/" className={styles.navItem}>
              <LogOut size={20} /> العودة للموقع
            </Link>
          </li>
        </ul>
      </aside>
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h2>مرحباً بك في لوحة تحكم يلا عمار</h2>
        </header>
        {children}
      </main>
    </div>
  );
}
