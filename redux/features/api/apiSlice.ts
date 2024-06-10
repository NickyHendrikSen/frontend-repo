import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL
  }),
  endpoints: (builder) => ({
    loadProfile: builder.query({
      query: (data) => ({
        url: 'me',
        method: 'GET',
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}){
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data.user
            })
          );
        } catch (error: any) {
          console.log(error)
          dispatch(
            userLoggedOut()
          );
          
        }
      }
    }),
  }),
})

export const {useLoadProfileQuery} = apiSlice;