// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const Authentication = createApi({
  reducerPath: "Authentication",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}`, credentials: "include" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => {
        return {
          url: "register",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    login: builder.mutation({
      query: (credential) => {
        return {
          url: 'login',
          method: "POST",
          body: credential,
          headers: {
            "Content-type": "application/json"
          }
        }
      }
    }),

    profile: builder.query({
      query: () =>{
        return {
          url: 'profile',
          method: 'GET',
          headers: {
            "Content-type": "application/json",
          }
        }
      }
    }),

    logout: builder.mutation({
      query: () => {
        return {
          url: 'logout',
          method: 'POST'
        }
      }
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterMutation, useLoginMutation, useLazyProfileQuery, useLogoutMutation } = Authentication;
