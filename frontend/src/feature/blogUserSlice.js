import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogUser : localStorage.getItem("blogUser") ? JSON.parse(localStorage.getItem("blogUser")) : null,
  status : null,
  message : ""
}

const blogUserSlice = createSlice({
  name : "blogUser",
  initialState,
  reducers : {
    setCredential : (state, action) => {
      state.blogUser = action.payload;
      localStorage.setItem("blogUser", JSON.stringify(action.payload));
    },
    clearCredential : (state, action) => {
      state.blogUser = null;
      localStorage.removeItem("blogUser");
    }
  }
})

export const {setCredential, clearCredential} = blogUserSlice.actions;
export default blogUserSlice.reducer;