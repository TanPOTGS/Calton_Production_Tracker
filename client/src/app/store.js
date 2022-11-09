import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import orderReducer from '../features/orders/orderSlice'
import userReducer from '../features/users/userSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    users: userReducer
  }
})