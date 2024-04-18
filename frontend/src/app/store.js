import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Authentication } from '../services/Auth.js'
import userSliceReducer from '../features/userSlice.jsx'
import authSliceReducer from '../features/authSlice.jsx'

export const store = configureStore({
  reducer: {
    [Authentication.reducerPath]: Authentication.reducer,
    user: userSliceReducer,
    auth: authSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(Authentication.middleware),
})

setupListeners(store.dispatch)

export default store