import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '../store/slices/productSlice'
import { getAllOrders } from '../store/slices/orderSlice'
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ArrowRight,
  Plus,
  Eye
} from 'lucide-react'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { products, total: totalProducts } = useSelector((state) => state.products)
  const { orders, total: totalOrders } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(getProducts({ pageNumber: 1 }))
    dispatch(getAllOrders())
  }, [dispatch])

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)
  const pendingOrders = orders.filter(order => order.status === 'pending').length
  const recentOrders = orders.slice(0, 5)

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/products'
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'bg-green-500',
      link: '/admin/orders'
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      link: '/admin/orders'
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      icon: TrendingUp,
      color: 'bg-red-500',
      link: '/admin/orders'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your e-commerce management panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/admin/products/new"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <Plus className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium">Add New Product</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium">View All Orders</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
              <Link
                to="/admin/products"
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-medium">Manage Products</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Link
                to="/admin/orders"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No orders yet</p>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.user?.name || 'Unknown User'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
            <Link
              to="/admin/products"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 6).map((product) => (
              <div
                key={product._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <Link
                    to={`/admin/products/${product._id}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
