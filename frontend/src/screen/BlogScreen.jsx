import TheBlog from "../component/TheBlog";
import { useGetBlogsQuery } from "../feature/readBlogApi";

const BlogScreen = () => {
  const {data : blogs, isLoading, isSuccess} = useGetBlogsQuery();

  if(isLoading){
    return(
      <div className="page centerPage">
        <div>Loading ...</div>
      </div>
    )
  }
  return (
    <>
      <div className="blogPage">
        {
          blogs.map(blog => {
            return(
              <div key={blog._id} className="theBlog">
                <TheBlog blogData={blog}/>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default BlogScreen