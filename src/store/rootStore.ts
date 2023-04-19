import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersApi } from '../api/users';
import { authApi } from '../api/auth';
import authSlice from './slices/auth';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: combineReducers({
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(usersApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
