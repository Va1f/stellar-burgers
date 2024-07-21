import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/IngredientsSlice';
import { feedsSlice } from './slices/feedsSlice';
import { OrderSlice } from './slices/orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorSlice } from './slices/constructorIngredientSlice';
import { userSlice } from './slices/userSlice';
import { userOrdersSlice } from './slices/userOrdersSlice';

const store = configureStore({
  reducer: {
    [ingredientsSlice.name]: ingredientsSlice.reducer,
    [constructorSlice.name]: constructorSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [feedsSlice.name]: feedsSlice.reducer,
    [OrderSlice.name]: OrderSlice.reducer,
    [userOrdersSlice.name]: userOrdersSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
