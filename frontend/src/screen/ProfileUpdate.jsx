import { useState } from "react";
import { useUpdateMutation } from "../feature/blogUserApiSlice"
import { useDispatch, useSelector } from "react-redux";
import { setCredential } from "../feature/blogUserSlice";
import { toast } from "react-toastify";

const ProfileUpdate = () => {
  const {blogUser} = useSelector(state => state.blogUser);
  console.log(blogUser)
  const [userData, setUserData] = useState({
    name : blogUser ? blogUser.name : "",
    password : ""
  })
  const [update, {isLoading, isSuccess}] = useUpdateMutation();
  const dispatch = useDispatch();

  const userDataChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const blogUserUpdate = async (e) => {
    await e.preventDefault();
    try{
      await update({name: userData.blogUser, emapassword: userData.password});
      dispatch(setCredential({name: userData.name, email: blogUser.email}))
    }
    catch(err){
      toast.error(err?.data?.message || err.error)
    }
  }

  if(isLoading){
    return(
      <div className="page centerPage">
        <div>Loading ...</div>
      </div>
    )
  }

  return (
    <div className="page profileUpdatePage centerPage">
      <form className="form profileUpdateForm" onSubmit={blogUserUpdate}>
        <label htmlFor="userName">Name : </label>
        <input type="text" name="name" id="userName" required value={userData.name} onChange={userDataChange}/>
        <label htmlFor="userPassword">Password : </label>
        <input type="text" name="passwrod" id="userPassword" required value={userData.password} onChange={userDataChange}/>
        <button className="btn">update</button>
      </form>
    </div>
  )
}

export default ProfileUpdate