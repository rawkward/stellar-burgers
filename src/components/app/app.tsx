import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import '../../index.css';
import styles from './app.module.css';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';

import { useEffect } from 'react';

import {
  RootState,
  AppDispatch,
  useDispatch,
  useSelector
} from '../../services/store';

import { AppHeader, OrderInfo, Modal, IngredientDetails } from '@components';
import { OnlyAuth, OnlyUnAuth } from '../routes/protected-route';

import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { fetchFeeds } from '../../services/slices/feed-slice';

function App() {
  const location = useLocation();
  //const background = location.state?.from?.background || null;
  let state = location.state as { background?: Location };
  console.log('backgroundLocation', state);
  console.log('location', location);
  console.log('state', state);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onClose = () => navigate(-1);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchFeeds());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />}>
          <Route index element={<Feed />} />
          <Route path=':number' element={<OrderInfo />} />
        </Route>
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='/profile'>
          <Route index element={<OnlyAuth component={<Profile />} />} />
          <Route path='orders'>
            <Route index element={<OnlyAuth component={<ProfileOrders />} />} />
            <Route
              path=':number'
              element={<OnlyAuth component={<OrderInfo />} />}
            />
          </Route>
        </Route>
        <Route path='*' element={<NotFound404 />} />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />
      </Routes>

      {state?.background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='feedNumber' onClose={onClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='profileOrdersNumber' onClose={onClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
