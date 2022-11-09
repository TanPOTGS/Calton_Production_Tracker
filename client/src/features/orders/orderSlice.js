import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//Create new order
export const createNewOrder = createAsyncThunk('orders/create', async (orderData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token

    return await orderService.createNewOrder(orderData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Get orders
export const getOrders = createAsyncThunk('orders/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token

    return await orderService.getOrders(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Get order
export const getOrder = createAsyncThunk('orders/getOne', async (wcNumber, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token

    return await orderService.getOrder(wcNumber, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Update order
export const updateOrder = createAsyncThunk('orders/update', async (newOrderData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token

    return await orderService.updateOrder(newOrderData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Update orders status
export const updateOrdersStatus = createAsyncThunk('orders/updateStatus', async (ordersToUpdate, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token

    return await orderService.updateOrdersStatus(ordersToUpdate, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Add comment to order
export const addComment = createAsyncThunk('orders/addComment', async (commentData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token

    return await orderService.addComment(commentData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Delete order
export const deleteOrder = createAsyncThunk('orders/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token

    return await orderService.deleteOrder(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders.push(action.payload)
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
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
        state.orders = action.payload
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = [action.payload]
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = state.orders.map((order) => {
          if(order._id === action.payload._id) {
            return action.payload
          }
          return order
        })
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateOrdersStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateOrdersStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = state.orders.filter(({_id}) => !action.meta.arg.ids.includes(_id))
      })
      .addCase(updateOrdersStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = state.orders.map((order) => {
          if(order._id === action.payload._id) {
            order.comments.push(action.meta.arg.newComment)
          }
          return order
        })
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = state.orders.filter((order) => order._id !== action.payload.id)
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = orderSlice.actions
export default orderSlice.reducer