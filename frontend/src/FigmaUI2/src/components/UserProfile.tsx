'use client';

import { useState, useRef } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
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
  X,
  Upload
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

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
};

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
      { name: 'Running Sneakers', price: 179.99, quantity: 1, image: 'https://images.unsplash.com/photo-1597350584914-55bb62285896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzfGVufDF8fHx8MTc1NjcwMDc0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    ]
  },
  {
    id: 'ORD-003',
    date: '2024-08-01',
    status: 'delivered',
    total: 149.98,
    items: [
      { name: 'Casual Cotton T-Shirt', price: 29.99, quantity: 2, image: 'https://images.unsplash.com/photo-1626496997178-7aa9d13b5799?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjB0c2hpcnR8ZW58MXx8fHwxNzU2NzE5NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
      { name: 'Summer Chino Trousers', price: 89.99, quantity: 1, image: 'https://images.unsplash.com/photo-1698919585873-8c6852de9b96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlubyUyMHBhbnRzfGVufDF8fHx8MTc1NjcxOTU4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    ]
  },
];

interface UserProfileProps {
  onClose: () => void;
}

const OrderItemSkeleton = () => (
  <div className="flex items-center space-x-4 p-3">
    <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 rounded animate-pulse" />
      <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
    </div>
    <div className="text-right space-y-2">
      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
      <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
    </div>
  </div>
);

export function UserProfile({ onClose }: UserProfileProps) {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(mockUser);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        setEditData({ ...editData, avatar: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUser({ ...editData, avatar: profileImage });
    setIsEditing(false);
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-600" />;
      case 'processing':
        return <Package className="w-4 h-4 text-yellow-600" />;
      default:
        return <ShoppingBag className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-black to-gray-800 text-white p-6">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <Avatar className="w-24 h-24 border-4 border-white/20">
                <AvatarImage src={profileImage || user.avatar || ''} alt={user.name} />
                <AvatarFallback className="bg-white/20 text-white text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                     onClick={() => fileInputRef.current?.click()}>
                  <Camera className="w-6 h-6 text-white" />
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
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-white/80 mb-1">{user.email}</p>
              <p className="text-white/60">Member since {user.joinDate}</p>
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

        {/* Content */}
        <div className="p-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profile Settings</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Purchase History</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={isEditing ? editData.name : user.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editData.email : user.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Phone</span>
                      </Label>
                      <Input
                        id="phone"
                        value={isEditing ? editData.phone : user.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address" className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Address</span>
                      </Label>
                      <Textarea
                        id="address"
                        value={isEditing ? editData.address : user.address}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1 resize-none"
                        rows={3}
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
                            setIsEditing(false);
                            setEditData(user);
                            setProfileImage(user.avatar);
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

                {/* Bio Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={isEditing ? editData.bio : user.bio}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1 resize-none"
                        rows={6}
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    {/* Profile Image Upload */}
                    {isEditing && (
                      <div className="mt-6">
                        <Label>Profile Image</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-600 mb-2">Click to upload profile image</p>
                          <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Choose File
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Purchase History Tab */}
            <TabsContent value="orders">
              <Card>
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
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-6">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                          {/* Order Header */}
                          <div className="flex items-center justify-between mb-4">
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

                          <Separator className="my-4" />

                          {/* Order Items */}
                          <div className="space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center space-x-4 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                                  <ImageWithFallback
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    width={64}
                                    height={64}
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
                          <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}