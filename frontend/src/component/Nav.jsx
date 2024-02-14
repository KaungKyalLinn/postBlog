import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLogoutMutation } from "../feature/blogUserApiSlice";
import { toast } from "react-toastify";
import { clearCredential } from "../feature/blogUserSlice";
import { useRef } from "react";

const Nav = () => {
  const user = useSelector(state => state.blogUser);
  const [logout, {isloading}] = useLogoutMutation();
  const dispatch = useDispatch();

  const ulWrap = useRef(null);
  const menuStickOne = useRef(null);
  const menuStickTwo = useRef(null);
  const menuStickThree = useRef(null);

  const menuClick = () => {
    ulWrap.current.classList.toggle("activeUlWrap");
    menuStickOne.current.classList.toggle("animateStickOne");
    menuStickTwo.current.classList.toggle("animateStickTwo");
    menuStickThree.current.classList.toggle("animateStickThree");
  }

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
      <div className="navHalf navRightHalf">
        <div className="ulWrap" ref={ulWrap}>
          {user.blogUser ? (
            <ul className="navUl">
              <li className="navLi">
                <NavLink className="navLink" to="/">home</NavLink>
              </li>
              <li className="navLi">
                <NavLink className="navLink" to="/blog">blog</NavLink>
              </li>
              <li className="navLi">
                <NavLink className="navLink" to="/user/profile">profile</NavLink>
              </li>
              <li className="navLi">
                <button className="btn logoutBtn" onClick={activateLogout}>logout</button>
              </li>
            </ul>
          ) : (
            <ul className="navUl">
              <li className="navLi">
                <NavLink className="navLink" to="/">home</NavLink>
              </li>
              <li className="navLi">
                <NavLink className="navLink" to="/blog">blog</NavLink>
              </li>
              <li className="navLi">
                <NavLink className="navLink" to="/user/login">sign in</NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className="menu" onClick={menuClick}>
          <span className="menuStick" ref={menuStickOne}></span>
          <span className="menuStick" ref={menuStickTwo}></span>
          <span className="menuStick" ref={menuStickThree}></span>
        </div>
      </div>
    </nav>
  )
}

export default Nav;