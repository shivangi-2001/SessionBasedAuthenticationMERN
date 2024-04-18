import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Authentication } from '../services/Auth.js'

export const store = configureStore({
  reducer: {
    [Authentication.reducerPath]: Authentication.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(Authentication.middleware),
})

setupListeners(store.dispatch)

export default store