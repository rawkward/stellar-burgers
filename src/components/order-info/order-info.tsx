import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';

import { useDispatch, useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredients-slice';
import { selectOrders } from '../../services/slices/feed-slice';
import { useParams } from 'react-router-dom';
import { selectOrderModalData } from '../../services/slices/order-slice';
import { fetchOrderByNumberThunk } from '../../services/slices/order-slice';
import { ordersInfoDataSelector } from '@selectors';

export const OrderInfo: FC = () => {
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const params = useParams();
  const id = params.number;

  const orderData = useSelector(ordersInfoDataSelector(id || ''));

  useEffect(() => {
    if (!orderData) {
      fetchOrderByNumberThunk(Number(id));
    }
  }, [orderData, id]);

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
