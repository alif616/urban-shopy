import { connectDatabase, disconnectDatabase } from '../config/database';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Order } from '../models/Order';
import { Wishlist } from '../models/Wishlist';
import { DEMO_PRODUCTS } from './productsData';

const seed = async (): Promise<void> => {
  try {
    await connectDatabase();
    console.log('[seed] Connected to database.');
    await Promise.all([Product.deleteMany({}), User.deleteMany({ email: 'demo@urbanshopy.com' })]);
    console.log('[seed] Cleared existing demo products and demo user.');
    const insertedProducts = await Product.insertMany(DEMO_PRODUCTS);
    console.log('[seed] Inserted ' + insertedProducts.length + ' demo products.');
    const demoUser = await User.create({ name: 'Demo User', email: 'demo@urbanshopy.com', password: 'password123', role: 'user' });
    console.log('[seed] Created demo user: ' + demoUser.email);
    await Wishlist.create({ userId: demoUser._id, productIds: [] });
    console.log('[seed] Initialized demo user wishlist.');
    await Order.deleteMany({ userId: demoUser._id });
    console.log('\n[seed] Seeding completed successfully.');
    console.log('[seed] Demo credentials:');
    console.log('        Email:    demo@urbanshopy.com');
    console.log('        Password: password123\n');
    await disconnectDatabase();
    process.exit(0);
  } catch (error: any) {
    console.error('[seed] Seeding failed:', error.message);
    if (error.stack) console.error(error.stack);
    await disconnectDatabase();
    process.exit(1);
  }
};
seed();
