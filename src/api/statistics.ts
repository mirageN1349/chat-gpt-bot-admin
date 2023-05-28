import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './utils/baseQuery';
import { ResponseType } from '../@types/dto/commonResponse';

type GetUsersByPeriodRequest = {
  startDt: Date;
  endDt: Date;
};

type GetMessagesByPeriodRequest = {
  startDt: Date;
  endDt: Date;
};

type GetMessagesByPeriodResponse = ResponseType & {
  count: number;
};

type GetUsersByPeriodResponse = ResponseType & {
  count: number;
};

export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getUsersByPeriod: builder.query<
      GetUsersByPeriodResponse,
      GetUsersByPeriodRequest
    >({
      query: params => ({
        url: '/statistics/get-users-by-period',
        method: 'GET',
        params,
      }),
      transformResponse: (data, meta) => ({
        ...(data as GetUsersByPeriodResponse),
        // FIXME: Убрать any)))
        count: Number((meta as any).response.headers.get('X-Total-Count')),
      }),
    }),
    getMessagesByPeriod: builder.query<
      GetMessagesByPeriodResponse,
      GetMessagesByPeriodRequest
    >({
      query: params => ({
        url: '/statistics/get-messages-by-period',
        method: 'GET',
        params,
      }),
      transformResponse: (data, meta) => ({
        ...(data as GetMessagesByPeriodResponse),
        // FIXME: Убрать any)))
        count: Number((meta as any).response.headers.get('X-Total-Count')),
      }),
    }),
  }),
});

export const { useGetUsersByPeriodQuery, useGetMessagesByPeriodQuery } =
  statisticsApi;
