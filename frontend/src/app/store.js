import { configureStore } from "@reduxjs/toolkit";
import blogUserSlice from "../feature/blogUserSlice";
import blogPostSlice from "../feature/blogPostSlice";
import { apiSlice } from "../feature/apiSlice";

const store = configureStore({
  reducer : {
    blogUser : blogUserSlice,
    blogPost : blogPostSlice,
    [apiSlice.reducerPath] : apiSlice.reducer
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;