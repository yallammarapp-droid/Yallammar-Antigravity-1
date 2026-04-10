import supabase from '@/lib/db';
import styles from './admin.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'لوحة التحكم | الرسائل الواردة'
};

export default async function AdminOverview() {
  const { data: messagesData } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
  const messages = messagesData || [];

  return (
    <div>
      <h3 style={{ marginBottom: '20px' }}>الرسائل الواردة ({messages.length})</h3>
      
      {messages.length === 0 ? (
        <p>لا توجد رسائل جديدة.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ 
              backgroundColor: 'rgba(255,255,255,0.05)', 
              border: '1px solid #ddd', 
              padding: '20px', 
              borderRadius: '8px',
              color: 'inherit'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ margin: 0 }}>{msg.name}</h4>
                <small style={{ opacity: 0.6 }}>{new Date(msg.created_at).toLocaleString('ar-EG')}</small>
              </div>
              <p style={{ margin: '0 0 10px 0', opacity: 0.8, fontWeight: 'bold' }} dir="ltr">{msg.phone}</p>
              <p style={{ margin: 0, opacity: 0.9 }}>{msg.message || 'لا توجد رسالة مرفقة.'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
