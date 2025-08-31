import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'
import { toast } from 'react-hot-toast'
import { ShoppingCart, Star } from 'lucide-react'

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size')
      return
    }

    setIsAddingToCart(true)
    dispatch(addToCart({ product, size: selectedSize, quantity: 1 }))
    toast.success('Added to cart!')
    setIsAddingToCart(false)
  }

  const discountedPrice = product.discount > 0 
    ? product.price - (product.price * product.discount / 100)
    : product.price

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        <img
          src={product.imageURL}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            -{product.discount}%
          </div>
        )}
        {product.featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            Featured
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
          {product.rating > 0 && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">
                {product.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.brand && (
          <p className="text-sm text-gray-600 mb-2">Brand: {product.brand}</p>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {product.discount > 0 ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Size Selection */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size:
          </label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                  selectedSize === size
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAddingToCart}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          <ShoppingCart size={18} />
          <span>
            {isAddingToCart ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
