"use client";

import {
  IAllUsersAPIResponse,
  IAllUsersDataResponse,
  IUser,
} from "@/app/types";
import { apiSlice } from "../../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => ({
        url: "users",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "users" as const,
                id,
              })),
              { type: "users", id: "LIST" },
            ]
          : [{ type: "users", id: "LIST" }],
      transformResponse: (response: IAllUsersAPIResponse) => {
        return response.payload.data;
      },
    }),
    createUser: builder.mutation({
      query: (credentials) => ({
        url: "users",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "users", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useDeleteProductMutation,
} = usersApiSlice;
