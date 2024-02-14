import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../feature/blogUserApiSlice";
import { setCredential } from "../feature/blogUserSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [blogUser, setBlogUser] = useState({
    name : "",
    email : "",
    password : "",
    password2 : "",
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, {isLoading, isSuccess}] = useRegisterMutation();

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
    e.preventDefault();
    if(blogUser.password === blogUser.password2){
      try{
        const response = await register({
          name : blogUser.name,
          email : blogUser.email,
          password :  blogUser.password
        }).unwrap();
        dispatch(setCredential(response));
      }
      catch(err){
        toast.error(err?.data?.message || err.error)
      }
    }else{
      toast.warn("password not match")
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
      <div className="registerPage">
        <div className="bgCover bgCoverTwo"></div>
        <div className="registerDiv">
          <h1 className="registerTitle">Sign up</h1>
          <form className="form registerForm" onSubmit={loginBlogUser}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required value={blogUser.name} onChange={dataChange}/>

            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required value={blogUser.email} onChange={dataChange}/>

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required value={blogUser.password} onChange={dataChange}/>

            <label htmlFor="password2">Confirm Password</label>
            <input type="password" id="password2" name="password2" required value={blogUser.password2} onChange={dataChange}/>

            <button className="btn loginBtn">Sign in</button>
          </form>
          <p className="toRegister">Already have account? <Link to="/user/login" className="toLoginLink toLink">sign in</Link></p>
        </div>
      </div>
    </>
  )
}

export default RegisterScreen