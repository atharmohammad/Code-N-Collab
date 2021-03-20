import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom';
import Home from './Components/Home'
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} />
    </BrowserRouter>
  );
}
