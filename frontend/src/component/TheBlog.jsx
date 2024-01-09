
const TheBlog = ({blogData}) => {
  return (
    <div className="singleBlog">
      <h2 className="theBlogName">{blogData.blogName}</h2>
      <p className="theBlogBody">{blogData.blogBody}</p>
      <p className="theBlogAuthor">by : {blogData.author}</p>
    </div>
  )
}

export default TheBlog