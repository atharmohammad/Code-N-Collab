import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Rooms from "./Components/Rooms/Rooms";
import CollabPage from "./Pages/CollabPage";
import GetStarted from "./Pages/GetStarted";
import HomePage from "./Pages/HomePage";
import Test from "./Pages/Test";
import { SocketContext, socket } from "./context/socket";

import "./App.css";

function App(props) {
  let routes = (
    <SocketContext.Provider value={socket}>
      <Switch>
        <Route path="/" exact component={GetStarted} />
        <Route path="/homepage" exact component={HomePage} />
        <Route path="/rooms" exact component={Rooms} />
        <Route path="/collaborate" exact component={CollabPage} />
        <Route path="/test" exact component={Test} />
        <Redirect to="/homepage" />
      </Switch>
    </SocketContext.Provider>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
