import { api_slice } from './api';
import { USERS_URL } from '../constants';

export const user_api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    profile: builder.mutation({
      query: ({ id, token, data }) => ({
        url: `${USERS_URL}/${id}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useProfileMutation } =
  user_api_slice;
