import { combineReducers } from '@reduxjs/toolkit';

import { feedsSlice } from './slices/feedsSlice';
import { OrderSlice } from './slices/orderSlice';
import { constructorSlice } from './slices/constructorSlice';
import { userSlice } from './slices/userSlice';
import { userOrdersSlice } from './slices/userOrdersSlice';
import { ingredientsSlice } from './slices/IngredientSlice';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [OrderSlice.name]: OrderSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
});
