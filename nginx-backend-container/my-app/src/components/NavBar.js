import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#"><img src={logo} width="30" height="30" className="d-inline-block align-top" alt="logo"/>TestApp</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/Home" className="nav-item nav-link active">Home</Link>
            <Link to="/Dummy" className="nav-item nav-link">Dummy Data</Link>
            <Link to="/Aggregation" className="nav-item nav-link">Aggregation</Link>
          </div>
        </div>
      </nav>
    );
  }
}


export { NavBar as NavBarHeader};