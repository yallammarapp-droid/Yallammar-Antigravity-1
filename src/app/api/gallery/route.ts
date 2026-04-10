import { NextResponse } from 'next/server';
import supabase from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: images, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ images: images || [] });
  } catch (error) {
    console.error('Gallery GET Error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;
    const category = formData.get('category') as string;
    const description = (formData.get('description') as string) || null;

    if (!file) {
      return NextResponse.json({ error: 'لم يتم اختيار صورة' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || 'image/jpeg';
    const base64String = buffer.toString('base64');
    const imageUrl = `data:${mimeType};base64,${base64String}`;

    const { error } = await supabase
      .from('gallery')
      .insert([{ 
        image_url: imageUrl, 
        category: category || 'general', 
        description 
      }]);

    if (error) throw error;

    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error('Gallery Upload Error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء رفع الصورة.', details: (error as any).message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, category, description } = body;
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const { error } = await supabase
      .from('gallery')
      .update({ 
        category: category || 'general', 
        description: description || null 
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
      .from('gallery')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
