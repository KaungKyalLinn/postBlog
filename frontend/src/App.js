import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import HomeScreen from "./screen/HomeScreen";
import BlogScreen from "./screen/BlogScreen";
import RegisterScreen from "./screen/RegisterScreen";
import LoginScreen from "./screen/LoginScreen";
import ProfileScreen from "./screen/ProfileScreen";
import DashboardScreen from "./screen/DashboardScreen";
import Nav from "./component/Nav";
import PrivateRoute from "./component/PrivateRoute";
import ProfileUpdate from "./screen/ProfileUpdate";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Nav />
          <Routes>
            <Route path="/" element={ <HomeScreen /> } />
            <Route path="/blog" element={ <BlogScreen /> } />
            <Route path="/user/register" element={ <RegisterScreen /> } />
            <Route path="/user/login" element={ <LoginScreen /> } />

            {/* private routes */}
            <Route path="" element={ <PrivateRoute /> }>
              <Route path="/user/profile" element={ <ProfileScreen /> } />
              <Route path="/user/dashboard" element={ <DashboardScreen /> } />
              <Route path="/user/update" element={ <ProfileUpdate /> } />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
