import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';

import { orderBurgerApi } from '../../utils/burger-api';

export const placeNewOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export interface TOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
}

export const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const OrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(placeNewOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(placeNewOrder.pending, (state) => {
        state.orderRequest = true;
      });
  }
});

export const { resetOrder } = OrderSlice.actions;
export const { getOrderRequest, getOrderModalData } = OrderSlice.selectors;
