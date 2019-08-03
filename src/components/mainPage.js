import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Navigation from "./navigation";

class MainPage extends Component {
  render() {
    return (
      <>
        <Navigation />
        <div className=" main">
          <h2>Welcome to Todo List App</h2>

          <Link type="button" className="btn btn-dark m-5" to={"/signup"}>
            SIGNUP
          </Link>
          <Link type="button" className="btn btn-dark" to={"/login"}>
            LOGIN
          </Link>

          <hr />

          <footer className="page-footer font-small blue">
            <div className="footer-copyright text-center py-3">
              © 2018 Copyright {" "}
              <a href="facebook.com/aya.laban.3">
                  aya abdallah
              </a>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

export default MainPage;
