import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  success: boolean;
  isLoading: boolean;
  data: TIngredient[];
  error: string | null;
}

export const initialState: IngredientsState = {
  success: true,
  isLoading: false,
  data: [],
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (sliceState) => sliceState.data,
    selectIsLoading: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.error.message || 'Возникла ошибка!';
      });
  }
});

export const { selectIngredients, selectIsLoading } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
