import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from '../../services/orderService'

const initialState = {
  orders: [],
  order: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create new order
export const createOrder = createAsyncThunk('orders/create', async (orderData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await orderService.createOrder(orderData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get user orders
export const getMyOrders = createAsyncThunk('orders/getMyOrders', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await orderService.getMyOrders(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get order by ID
export const getOrder = createAsyncThunk('orders/getOne', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await orderService.getOrder(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get all orders (Admin)
export const getAllOrders = createAsyncThunk('orders/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await orderService.getAllOrders(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Update order status (Admin)
export const updateOrderStatus = createAsyncThunk('orders/updateStatus', async ({ id, status }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await orderService.updateOrderStatus(id, status, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        )
        if (state.order && state.order._id === action.payload._id) {
          state.order = action.payload
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = orderSlice.actions
export default orderSlice.reducer
