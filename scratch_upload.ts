import fs from 'fs';

async function testUpload() {
  const formData = new FormData();
  formData.append('category', 'general');
  // Create a 5MB dummy image buffer
  const buffer = Buffer.alloc(5 * 1024 * 1024, 'a');
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  formData.append('image', blob, 'test.jpg');

  try {
    const res = await fetch('http://127.0.0.1:3000/api/gallery', {
      method: 'POST',
      body: formData
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (err) {
    console.error('Network Error:', err);
  }
}

testUpload();
