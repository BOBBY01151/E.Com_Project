import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../store/slices/productSlice'
import ProductCard from '../components/ProductCard'
import { Search, Filter, Grid, List } from 'lucide-react'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('keyword') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')

  const dispatch = useDispatch()
  const { products, isLoading, page, pages, total } = useSelector((state) => state.products)

  const categories = ['clothing', 'shoes', 't-shirts', 'accessories']

  useEffect(() => {
    const params = {}
    if (searchTerm) params.keyword = searchTerm
    if (selectedCategory) params.category = selectedCategory
    if (page > 1) params.pageNumber = page

    dispatch(getProducts(params))
  }, [dispatch, searchTerm, selectedCategory, page])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchTerm) params.set('keyword', searchTerm)
    if (selectedCategory) params.set('category', selectedCategory)
    setSearchParams(params)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category)
    const params = new URLSearchParams()
    if (searchTerm) params.set('keyword', searchTerm)
    if (category !== selectedCategory) params.set('category', category)
    setSearchParams(params)
  }

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams)
    params.set('pageNumber', newPage)
    setSearchParams(params)
  }

  const filteredProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Discover our collection of quality products</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="input-field pl-10"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-3 flex items-center bg-primary-600 text-white rounded-r-lg hover:bg-primary-700"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results and Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div className="text-sm text-gray-600 mb-4 lg:mb-0">
            Showing {products.length} of {total} products
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field text-sm"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {[...Array(pages)].map((_, i) => {
                    const pageNumber = i + 1
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          page === pageNumber
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Products
