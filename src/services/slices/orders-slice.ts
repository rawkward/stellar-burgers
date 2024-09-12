import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrdersState {
  success: boolean;
  isLoading: boolean;
  orders: TOrder[];
}

const initialState: OrdersState = {
  success: true,
  isLoading: false,
  orders: []
};

export const fetchOrdersThunk = createAsyncThunk(
  'orders/fetchOrders',
  async () => getOrdersApi()
);

export const fetchOrderByNumberThunk = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, { payload }: PayloadAction<TOrder>) => {
      state.orders.push(payload);
    }
  },
  selectors: {
    selectSuccess: (sliceState) => sliceState.success,
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectOrders: (sliceState) => sliceState.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersThunk.rejected, (state) => {
        state.isLoading = false;
        state.success = false;
      })

      .addCase(fetchOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderByNumberThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrderByNumberThunk.rejected, (state) => {
        state.isLoading = false;
        state.success = false;
      });
  }
});

export const { selectSuccess, selectIsLoading, selectOrders } =
  ordersSlice.selectors;

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
