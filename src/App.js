import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import EditorPage from "./Pages/EditorPage";
import Toolbar from "./Components/Toolbar/Toolbar";
import Test from "./Pages/EditorPageT.js";
import { connect } from "react-redux";
import "./App.css";

function App(props) {
  let routes = (
    <>
      <Navbar />
      <Switch>
        <Route path="/home" exact component={Home} />
        <Redirect to="/home" />
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
          <Route path="/editor" exact component={EditorPage} />
          <Route path="/test" exact component={Test} />
          <Redirect to="/editor" />
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
