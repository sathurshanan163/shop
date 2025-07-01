import { apiSlice } from './api';
import { ORDERS_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ token, order }) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getOrder: builder.query({
      query: ({ token, id }) => ({
        url: `${ORDERS_URL}/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderQuery } = orderApiSlice;
