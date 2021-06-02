import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Rooms from "../Components/Rooms/Rooms";
import CollabPageWrapper from "../Pages/CollabPageWrapper";
import GetStarted from "../Pages/GetStarted";
import HomePage from "../Pages/HomePage";
import LockoutWrapper from "../Pages/LockoutWrapper";
import BlogPage from "../Pages/BlogPage";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";
import SignUp from "../Pages/Signup";
import ParticularBlog from "../Pages/ParticularBlog";
import UpdateUser from "../Pages/UpdateUser";
import ProfilePage from "../Pages/Profile";
import { AuthContext } from "../context/auth-context";

const CustomRoutes = (props) => {
  const auth = useContext(AuthContext);
  //Do not try to merge routes as react fragment does not work in switch statement 
  
  return (
    <>
      <Switch>
        <Route path="/" exact component={GetStarted} />
        <Route path="/homepage" exact component={HomePage} />
        <Route path="/rooms" exact component={Rooms} />
        <Route path="/collaborate" exact component={CollabPageWrapper} />
        <Route path="/newContest" exact component={LockoutWrapper} />
        <Route path="/blogs" exact component={BlogPage} />
        <Route path="/profilePage/:id" exact component={ProfilePage} />
        <Route path="/blog/:id" exact component={ParticularBlog} />
        {auth.isLoggedIn ? (
          <Route path="/logout" exact component={Logout} />
        ) : (
          <Route path="/login" exact component={Login} />
        )}
        {auth.isLoggedIn ? (
          <Route path="/updateUser" exact component={UpdateUser} />
        ) : null}
        {auth.isLoggedIn ? null : (
          <Route path="/signup" exact component={SignUp} />
        )}
      <Redirect to="/homepage" />
      </Switch>
    </>
  );
};

export default CustomRoutes;
