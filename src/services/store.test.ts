import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, RootState } from './store';

import { initialState as ingredientsInitialState } from './slices/ingredients-slice';
import { initialState as burgerInitialState } from './slices/burger-slice';
import { initialState as feedInitialState } from './slices/feed-slice';
import { initialState as orderInitialState } from './slices/order-slice';
import { initialState as userInitialState } from './slices/user-slice';
import { initialState as ordersInitialState } from './slices/orders-slice';

describe('testing rootReducer initialization', () => {
  it('rootReducer should return initial state when given undefined state', () => {
    const expectedInitialRootState: RootState = {
      ingredients: ingredientsInitialState,
      burger: burgerInitialState,
      feed: feedInitialState,
      order: orderInitialState,
      user: userInitialState,
      orders: ordersInitialState
    };

    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const initialState = rootReducer(undefined, unknownAction);

    expect(initialState).toEqual(expectedInitialRootState);
  });
});
