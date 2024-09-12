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
import { getCookie, setCookie } from '../../utils/cookie';

export const registerUserThunk = createAsyncThunk(
  'users/registerUser',
  async (data: TRegisterData) =>
    registerUserApi(data).then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    })
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
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

export const logoutThunk = createAsyncThunk('users/logout', () => logoutApi());

export interface UserState {
  isAuthChecked: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isAuthChecked: false,
  isLoading: false,
  user: null,
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
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });

    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });

    builder.addCase(forgotPasswordThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPasswordThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(forgotPasswordThunk.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(resetPasswordThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPasswordThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(resetPasswordThunk.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      state.isAuthChecked = true;
      state.isLoading = false;
    });
    builder.addCase(getUserThunk.fulfilled, (state) => {
      state.isAuthChecked = true;
      state.isLoading = false;
    });

    builder.addCase(updateUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });

    builder.addCase(logoutThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
    });
  }
});

export const { setAuthCheck, setUser } = userSlice.actions;
export const { selectUser, selectError, selectAuthCheck, selectIsLoading } =
  userSlice.selectors;

export default userSlice.reducer;
