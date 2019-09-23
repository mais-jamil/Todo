import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Home from './component/Home';
import ViewTodo from './component/ViewTodo'
import NavBar from './component/NavBar';
import CreateToDo from './component/CreateToDo.js'


function App() {
  return (
    <div className="App">
                 <Router>
                     <Route  path="/"exact component={Home} />
                     <Route path="/todo" component={NavBar} />
                     <Route path="/create" component={CreateToDo} />
                    <Route path="/viewtodo" component={ViewTodo} />
                </Router>
    </div>
  );
}

export default App;
