import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogPost : [],
  status : null,
  message : ""
}

const blogPostSlice = createSlice({
  name : "blogPost",
  initialState,
  reducers : {
    resetPost : (state) => {
      state.blogPost = [];
      state.status = null;
    }
  }
})

export const { resetPost } = blogPostSlice.actions;
export default blogPostSlice.reducer;