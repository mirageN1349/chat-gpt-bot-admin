import { createApi } from '@reduxjs/toolkit/query/react';

import { CurrentUserDTO, SigninDTO, SignupDTO } from '../@types/dto/auth';
import { baseQueryWithReauth } from './utils/baseQuery';
import { ResponseType } from '../@types/dto/commonResponse';

type SigninResponse = ResponseType<
  {
    accessToken: string;
  },
  true
>;

type CurrentUserResponse = ResponseType<CurrentUserDTO, true>;

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
    signup: builder.mutation<SigninResponse['data'], SignupDTO>({
      query: body => ({
        url: 'auth/signup',
        method: 'POST',
        body,
      }),
      transformResponse: (res: SigninResponse) => res.data,
    }),
    refresh: builder.mutation<SigninResponse['data'], void>({
      query: body => ({
        url: 'auth/refresh',
        method: 'POST',
        body,
      }),
      transformResponse: (res: SigninResponse) => res.data,
    }),
    getCurrentUser: builder.query<CurrentUserResponse['data'], void>({
      query: body => ({
        url: 'auth/current-user',
        method: 'GET',
        body,
      }),
      transformResponse: (res: CurrentUserResponse) => res.data,
    }),
  }),
});

export const { useSigninMutation, useGetCurrentUserQuery } = authApi;
