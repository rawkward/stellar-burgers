import { FC, SyntheticEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

import { useDispatch } from '../../services/store';
import { logoutThunk } from '../../services/slices/user-slice';
import { useNavigate } from 'react-router-dom';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutThunk()).then(() => navigate('/login'));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
