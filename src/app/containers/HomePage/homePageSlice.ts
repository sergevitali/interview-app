import { createSlice } from '@reduxjs/toolkit'
import type { IHomePageState } from './types'

const initialState: IHomePageState = {
  animePage: null
}

const HomePageslice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setAnimePage: (state, action) => ({
      ...state,
      animePage: action.payload
    })
  }
})

export const { setAnimePage } = HomePageslice.actions
export default HomePageslice.reducer
