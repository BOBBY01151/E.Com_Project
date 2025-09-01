import { useState, useRef } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  User, 
  Camera, 
  Edit, 
  Save, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
  Star,
  Upload,
  Settings,
  Shield,
  Bell,
  CreditCard,
  Heart,
  Award,
  TrendingUp,
  ArrowLeft
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock user data
const mockUser = {
  id: '1',
  name: 'Alexandra Chen',
  email: 'alexandra.chen@email.com',
  phone: '+1 (555) 123-4567',
  address: '123 Fashion Ave, New York, NY 10001',
  joinDate: 'January 2023',
  avatar: null,
  bio: 'Fashion enthusiast and trend setter. Love collecting unique pieces that express my personality.',
  totalOrders: 23,
  totalSpent: 2847.50,
  memberLevel: 'VIP',
}

// Mock purchase history
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-08-28',
    status: 'delivered',
    total: 299.99,
    items: [
      { name: 'Premium Cotton T-Shirt', price: 49.99, quantity: 2, image: 'https://images.unsplash.com/photo-1685883518316-355533810d68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdHNoaXJ0fGVufDF8fHx8MTc1NjcxOTU3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
      { name: 'Classic Denim Trousers', price: 199.99, quantity: 1, image: 'https://images.unsplash.com/photo-1658910453954-6ca847bb7470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zfGVufDF8fHx8MTc1NjcxOTU4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-08-15',
    status: 'shipped',
    total: 179.99,
    items: [
      { name: 'Running Sneakers', price: 179.99, quantity: 1, image: 'https://images.unsplash.com/photo-1597350584914-55bb62285896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzfGVufDF8fHx8MTc1NjcxOTU4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    ]
  },
  {
    id: 'ORD-003',
    date: '2024-08-01',
    status: 'delivered',
    total: 149.98,
    items: [
      { name: 'Casual Cotton T-Shirt', price: 29.99, quantity: 2, image: 'https://images.unsplash.com/photo-1626496997178-7aa9d13b5799?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjB0c2hpcnR8ZW58MXwxfHx8MTc1NjcxOTU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
      { name: 'Summer Chino Trousers', price: 89.99, quantity: 1, image: 'https://images.unsplash.com/photo-1698919585873-8c6852de9b96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlubyUyMHBhbnRzfGVufDF8fHx8MTc1NjcxOTU4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    ]
  },
]

// Mock favorite items
const mockFavorites = [
  { id: '1', name: 'Vintage Denim Jacket', price: 129.99, image: 'https://images.unsplash.com/photo-1658910453954-6ca847bb7470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zfGVufDF8fHx8MTc1NjcxOTU4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: '2', name: 'Minimalist Tee', price: 39.99, image: 'https://images.unsplash.com/photo-1685883518316-355533810d68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdHNoaXJ0fGVufDF8fHx8MTc1NjcxOTU3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: '3', name: 'Sport Sneakers', price: 159.99, image: 'https://images.unsplash.com/photo-1597350584914-55bb62285896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzfGVufDF8fHx8MTc1NjcxOTU4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
]

const Profile = () => {
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(mockUser)
  const [profileImage, setProfileImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const fileInputRef = useRef(null)

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        setProfileImage(result)
        setEditData({ ...editData, avatar: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setUser({ ...editData, avatar: profileImage })
    setIsEditing(false)
    setIsLoading(false)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-600" />
      case 'processing':
        return <Package className="w-4 h-4 text-yellow-600" />
      default:
        return <ShoppingBag className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-br from-black via-gray-800 to-black text-white">
        <div className="absolute inset-0 bg-black/5 opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Profile Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 border-4 border-white/20 shadow-2xl rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                {profileImage || user.avatar ? (
                  <img 
                    src={profileImage || user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-4xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
              
              {isEditing && (
                <div 
                  className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-8 h-8 text-white" />
                </div>
              )}
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                  <p className="text-white/80 text-lg">{user.email}</p>
                </div>
                <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 text-sm px-3 py-1">
                  <Award className="w-4 h-4 mr-1" />
                  {user.memberLevel} Member
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.totalOrders}</div>
                  <div className="text-white/70">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">${user.totalSpent.toLocaleString()}</div>
                  <div className="text-white/70">Total Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Since {user.joinDate}</div>
                  <div className="text-white/70">Member</div>
                </div>
              </div>
              
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                disabled={isLoading}
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditing ? 'Edit Mode' : 'Edit Profile'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'favorites', label: 'Favorites', icon: Heart },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Profile Settings Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={isEditing ? editData.name : user.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </label>
                      <input
                        type="email"
                        value={isEditing ? editData.email : user.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
                      <Phone className="w-4 h-4" />
                      <span>Phone</span>
                    </label>
                    <input
                      type="tel"
                      value={isEditing ? editData.phone : user.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>Address</span>
                    </label>
                    <textarea
                      value={isEditing ? editData.address : user.address}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100 resize-none"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex space-x-3 pt-4">
                      <Button 
                        onClick={handleSaveProfile} 
                        className="flex-1" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false)
                          setEditData(user)
                          setProfileImage(user.avatar)
                        }}
                        className="flex-1"
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Bio & Image Upload */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={isEditing ? editData.bio : user.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={6}
                      placeholder="Tell us about yourself..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100 resize-none"
                    />
                  </div>

                  {/* Profile Image Upload */}
                  {isEditing && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4">Drag and drop or click to upload</p>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Choose File
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <TrendingUp className="w-8 h-8 mx-auto text-green-500 mb-2" />
                      <div className="text-2xl font-bold">15%</div>
                      <div className="text-gray-500 text-sm">Savings This Year</div>
                    </div>
                    <div className="text-center">
                      <Star className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
                      <div className="text-2xl font-bold">4.9</div>
                      <div className="text-gray-500 text-sm">Avg Review Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Order History</span>
                </div>
                <Badge variant="outline">{mockOrders.length} Orders</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <span className="font-medium">Order {order.id}</span>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">${order.total}</div>
                        <div className="text-gray-500 text-sm flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${item.price}</div>
                            <div className="flex items-center text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm">
                          Leave Review
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Download Invoice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Your Favorites</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockFavorites.map((item) => (
                  <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">${item.price}</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Add to Cart
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Heart className="w-4 h-4 fill-current text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Account Settings */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Account Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-gray-500 text-sm">Receive order updates and promotions</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4" />
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 my-4"></div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-gray-500 text-sm">Get shipping updates via text</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 my-4"></div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-gray-500 text-sm">Extra security for your account</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment & Privacy */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment & Privacy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="font-medium mb-2">Saved Payment Methods</div>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5" />
                      <div>
                        <div className="font-medium">•••• •••• •••• 4242</div>
                        <div className="text-gray-500 text-sm">Expires 12/26</div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-2" size="sm">
                    Add Payment Method
                  </Button>
                </div>
                
                <div className="border-t border-gray-200 my-4"></div>
                
                <div>
                  <div className="font-medium mb-4">Privacy Controls</div>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
