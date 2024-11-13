"use client";

import { IUser, IUserProfileResponse } from "@/app/types";
import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user-auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/user-auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    resendOtp: builder.mutation({
      query: (credentials) => ({
        url: "/user-auth/resend-otp",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: "/user-auth/verify-email",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    registerAdmin: builder.mutation({
      query: (credentials) => ({
        url: "admin/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: "/admin-auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getUserProfile: builder.query<IUserProfileResponse, void>({
      query: () => ({
        url: `/user-auth/profile`,
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
        // transformResponse: (response: IUserProfileResponse) => {
        //   return response.payload.user;
        // },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRegisterAdminMutation,
  useLoginAdminMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useGetUserProfileQuery,
} = authApiSlice;
