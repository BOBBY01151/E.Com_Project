import axios from 'axios'

const API_URL = '/api/products/'

// Get all products
const getProducts = async (params = {}) => {
  const response = await axios.get(API_URL, { params })
  return response.data
}

// Get featured products
const getFeaturedProducts = async () => {
  const response = await axios.get(API_URL + 'featured')
  return response.data
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
