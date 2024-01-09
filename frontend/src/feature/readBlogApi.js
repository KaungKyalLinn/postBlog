import { apiSlice } from "./apiSlice";

const url = "/read"

export const readBlogApi = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    getBlogs : builder.query({
      query : () => url,
      providesTags : ["blogs"]
    })
  })
})

export const {useGetBlogsQuery} = readBlogApi;