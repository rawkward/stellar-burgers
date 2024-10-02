import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

import {
  selectOrders,
  selectIsLoading,
  selectTotal,
  selectTotalToday,
  selectFeed,
  fetchFeeds
} from '../../services/slices/feed-slice';

import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);

  const dispatch = useDispatch();

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
