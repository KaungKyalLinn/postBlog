import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetUserBlogQuery } from "../feature/blogPostApiSlice"
import { FaPaperclip, FaPen, FaPortrait, FaSpinner } from "react-icons/fa"

const ProfileScreen = () => {
  const {blogUser} = useSelector(state => state.blogUser);
  const {data : blogs, isSuccess} = useGetUserBlogQuery();

  return (
    <div className="profilePage">
      <div className="profileSection">
        <div className="profileHalf">
          <div className="profile">
            <h1 className="profileInfo">{blogUser.name}</h1>
            <p className="profileInfo profileP">{blogUser.email}</p>
            <div className="profileEditBar">
              <div className="profileIcons">
                <Link to="/user/update">
                  <FaPortrait />
                </Link>
              </div>
              <div className="profileIcons">
                <Link to="/user/dashboard">
                  <FaPen />
                </Link>
              </div>
              {blogs && blogs.length > 0 ? (
                <div className="profileIcons">
                  <p><FaPaperclip /> : {blogs.length}</p>
                </div>
              ) : (
                <div className="profileIcons">
                  <FaPaperclip /><FaSpinner />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="profileHalf">
          <h2>blogs : </h2>
          {blogs && blogs.length && isSuccess > 0 ? (
            <div className="blogOverview">
              {blogs.map((blog) => {
                return(
                  <div className="overview" key={blog._id}>
                    <h2>{blog.blogName}</h2>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="blogOverview">
              <p>Havn't created any blog yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen