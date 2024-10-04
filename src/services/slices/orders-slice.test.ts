import ordersReducer from './orders-slice';
import { fetchOrdersThunk, initialState } from './orders-slice';

describe('orders reducer tests', () => {
  const ordersMock = {
    success: true,
    orders: [
      {
        _id: '66fdca5b07cc0b001c1d56bf',
        ingredients: [
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный био-марсианский люминесцентный бургер',
        createdAt: '2024-10-02T22:34:03.020Z',
        updatedAt: '2024-10-02T22:34:03.942Z',
        number: 54873
      }
    ],
    total: 54757,
    totalToday: 210
  };

  it('should handle pending', () => {
    const request = { type: fetchOrdersThunk.pending.type };
    const state = ordersReducer(initialState, request);
    expect(state.isLoading).toBe(true);
  });

  it('should handle fulfilled', () => {
    const success = {
      type: fetchOrdersThunk.fulfilled.type,
      payload: ordersMock.orders
    };
    const state = ordersReducer(initialState, success);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(ordersMock.orders);
    expect(state.success).toBe(true);
  });

  it('should handle rejected', () => {
    const error = new Error('Ошибка');
    const failed = { type: fetchOrdersThunk.rejected.type, error };
    const state = ordersReducer(initialState, failed);

    expect(state.isLoading).toBe(false);
    expect(state.success).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
