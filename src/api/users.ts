import { createApi } from '@reduxjs/toolkit/query/react';
import { BanUserDTO, GetUsersDTO, UnbanUserDTO } from '../@types/dto/users';
import { baseQueryWithReauth } from './utils/baseQuery';
import { ResponseType } from '../@types/dto/commonResponse';

type GetUsersResponse = ResponseType<GetUsersDTO, true>;

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['users'],
  endpoints: builder => ({
    getUsers: builder.query<GetUsersResponse['data'], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['users'],
      transformResponse: (res: GetUsersResponse) => res.data,
    }),
    banUser: builder.mutation<void, BanUserDTO>({
      query: ({ id, ...body }) => ({
        url: `/users/ban/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['users'],
    }),
    unbanUser: builder.mutation<void, UnbanUserDTO>({
      query: ({ id }) => ({
        url: `/users/unban/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['users'],
    }),
    clearContext: builder.mutation<void, BanUserDTO>({
      query: ({ id }) => ({
        url: `/users/clearContext/${id}`,
        method: 'POST',
      }),
    }),
    deleteUser: builder.mutation<void, BanUserDTO>({
      query: ({ id }) => ({
        url: `/users/delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetUsersQuery, useBanUserMutation, useUnbanUserMutation } =
  usersApi;
