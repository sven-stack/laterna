/**
 * Database initialization script
 * Run this once to set up your database tables
 */

import { initDatabase } from '../lib/db';

async function main() {
  console.log('Initializing database...');
  try {
    await initDatabase();
    console.log('✅ Database initialized successfully!');
    console.log('\nNext steps:');
    console.log('1. Create your first admin user by making a POST request to /api/auth/signup');
    console.log('2. Use the credentials to log in at /admin/login');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

main();
