import { describe, expect, test } from '@jest/globals';
import {
  feedsSlice,
  getAllFeeds,
  getOrdersFeeds,
  getTotalFeeds,
  getTotalTodayFeeds,
  initialState
} from './feedsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { feedsMockData } from './mockData';

describe('проверка feedsSlice', () => {
  test('проверка селекторов getOrdersFeeds, getTotalFeeds, getTotalTodayFeeds', () => {
    const store = configureStore({
      reducer: {
        feeds: feedsSlice.reducer
      },
      preloadedState: {
        feeds: feedsMockData
      }
    });
    const orders = getOrdersFeeds(store.getState());
    const total = getTotalFeeds(store.getState());
    const totalToday = getTotalTodayFeeds(store.getState());
    expect(orders).toEqual(feedsMockData.orders);
    expect(total).toEqual(feedsMockData.total);
    expect(totalToday).toEqual(feedsMockData.totalToday);
  });

  test('редьюсер getAllFeeds fulfilled', () => {
    const action = {
      type: getAllFeeds.fulfilled.type,
      payload: feedsMockData
    };
    const updatedState = feedsSlice.reducer(initialState, action);
    expect(updatedState).toEqual(feedsMockData);
    expect(updatedState.isLoading).toBeFalsy();
  });

  test('редьюсер getAllFeeds rejected', () => {
    const updatedState = feedsSlice.reducer(
      initialState,
      getAllFeeds.rejected(new Error('ошибка'), 'Тестовая ошибка')
    );
    expect(updatedState.orders).toHaveLength(0);
    expect(updatedState.total).toBe(0);
    expect(updatedState.totalToday).toBe(0);
    expect(updatedState.isLoading).toBeFalsy();
    expect(updatedState.error).toBe('ошибка');
  });

  test('редьюсер getAllFeeds pending', () => {
    const updatedState = feedsSlice.reducer(
      initialState,
      getAllFeeds.pending('')
    );
    expect(updatedState.isLoading).toBeTruthy();
  });
});
