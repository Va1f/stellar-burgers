import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  userMockData,
  userMockDataUpdated,
  userRegisterData,
  userRegisterDataUpdated,
  userResponce,
  userResponceUpdated
} from './mockData';
import {
  isAuthCheckedSelector,
  getUser,
  getName,
  getError,
  userSlice,
  initialState,
  register,
  login,
  apiGetUser,
  updateUser,
  logout
} from './userSlice';

describe('тестирование userSlice', () => {
  const createReducerState = (action: { type: string; payload?: {} }) =>
    userSlice.reducer(initialState, action);

  test('проверка селекторов isAuthCheckedSelector, getUser, getName, getError', () => {
    const store = configureStore({
      reducer: {
        user: userSlice.reducer
      },
      preloadedState: {
        user: userMockData
      }
    });

    const authChecked = isAuthCheckedSelector(store.getState());
    const user = getUser(store.getState());
    const name = getName(store.getState());
    const error = getError(store.getState());

    expect(authChecked).toBe(userMockData.isAuthChecked);
    expect(user).toBe(userMockData.user);
    expect(name).toBe(userMockData.user.name);
    expect(error).toBe(userMockData.error);
  });

  test('проверка редьюсера register при успешном выполнении', () => {
    const action = {
      type: register.fulfilled.type,
      payload: userResponce
    };
    const newState = createReducerState(action);
    expect(newState).toEqual(userMockData);
  });

  test('проверка редьюсера register при ошибке', () => {
    const newState = userSlice.reducer(
      initialState,
      register.rejected(new Error('error'), 'тестовая ошибка', userRegisterData)
    );
    expect(newState.error).toBe('error');
  });

  test('проверка редьюсера register в процессе выполнения', () => {
    const newState = userSlice.reducer(
      initialState,
      register.pending('', userRegisterData)
    );
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.error).toBe('');
  });

  test('проверка редьюсера login при успешном выполнении', () => {
    const action = {
      type: login.fulfilled.type,
      payload: userResponce
    };
    const newState = createReducerState(action);
    expect(newState).toEqual(userMockData);
  });

  test('проверка редьюсера login при ошибке', () => {
    const newState = userSlice.reducer(
      initialState,
      login.rejected(new Error('error'), 'тестовая ошибка', userRegisterData)
    );
    expect(newState.error).toBe('error');
    expect(newState.isAuthChecked).toBe(false);
  });

  test('проверка редьюсера login в процессе выполнения', () => {
    const newState = userSlice.reducer(
      initialState,
      login.pending('', userRegisterData)
    );
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.error).toBe('');
  });

  test('проверка редьюсера apiGetUser при успешном выполнении', () => {
    const action = {
      type: apiGetUser.fulfilled.type,
      payload: userResponce
    };
    const newState = createReducerState(action);
    expect(newState).toEqual(userMockData);
  });

  test('проверка редьюсера apiGetUser при ошибке', () => {
    const newState = userSlice.reducer(
      initialState,
      apiGetUser.rejected(new Error('error'), 'тестовая ошибка')
    );
    expect(newState.error).toBe('error');
    expect(newState.isAuthChecked).toBe(false);
  });

  test('проверка редьюсера updateUser при успешном выполнении', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: userResponceUpdated
    };
    const newState = createReducerState(action);
    expect(newState).toEqual(userMockDataUpdated);
  });

  test('проверка редьюсера updateUser при ошибке', () => {
    const newState = userSlice.reducer(
      initialState,
      updateUser.rejected(
        new Error('error'),
        'тестовая ошибка',
        userRegisterDataUpdated
      )
    );
    expect(newState.error).toBe('error');
    expect(newState.isAuthChecked).toBe(false);
  });

  test('проверка редьюсера updateUser в процессе выполнения', () => {
    const newState = userSlice.reducer(
      initialState,
      updateUser.pending('', userRegisterDataUpdated)
    );
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.error).toBe('');
  });

  test('проверка редьюсера logout при успешном выполнении', () => {
    const action = {
      type: logout.fulfilled.type,
      payload: userResponce
    };
    const newState = createReducerState(action);
    expect(newState).toEqual(initialState);
  });
});
