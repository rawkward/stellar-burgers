import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';

import { useDispatch, useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredients-slice';
import { selectOrders } from '../../services/slices/feed-slice';
import { useParams } from 'react-router-dom';
import { selectOrderModalData } from '../../services/slices/order-slice';
import { fetchOrderByNumberThunk } from '../../services/slices/orders-slice';

export const OrderInfo: FC = () => {
  /** TODO: DONE взять переменные orderData и ingredients из стора */

  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const params = useParams();
  const id = Number(params.number);

  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const orderModal = useSelector(selectOrderModalData);

  useEffect(() => {
    const order = orders.find((order) => order.number === id);
    if (order) {
      setOrderData(order);
    } else if (id && !orders.some((order) => order.number === id)) {
      dispatch(fetchOrderByNumberThunk(id));
    }
  }, [orders, id, dispatch]);

  useEffect(() => {
    if (id && orderModal) {
      setOrderData(orderModal);
    }
  }, [orderModal, id]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
