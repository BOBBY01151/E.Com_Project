import axios from 'axios'

const API_URL = '/api/products/'

// Get all products
const getProducts = async (params = {}) => {
  const response = await axios.get(API_URL, { params })
  return response.data
}

// Get featured products
const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(API_URL + 'featured')
    return response.data
  } catch (error) {
    console.error('Error fetching featured products:', error)
    // Return fallback data if API fails
    return [
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
    ]
  }
}

// Get single product
const getProduct = async (productId) => {
  const response = await axios.get(API_URL + productId)
  return response.data
}

// Create product (Admin)
const createProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, productData, config)
  return response.data
}

// Update product (Admin)
const updateProduct = async (productId, productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + productId, productData, config)
  return response.data
}

// Delete product (Admin)
const deleteProduct = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + productId, config)
  return response.data
}

const productService = {
  getProducts,
  getFeaturedProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}

export default productService
