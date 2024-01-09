import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../feature/blogUserApiSlice";
import { toast } from "react-toastify";
import { clearCredential } from "../feature/blogUserSlice";

const Nav = () => {
  const user = useSelector(state => state.blogUser);
  const [logout, {isloading}] = useLogoutMutation();
  const dispatch = useDispatch();

  const activateLogout = async () => {
    try{
      await logout();
      dispatch(clearCredential());
    }
    catch(err){
      toast.error(err?.data?.message || err.error);
    }
  }

  if(isloading){
    return(
      <div className="page centerPage">
        <div>Loading ...</div>
      </div>
    )
  }

  return (
    <nav className="navBar">
      <div className="navHalf">
        <div className="navLogoDiv">
          <h1 className="navLogo">post blog</h1>
        </div>
      </div>
      {user.blogUser ? (
      <div className="navHalf">
        <ul className="navUl">
          <li className="navLi">
            <Link className="navLink" to="/">home</Link>
          </li>
          <li className="navLi">
            <Link className="navLink" to="/blog">blog</Link>
          </li>
          <li className="navLi">
            <Link className="navLink" to="/user/profile">profile</Link>
          </li>
          <li className="navLi">
            <button className="btn logoutBtn" onClick={activateLogout}>logout</button>
          </li>
        </ul>
      </div>
      ) : (
        <div className="navHalf">
          <ul className="navUl">
            <li className="navLi">
              <Link className="navLink" to="/">home</Link>
            </li>
            <li className="navLi">
              <Link className="navLink" to="/blog">blog</Link>
            </li>
            <li className="navLi">
              <Link className="navLink" to="/user/login">sign in</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Nav