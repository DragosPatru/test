import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './Routes'; // where we are going to specify our routes

class App extends Component {

  render() {
    return (
      <Router>
            <Routes />
      </Router>
    );
  }
}

export default App;
// connect component to Redux store
// connect takes in two parameters: mapStateToProps and mapDispatchToProps
//The 'mapStateToProps' parameter of connect allows the React component to subscribe to redux state updates

//'mapDispatchToProps' parameter of connect can either be:
// - an object of action creators wrapped into a dispatch.
// - a function with a dispatch parameter. The function should return an object that uses dispatch to bind action 
// creators. Alternatively, you can use the bindActionCreators() helper from redux
/*
const mapStateToProps = state => ({
  ...state
 })

const mapDispatchToProps = dispatch => ({
  loginAction: () => dispatch(loginAction())
 })

 export default connect(mapStateToProps, mapDispatchToProps)(App);
 */