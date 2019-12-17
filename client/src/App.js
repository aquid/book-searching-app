// @flow
import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SearchContextProvider from 'context/SearchContext';
import Home from 'routes/Home/HomePage';
import BooksPage from 'routes/Book/BooksPage';

function App() {
  return (
    <SearchContextProvider>
      <Router>
        <Switch>
          <Route path="/books">
            <BooksPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </SearchContextProvider>
  );
}

export default App;
