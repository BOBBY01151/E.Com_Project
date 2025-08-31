import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../store/slices/productSlice'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { product, isLoading } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(getProduct(id))
  }, [dispatch, id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div>
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="ml-2 text-lg text-red-600">
                    -{product.discount}% off
                  </span>
                )}
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  <strong>Category:</strong> {product.category}
                </p>
                {product.brand && (
                  <p className="text-sm text-gray-600">
                    <strong>Brand:</strong> {product.brand}
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  <strong>Stock:</strong> {product.stock} available
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Available Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Available Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button className="w-full btn-primary">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
