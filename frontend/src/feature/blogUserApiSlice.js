import { apiSlice } from "./apiSlice";

const url = "/api/user"

export const blogUserApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    register : builder.mutation({
      query : (data) => ({
        url : url + "/",
        method : "POST",
        body : data
      }),
      // invalidatesTags : ["blogUser"]
    }),
    login : builder.mutation({
      query : (data) => ({
        url : url + "/login",
        method : "POST",
        body : data
      }),
      // invalidatesTags : ["blogUser"]
    }),
    update : builder.mutation({
      query : (data) => ({
        url : url + "/",
        method : "PUT",
        body : data
      })
    }),
    logout : builder.mutation({
      query : () => ({
        url : url + "/logout",
        method : "POST",
      }),
      invalidatesTags : ["blogUser"]
    })
  })
})

export const {useRegisterMutation, useLoginMutation, useUpdateMutation, useLogoutMutation} = blogUserApiSlice;