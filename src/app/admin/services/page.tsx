'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../admin.module.css';
import { compressImage } from '@/lib/imageUtils';

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // Edit states
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editFile, setEditFile] = useState<File | null>(null);

  const fetchServices = async () => {
    setFetching(true);
    try {
      const res = await fetch('/api/services', { cache: 'no-store' });
      const data = await res.json();
      if (data.services) setServices(data.services);
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return alert('الرجاء إدخال العنوان والوصف');

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      const compressedFile = await compressImage(file);
      formData.append('image', compressedFile);
    }

    try {
      const res = await fetch('/api/services', { method: 'POST', body: formData, cache: 'no-store' });
      if (res.ok) {
        alert('تمت إضافة الخدمة بنجاح!');
        setTitle('');
        setDescription('');
        setFile(null);
        fetchServices();
      } else {
        alert('حدث خطأ أثناء الإضافة');
      }
    } catch {
      alert('حدث خطأ في الاتصال');
    }
    setLoading(false);
  };

  const handleSaveEdit = async (id: number, currentImage: string | null) => {
    try {
      const formData = new FormData();
      formData.append('id', id.toString());
      formData.append('title', editTitle);
      formData.append('description', editDescription);
      if (editFile) {
        const compressedEditFile = await compressImage(editFile);
        formData.append('image', compressedEditFile);
      } else if (currentImage) {
        formData.append('existing_image', currentImage);
      }

      const res = await fetch('/api/services', {
        method: 'PATCH',
        body: formData,
      });
      if (res.ok) {
        setEditingId(null);
        setEditFile(null);
        fetchServices();
      } else {
        alert('خطأ في التحديث');
      }
    } catch (e) {
      alert('خطأ في الاتصال');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;
    try {
      const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchServices();
    } catch (e) {
      alert('خطأ في الاتصال');
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: '20px' }}>إدارة الخدمات</h3>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h4 style={{ marginBottom: '15px' }}>إضافة خدمة جديدة</h4>
        <form onSubmit={handleCreate} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="اسم الخدمة (مثل: جلي الرخام)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputField}
            required
            style={{ padding: '10px', flex: '1 1 200px' }}
          />
          <input
            type="text"
            placeholder="وصف تفصيلي للخدمة"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.inputField}
            required
            style={{ padding: '10px', flex: '2 1 300px' }}
          />
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
            className={styles.inputField}
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', background: 'white' }}
          />
          <button 
            type="submit" 
            disabled={loading}
            className={styles.saveBtn}
            style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'جاري الإضافة...' : 'إضافة الخدمة'}
          </button>
        </form>
      </div>

      <h4 style={{ marginBottom: '15px' }}>الخدمات الحالية</h4>
      {fetching ? (
        <p>جاري التحميل...</p>
      ) : services.length === 0 ? (
        <p>لا توجد خدمات مضافة حالياً.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {services.map((service) => (
            <div key={service.id} style={{ background: 'white', border: '1px solid #eee', borderRadius: '8px', padding: '20px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ position: 'relative', width: '150px', height: '150px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {service.image_url ? (
                  <Image src={service.image_url} alt={service.title} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <span style={{ color: '#aaa' }}>لا توجد صورة</span>
                )}
              </div>
              
              <div style={{ flex: 1 }}>
                {editingId === service.id ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                      type="text"
                      placeholder="اسم الخدمة"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className={styles.inputField}
                      style={{ padding: '8px' }}
                    />
                    <textarea
                      placeholder="وصف الخدمة"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className={styles.inputField}
                      style={{ padding: '8px', minHeight: '80px', fontFamily: 'inherit' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <label style={{ fontSize: '14px', color: '#555' }}>تغيير الصورة:</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setEditFile(e.target.files?.[0] || null)} 
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button onClick={() => handleSaveEdit(service.id, service.image_url)} className={styles.saveBtn} style={{ padding: '6px 15px' }}>حفظ التعديلات</button>
                      <button onClick={() => { setEditingId(null); setEditFile(null); }} className={styles.cancelBtn} style={{ padding: '6px 15px', background: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>إلغاء</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h5 style={{ margin: '0 0 10px', fontSize: '1.2rem', color: 'var(--main-color)' }}>{service.title}</h5>
                    <p style={{ margin: '0 0 20px', color: '#555', lineHeight: '1.6' }}>{service.description}</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => {
                          setEditingId(service.id);
                          setEditTitle(service.title);
                          setEditDescription(service.description);
                        }} 
                        style={{ padding: '8px 20px', background: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        تعديل
                      </button>
                      <button 
                        onClick={() => handleDelete(service.id)} 
                        style={{ padding: '8px 20px', background: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        حذف
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
