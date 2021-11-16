import React, { useContext, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Me from "../Pages/Me";
import GetStarted from "../Pages/GetStarted";
import HomePage from "../Pages/HomePage";
import Logout from "../Pages/Logout";
import CollabPageWrapper from '../Pages/CollabPageWrapper'
import Spinner from "../Components/Spinner/ContestSpinner/ContestSpinner";

import { AuthContext } from "../context/auth-context";

const Rooms = React.lazy(() => import("../Components/Rooms/Rooms"));
const LockoutWrapper = React.lazy(() => import("../Pages/LockoutWrapper"));
const BlogPage = React.lazy(() => import("../Pages/BlogPage"));
const ParticularBlog = React.lazy(() => import("../Pages/ParticularBlog"));
const UpdateUser = React.lazy(() => import("../Pages/UpdateUser"));
const About = React.lazy(() => import("../Pages/About"));

const CustomRoutes = (props) => {
  const auth = useContext(AuthContext);

  return (
    <>
      <Switch>
        <Route path="/" exact component={GetStarted} />
        <Route path="/homepage" exact component={HomePage} />
        <Route
          path="/rooms"
          exact
          render={() => (
            <Suspense fallback={<Spinner />}>
              <Rooms />
            </Suspense>
          )}
        />
        <Route
          path="/collaborate"
          exact
          component = {CollabPageWrapper}
        />
        <Route
          path="/blogs"
          exact
          render={() => (
            <Suspense fallback={<Spinner />}>
              <BlogPage />
            </Suspense>
          )}
        />
        <Route
          path="/blog/:id"
          exact
          render={() => (
            <Suspense fallback={<Spinner />}>
              <ParticularBlog />
            </Suspense>
          )}
        />
        <Route
          path="/about"
          exact
          render={() => (
            <Suspense fallback={<Spinner />}>
              <About />
            </Suspense>
          )}
        />
        <Route path="/profile" exact component={Me} />
        {auth.isLoggedIn ? (
          <Switch>
            <Route path="/newContest" exact render={() => (
            <Suspense fallback={<Spinner />}>
              <LockoutWrapper />
            </Suspense>
          )} />
            <Route path="/me" exact component={Me} />
            <Route
              path="/updateUser"
              exact
              render={() => (
                <Suspense fallback={<Spinner />}>
                  <UpdateUser />
                </Suspense>
              )}
            />
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

export default CustomRoutes