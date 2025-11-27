import { NextResponse } from 'next/server';
import { createAdminUser, getAdminUserByUsername } from '@/lib/auth';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { username, password, setupKey } = await request.json();

    // Simple security: require a setup key from env for first admin creation
    // OR allow if no admins exist yet
    const { rows } = await sql`SELECT COUNT(*) as count FROM admin_users`;
    const adminCount = parseInt(rows[0].count);

    if (adminCount > 0 && setupKey !== process.env.ADMIN_SETUP_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await getAdminUserByUsername(username);
    if (existing) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      );
    }

    const user = await createAdminUser(username, password);

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Admin user created successfully', username: user.username },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
