import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainPage from "./mainPage";


class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand active" to={"/"}>
          TODO LIST <span className="sr-only">(current)</span>
        </Link>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <a className="nav-link" href="/signup">
                Signup
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="login">
                LogIn
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;
