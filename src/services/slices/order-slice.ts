import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderState {
  success: boolean;
  isLoading: boolean;
  data: TOrder | null;
}

const initialState: OrderState = {
  success: true,
  isLoading: false,
  data: null
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.data = null;
    },
    placeOrder: (state, action) => {
      state.data = action.payload;
    }
  },
  selectors: {
    selectOrderModalData: (sliceState) => sliceState.data,
    selectOrderRequest: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.data = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.isLoading = false;
        state.success = false;
      });
  }
});

export const { selectOrderModalData, selectOrderRequest } =
  orderSlice.selectors;

export const { clearOrderModalData } = orderSlice.actions;

export default orderSlice.reducer;
