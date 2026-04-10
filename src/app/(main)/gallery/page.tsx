import supabase from "@/lib/db";
import styles from "./page.module.css";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "معرض الأعمال | يلا عمار"
};

export default async function GalleryPage() {
  const { data: imagesData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
  const images = imagesData || [];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>معرض <span>الأعمال</span></h1>
        <p>شاهد تحول الأماكن من العادية إلى الفخامة الاستثنائية بفضل أعمالنا في الرخام والسيراميك.</p>
      </div>

      <div className={styles.container}>
        {images.length === 0 ? (
          <div className={styles.emptyState}>
            <ImageIcon size={64} className={styles.emptyIcon} />
            <h2>لا توجد صور حالياً</h2>
            <p>سيتم إضافة أحدث أعمالنا قريباً.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {images.map((img) => (
              <div key={img.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image src={img.image_url} alt={img.description || "عمل يلا عمار"} fill className={styles.image} />
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
        )}
      </div>
    </div>
  );
}
