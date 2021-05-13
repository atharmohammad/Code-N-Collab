import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Rooms from "./Components/Rooms/Rooms";
import CollabPageWrapper from "./Pages/CollabPageWrapper";
import GetStarted from "./Pages/GetStarted";
import HomePage from "./Pages/HomePage";
import LockoutWrapper from "./Pages/LockoutWrapper";
import BlogPage from "./Pages/BlogPage";

import "./App.css";

function App(props) {
  let routes = (
    <Switch>
      <Route path="/" exact component={GetStarted} />
      <Route path="/homepage" exact component={HomePage} />
      <Route path="/rooms" exact component={Rooms} />
      <Route path="/collaborate" exact component={CollabPageWrapper} />
      <Route path="/blogs" exact component={BlogPage} />
      <Route path="/newContest" exact component={LockoutWrapper} />
      <Redirect to="/homepage" />
    </Switch>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
