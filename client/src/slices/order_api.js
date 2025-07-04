import { api_slice } from './api';
import { ORDERS_URL, STRIPE_URL } from '../constants';

export const order_api_slice = api_slice.injectEndpoints({
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
    getMyOrders: builder.query({
      query: (token) => ({
        url: `${ORDERS_URL}/mine`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    pay: builder.mutation({
      query: ({ token, id }) => ({
        url: STRIPE_URL,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { order_id: id },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetMyOrdersQuery,
  usePayMutation,
} = order_api_slice;
