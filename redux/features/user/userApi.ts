import { apiSlice } from "../api/apiSlice";

type UserData = {
  id: string,
  name: string,
  email: string,
  age: number
}

type UpdateUserDataResponse = {
  message: string
}

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchSingleUserData: builder.query({
      query: (id: string) => ({
        url: `fetch-single-user-data/${id}`,
        method: "GET",
      })
    }),
    updateUserData: builder.mutation<UpdateUserDataResponse, UserData>({
      query: (data) => ({
        url: "update-user-data",
        method: "PATCH",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useFetchSingleUserDataQuery,
  useUpdateUserDataMutation
} = courseApi;
