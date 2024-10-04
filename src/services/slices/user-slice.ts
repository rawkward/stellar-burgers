import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  TRegisterData,
  refreshToken
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const registerUserThunk = createAsyncThunk(
  'users/registerUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return {
      user: res.user,
      accessToken: res.accessToken,
      refreshToken: res.refreshToken
    };
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const res = await loginUserApi({ email, password });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return {
      user: res.user,
      accessToken: res.accessToken,
      refreshToken: res.refreshToken
    };
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'users/forgotPassword',
  (data: { email: string }) => forgotPasswordApi(data)
);

export const resetPasswordThunk = createAsyncThunk(
  'users/resetPassword',
  (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const getUserThunk = createAsyncThunk(
  'users/getUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((user) => dispatch(setUser(user.user)))
        .finally(() => dispatch(setAuthCheck(true)));
    } else {
      dispatch(setAuthCheck(true));
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  `users/checkUser`,
  async (_, { dispatch }) => {
    const response = await dispatch(getUserThunk());

    if (getUserThunk.fulfilled.match(response)) {
      return response.payload;
    } else {
      throw new Error('Ошибка аутентификации');
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const logoutThunk = createAsyncThunk('users/logout', () =>
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  })
);

export interface UserState {
  success: boolean;
  isAuthChecked: boolean;
  isLoading: boolean;
  user: TUser | null;
  accessToken: string;
  refreshToken: string;
  error: string | null;
}

export const initialState: UserState = {
  success: true,
  isAuthChecked: false,
  isLoading: false,
  user: null,
  accessToken: '',
  refreshToken: '',
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthCheck: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectAuthCheck: (sliceState) => sliceState.isAuthChecked,
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectError: (sliceState) => sliceState.error
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Возникла ошибка!';
      state.success = false;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });

    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Возникла ошибка!';
      state.success = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });

    builder.addCase(forgotPasswordThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPasswordThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Возникла ошибка!';
      state.success = false;
    });
    builder.addCase(forgotPasswordThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.success = true;
    });

    builder.addCase(resetPasswordThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPasswordThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Возникла ошибка!';
      state.success = false;
    });
    builder.addCase(resetPasswordThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.success = true;
    });

    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.isAuthChecked = true;
      state.isLoading = false;
      state.error = action.error.message || 'Возникла ошибка!';
      state.success = false;
    });
    builder.addCase(getUserThunk.fulfilled, (state) => {
      state.isAuthChecked = true;
      state.isLoading = false;
      state.success = true;
    });

    builder.addCase(updateUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Возникла ошибка!';
      state.success = false;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.success = true;
    });

    builder.addCase(logoutThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Возникла ошибка!';
      state.success = false;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      state.success = true;
    });

    builder.addCase(checkUserAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkUserAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Возникла ошибка!';
      state.success = false;
      state.isAuthChecked = true;
    });
    builder.addCase(checkUserAuth.fulfilled, (state) => {
      state.isLoading = false;
      state.success = true;
      state.isAuthChecked = true;
    });
  }
});

export const { setAuthCheck, setUser } = userSlice.actions;
export const { selectUser, selectError, selectAuthCheck, selectIsLoading } =
  userSlice.selectors;

export default userSlice.reducer;
