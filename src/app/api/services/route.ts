import { NextResponse } from 'next/server';
import supabase from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ services: services || [] });
  } catch (error) {
    console.error('Services GET Error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('image') as File | null;
    
    if (!title || !description) {
      return NextResponse.json({ error: 'العنوان والوصف مطلوبان' }, { status: 400 });
    }

    let imageUrl = null;
    if (file && file.size > 0 && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = file.type || 'image/jpeg';
      const base64String = buffer.toString('base64');
      imageUrl = `data:${mimeType};base64,${base64String}`;
    }

    const { error } = await supabase
      .from('services')
      .insert([{ 
        title, 
        description, 
        image_url: imageUrl, 
        icon: 'Sparkles' 
      }]);

    if (error) throw error;

    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error('Service Add Error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء إضافة الخدمة.', details: (error as any).message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file = formData.get('image') as File | null;

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    let imageUrl = formData.get('existing_image') as string | null;

    if (file && file.size > 0 && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = file.type || 'image/jpeg';
      const base64String = buffer.toString('base64');
      imageUrl = `data:${mimeType};base64,${base64String}`;
    }

    const { error } = await supabase
      .from('services')
      .update({ 
        title, 
        description, 
        image_url: imageUrl 
      })
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء التحديث.' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
