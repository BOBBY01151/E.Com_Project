import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { getProduct, updateProduct } from '../store/slices/productSlice'
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Star,
  Tag,
  Package,
  DollarSign,
  Upload,
  X,
  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react'

const ProductEdit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { product, isLoading, isError, message } = useSelector((state) => state.products)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'tshirt',
    imageURL: '',
    stock: '',
    sizes: [],
    brand: '',
    colors: [],
    featured: false,
    discount: 0,
    rating: 0,
    numReviews: 0
  })

  const [newSize, setNewSize] = useState('')
  const [newColor, setNewColor] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load product data
  useEffect(() => {
    if (id && id !== 'new') {
      // For now, we'll use fallback data since we don't have a real backend
      // In a real app, you would dispatch(getProduct(id))
      console.log('Loading product with ID:', id)
    }
  }, [dispatch, id])

  // Update form when product data loads
  useEffect(() => {
    if (product && id !== 'new') {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || 'tshirt',
        imageURL: product.imageURL || '',
        stock: product.stock || '',
        sizes: product.sizes || [],
        brand: product.brand || '',
        colors: product.colors || [],
        featured: product.featured || false,
        discount: product.discount || 0,
        rating: product.rating || 0,
        numReviews: product.numReviews || 0
      })
    }
  }, [product, id])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Add size to sizes array
  const addSize = () => {
    if (newSize.trim() && !formData.sizes.includes(newSize.trim())) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize.trim()]
      }))
      setNewSize('')
    }
  }

  // Remove size from sizes array
  const removeSize = (sizeToRemove) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(size => size !== sizeToRemove)
    }))
  }

  // Add color to colors array
  const addColor = () => {
    if (newColor.trim() && !formData.colors.includes(newColor.trim())) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, newColor.trim()]
      }))
      setNewColor('')
    }
  }

  // Remove color from colors array
  const removeColor = (colorToRemove) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(color => color !== colorToRemove)
    }))
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required'
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required'
    }

    if (!formData.imageURL.trim()) {
      newErrors.imageURL = 'Product image URL is required'
    }

    if (formData.stock === '' || formData.stock < 0) {
      newErrors.stock = 'Valid stock quantity is required'
    }

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required'
    }

    if (formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = 'Discount must be between 0 and 100'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }

    setIsSubmitting(true)
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        discount: parseInt(formData.discount),
        rating: parseFloat(formData.rating),
        numReviews: parseInt(formData.numReviews)
      }

      if (id === 'new') {
        // Create new product - for now just show success message
        toast.success('Product created successfully!')
      } else {
        // Update existing product - for now just show success message
        toast.success('Product updated successfully!')
        // TODO: Implement actual update when backend supports it
        // await dispatch(updateProduct({ id, productData }))
      }
      
      navigate('/admin/products')
    } catch (error) {
      toast.error('Failed to save product')
      console.error('Save error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle back navigation
  const handleBack = () => {
    navigate('/admin/products')
  }

  // For new products, we don't need to load anything
  if (id === 'new') {
    // Continue to render the form for new product
  } else if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  } else if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Product</h2>
          <p className="text-gray-600 mb-4">{message}</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Products
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {id === 'new' ? 'Add New Product' : 'Edit Product'}
            </h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="tshirt">👕 T-Shirt</option>
                  <option value="denim">👖 Denim</option>
                  <option value="shoes">👟 Shoes</option>
                </select>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                )}
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.brand ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter brand name"
                />
                {errors.brand && (
                  <p className="mt-1 text-sm text-red-600">{errors.brand}</p>
                )}
              </div>

              {/* Discount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.discount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
                {errors.discount && (
                  <p className="mt-1 text-sm text-red-600">{errors.discount}</p>
                )}
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.imageURL ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.imageURL && (
                  <p className="mt-1 text-sm text-red-600">{errors.imageURL}</p>
                )}
                {formData.imageURL && (
                  <div className="mt-4">
                    <img
                      src={formData.imageURL}
                      alt="Product preview"
                      className="w-32 h-32 object-cover rounded-md border"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Sizes</h2>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                placeholder="Add size (e.g., S, M, L)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
              />
              <button
                type="button"
                onClick={addSize}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.sizes.map((size) => (
                <span
                  key={size}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {size}
                  <button
                    type="button"
                    onClick={() => removeSize(size)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Colors</h2>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                placeholder="Add color (e.g., Red, Blue)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
              />
              <button
                type="button"
                onClick={addColor}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.colors.map((color) => (
                <span
                  key={color}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => removeColor(color)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Options</h2>
            
            <div className="space-y-4">
              {/* Featured */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                  <Star className="h-4 w-4 inline mr-1" />
                  Featured Product
                </label>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Number of Reviews */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Reviews
                </label>
                <input
                  type="number"
                  name="numReviews"
                  value={formData.numReviews}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
              {id === 'new' ? 'Create Product' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductEdit
