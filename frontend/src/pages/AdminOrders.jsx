import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { 
  ArrowLeft, 
  Search, 
  Download,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  User,
  DollarSign,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  MoreVertical,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

const AdminOrders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [expandedOrders, setExpandedOrders] = useState(new Set())

  // Mock orders data for UI design
  const mockOrders = [
    {
      _id: 'ORD-001',
      orderNumber: 'ORD-2024-001',
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567'
      },
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      items: [
        { id: '1', name: 'Premium Denim Jeans', price: 89.99, quantity: 1, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150' },
        { id: '2', name: 'Classic White T-Shirt', price: 24.99, quantity: 2, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150' }
      ],
      totalAmount: 139.97,
      status: 'pending',
      paymentMethod: 'Credit Card',
      orderDate: '2024-01-15T10:30:00Z',
      shippingDate: null,
      deliveryDate: null,
      trackingNumber: null,
      notes: 'Customer requested express shipping'
    },
    {
      _id: 'ORD-002',
      orderNumber: 'ORD-2024-002',
      customer: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 987-6543'
      },
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      items: [
        { id: '3', name: 'Designer Sneakers', price: 159.99, quantity: 1, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=150' }
      ],
      totalAmount: 159.99,
      status: 'processing',
      paymentMethod: 'PayPal',
      orderDate: '2024-01-14T15:45:00Z',
      shippingDate: '2024-01-16T09:00:00Z',
      deliveryDate: null,
      trackingNumber: 'TRK123456789',
      notes: ''
    },
    {
      _id: 'ORD-003',
      orderNumber: 'ORD-2024-003',
      customer: {
        name: 'Mike Johnson',
        email: 'mike.j@example.com',
        phone: '+1 (555) 456-7890'
      },
      shippingAddress: {
        street: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      },
      items: [
        { id: '4', name: 'Luxury Hoodie', price: 79.99, quantity: 1, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150' },
        { id: '5', name: 'Casual Shorts', price: 39.99, quantity: 1, image: 'https://images.unsplash.com/photo-1506629905607-3a6e7b5b5b5b?w=150' }
      ],
      totalAmount: 119.98,
      status: 'shipped',
      paymentMethod: 'Credit Card',
      orderDate: '2024-01-13T08:20:00Z',
      shippingDate: '2024-01-15T14:30:00Z',
      deliveryDate: null,
      trackingNumber: 'TRK987654321',
      notes: 'Delivered to front door'
    },
    {
      _id: 'ORD-004',
      orderNumber: 'ORD-2024-004',
      customer: {
        name: 'Sarah Wilson',
        email: 'sarah.w@example.com',
        phone: '+1 (555) 321-0987'
      },
      shippingAddress: {
        street: '321 Elm St',
        city: 'Miami',
        state: 'FL',
        zipCode: '33101',
        country: 'USA'
      },
      items: [
        { id: '6', name: 'Premium Jacket', price: 199.99, quantity: 1, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150' }
      ],
      totalAmount: 199.99,
      status: 'delivered',
      paymentMethod: 'Credit Card',
      orderDate: '2024-01-12T12:15:00Z',
      shippingDate: '2024-01-14T10:00:00Z',
      deliveryDate: '2024-01-16T16:45:00Z',
      trackingNumber: 'TRK456789123',
      notes: 'Customer satisfied with delivery'
    },
    {
      _id: 'ORD-005',
      orderNumber: 'ORD-2024-005',
      customer: {
        name: 'David Brown',
        email: 'david.brown@example.com',
        phone: '+1 (555) 654-3210'
      },
      shippingAddress: {
        street: '654 Maple Dr',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA'
      },
      items: [
        { id: '7', name: 'Vintage T-Shirt', price: 29.99, quantity: 3, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150' }
      ],
      totalAmount: 89.97,
      status: 'cancelled',
      paymentMethod: 'Credit Card',
      orderDate: '2024-01-11T16:30:00Z',
      shippingDate: null,
      deliveryDate: null,
      trackingNumber: null,
      notes: 'Customer requested cancellation'
    }
  ]

  useEffect(() => {
    // Simulate loading orders
    setTimeout(() => {
      setOrders(mockOrders)
      setFilteredOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = [...orders]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date()
      const filterDate = new Date()
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0)
          break
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
        default:
          break
      }
      
      if (dateFilter !== 'all') {
        filtered = filtered.filter(order => new Date(order.orderDate) >= filterDate)
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.orderDate) - new Date(a.orderDate)
        case 'oldest':
          return new Date(a.orderDate) - new Date(b.orderDate)
        case 'amount-high':
          return b.totalAmount - a.totalAmount
        case 'amount-low':
          return a.totalAmount - b.totalAmount
        default:
          return 0
      }
    })

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter, dateFilter, sortBy])

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      processing: Package,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: XCircle
    }
    const Icon = icons[status] || Clock
    return <Icon className="h-4 w-4" />
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order._id === orderId ? { ...order, status: newStatus } : order
    ))
    toast.success(`Order status updated to ${newStatus}`)
  }

  const toggleOrderExpansion = (orderId) => {
    const newExpanded = new Set(expandedOrders)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedOrders(newExpanded)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading orders...</p>
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
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Orders Management</h1>
          <p className="text-gray-600 mt-2">View and manage all customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter(o => o.status === 'processing').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Shipped</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter(o => o.status === 'shipped').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Amount: High to Low</option>
              <option value="amount-low">Amount: Low to High</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <>
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.orderNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            #{order._id}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.customer.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(order.totalAmount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.orderDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleOrderExpansion(order._id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {expandedOrders.has(order._id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Order Details */}
                    {expandedOrders.has(order._id) && (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Order Items */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                              <div className="space-y-3">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                      <div className="font-medium text-gray-900">{item.name}</div>
                                      <div className="text-sm text-gray-500">
                                        Qty: {item.quantity} × {formatCurrency(item.price)}
                                      </div>
                                    </div>
                                    <div className="font-medium text-gray-900">
                                      {formatCurrency(item.price * item.quantity)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Order Details */}
                            <div className="space-y-6">
                              {/* Customer Info */}
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                                <div className="bg-white p-4 rounded-lg border space-y-2">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">{order.customer.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">{order.customer.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">{order.customer.phone}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Shipping Address */}
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">Shipping Address</h4>
                                <div className="bg-white p-4 rounded-lg border">
                                  <div className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                    <div className="text-sm">
                                      <div>{order.shippingAddress.street}</div>
                                      <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</div>
                                      <div>{order.shippingAddress.country}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Order Actions */}
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">Order Actions</h4>
                                <div className="flex flex-wrap gap-2">
                                  {order.status === 'pending' && (
                                    <button
                                      onClick={() => updateOrderStatus(order._id, 'processing')}
                                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                                    >
                                      Process Order
                                    </button>
                                  )}
                                  {order.status === 'processing' && (
                                    <button
                                      onClick={() => updateOrderStatus(order._id, 'shipped')}
                                      className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700"
                                    >
                                      Mark Shipped
                                    </button>
                                  )}
                                  {order.status === 'shipped' && (
                                    <button
                                      onClick={() => updateOrderStatus(order._id, 'delivered')}
                                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                                    >
                                      Mark Delivered
                                    </button>
                                  )}
                                  <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700">
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
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
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{' '}
                  <span className="font-medium">{filteredOrders.length}</span> results
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

export default AdminOrders
