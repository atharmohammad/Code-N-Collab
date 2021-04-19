import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Rooms from "./Components/Rooms/Rooms";
import Navbar from "./Components/Navbar";
import CollabPage from "./Pages/CollabPage";
import Toolbar from "./Components/Toolbar/Toolbar";
import GetStarted from "./Pages/GetStarted";
import HomePage from "./Pages/HomePage";
import { SocketContext, socket } from "./context/socket";

import { connect } from "react-redux";
import "./App.css";

function App(props) {
  let routes = (
    <SocketContext.Provider value={socket}>
      <Switch>
        <Route path="/" exact component={GetStarted} />
        <Route path="/homepage" exact component={HomePage} />
        <Route path="/rooms" exact component={Rooms} />
        <Route path="/collaborate" exact component={CollabPage} />
        <Redirect to="/homepage" />
      </Switch>
    </SocketContext.Provider>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
}

const mapStateToProps = (state) => {
  return {
    room: state.credentials.room,
  };
};

export default connect(mapStateToProps, null)(App);
