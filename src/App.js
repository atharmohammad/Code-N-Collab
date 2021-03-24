import React from "react";
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import EditorPage from "./Pages/EditorPage";
import Playground from "./Pages/Playground";
import Toolbar from "./Components/Toolbar";
import "./App.css";

export default function App() {
  let routes = (
    <>
    <Navbar />
      <Switch>
      <Route path="/home" exact component={Home} />
    </Switch>
    </>
  )

  if(true){
    routes = (<>
      <Navbar />
      <Toolbar/>
      <Switch>
        <Route path="/editor" exact component={EditorPage} />
        <Route path="/playground" exact component={Playground} />
        <Redirect to="/editor" />
      </Switch>
      </>)
  }


  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
}
