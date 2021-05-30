import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Rooms from "../Components/Rooms/Rooms";
import CollabPageWrapper from "../Pages/CollabPageWrapper";
import GetStarted from "../Pages/GetStarted";
import HomePage from "../Pages/HomePage";
import LockoutWrapper from "../Pages/LockoutWrapper";
import BlogPage from "../Pages/BlogPage";
import ChooseName from "../Pages/ChooseName";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";
import SignUp from "../Pages/Signup";
import ParticularBlog from "../Pages/ParticularBlog";
import { AuthContext } from "../context/auth-context";

const CustomRoutes = (props) => {
  const auth = useContext(AuthContext);
  let routes = <></>;

  if (auth.isLoggedIn) {
    routes = (
      <>
        <Route path="/logout" exact component={Logout} />;
        <Route path="/newContest" exact component={LockoutWrapper} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
      </>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={GetStarted} />
      <Route path="/homepage" exact component={HomePage} />
      <Route path="/rooms" exact component={Rooms} />
      <Route path="/collaborate" exact component={CollabPageWrapper} />
      <Route path="/blogs" exact component={BlogPage} />
      <Route path="/blog/:id" exact component={ParticularBlog} />
      <Route path="/chooseName" exact component={ChooseName} />
      {routes}
      <Redirect to="/homepage" />
    </Switch>
  );
};

export default CustomRoutes;
