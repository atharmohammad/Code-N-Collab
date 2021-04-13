import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Rooms from "./Components/Rooms";
import Navbar from "./Components/Navbar";
import CollabPage from "./Pages/CollabPage";
import Toolbar from "./Components/Toolbar/Toolbar";
import Test from "./Pages/Test.js";
import GetStarted from "./Pages/GetStarted";
import HomePage from "./Pages/HomePage";

import { connect } from "react-redux";
import "./App.css";

function App(props) {
  let routes = (
    <>
      <Switch>
        <Route path='/' exact component={GetStarted} />
        <Route path="/homepage" exact component={HomePage} />
        <Route path="/rooms" exact component={Rooms} />
        <Redirect to="/homepage" />
      </Switch>
    </>
  );

  if (props.room) {
    //Put false if you want to access Home page else true if you want to acces other routes
    routes = (
      <>
        <Navbar />
        <Toolbar />
        <Switch>
          <Route path="/collaborate" exact component={CollabPage} />
          <Route path="/test" exact component={Test} />
          <Redirect to="/collaborate" />
        </Switch>
      </>
    );
  }

  return <BrowserRouter>{routes}</BrowserRouter>;
}

const mapStateToProps = (state) => {
  return {
    room: state.credentials.room,
  };
};

export default connect(mapStateToProps, null)(App);
