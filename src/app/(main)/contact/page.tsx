'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { Phone, MapPin, Mail, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ loading: false, error: '', success: data.message });
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setStatus({ loading: false, error: data.error, success: '' });
      }
    } catch (err) {
      setStatus({ loading: false, error: 'حدث خطأ في الاتصال.', success: '' });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>تواصل <span>معنا</span></h1>
        <p>نحن هنا للإجابة على استفساراتكم وتقديم أفضل عروض الأسعار لمشاريعكم.</p>
      </div>

      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <h2>معلومات الاتصال</h2>
          <p className={styles.subInfo}>يمكنك زيارتنا في مقرنا أو التواصل معنا عبر الهاتف أو البريد الإلكتروني.</p>

          <div className={styles.infoItems}>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><MapPin size={24} /></div>
              <div>
                <h3>العنوان</h3>
                <p>جدة, مكة, الطائف, الباحة, ينبع السعودية</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><Phone size={24} /></div>
              <div>
                <h3>رقم الهاتف / واتساب</h3>
                <p dir="ltr">+966503351279</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><Mail size={24} /></div>
              <div>
                <h3>البريد الإلكتروني</h3>
                <p>info@yallaammar.com</p>
              </div>
            </div>
          </div>

          <div className={styles.whatsappBox}>
            <MessageSquare size={32} />
            <div>
              <h3>تواصل معنا عبر واتساب الآن!</h3>
              <a href="https://wa.me/966503351279" target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
                مراسلة واتساب
              </a>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>أرسل لنا رسالة</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">الاسم الكريم *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="أدخل اسمك"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">رقم الهاتف *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="أدخل رقمك للتواصل"
                dir="auto"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">رسالتك</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="اكتب استفسارك أو تفاصيل مشروعك هنا..."
              ></textarea>
            </div>

            {status.error && <div className={styles.error}>{status.error}</div>}
            {status.success && <div className={styles.success}>{status.success}</div>}

            <button type="submit" className={styles.submitBtn} disabled={status.loading}>
              {status.loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
            </button>
          </form>
        </div>
      </div>
    </div >
  );
}
