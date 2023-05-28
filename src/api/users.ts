import { createApi } from '@reduxjs/toolkit/query/react';
import { BanUserDTO, GetUsersDTO, UnbanUserDTO } from '../@types/dto/users';
import { baseQueryWithReauth } from './utils/baseQuery';
import { ResponseType } from '../@types/dto/commonResponse';

type GetUsersResponse = ResponseType<GetUsersDTO, true> & {
  count: number;
};

type GetUsersTotalCount = ResponseType & { count: number };

type GetUsersRequest =
  | {
      offset?: number;
      limit?: number;
      searchText?: string;
    }
  | undefined;

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['users'],
  endpoints: builder => ({
    getUsers: builder.query<GetUsersResponse, GetUsersRequest>({
      query: params => ({
        url: '/users',
        method: 'GET',
        params,
      }),
      providesTags: ['users'],
      transformResponse: (data, meta) => ({
        ...(data as GetUsersResponse),
        // FIXME: Убрать any)))
        count: Number((meta as any).response.headers.get('X-Total-Count')),
      }),
    }),
    getTotalCount: builder.query<GetUsersTotalCount, void>({
      query: () => ({
        url: '/users/total-count',
        method: 'GET',
      }),
      transformResponse: (data, meta) => ({
        ...(data as GetUsersTotalCount),
        // FIXME: Убрать any)))
        count: Number((meta as any).response.headers.get('X-Total-Count')),
      }),
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

export const {
  useGetUsersQuery,
  useGetTotalCountQuery,
  useBanUserMutation,
  useUnbanUserMutation,
} = usersApi;
