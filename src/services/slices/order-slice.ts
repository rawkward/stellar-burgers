import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface OrderState {
  success: boolean;
  isLoading: boolean;
  data: TOrder | null;
  orderByNumber: TOrder | null;
  error: string | null;
}

export const initialState: OrderState = {
  success: true,
  isLoading: false,
  data: null,
  orderByNumber: null,
  error: null
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

export const fetchOrderByNumberThunk = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
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
      .addCase(orderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.error.message || 'Возникла ошибка!';
      })

      .addCase(fetchOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderByNumberThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.orderByNumber = action.payload.orders[0];
      })
      .addCase(fetchOrderByNumberThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.error.message || 'Возникла ошибка!';
      });
  }
});

export const { selectOrderModalData, selectOrderRequest } =
  orderSlice.selectors;

export const { clearOrderModalData } = orderSlice.actions;

export default orderSlice.reducer;
