"use client";

import { IAllUsersResponse, IUser } from "@/app/types";
import { apiSlice } from "../../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => ({
        url: "/customer-mgt/all-users",
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
      transformResponse: (response: IAllUsersResponse) => {
        return response.payload.users[0];
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllUsersQuery } = usersApiSlice;
