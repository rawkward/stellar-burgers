import { stat } from 'fs';
import { RootState } from '../store';

export const ordersInfoDataSelector =
  (number: string) => (state: RootState) => {
    if (state.orders.orders.length) {
      const data = state.orders.orders.find((item) => item.number === +number);
      if (data) return data;
    }

    if (state.feed.orders.length) {
      const data = state.feed.orders.find((item) => item.number === +number);
      if (data) return data;
    }

    if (state.order.orderByNumber?.number === +number) {
      return state.order.orderByNumber;
    }

    return null;
  };
