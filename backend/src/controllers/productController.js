const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Check if database is connected
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      console.log('Database not connected, returning fallback data');
      // Return fallback products data
      const fallbackProducts = [
        {
          _id: 'fallback-1',
          name: 'Classic White T-Shirt',
          description: 'Premium cotton classic white t-shirt perfect for everyday wear.',
          price: 29.99,
          category: 'tshirt',
          imageURL: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
          stock: 50,
          sizes: ['S', 'M', 'L', 'XL'],
          brand: 'FashionCo',
          colors: ['White'],
          featured: true,
          discount: 0,
          rating: 4.5,
          numReviews: 12
        },
        {
          _id: 'fallback-2',
          name: 'Premium Denim Jacket',
          description: 'Classic denim jacket with a modern fit. Perfect for layering.',
          price: 89.99,
          category: 'denim',
          imageURL: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500',
          stock: 25,
          sizes: ['S', 'M', 'L', 'XL'],
          brand: 'DenimStyle',
          colors: ['Blue'],
          featured: true,
          discount: 10,
          rating: 4.8,
          numReviews: 8
        },
        {
          _id: 'fallback-3',
          name: 'Running Shoes',
          description: 'High-performance running shoes with superior comfort and support.',
          price: 129.99,
          category: 'shoes',
          imageURL: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
          stock: 30,
          sizes: ['7', '8', '9', '10', '11', '12'],
          brand: 'RunFast',
          colors: ['Black', 'White'],
          featured: true,
          discount: 15,
          rating: 4.7,
          numReviews: 15
        },
        {
          _id: 'fallback-4',
          name: 'Winter Boots',
          description: 'Warm and waterproof winter boots perfect for cold weather.',
          price: 199.99,
          category: 'shoes',
          imageURL: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
          stock: 15,
          sizes: ['7', '8', '9', '10', '11'],
          brand: 'WinterPro',
          colors: ['Brown', 'Black'],
          featured: true,
          discount: 25,
          rating: 4.9,
          numReviews: 6
        }
      ];
      return res.json({
        products: fallbackProducts,
        page: 1,
        pages: 1,
        total: fallbackProducts.length
      });
    }

    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          $text: {
            $search: req.query.keyword
          }
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const count = await Product.countDocuments({ ...keyword, ...category });
    const products = await Product.find({ ...keyword, ...category })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // If it's a database connection error, return fallback data
    if (error.name === 'MongoNetworkError' || error.message.includes('connect')) {
      console.log('Database connection error, returning fallback data');
      const fallbackProducts = [
        {
          _id: 'fallback-1',
          name: 'Classic White T-Shirt',
          description: 'Premium cotton classic white t-shirt perfect for everyday wear.',
          price: 29.99,
          category: 'tshirt',
          imageURL: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
          stock: 50,
          sizes: ['S', 'M', 'L', 'XL'],
          brand: 'FashionCo',
          colors: ['White'],
          featured: true,
          discount: 0,
          rating: 4.5,
          numReviews: 12
        },
        {
          _id: 'fallback-2',
          name: 'Premium Denim Jacket',
          description: 'Classic denim jacket with a modern fit. Perfect for layering.',
          price: 89.99,
          category: 'denim',
          imageURL: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500',
          stock: 25,
          sizes: ['S', 'M', 'L', 'XL'],
          brand: 'DenimStyle',
          colors: ['Blue'],
          featured: true,
          discount: 10,
          rating: 4.8,
          numReviews: 8
        },
        {
          _id: 'fallback-3',
          name: 'Running Shoes',
          description: 'High-performance running shoes with superior comfort and support.',
          price: 129.99,
          category: 'shoes',
          imageURL: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
          stock: 30,
          sizes: ['7', '8', '9', '10', '11', '12'],
          brand: 'RunFast',
          colors: ['Black', 'White'],
          featured: true,
          discount: 15,
          rating: 4.7,
          numReviews: 15
        },
        {
          _id: 'fallback-4',
          name: 'Winter Boots',
          description: 'Warm and waterproof winter boots perfect for cold weather.',
          price: 199.99,
          category: 'shoes',
          imageURL: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
          stock: 15,
          sizes: ['7', '8', '9', '10', '11'],
          brand: 'WinterPro',
          colors: ['Brown', 'Black'],
          featured: true,
          discount: 25,
          rating: 4.9,
          numReviews: 6
        }
      ];
      return res.json({
        products: fallbackProducts,
        page: 1,
        pages: 1,
        total: fallbackProducts.length
      });
    }
    
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    // Check if database is connected
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      console.log('Database not connected, returning fallback data');
      // Return fallback featured products data
      const fallbackProducts = [
        {
          _id: 'fallback-1',
          name: 'Classic White T-Shirt',
          description: 'Premium cotton classic white t-shirt perfect for everyday wear.',
          price: 29.99,
          category: 'tshirt',
          imageURL: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
          stock: 50,
          sizes: ['S', 'M', 'L', 'XL'],
          brand: 'FashionCo',
          colors: ['White'],
          featured: true,
          discount: 0,
          rating: 4.5,
          numReviews: 12
        },
        {
          _id: 'fallback-2',
          name: 'Denim Jacket',
          description: 'Classic denim jacket with a modern fit. Perfect for layering.',
          price: 89.99,
          category: 'denim',
          imageURL: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500',
          stock: 25,
          sizes: ['S', 'M', 'L', 'XL'],
          brand: 'DenimStyle',
          colors: ['Blue'],
          featured: true,
          discount: 10,
          rating: 4.8,
          numReviews: 8
        },
        {
          _id: 'fallback-3',
          name: 'Running Shoes',
          description: 'High-performance running shoes with superior comfort and support.',
          price: 129.99,
          category: 'shoes',
          imageURL: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
          stock: 30,
          sizes: ['7', '8', '9', '10', '11', '12'],
          brand: 'RunFast',
          colors: ['Black', 'White'],
          featured: true,
          discount: 15,
          rating: 4.7,
          numReviews: 15
        },
        {
          _id: 'fallback-4',
          name: 'Winter Boots',
          description: 'Warm and waterproof winter boots perfect for cold weather.',
          price: 199.99,
          category: 'shoes',
          imageURL: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
          stock: 15,
          sizes: ['7', '8', '9', '10', '11'],
          brand: 'WinterPro',
          colors: ['Brown', 'Black'],
          featured: true,
          discount: 25,
          rating: 4.9,
          numReviews: 6
        }
      ];
      return res.json(fallbackProducts);
    }

    const products = await Product.find({ featured: true }).limit(8);
    res.json(products);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    
    // If it's a database connection error, return fallback data
    if (error.name === 'MongoNetworkError' || error.message.includes('connect')) {
      console.log('Database connection error, returning fallback data');
      const fallbackProducts = [
        {
          _id: 'fallback-1',
          name: 'Classic White T-Shirt',
          description: 'Premium cotton classic white t-shirt perfect for everyday wear.',
          price: 29.99,
          category: 'tshirt',
          imageURL: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
          stock: 50,
          sizes: ['S', 'M', 'L', 'XL'],
          brand: 'FashionCo',
          colors: ['White'],
          featured: true,
          discount: 0,
          rating: 4.5,
          numReviews: 12
        },
        {
          _id: 'fallback-2',
          name: 'Denim Jacket',
          description: 'Classic denim jacket with a modern fit. Perfect for layering.',
          price: 89.99,
          category: 'denim',
          imageURL: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500',
          stock: 25,
          sizes: ['S', 'M', 'L', 'XL'],
          brand: 'DenimStyle',
          colors: ['Blue'],
          featured: true,
          discount: 10,
          rating: 4.8,
          numReviews: 8
        },
        {
          _id: 'fallback-3',
          name: 'Running Shoes',
          description: 'High-performance running shoes with superior comfort and support.',
          price: 129.99,
          category: 'shoes',
          imageURL: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
          stock: 30,
          sizes: ['7', '8', '9', '10', '11', '12'],
          brand: 'RunFast',
          colors: ['Black', 'White'],
          featured: true,
          discount: 15,
          rating: 4.7,
          numReviews: 15
        },
        {
          _id: 'fallback-4',
          name: 'Winter Boots',
          description: 'Warm and waterproof winter boots perfect for cold weather.',
          price: 199.99,
          category: 'shoes',
          imageURL: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
          stock: 15,
          sizes: ['7', '8', '9', '10', '11'],
          brand: 'WinterPro',
          colors: ['Brown', 'Black'],
          featured: true,
          discount: 25,
          rating: 4.9,
          numReviews: 6
        }
      ];
      return res.json(fallbackProducts);
    }
    
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageURL: req.body.imageURL,
      brand: req.body.brand,
      category: req.body.category,
      stock: req.body.stock,
      sizes: req.body.sizes,
      colors: req.body.colors,
      featured: req.body.featured || false,
      discount: req.body.discount || 0
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      imageURL,
      brand,
      category,
      stock,
      sizes,
      colors,
      featured,
      discount
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.imageURL = imageURL || product.imageURL;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.stock = stock !== undefined ? stock : product.stock;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.featured = featured !== undefined ? featured : product.featured;
      product.discount = discount !== undefined ? discount : product.discount;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400).json({ message: 'Product already reviewed' });
        return;
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getFeaturedProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview
};
