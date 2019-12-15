import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Home from 'routes/Home/Home';
import Books from 'routes/Books';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
