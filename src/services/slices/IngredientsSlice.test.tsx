import { describe, expect, test } from '@jest/globals';
import {
  getIngredients,
  getIngredientsList,
  getIngredientsLoadingState,
  getIngredientsState,
  ingredientsSlice,
  initialState
} from './IngredientSlice';

import { ingredientsMockData } from './mockData';
import { configureStore } from '@reduxjs/toolkit';

describe('тестирование ingredientsSlice', () => {
  test('проверка работы селекторов getIngredientsState, getIngredientsLoadingState, getIngredients', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer
      },
      preloadedState: {
        ingredients: ingredientsMockData
      }
    });
    const state = store.getState();
    const ingredientsState = getIngredientsState(state);
    const loadingStatus = getIngredientsLoadingState(state);
    const ingredientList = getIngredients(state);
    expect(ingredientsState).toEqual(ingredientsMockData);
    expect(loadingStatus).toBe(ingredientsMockData.loading);
    expect(ingredientList).toEqual(ingredientsMockData.ingredients);
  });

  test('проверка редьюсера getIngredientsList при выполнении', () => {
    const action = {
      type: getIngredientsList.fulfilled.type,
      payload: ingredientsMockData.ingredients
    };
    const updatedState = ingredientsSlice.reducer(initialState, action);
    expect(updatedState).toEqual(ingredientsMockData);
    expect(updatedState.loading).toBe(false);
  });

  test('проверка редьюсера getIngredientsList при ошибке', () => {
    const updatedState = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.rejected(new Error('ошибка'), 'Ошибка теста')
    );
    expect(updatedState.ingredients).toHaveLength(0);
    expect(updatedState.loading).toBe(false);
    expect(updatedState.error).toBe('ошибка');
  });

  test('проверка редьюсера getIngredientsList в ожидании', () => {
    const updatedState = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.pending('')
    );
    expect(updatedState.loading).toBe(true);
  });
});
