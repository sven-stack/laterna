import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getPhotos, createPhoto } from '@/lib/db';
import { put } from '@vercel/blob';
import sharp from 'sharp';

export async function GET() {
  try {
    const photos = await getPhotos();
    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string | null;
    const location = formData.get('location') as string | null;
    const dateTaken = formData.get('dateTaken') as string | null;

    if (!file || !title) {
      return NextResponse.json(
        { error: 'File and title are required' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create thumbnail (500px wide)
    const thumbnailBuffer = await sharp(buffer)
      .resize(500, null, { withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Optimize main image (1920px wide)
    const optimizedBuffer = await sharp(buffer)
      .resize(1920, null, { withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    // Upload to Vercel Blob
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/\s/g, '-')}`;

    const [imageBlob, thumbnailBlob] = await Promise.all([
      put(`photos/${filename}`, optimizedBuffer, {
        access: 'public',
        contentType: 'image/jpeg',
      }),
      put(`thumbnails/${filename}`, thumbnailBuffer, {
        access: 'public',
        contentType: 'image/jpeg',
      }),
    ]);

    // Save to database
    const photo = await createPhoto({
      title,
      description: description || null,
      location: location || null,
      date_taken: dateTaken || null,
      image_url: imageBlob.url,
      thumbnail_url: thumbnailBlob.url,
    });

    if (!photo) {
      return NextResponse.json(
        { error: 'Failed to create photo' },
        { status: 500 }
      );
    }

    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    console.error('Error creating photo:', error);
    return NextResponse.json(
      { error: 'Failed to create photo' },
      { status: 500 }
    );
  }
}
