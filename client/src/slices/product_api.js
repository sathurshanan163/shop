import { PRODUCTS_URL } from '../constants';
import { api_slice } from './api';

export const product_api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = product_api_slice;
