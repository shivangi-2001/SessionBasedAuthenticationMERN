import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",
  full_name: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.email = action.payload.email
      state.full_name = action.payload.full_name
    },
    unsetUserInfo: (state, action) => {
      state.email = action.payload.email
      state.full_name = action.payload.full_name
    },
  }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer