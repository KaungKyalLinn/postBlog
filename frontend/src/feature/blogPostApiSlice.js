import { apiSlice } from "./apiSlice";

const url = "/api/blog"

export const blogPostApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder)=> ({
    getUserBlog : builder.query({
      query : () => url,
      providesTags : ["blogPost"]
    }),
    postBlog : builder.mutation({
      query : (data) => ({
        url,
        method : "POST",
        body : data
      }),
      invalidatesTags : ["blogPost"]
    }),
    updateBlog : builder.mutation({
      query : (data) => ({
        url,
        method : "PUT",
        body : data
      }),
      invalidatesTags : ["blogPost"]
    }),
    deleteBlog : builder.mutation({
      query : (postId) => ({
        url : url + "/delete/" + postId,
        method : "DELETE",
      }),
      invalidatesTags : ["blogPost"]
    })
  })
})

export const {usePostBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation, useGetUserBlogQuery} = blogPostApiSlice