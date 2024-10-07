import userReducer from './user-slice';
import {
  registerUserThunk,
  loginUserThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  getUserThunk,
  checkUserAuth,
  updateUserThunk,
  logoutThunk,
  initialState
} from './user-slice';

describe('user reducer tests', () => {
  const userMock = {
    success: true,
    user: { email: 'test@test.ru', name: 'test' },
    accessToken: 'mockAccessToken',
    refreshToken: 'mockRefreshToken'
  };

  describe('registerUserThunk tests', () => {
    it('should handle pending', () => {
      const request = { type: registerUserThunk.pending.type };
      const state = userReducer(initialState, request);
      expect(state.isLoading).toBe(true);
    });

    it('should handle fulfilled', () => {
      const success = {
        type: registerUserThunk.fulfilled.type,
        payload: userMock
      };
      const state = userReducer(initialState, success);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.user).toEqual(userMock.user);
      expect(state.accessToken).toEqual(userMock.accessToken);
      expect(state.refreshToken).toEqual(userMock.refreshToken);
    });

    it('should handle rejected', () => {
      const error = new Error('Ошибка');
      const failed = { type: registerUserThunk.rejected.type, error };
      const state = userReducer(initialState, failed);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });

  describe('loginUserThunk tests', () => {
    it('should handle pending', () => {
      const request = { type: loginUserThunk.pending.type };
      const state = userReducer(initialState, request);
      expect(state.isLoading).toBe(true);
    });

    it('should handle fulfilled', () => {
      const success = {
        type: loginUserThunk.fulfilled.type,
        payload: userMock
      };
      const state = userReducer(initialState, success);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.user).toEqual(userMock.user);
      expect(state.accessToken).toEqual(userMock.accessToken);
      expect(state.refreshToken).toEqual(userMock.refreshToken);
    });

    it('should handle rejected', () => {
      const error = new Error('Ошибка');
      const failed = { type: loginUserThunk.rejected.type, error };
      const state = userReducer(initialState, failed);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });

  describe('forgotPasswordThunk tests', () => {
    it('should handle pending', () => {
      const request = { type: forgotPasswordThunk.pending.type };
      const state = userReducer(initialState, request);
      expect(state.isLoading).toBe(true);
    });

    it('should handle fulfilled', () => {
      const success = {
        type: forgotPasswordThunk.fulfilled.type
      };
      const state = userReducer(initialState, success);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
    });

    it('should handle rejected', () => {
      const error = new Error('Ошибка');
      const failed = { type: forgotPasswordThunk.rejected.type, error };
      const state = userReducer(initialState, failed);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });

  describe('resetPasswordThunk tests', () => {
    it('should handle pending', () => {
      const request = { type: resetPasswordThunk.pending.type };
      const state = userReducer(initialState, request);
      expect(state.isLoading).toBe(true);
    });

    it('should handle fulfilled', () => {
      const success = {
        type: resetPasswordThunk.fulfilled.type
      };
      const state = userReducer(initialState, success);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
    });

    it('should handle rejected', () => {
      const error = new Error('Ошибка');
      const failed = { type: resetPasswordThunk.rejected.type, error };
      const state = userReducer(initialState, failed);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });

  describe('getUserThunk tests', () => {
    it('should handle pending', () => {
      const request = { type: getUserThunk.pending.type };
      const state = userReducer(initialState, request);
      expect(state.isLoading).toBe(true);
    });

    it('should handle fulfilled', () => {
      const success = {
        type: getUserThunk.fulfilled.type,
        payload: userMock.user
      };
      const state = userReducer(initialState, success);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle rejected', () => {
      const error = new Error('Ошибка');
      const failed = { type: getUserThunk.rejected.type, error };
      const state = userReducer(initialState, failed);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toBe('Ошибка');
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('checkUserAuth tests', () => {
    it('should handle pending', () => {
      const request = { type: checkUserAuth.pending.type };
      const state = userReducer(initialState, request);
      expect(state.isLoading).toBe(true);
    });

    it('should handle fulfilled', () => {
      const success = {
        type: checkUserAuth.fulfilled.type
      };
      const state = userReducer(initialState, success);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('should handle rejected', () => {
      const error = new Error('Ошибка');
      const failed = { type: checkUserAuth.rejected.type, error };
      const state = userReducer(initialState, failed);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toBe('Ошибка');
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('updateUserThunk tests', () => {
    it('should handle pending', () => {
      const request = { type: updateUserThunk.pending.type };
      const state = userReducer(initialState, request);
      expect(state.isLoading).toBe(true);
    });

    it('should handle fulfilled', () => {
      const success = {
        type: updateUserThunk.fulfilled.type,
        payload: userMock
      };
      const state = userReducer(initialState, success);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(userMock.user);
      expect(state.success).toBe(true);
    });

    it('should handle rejected', () => {
      const error = new Error('Ошибка');
      const failed = { type: updateUserThunk.rejected.type, error };
      const state = userReducer(initialState, failed);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });

  describe('logoutThunk tests', () => {
    it('should handle pending', () => {
      const request = { type: logoutThunk.pending.type };
      const state = userReducer(initialState, request);
      expect(state.isLoading).toBe(true);
    });

    it('should handle fulfilled', () => {
      const success = {
        type: logoutThunk.fulfilled.type
      };
      const state = userReducer(initialState, success);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(null);
      expect(state.success).toBe(true);
    });

    it('should handle rejected', () => {
      const error = new Error('Ошибка');
      const failed = { type: logoutThunk.rejected.type, error };
      const state = userReducer(initialState, failed);

      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toBe('Ошибка');
    });
  });
});
