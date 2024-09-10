import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, useDispatch } from '../../services/store';

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import {
  selectBun,
  selectIngredients,
  selectAll,
  resetConstructor
} from '../../services/slices/burger-slice';

import {
  selectOrderModalData,
  selectOrderRequest,
  orderBurger
} from '../../services/slices/order-slice';

import { clearOrderModalData } from '../../services/slices/order-slice';
import { selectUser } from '../../services/slices/user-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: DONE взять переменные constructorItems, orderRequest и orderModalData из стора */

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const constructorItems = useSelector(selectAll);

  const constructorBunId = constructorItems.bun?._id;
  console.log('bunID', constructorBunId);

  const constructorIngredientsIds = constructorItems.ingredients.map(
    (ingredient) => ingredient._id
  );

  if (constructorBunId) {
    constructorIngredientsIds.push(constructorBunId);
  }

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      return navigate('/login');
    }

    dispatch(orderBurger(constructorIngredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
    dispatch(resetConstructor());
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
