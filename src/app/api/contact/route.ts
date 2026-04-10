import { NextResponse } from 'next/server';
import supabase from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'الاسم ورقم الهاتف مطلوبان' }, { status: 400 });
    }

    const { error } = await supabase
      .from('contacts')
      .insert([{ name, phone, message: message || '' }]);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً!' });
  } catch (error) {
    console.error('Contact Error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى.' }, { status: 500 });
  }
}
