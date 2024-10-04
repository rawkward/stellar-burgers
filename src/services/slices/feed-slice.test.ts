import feedReducer from './feed-slice';
import { fetchFeeds, initialState } from './feed-slice';

describe('feed reducer tests', () => {
  const feedMock = {
    success: true,
    orders: [
      {
        _id: '67002df413a2b7001c8efe19',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2024-10-04T18:03:32.019Z',
        updatedAt: '2024-10-04T18:03:32.941Z',
        number: 55128
      },
      {
        _id: '67002bd813a2b7001c8efe15',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный антарианский бургер',
        createdAt: '2024-10-04T17:54:32.624Z',
        updatedAt: '2024-10-04T17:54:34.489Z',
        number: 55127
      }
    ],
    total: 54754,
    totalToday: 207
  };

  it('should handle pending', () => {
    const request = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, request);
    expect(state.isLoading).toBe(true);
  });

  it('should handle fulfilled', () => {
    const success = {
      type: fetchFeeds.fulfilled.type,
      payload: feedMock
    };
    const state = feedReducer(initialState, success);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(feedMock.orders);
    expect(state.success).toBe(true);
  });

  it('should handle rejected', () => {
    const error = new Error('Ошибка');
    const failed = { type: fetchFeeds.rejected.type, error };
    const state = feedReducer(initialState, failed);

    expect(state.isLoading).toBe(false);
    expect(state.success).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
