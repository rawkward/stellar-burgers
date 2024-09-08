import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getFeedsApi } from '@api';
import { TIngredient, TOrder } from '@utils-types';

interface FeedState {
  success: boolean;
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: FeedState = {
  success: true,
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () =>
  getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addToFeed: (state, { payload }: PayloadAction<TOrder>) => {
      state.orders.push(payload);
    }
  },
  selectors: {
    selectFeed: (sliceState) => sliceState,
    selectOrders: (sliceState) => sliceState.orders,
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectTotal: (sliceState) => sliceState.total,
    selectTotalToday: (sliceState) => sliceState.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.isLoading = false;
        state.success = false;
      });
  }
});

export const {
  selectOrders,
  selectIsLoading,
  selectTotal,
  selectTotalToday,
  selectFeed
} = feedSlice.selectors;

export default feedSlice.reducer;
