import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

export async function createAdminUser(username: string, password: string): Promise<AdminUser | null> {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const { rows } = await sql<AdminUser>`
      INSERT INTO admin_users (username, password_hash)
      VALUES (${username}, ${passwordHash})
      RETURNING id, username, password_hash, created_at
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Error creating admin user:', error);
    return null;
  }
}

export async function verifyAdminUser(username: string, password: string): Promise<AdminUser | null> {
  try {
    const { rows } = await sql<AdminUser>`
      SELECT * FROM admin_users WHERE username = ${username}
    `;

    if (rows.length === 0) {
      return null;
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error verifying admin user:', error);
    return null;
  }
}

export async function getAdminUserByUsername(username: string): Promise<AdminUser | null> {
  try {
    const { rows } = await sql<AdminUser>`
      SELECT * FROM admin_users WHERE username = ${username}
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching admin user:', error);
    return null;
  }
}
