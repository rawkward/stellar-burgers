import orderReducer from './order-slice';
import { orderBurger, fetchOrderByNumberThunk, initialState } from './order-slice';

describe('order reducer tests', () => {
  describe('testing orderBurger action', () => {
    const orderPostMock = {
      success: true,
      name: 'Флюоресцентный бессмертный бургер',
      order: {
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa093f',
            name: 'Мясо бессмертных моллюсков Protostomia',
            type: 'main',
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: 'https://code.s3.yandex.net/react/code/meat-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-02-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa093d',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-01-large.png'
          }
        ],
        _id: '67003a6613a2b7001c8efe32',
        owner: {
          name: 'pashka',
          email: 'pashka@mail.ru',
          createdAt: '2024-10-02T22:24:56.421Z',
          updatedAt: '2024-10-02T22:24:56.421Z'
        },
        status: 'done',
        name: 'Флюоресцентный бессмертный бургер',
        createdAt: '2024-10-04T18:56:38.333Z',
        updatedAt: '2024-10-04T18:56:39.241Z',
        number: 55130,
        price: 2325
      }
    };

    it('should handle pending', () => {
      const request = { type: orderBurger.pending.type };
      const state = orderReducer(initialState, request);
      expect(state.isLoading).toBe(true);
    });

    it('should handle fulfilled', () => {
      const success = {
        type: orderBurger.fulfilled.type,
        payload: orderPostMock
      };
      const state = orderReducer(initialState, success);

      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(orderPostMock.order);
      expect(state.success).toBe(true);
    });

    it('should handle rejected', () => {
      const error = new Error('Ошибка');
      const failed = { type: orderBurger.rejected.type, error };
      const state = orderReducer(initialState, failed);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });

  describe('testing fetchOrderByNumber action', () => {
    const orderByNumberMock = {
      success: true,
      orders: [
        {
          _id: '67003a6613a2b7001c8efe32',
          ingredients: ['643d69a5c3f7b9001cfa093f', '643d69a5c3f7b9001cfa093d'],
          owner: '66fdc83807cc0b001c1d56bc',
          status: 'done',
          name: 'Флюоресцентный бессмертный бургер',
          createdAt: '2024-10-04T18:56:38.333Z',
          updatedAt: '2024-10-04T18:56:39.241Z',
          number: 55130
        }
      ]
    };

    it('should handle pending', () => {
      const request = { type: fetchOrderByNumberThunk.pending.type };
      const state = orderReducer(initialState, request);
      expect(state.isLoading).toBe(true);
    });

    it('should handle fulfilled', () => {
      const success = {
        type: fetchOrderByNumberThunk.fulfilled.type,
        payload: orderByNumberMock
      };
      const state = orderReducer(initialState, success);

      expect(state.isLoading).toBe(false);
      expect(state.orderByNumber).toEqual(orderByNumberMock.orders[0]);
      expect(state.success).toBe(true);
    });

    it('should handle rejected', () => {
      const error = new Error('Ошибка');
      const failed = { type: fetchOrderByNumberThunk.rejected.type, error };
      const state = orderReducer(initialState, failed);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });
});
