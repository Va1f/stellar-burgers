import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { orderMockData, orderReceivedMockData } from './mockData';
import {
  getOrderModalData,
  getOrderRequest,
  OrderSlice,
  placeNewOrder,
  initialState,
  resetOrder
} from './orderSlice';

describe('тестирование orderSlice', () => {
  test('проверка работы селекторов getOrderRequest и getOrderModalData', () => {
    const store = configureStore({
      reducer: {
        newOrder: OrderSlice.reducer
      },
      preloadedState: {
        newOrder: orderMockData
      }
    });

    const requestState = getOrderRequest(store.getState());
    const modalState = getOrderModalData(store.getState());

    expect(requestState).toBe(orderMockData.orderRequest);
    expect(modalState).toBe(orderMockData.orderModalData);
  });

  test('проверка работы редьюсера resetOrder', () => {
    const modifiedState = {
      orderRequest: true,
      orderModalData: orderReceivedMockData.order,
      error: 'undefined'
    };
    const updatedState = OrderSlice.reducer(modifiedState, resetOrder());
    expect(updatedState).toEqual(initialState);
  });

  test('проверка редьюсера placeNewOrder: успешный случай', () => {
    const updatedState = OrderSlice.reducer(
      initialState,
      placeNewOrder.fulfilled(orderReceivedMockData, '', [''])
    );
    expect(updatedState.orderRequest).toBe(false);
    expect(updatedState.orderModalData).toBe(orderReceivedMockData.order);
  });

  test('проверка редьюсера placeNewOrder: ошибка', () => {
    const updatedState = OrderSlice.reducer(
      initialState,
      placeNewOrder.rejected(new Error('error'), 'тестовая ошибка', [''])
    );
    expect(updatedState.error).toBe('error');
  });

  test('проверка редьюсера placeNewOrder: ожидание', () => {
    const updatedState = OrderSlice.reducer(
      initialState,
      placeNewOrder.pending('', [])
    );
    expect(updatedState.orderRequest).toBe(true);
  });
});
