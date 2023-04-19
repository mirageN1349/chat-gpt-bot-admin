import { RootState } from '../rootStore';

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
