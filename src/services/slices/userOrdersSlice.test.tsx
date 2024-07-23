import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { ordersMockData } from './mockData';
import {
  listOfOrders,
  initialState,
  userOrdersSlice,
  getUserOrders
} from './userOrdersSlice';

describe('тестирование userOrdersSlice', () => {
  test('проверка селектора listOfOrders', () => {
    const store = configureStore({
      reducer: {
        orders: userOrdersSlice.reducer
      },
      preloadedState: {
        orders: ordersMockData
      }
    });

    const ordersList = listOfOrders(store.getState());

    expect(ordersList).toBe(ordersMockData.orders);
  });

  test('проверка работы редьюсера getUserOrders при успешном выполнении', () => {
    const updatedState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.fulfilled(ordersMockData.orders, '')
    );
    expect(updatedState.orders).toEqual(ordersMockData.orders);
    expect(updatedState.isLoading).toBe(false);
  });

  test('проверка работы редьюсера getUserOrders при ошибке', () => {
    const updatedState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.rejected(new Error('error'), 'тестовая ошибка')
    );
    expect(updatedState.isLoading).toBe(false);
  });

  test('проверка работы редьюсера getUserOrders в процессе выполнения', () => {
    const updatedState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.pending('')
    );
    expect(updatedState.isLoading).toBe(true);
  });
});
