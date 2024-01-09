import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({baseurl: ""});

export const apiSlice = createApi({
  baseQuery,
  tagTypes : ["blogUser", "blogPost", "blogs"],
  endpoints : (builder) => ({})
})