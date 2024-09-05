import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export type TBurgerState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerState = {
  bun: null,
  ingredients: []
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addToConstructor: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeFromConstructor: (state, { payload }: PayloadAction<number>) => {
      state.ingredients.splice(payload, 1);
    },
    resetConstructor: () => initialState,
    reorderConstructor: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    }
  },
  selectors: {
    selectAll: (sliceState) => sliceState,
    selectBun: (sliceState) => sliceState.bun,
    selectIngredients: (sliceState) => sliceState.ingredients
  }
});

export const { selectBun, selectIngredients, selectAll } =
  burgerSlice.selectors;

export const {
  addToConstructor,
  removeFromConstructor,
  resetConstructor,
  reorderConstructor
} = burgerSlice.actions;

export default burgerSlice.reducer;
