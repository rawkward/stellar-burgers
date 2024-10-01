import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';

import {
  registerUserThunk,
  selectIsLoading,
  selectUser
} from '../../services/slices/user-slice';

import { useDispatch, useSelector } from '../../services/store';
import { Navigate, useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      registerUserThunk({
        email,
        name: userName,
        password
      })
    );
  };

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
