const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getFeaturedProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

// Protected routes
router.post('/:id/reviews', protect, createProductReview);

// Admin routes
router.route('/')
  .post(protect, admin, createProduct);

router.route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
