import { createSlice } from '@reduxjs/toolkit'

// Get cart from localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []

const initialState = {
  cartItems,
  total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
  itemsCount: cartItems.reduce((acc, item) => acc + item.quantity, 0)
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, size, quantity = 1 } = action.payload
      const existingItem = state.cartItems.find(
        item => item._id === product._id && item.size === size
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.cartItems.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          imageURL: product.imageURL,
          size,
          quantity,
          stock: product.stock
        })
      }

      state.total = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      state.itemsCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0)
      
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload
      state.cartItems = state.cartItems.filter(
        item => !(item._id === productId && item.size === size)
      )
      
      state.total = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      state.itemsCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0)
      
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    updateQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload
      const item = state.cartItems.find(
        item => item._id === productId && item.size === size
      )
      
      if (item) {
        item.quantity = quantity
        state.total = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        state.itemsCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0)
        
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      }
    },
    clearCart: (state) => {
      state.cartItems = []
      state.total = 0
      state.itemsCount = 0
      localStorage.removeItem('cartItems')
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
