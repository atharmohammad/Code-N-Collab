import React from "react";
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import EditorPage from "./Pages/EditorPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/editor" exact component={EditorPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
