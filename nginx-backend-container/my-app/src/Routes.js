import React from 'react';
import { HomePage } from './pages/home/Home';
import { LoginPage } from './pages/login/LoginPage';
import { DummyPage } from './pages/dummy/DummyPage';
import { AggregationPage } from './pages/aggregation/AggregationPage';
import { NavBarHeader } from './components/NavBar';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <NavBarHeader />
      <Switch>
        <Route exact path="/Home" component={ HomePage } />
        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>
        <Route exact path="/Login" component={ LoginPage } />
        <Route exact path="/Dummy" component={ DummyPage } />
        <Route exact path="/Aggregation" component={ AggregationPage } />
      </Switch>
    </div>
  );
};