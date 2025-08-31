# E-Commerce MERN Stack Application

A complete full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, product management, shopping cart, and admin panel.

## 🚀 Features

### User Features
- **User Authentication**: Register, login, and profile management with JWT
- **Product Browsing**: View products with search, filtering, and pagination
- **Shopping Cart**: Add/remove items with size selection and quantity management
- **Checkout Process**: Complete order placement with shipping details
- **Order History**: View past orders and track order status
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

### Admin Features
- **Product Management**: CRUD operations for products with image upload
- **Order Management**: View and update order statuses
- **User Management**: View user information and manage accounts
- **Dashboard**: Analytics and overview of sales and inventory

### Technical Features
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Separate user and admin permissions
- **Image Upload**: Cloudinary integration for product images
- **Search & Filtering**: Advanced product search and category filtering
- **Pagination**: Efficient data loading with pagination
- **Real-time Updates**: Live cart updates and notifications

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📁 Project Structure

```
E.Com_Project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   └── orderController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Order.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   └── orders.js
│   │   ├── utils/
│   │   │   └── seedData.js
│   │   └── server.js
│   ├── package.json
│   └── env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── OrderDetail.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   └── AdminOrders.jsx
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       ├── productSlice.js
│   │   │       ├── cartSlice.js
│   │   │       └── orderSlice.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   └── orderService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E.Com_Project
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/ecommerce_db
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Database Setup**
   ```bash
   cd ../backend
   npm run seed
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:5173

3. **Build for Production**
   ```bash
   cd frontend
   npm run build
   ```

## 👤 Default Users

After running the seed script, you'll have these default accounts:

### Admin User
- Email: `admin@example.com`
- Password: `admin123`
- Role: Admin

### Regular User
- Email: `user@example.com`
- Password: `admin123`
- Role: User

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with pagination, search, filtering)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

## 🔧 Configuration

### MongoDB
- Local MongoDB: `mongodb://localhost:27017/ecommerce_db`
- MongoDB Atlas: Use your connection string

### Cloudinary (Optional)
For image upload functionality, set up a Cloudinary account and add your credentials to the environment variables.

### JWT Secret
Generate a strong JWT secret for production:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Build and deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.

## 🔮 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Real-time chat support
- [ ] Multi-language support
- [ ] PWA features
- [ ] Advanced analytics dashboard
- [ ] Inventory management system
