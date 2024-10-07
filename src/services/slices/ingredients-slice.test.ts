import ingredientsReducer from './ingredients-slice';
import { fetchIngredients, initialState } from './ingredients-slice';

describe('ingredients reducer tests', () => {
  const ingredientsMock = {
    success: true,
    data: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ]
  };

  it('should handle pending', () => {
    const request = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, request);
    expect(state.isLoading).toBe(true);
  });

  it('should handle fulfilled', () => {
    const success = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredientsMock.data
    };
    const state = ingredientsReducer(initialState, success);

    expect(state.isLoading).toBe(false);
    expect(state.data).toEqual(ingredientsMock.data);
    expect(state.success).toBe(true);
  });

  it('should handle rejected', () => {
    const error = new Error('Ошибка');
    const failed = { type: fetchIngredients.rejected.type, error };
    const state = ingredientsReducer(initialState, failed);

    expect(state.isLoading).toBe(false);
    expect(state.success).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
