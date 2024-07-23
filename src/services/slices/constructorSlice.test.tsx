import {
  constructorSlice,
  addItem,
  deleteItem,
  clearAll,
  updateAll,
  initialState,
  TConstructorState,
  swapIngredient,
  constructorSelector
} from './constructorSlice';
import {
  allIngredientsWithDeletedIngredient,
  singleBunIngredientWId,
  singleBunIngredientWOId,
  singleNonBunIngredientWId,
  singleNonBunIngredientWOId,
  allNonBunIngredientsWId,
  orderedIngredientsWId,
  orderedIngredientsWOId,
  allNonBunIngredientsWOIdSwap1to2,
  allNonBunIngredientsWOIdSwap1to0
} from './mockData';

import { TConstructorIngredient, TIngredient } from '@utils-types';

const removeId = (obj: TConstructorIngredient) => {
  const { id, ...rest } = obj;
  return rest;
};

const removeIdFromArray = (array: TConstructorIngredient[]) => {
  return array.map(removeId);
};

describe('тесты constructorSlice', () => {
  test('добавить ингредиент (не булка)', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addItem(singleNonBunIngredientWId)
    );
    const { ingredients, bun } = newState;
    const ingredientsWithoutId = removeIdFromArray(ingredients);
    expect(bun).toBeNull();
    expect(ingredientsWithoutId).toEqual([singleNonBunIngredientWOId]);
  });
  test('добавить ингредиент (булка)', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addItem(singleBunIngredientWId)
    );
    const { ingredients, bun } = newState;
    const bunWithoutId = bun ? removeId(bun) : null;
    expect(bunWithoutId).toEqual(singleBunIngredientWOId);
    expect(ingredients).toEqual([]);
  });
  test('удалить ингредиент', () => {
    const stateWithIngredients: TConstructorState = {
      bun: null,
      ingredients: allNonBunIngredientsWId
    };
    const newState = constructorSlice.reducer(
      stateWithIngredients,
      deleteItem(singleNonBunIngredientWId)
    );
    const ingredientsWithoutId = removeIdFromArray(newState.ingredients);
    expect(ingredientsWithoutId).toEqual(allIngredientsWithDeletedIngredient);
  });
  test('очистить ингредиенты', () => {
    const stateWithIngredients: TConstructorState = {
      bun: singleBunIngredientWId,
      ingredients: allNonBunIngredientsWId
    };
    const newState = constructorSlice.reducer(stateWithIngredients, clearAll());
    const { ingredients, bun } = newState;
    expect(ingredients).toEqual([]);
    expect(bun).toBeNull();
  });
  test('обновить список ингредиентов', () => {
    const stateWithIngredients: TConstructorState = {
      bun: singleBunIngredientWId,
      ingredients: allNonBunIngredientsWId
    };
    const newState = constructorSlice.reducer(
      stateWithIngredients,
      updateAll(orderedIngredientsWId)
    );
    const ingredientsWithoutId = removeIdFromArray(newState.ingredients);
    expect(ingredientsWithoutId).toEqual(orderedIngredientsWOId);
  });

  test('переместить ингредиент вниз', () => {
    const stateWithIngredients: TConstructorState = {
      bun: singleBunIngredientWId,
      ingredients: allNonBunIngredientsWId
    };
    const newState = constructorSlice.reducer(
      stateWithIngredients,
      swapIngredient({ index: 1, step: 1 })
    );
    const ingredientsWithoutId = removeIdFromArray(newState.ingredients);
    expect(ingredientsWithoutId).toEqual(allNonBunIngredientsWOIdSwap1to2);
  });
  test('переместить ингредиент вверх', () => {
    const stateWithIngredients: TConstructorState = {
      bun: singleBunIngredientWId,
      ingredients: allNonBunIngredientsWId
    };
    const newState = constructorSlice.reducer(
      stateWithIngredients,
      swapIngredient({ index: 1, step: -1 })
    );
    const ingredientsWithoutId = removeIdFromArray(newState.ingredients);
    expect(ingredientsWithoutId).toEqual(allNonBunIngredientsWOIdSwap1to0);
  });

  test('cелектор selectItems возвращает состояние', () => {
    const newState = {
      constructorIngredient: {
        bun: singleBunIngredientWId,
        ingredients: allNonBunIngredientsWId
      }
    };
    const receivedState = constructorSelector.selectItems(newState);
    expect(receivedState).toEqual(newState.constructorIngredient);
  });
});
