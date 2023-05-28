import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CurrentUserDTO } from '../../@types/dto/auth';
import { authApi } from '../../api/auth';

export interface AuthState {
  currentUser?: CurrentUserDTO | null;
  isAuth: boolean;
  isFetching: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isAuth: false,
  isFetching: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUserDTO>) => {
      state.currentUser = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.signin.matchFulfilled, state => {
        state.isAuth = true;
      })
      .addMatcher(
        authApi.endpoints.getCurrentUser.matchFulfilled,
        (state, action) => {
          if (action.payload.ok) {
            state.isAuth = true;
            state.currentUser = action.payload.data;
          } else {
            state.isAuth = false;
            state.currentUser = null;
          }
        }
      )
      .addMatcher(
        authApi.endpoints.getCurrentUser.matchRejected,
        (state, action) => {
          if (action.error.name === 'ConditionError') return;
          state.isAuth = false;
        }
      );
  },
});

export const { setCurrentUser, setIsAuth, setIsFetching } = authSlice.actions;

export default authSlice.reducer;
