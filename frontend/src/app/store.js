import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Authentication } from '../services/Auth.js'
import userSliceReducer from '../features/userSlice.jsx'

export const store = configureStore({
  reducer: {
    [Authentication.reducerPath]: Authentication.reducer,
    user: userSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(Authentication.middleware),
})

setupListeners(store.dispatch)

export default store