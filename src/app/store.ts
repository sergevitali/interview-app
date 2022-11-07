import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import homePageSlice from './containers/HomePage/homePageSlice'
import ReduxLogger from 'redux-logger'

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(ReduxLogger)

export const store = configureStore({
  middleware,
  reducer: {
    homePage: homePageSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
