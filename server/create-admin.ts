import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { User } from './src/models/User';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: 'admin@urbanshopy.com' });
    if (existing) {
      console.log('Admin user already exists:');
      console.log('  Email:    admin@urbanshopy.com');
      console.log('  Role:     ' + existing.role);
      console.log('');
      console.log('To reset the password, delete it in MongoDB Atlas and re-run this script.');
      process.exit(0);
    }

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@urbanshopy.com',
      password: 'admin123',
      role: 'admin',
    });

    console.log('');
    console.log('✅ Admin user created successfully');
    console.log('   Email:    admin@urbanshopy.com');
    console.log('   Password: admin123');
    console.log('   Role:     ' + admin.role);
    console.log('');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err: any) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

createAdmin();
