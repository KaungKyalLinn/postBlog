import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoute = () => {
  const { blogUser } = useSelector(state => state.blogUser)
  return (
    blogUser ? (<Outlet />) : (<Navigate to="/" replace />)
  )
}

export default PrivateRoute;