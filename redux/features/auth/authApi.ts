import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({email, password}) => ({
        url: "login",
        method: "POST",
        body: {
          email, password
        },
        credentials: "include" as const
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
        }
      }
    }),
    logout: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled
          dispatch(
            userLoggedOut()
          )
        } catch (error: any) {
          console.log(error)
        }
      }
    })
  })
})

export const {
  useLoginMutation,
  useLogoutQuery
} = authApi;