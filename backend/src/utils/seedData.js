const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const sampleProducts = [
  {
    name: 'Classic White T-Shirt',
    description: 'Premium cotton classic white t-shirt perfect for everyday wear. Comfortable fit and breathable fabric.',
    price: 29.99,
    category: 't-shirts',
    imageURL: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    stock: 50,
    sizes: ['S', 'M', 'L', 'XL'],
    brand: 'FashionCo',
    colors: ['White'],
    featured: true,
    discount: 0
  },
  {
    name: 'Denim Jacket',
    description: 'Classic denim jacket with a modern fit. Perfect for layering in any season.',
    price: 89.99,
    category: 'clothing',
    imageURL: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500',
    stock: 25,
    sizes: ['S', 'M', 'L', 'XL'],
    brand: 'DenimStyle',
    colors: ['Blue'],
    featured: true,
    discount: 10
  },
  {
    name: 'Running Shoes',
    description: 'High-performance running shoes with superior comfort and support for long-distance runs.',
    price: 129.99,
    category: 'shoes',
    imageURL: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 30,
    sizes: ['7', '8', '9', '10', '11', '12'],
    brand: 'RunFast',
    colors: ['Black', 'White'],
    featured: true,
    discount: 15
  },
  {
    name: 'Casual Hoodie',
    description: 'Soft and comfortable hoodie perfect for casual outings. Available in multiple colors.',
    price: 59.99,
    category: 'clothing',
    imageURL: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    stock: 40,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'ComfortWear',
    colors: ['Gray', 'Black', 'Navy'],
    featured: false,
    discount: 0
  },
  {
    name: 'Leather Sneakers',
    description: 'Stylish leather sneakers with a modern design. Perfect for both casual and semi-formal occasions.',
    price: 149.99,
    category: 'shoes',
    imageURL: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500',
    stock: 20,
    sizes: ['7', '8', '9', '10', '11'],
    brand: 'UrbanStyle',
    colors: ['Brown', 'Black'],
    featured: false,
    discount: 20
  },
  {
    name: 'Graphic T-Shirt',
    description: 'Trendy graphic t-shirt with unique artwork. Made from 100% organic cotton.',
    price: 34.99,
    category: 't-shirts',
    imageURL: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500',
    stock: 35,
    sizes: ['S', 'M', 'L', 'XL'],
    brand: 'ArtWear',
    colors: ['Black', 'White'],
    featured: false,
    discount: 5
  },
  {
    name: 'Formal Shirt',
    description: 'Elegant formal shirt suitable for business meetings and special occasions.',
    price: 79.99,
    category: 'clothing',
    imageURL: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    stock: 30,
    sizes: ['S', 'M', 'L', 'XL'],
    brand: 'BusinessWear',
    colors: ['White', 'Blue', 'Pink'],
    featured: false,
    discount: 0
  },
  {
    name: 'Winter Boots',
    description: 'Warm and waterproof winter boots perfect for cold weather. Durable construction.',
    price: 199.99,
    category: 'shoes',
    imageURL: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    stock: 15,
    sizes: ['7', '8', '9', '10', '11'],
    brand: 'WinterPro',
    colors: ['Brown', 'Black'],
    featured: true,
    discount: 25
  }
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin user created:', adminUser.email);

    // Create regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'user@example.com',
      password: hashedPassword,
      role: 'user'
    });

    console.log('Regular user created:', regularUser.email);

    // Create products
    const products = await Product.insertMany(sampleProducts);
    console.log(`${products.length} products created`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
