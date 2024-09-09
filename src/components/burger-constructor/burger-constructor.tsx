import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, useDispatch } from '../../services/store';

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import {
  selectBun,
  selectIngredients,
  selectAll
} from '../../services/slices/burger-slice';

import {
  selectOrderModalData,
  selectOrderRequest,
  orderBurger
} from '../../services/slices/order-slice';

import { clearOrderModalData } from '../../services/slices/order-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: DONE взять переменные constructorItems, orderRequest и orderModalData из стора */

  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const dispatch = useDispatch();

  const constructorItems = useSelector(selectAll);

  const ingredientsIds: string[] = [
    constructorItems.bun && constructorItems.bun.id,
    ...constructorItems.ingredients.map((ingredient) => ingredient.id)
  ].filter((id): id is string => !!id);

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    dispatch(orderBurger(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
