import { createApi } from '@reduxjs/toolkit/query/react';
import { BanUserDTO, GetUsersDTO } from '../@types/dto/users';
import { baseQueryWithReauth } from './utils/baseQuery';
import { ResponseType } from '../@types/dto/commonResponse';

type GetUsersResponse = ResponseType<GetUsersDTO, true>;

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getUsers: builder.query<GetUsersResponse['data'], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      transformResponse: (res: GetUsersResponse) => res.data,
    }),
    banUser: builder.mutation<void, BanUserDTO>({
      query: ({ id, ...body }) => ({
        url: `/ban/${id}`,
        method: 'POST',
        body,
      }),
    }),
    unbanUser: builder.mutation<void, BanUserDTO>({
      query: ({ id }) => ({
        url: `/unban/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetUsersQuery, useBanUserMutation, useUnbanUserMutation } =
  usersApi;
