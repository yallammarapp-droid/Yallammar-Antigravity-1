'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../admin.module.css';
import { compressImage } from '@/lib/imageUtils';

export default function AdminGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Form states
  const [category, setCategory] = useState('general');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // Edit states
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const fetchGallery = async () => {
    setFetching(true);
    try {
      const res = await fetch('/api/gallery', { cache: 'no-store' });
      const data = await res.json();
      if (data.images) setImages(data.images);
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('اختر صورة أولاً');

    setLoading(true);
    const formData = new FormData();
    const compressedFile = await compressImage(file);
    formData.append('image', compressedFile);
    formData.append('category', category);
    formData.append('description', description);

    try {
      const res = await fetch('/api/gallery', { method: 'POST', body: formData, cache: 'no-store' });
      if (res.ok) {
        alert('تم رفع الصورة بنجاح!');
        setFile(null);
        setDescription('');
        setCategory('general');
        fetchGallery();
      } else {
        alert('حدث خطأ أثناء الرفع');
      }
    } catch {
      alert('حدث خطأ في الاتصال');
    }
    setLoading(false);
  };

  const handleSaveEdit = async (id: number) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, category: editCategory, description: editDescription }),
      });
      if (res.ok) {
        setEditingId(null);
        fetchGallery();
      } else {
        alert('خطأ في التحديث');
      }
    } catch (e) {
      alert('خطأ في الاتصال');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الصورة؟')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchGallery();
    } catch (e) {
      alert('خطأ في الاتصال');
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: '20px' }}>إدارة معرض الأعمال</h3>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h4 style={{ marginBottom: '15px' }}>رفع صورة جديدة</h4>
        <form onSubmit={handleUpload} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
            required
            className={styles.inputField}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', background: 'white' }}
          />
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className={styles.inputField}
          >
            <option value="general">عام / أخرى</option>
            <option value="before">قبل التنفيذ (Before)</option>
            <option value="after">بعد التنفيذ (After)</option>
          </select>
          <input
            type="text"
            placeholder="وصف (اختياري)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.inputField}
          />
          <button 
            type="submit" 
            disabled={loading || !file}
            className={styles.saveBtn}
            style={{ cursor: (loading || !file) ? 'not-allowed' : 'pointer', opacity: (loading || !file) ? 0.6 : 1 }}
          >
            {loading ? 'جاري الرفع...' : 'رفع الصورة'}
          </button>
        </form>
      </div>

      <h4 style={{ marginBottom: '15px' }}>محتوى المعرض الحالي</h4>
      {fetching ? (
        <p>جاري التحميل...</p>
      ) : images.length === 0 ? (
        <p>لا توجد صور في المعرض حالياً.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {images.map((img) => (
            <div key={img.id} style={{ background: 'white', border: '1px solid #eee', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ position: 'relative', height: '150px', width: '100%', borderRadius: '4px', overflow: 'hidden' }}>
                <Image src={img.image_url} alt={img.description || 'صورة'} fill style={{ objectFit: 'cover' }} />
              </div>
              
              {editingId === img.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  <select 
                    value={editCategory} 
                    onChange={(e) => setEditCategory(e.target.value)}
                    className={styles.inputField}
                    style={{ padding: '8px' }}
                  >
                    <option value="general">عام / أخرى</option>
                    <option value="before">قبل التنفيذ</option>
                    <option value="after">بعد التنفيذ</option>
                  </select>
                  <input
                    type="text"
                    placeholder="وصف الصورة"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className={styles.inputField}
                    style={{ padding: '8px' }}
                  />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleSaveEdit(img.id)} className={styles.saveBtn} style={{ padding: '6px 12px' }}>حفظ</button>
                    <button onClick={() => setEditingId(null)} className={styles.cancelBtn} style={{ padding: '6px 12px', background: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>إلغاء</button>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: '10px', flex: 1 }}>
                  <p style={{ margin: '0 0 5px', fontWeight: 'bold' }}>
                    {img.category === 'before' ? 'قبل التنفيذ' : img.category === 'after' ? 'بعد التنفيذ' : 'عام'}
                  </p>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px', minHeight: '20px' }}>{img.description || 'لا يوجد وصف'}</p>
                </div>
              )}

              {editingId !== img.id && (
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <button 
                    onClick={() => {
                      setEditingId(img.id);
                      setEditCategory(img.category);
                      setEditDescription(img.description || '');
                    }} 
                    style={{ flex: 1, padding: '8px', background: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    تعديل
                  </button>
                  <button 
                    onClick={() => handleDelete(img.id)} 
                    style={{ flex: 1, padding: '8px', background: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    حذف
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
