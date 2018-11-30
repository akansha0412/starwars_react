import React, { Component } from 'react';
import Login from './components/Login'
import Home from './components/Home'


import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


class App extends Component {

  render() {
    return (
      <Router>
      <div>
        <PrivateRoute exact path="/" component={Home} />
        <LoginRoute path="/login" component={Login} />
      </div>
      </Router>
    );
  }

}

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export const LoginRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)

export default App;
