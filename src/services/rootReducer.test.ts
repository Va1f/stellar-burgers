import { expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

describe('тестирование инициализации rootReducer', () => {
  test('проверка корректности работы rootReducer при инициализации', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, unknownAction);
    expect(initialState).toEqual(store.getState());
  });
});
