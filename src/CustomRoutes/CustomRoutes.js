import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Rooms from "../Components/Rooms/Rooms";
import CollabPageWrapper from "../Pages/CollabPageWrapper";
import GetStarted from "../Pages/GetStarted";
import HomePage from "../Pages/HomePage";
import LockoutWrapper from "../Pages/LockoutWrapper";
import BlogPage from "../Pages/BlogPage";
import Logout from "../Pages/Logout";
import ParticularBlog from "../Pages/ParticularBlog";
import Me from "../Pages/Me";
import { AuthContext } from "../context/auth-context";
import About from "../Pages/About"
import UpdateUser from '../Pages/UpdateUser'

const CustomRoutes = (props) => {
  const auth = useContext(AuthContext);

  return (
    <>
      <Switch>
        <Route path="/" exact component={GetStarted} />
        <Route path="/homepage" exact component={HomePage} />
        <Route path="/rooms" exact component={Rooms} />
        <Route path="/collaborate" exact component={CollabPageWrapper} />
        <Route path="/newContest" exact component={LockoutWrapper} />
        <Route path="/blogs" exact component={BlogPage} />
        <Route path="/blog/:id" exact component={ParticularBlog} />
        <Route path="/about" exact component={About} />
        <Route path="/profile" exact component={Me} />
        {auth.isLoggedIn ? (
          <Switch>
            <Route path="/me" exact component={Me} />
            <Route path="/updateUser" exact component={UpdateUser} />
            <Route path="/logout" exact component={Logout} />
            <Redirect to="/homepage" />
          </Switch>
        ) : (
          <Switch>
            <Redirect to="/homepage" />
          </Switch>
        )}
      </Switch>
    </>
  );
};

export default CustomRoutes;
