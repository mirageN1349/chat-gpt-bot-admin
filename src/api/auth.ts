import { createApi } from '@reduxjs/toolkit/query/react';

import { CurrentUserDTO, SigninDTO, SignupDTO } from '../@types/dto/auth';
import { baseQueryWithReauth } from './utils/baseQuery';
import { ResponseType } from '../@types/dto/commonResponse';

type SigninResponse = ResponseType<{
  accessToken: string;
}>;
type SignoutResponse = ResponseType;
type CurrentUserResponse = ResponseType<CurrentUserDTO>;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    signin: builder.mutation<SigninResponse, SigninDTO>({
      query: body => ({
        url: 'auth/signin',
        method: 'POST',
        body,
      }),
    }),
    signup: builder.mutation<SigninResponse, SignupDTO>({
      query: body => ({
        url: 'auth/signup',
        method: 'POST',
        body,
      }),
    }),
    refresh: builder.mutation<SigninResponse, void>({
      query: body => ({
        url: 'auth/refresh',
        method: 'POST',
        body,
      }),
    }),
    signout: builder.mutation<SignoutResponse, void>({
      query: () => ({
        url: 'auth/signout',
        method: 'POST',
      }),
    }),
    getCurrentUser: builder.query<CurrentUserResponse, void>({
      query: body => ({
        url: 'auth/current-user',
        method: 'GET',
        body,
      }),
    }),
  }),
});

export const { useSigninMutation, useGetCurrentUserQuery, useSignoutMutation } =
  authApi;
