import { sql } from '@vercel/postgres';

export interface Photo {
  id: number;
  title: string;
  description: string | null;
  location: string | null;
  date_taken: string | null;
  image_url: string;
  thumbnail_url: string;
  created_at: string;
  updated_at: string;
}

export async function initDatabase() {
  try {
    // Create photos table
    await sql`
      CREATE TABLE IF NOT EXISTS photos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        location VARCHAR(255),
        date_taken DATE,
        image_url TEXT NOT NULL,
        thumbnail_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create admin users table (simple auth)
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export async function getPhotos(): Promise<Photo[]> {
  try {
    const { rows } = await sql<Photo>`
      SELECT * FROM photos
      ORDER BY date_taken DESC, created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}

export async function getPhotoById(id: number): Promise<Photo | null> {
  try {
    const { rows } = await sql<Photo>`
      SELECT * FROM photos WHERE id = ${id}
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching photo:', error);
    return null;
  }
}

export async function createPhoto(photo: Omit<Photo, 'id' | 'created_at' | 'updated_at'>): Promise<Photo | null> {
  try {
    const { rows } = await sql<Photo>`
      INSERT INTO photos (title, description, location, date_taken, image_url, thumbnail_url)
      VALUES (${photo.title}, ${photo.description}, ${photo.location}, ${photo.date_taken}, ${photo.image_url}, ${photo.thumbnail_url})
      RETURNING *
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Error creating photo:', error);
    return null;
  }
}

export async function updatePhoto(id: number, photo: Partial<Omit<Photo, 'id' | 'created_at' | 'updated_at'>>): Promise<Photo | null> {
  try {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (photo.title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(photo.title);
    }
    if (photo.description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(photo.description);
    }
    if (photo.location !== undefined) {
      updates.push(`location = $${paramCount++}`);
      values.push(photo.location);
    }
    if (photo.date_taken !== undefined) {
      updates.push(`date_taken = $${paramCount++}`);
      values.push(photo.date_taken);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    const query = `
      UPDATE photos
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;
    values.push(id);

    const result = await sql.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error updating photo:', error);
    return null;
  }
}

export async function deletePhoto(id: number): Promise<boolean> {
  try {
    await sql`DELETE FROM photos WHERE id = ${id}`;
    return true;
  } catch (error) {
    console.error('Error deleting photo:', error);
    return false;
  }
}
