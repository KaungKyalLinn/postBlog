import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import { useState } from "react";
import { useDeleteBlogMutation, useGetUserBlogQuery, usePostBlogMutation, useUpdateBlogMutation } from "../feature/blogPostApiSlice";
import { FaTrash, FaEdit } from "react-icons/fa"


const DashboardScreen = () => {

  const user = useSelector(state => state.blogUser);
  const [blogData, setBlogData] = useState({
    blogName : "",
    blogBody : "",
  })
  const [forUpdate, setForUpdate] = useState(null);
  const [condition, setCondition] = useState("creating");

  const {data : blogs, isLoading : fetchingBlog} = useGetUserBlogQuery();
  const [postBlog, {isLoading : posting}] = usePostBlogMutation();
  const [updateBlog, {isLoading : uploading}] = useUpdateBlogMutation();
  const [deleteBlog, {isLoading : deleteing}] = useDeleteBlogMutation();

  const blogDataChange = (e) => {
    setBlogData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  // chaging post mode and fill blog data in text fields
  const prepareForEdit = (blogId, theBlogName, theBlogBody) => {
    setForUpdate(blogId);
    setCondition("updating");
    setBlogData({
      blogName : theBlogName,
      blogBody : theBlogBody
    })
  }

  //deleting blog
  const activateBlogDelete = async (postId) => {
    try{
      await deleteBlog(postId).unwrap();
      toast.success("delete successful")
    }
    catch(err){
      toast.error(err?.data?.message || err.error)
    }
  }

  const postingBlog = async () => {
    if(!forUpdate){
      try{
        await postBlog({blogName: blogData.blogName, blogBody : blogData.blogBody, author : user.blogUser.name, authorEmail : user.blogUser.email}).unwrap();
        toast.success("post successful")
         setBlogData({
           blogName : "",
           blogBody : ""
         })
        }
      catch(err){
        toast.error(err?.data?.message || err.error);
      }
    }else if(forUpdate){
      try{
        await updateBlog({blogName: blogData.blogName, blogBody : blogData.blogBody, blogId : forUpdate}).unwrap();
        setForUpdate(null);
        setCondition("creating")
        toast.success("update successful")
        setBlogData({
          blogName : "",
          blogBody : ""
        })
      }
      catch(err){
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  if(fetchingBlog || posting || uploading || deleteing){
    return(
      <div className="page centerPage">
        <div>
          Loading ...
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="page dashboardPage" id="dashboard">
        <div className="dashboardHalf dashboardLeftHalf">
          <div className="form dashboardForm">
            <label htmlFor="blogName">Blog Title : </label>
            <input type="text" id="blogName" name="blogName" required value={blogData.blogName} onChange={blogDataChange}/>
          </div>
          <h2 className={condition}>{condition}</h2>
        </div>
        <div className="dashboardHalf dashboardRightHalf">
          <div className="form dashboardForm">
            <label htmlFor="blogBody">: </label>
            <textarea name="blogBody" id="blogBody" cols="30" rows="15" value={blogData.blogBody} onChange={blogDataChange}></textarea>
            <button className="btn postBlogBtn" onClick={postingBlog}>Post</button>
          </div>
        </div>
      </div>
      <div className="userBlogListPage">
        {blogs && blogs.length > 0 ? (
          <div>
            {blogs.map((blog) => {
              return(
                <div key={blog._id} className="theBlog">
                  <div className="editBar">
                    <a href="#dashboard" className="backToForm">
                      <FaEdit className="editIcons" onClick={() => {prepareForEdit(blog._id, blog.blogName, blog.blogBody)}}/>
                    </a>
                    <FaTrash className="editIcons" onClick={() => {activateBlogDelete(blog._id)}}/>
                  </div>
                  <h2 className="theBlogName">{blog.blogName}</h2>
                  <p className="theBlogBody">{blog.blogBody}</p>
                </div>
              )
            })}
          </div>
        ) : (
          <div>
            <h2>there no blog yet.</h2>
          </div>
        )}
      </div>
    </>
  )
}

export default DashboardScreen