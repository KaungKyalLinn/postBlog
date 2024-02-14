import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../feature/blogUserApiSlice";
import { setCredential } from "../feature/blogUserSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [blogUser, setBlogUser] = useState({
    email : "",
    password : ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, {isLoading, isSuccess}] = useLoginMutation();

  useEffect(() => {
    if(isSuccess){
      navigate("/user/dashboard")
    }
  },[isSuccess, navigate])

  const dataChange = (e) => {
    setBlogUser((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const loginBlogUser = async (e) => {
    await e.preventDefault();
    try{
      const response = await login({email : blogUser.email, password : blogUser.password}).unwrap();
      dispatch(setCredential({...response}))
    }
    catch(err){
      toast.error(err?.data?.message || err.error)
    }
  }

  if(isLoading){
    return(
      <div className="page centerPage">
        Loading ...
      </div>
    )
  }

  return (
    <>
      <div className="loginPage">
      <div className="bgCover"></div>
        <div className="loginDiv">
          <h1 className="signInTitle">Sign in</h1>
          <form className="form loginForm" onSubmit={loginBlogUser}>
            <label htmlFor="name">Email</label>
            <input type="text" id="name" name="email" required value={blogUser.email} onChange={dataChange}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required value={blogUser.password} onChange={dataChange}/>
            <button className="btn loginBtn">Sign in</button>
          </form>
          <p className="toRegister">doesn't have account? <Link to="/user/register" className="toRegisterLink">sign up</Link></p>
        </div>
      </div>
    </>
  )
}

export default LoginScreen