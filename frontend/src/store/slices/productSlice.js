import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from '../../services/productService'

const initialState = {
  products: [],
  featuredProducts: [],
  product: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  page: 1,
  pages: 1,
  total: 0
}

// Get all products
export const getProducts = createAsyncThunk('products/getAll', async (params, thunkAPI) => {
  try {
    return await productService.getProducts(params)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get featured products
export const getFeaturedProducts = createAsyncThunk('products/getFeatured', async (_, thunkAPI) => {
  try {
    return await productService.getFeaturedProducts()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get single product
export const getProduct = createAsyncThunk('products/getOne', async (id, thunkAPI) => {
  try {
    return await productService.getProduct(id)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Create product (Admin)
export const createProduct = createAsyncThunk('products/create', async (productData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await productService.createProduct(productData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Update product (Admin)
export const updateProduct = createAsyncThunk('products/update', async ({ id, productData }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await productService.updateProduct(id, productData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Delete product (Admin)
export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await productService.deleteProduct(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload.products
        state.page = action.payload.page
        state.pages = action.payload.pages
        state.total = action.payload.total
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getFeaturedProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.featuredProducts = action.payload
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.product = action.payload
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products.push(action.payload)
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        )
        if (state.product && state.product._id === action.payload._id) {
          state.product = action.payload
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = state.products.filter((product) => product._id !== action.payload.id)
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = productSlice.actions
export default productSlice.reducer
