import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrdersThunk,
  selectOrders
} from '../../services/slices/orders-slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */

  const orders: TOrder[] = useSelector(selectOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
