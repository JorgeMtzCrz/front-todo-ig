import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Todo from './components/Todo'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/todo" component={Todo} />
    </Switch>
  </BrowserRouter>
);

export default Router;
