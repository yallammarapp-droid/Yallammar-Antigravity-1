import styles from "./page.module.css";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "من نحن | يلا عمار"
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>من نحن <span>يلا عمار</span></h1>
          <p className={styles.desc}>
            مؤسسة يلا عمار هي شركة رائدة في المملكة العربية السعودية، متخصصة في تقديم خدمات فريدة وعالية الجودة في مجالات تركيب وجلي الرخام، السيراميك، والبورسلين. نمتلك خبرة طويلة في هذا المجال تمكننا من فهم احتياجات عملائنا بدقة وتحويل مساحاتهم إلى تحف فنية تنبض بالفخامة.
          </p>
          <p className={styles.desc}>
            نسعى دائماً لتحقيق أعلى درجات رضا العملاء من خلال التزامنا بالدقة، جودة المواد، والتسليم في الوقت المحدد. يضم فريقنا نخبة من أفضل الفنيين والخبراء الذين تم تدريبهم على أحدث التقنيات والمعدات لضمان نتيجة مثالية.
          </p>
          
          <div className={styles.values}>
            <h2>لماذا تختارنا؟</h2>
            <ul>
              <li><CheckCircle className={styles.icon} /> خبرة واسعة واحترافية لا تضاهى</li>
              <li><CheckCircle className={styles.icon} /> أحدث التقنيات في الجلي والتركيب</li>
              <li><CheckCircle className={styles.icon} /> التزام صارم بمواعيد التسليم</li>
              <li><CheckCircle className={styles.icon} /> أسعار تنافسية تناسب جميع الميزانيات</li>
            </ul>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image src="/hero.png" alt="من نحن يلا عمار" fill className={styles.image} />
          </div>
        </div>
      </div>
    </div>
  );
}
