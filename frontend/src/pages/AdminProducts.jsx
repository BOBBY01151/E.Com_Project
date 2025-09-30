import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  DollarSign,
  Tag,
  Star,
  Grid,
  List,
  MoreVertical,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Image as ImageIcon,
  Calendar,
  ShoppingBag
} from 'lucide-react'

const AdminProducts = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedProducts, setSelectedProducts] = useState(new Set())

  // Mock products data for UI design
  const mockProducts = [
    {
      _id: 'PROD-001',
      name: 'Premium Denim Jeans',
      description: 'High-quality denim jeans made from authentic Japanese selvedge construction. Perfect fit with premium comfort.',
      price: 89.99,
      originalPrice: 119.99,
      category: 'denim',
      brand: 'Luxury Denim Co.',
      images: [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'
      ],
      mainImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      stock: 45,
      sizes: ['28', '30', '32', '34', '36'],
      colors: ['Blue', 'Black'],
      status: 'active',
      featured: true,
      rating: 4.8,
      reviews: 124,
      createdAt: '2024-01-10T10:30:00Z',
      updatedAt: '2024-01-15T14:20:00Z',
      tags: ['premium', 'denim', 'selvedge', 'authentic']
    },
    {
      _id: 'PROD-002',
      name: 'Classic White T-Shirt',
      description: 'Essential white t-shirt crafted from 100% organic cotton. Soft, comfortable, and perfect for everyday wear.',
      price: 24.99,
      originalPrice: 34.99,
      category: 'tshirt',
      brand: 'Organic Basics',
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        'https://images.unsplash.com/photo-1583743814966-8936f37f7f8e?w=400'
      ],
      mainImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      stock: 120,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Gray'],
      status: 'active',
      featured: false,
      rating: 4.6,
      reviews: 89,
      createdAt: '2024-01-08T09:15:00Z',
      updatedAt: '2024-01-12T11:45:00Z',
      tags: ['organic', 'cotton', 'essential', 'basic']
    },
    {
      _id: 'PROD-003',
      name: 'Designer Sneakers',
      description: 'Luxury designer sneakers with premium leather construction. Comfortable and stylish for any occasion.',
      price: 159.99,
      originalPrice: 199.99,
      category: 'shoes',
      brand: 'Premium Footwear',
      images: [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'
      ],
      mainImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
      stock: 28,
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['White', 'Black'],
      status: 'active',
      featured: true,
      rating: 4.9,
      reviews: 156,
      createdAt: '2024-01-05T14:20:00Z',
      updatedAt: '2024-01-14T16:30:00Z',
      tags: ['luxury', 'leather', 'designer', 'premium']
    },
    {
      _id: 'PROD-004',
      name: 'Luxury Hoodie',
      description: 'Premium hoodie made from the finest materials. Ultra-soft interior with durable exterior construction.',
      price: 79.99,
      originalPrice: 99.99,
      category: 'tshirt',
      brand: 'Comfort Wear',
      images: [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
      ],
      mainImage: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
      stock: 67,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Gray', 'Navy'],
      status: 'active',
      featured: false,
      rating: 4.7,
      reviews: 73,
      createdAt: '2024-01-03T12:10:00Z',
      updatedAt: '2024-01-11T09:25:00Z',
      tags: ['luxury', 'hoodie', 'comfort', 'premium']
    },
    {
      _id: 'PROD-005',
      name: 'Premium Jacket',
      description: 'High-end jacket crafted from premium materials. Perfect for both casual and formal occasions.',
      price: 199.99,
      originalPrice: 249.99,
      category: 'denim',
      brand: 'Style Masters',
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400'
      ],
      mainImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      stock: 15,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Brown', 'Navy'],
      status: 'low-stock',
      featured: true,
      rating: 4.8,
      reviews: 92,
      createdAt: '2024-01-01T08:45:00Z',
      updatedAt: '2024-01-13T15:40:00Z',
      tags: ['premium', 'jacket', 'formal', 'luxury']
    },
    {
      _id: 'PROD-006',
      name: 'Casual Shorts',
      description: 'Comfortable casual shorts perfect for summer. Made from breathable cotton blend material.',
      price: 39.99,
      originalPrice: 49.99,
      category: 'denim',
      brand: 'Summer Style',
      images: [
        'https://images.unsplash.com/photo-1506629905607-3a6e7b5b5b5b?w=400',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'
      ],
      mainImage: 'https://images.unsplash.com/photo-1506629905607-3a6e7b5b5b5b?w=400',
      stock: 0,
      sizes: ['28', '30', '32', '34', '36'],
      colors: ['Blue', 'Khaki'],
      status: 'out-of-stock',
      featured: false,
      rating: 4.4,
      reviews: 45,
      createdAt: '2023-12-28T16:20:00Z',
      updatedAt: '2024-01-10T10:15:00Z',
      tags: ['casual', 'shorts', 'summer', 'cotton']
    }
  ]

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter)
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(product => product.status === statusFilter)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'price-high':
          return b.price - a.price
        case 'price-low':
          return a.price - b.price
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'stock-low':
          return a.stock - b.stock
        case 'rating-high':
          return b.rating - a.rating
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, categoryFilter, statusFilter, sortBy])

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'low-stock': 'bg-yellow-100 text-yellow-800',
      'out-of-stock': 'bg-red-100 text-red-800',
      'inactive': 'bg-gray-100 text-gray-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getCategoryIcon = (category) => {
    const icons = {
      'shoes': '👟',
      'tshirt': '👕',
      'denim': '👖'
    }
    return icons[category] || '📦'
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const toggleProductSelection = (productId) => {
    const newSelected = new Set(selectedProducts)
    if (newSelected.has(productId)) {
      newSelected.delete(productId)
    } else {
      newSelected.add(productId)
    }
    setSelectedProducts(newSelected)
  }

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p._id !== productId))
    toast.success('Product deleted successfully')
  }

  const toggleFeatured = (productId) => {
    setProducts(prev => prev.map(p => 
      p._id === productId ? { ...p, featured: !p.featured } : p
    ))
    toast.success('Featured status updated')
  }

  const calculateStats = () => {
    const totalProducts = products.length
    const activeProducts = products.filter(p => p.status === 'active').length
    const lowStockProducts = products.filter(p => p.status === 'low-stock').length
    const outOfStockProducts = products.filter(p => p.status === 'out-of-stock').length
    const featuredProducts = products.filter(p => p.featured).length
    const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)

    return {
      totalProducts,
      activeProducts,
      lowStockProducts,
      outOfStockProducts,
      featuredProducts,
      totalRevenue
    }
  }

  const stats = calculateStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Dashboard
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4" />
                Export
              </button>
              <button
                onClick={() => navigate('/admin/products/new')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Product Management</h1>
          <p className="text-gray-600 mt-2">Manage your product catalog and inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">{stats.lowStockProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <Package className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900">{stats.outOfStockProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-gray-900">{stats.featuredProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inventory Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="shoes">👟 Shoes</option>
              <option value="tshirt">👕 T-Shirts</option>
              <option value="denim">👖 Denim</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="stock-low">Stock: Low to High</option>
              <option value="rating-high">Rating: High to Low</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    {product.featured && (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        <Star className="h-3 w-3 inline mr-1" />
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <button className="bg-white/80 hover:bg-white p-2 rounded-full">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
                    </div>
                    <span className="text-lg ml-2">{getCategoryIcon(product.category)}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">{formatCurrency(product.price)}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Stock: {product.stock}</span>
                    <span>{product.reviews} reviews</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/products/${product._id}`)}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="h-3 w-3 inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => toggleFeatured(product._id)}
                      className={`py-2 px-3 rounded-md text-sm transition-colors ${
                        product.featured 
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Star className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="py-2 px-3 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.mainImage}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{getCategoryIcon(product.category)}</span>
                          <span className="text-sm text-gray-900 capitalize">{product.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(product.price)}</div>
                        {product.originalPrice > product.price && (
                          <div className="text-xs text-gray-500 line-through">{formatCurrency(product.originalPrice)}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.stock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                          {product.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-900">{product.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(product.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/products/${product._id}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => toggleFeatured(product._id)}
                            className={`${product.featured ? 'text-yellow-600' : 'text-gray-400'} hover:text-yellow-600`}
                          >
                            <Star className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-8 rounded-lg shadow-md">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{' '}
                  <span className="font-medium">{filteredProducts.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProducts
