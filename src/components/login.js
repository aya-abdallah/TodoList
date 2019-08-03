import React, { Component } from "react";
import Cookies from "universal-cookie";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BrowserRouter as Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from "../api";
import Signup from "./signup";
import Todos from "./todos";
import Navigation from "./navigation";
import "../App.css";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      email: "",
      password: "",
      errMsg: 0,
      errorsMsg: "",
      toTodos: false
    };
  }
  componentDidMount() {
    console.log("token  ==== " , new Cookies().get("token"))
  }
  
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("http://localhost:4000/api/users/login", data)
      .then(res => {
        this.setState({ errMsg: 0 });
        console.log(res.data);

        if (
          res.data.errors === undefined ||
          res.data.errors === null ||
          res.data.errors === ""
        ) {
          // const token = res.data.user.token;
          // console.log("user Data = ",res.data.user);
          // axios
          //   .get("http://localhost:4000/api/users/current", {
          //     headers: { Authorization: `Token ${token}` }
          //   })
          //   .then(res => console.log("user data  = ", res.data))
          //   .catch(err => console.log(err));

          let cookies = new Cookies();
          cookies.set("token", res.data.user.token, { path: "/" });
          cookies.set("email", res.data.user.email, { path: "/" });
          cookies.set("id", res.data.user._id, { path: "/" });
          cookies.set(
            "fullName",
            res.data.user.firstName + " " + res.data.user.lastName,
            { path: "/" }
          );
          // window.location = "http://localhost:4000/api/todos";

          this.setState({ errMsg: 0, toTodos: true, errorsMsg: "" });
          return <Redirect to="/todos" />;
        } else {
          this.setState({ errorsMsg: Object.entries(res.data.errors).join() });
          this.setState({ errMsg: 1 });
        }
      })
      .catch(err => {
        this.setState({ errMsg: 1 });
        console.log(err);
      });
  }

  render() {
    if (this.state.toTodos === true) {
      return <Redirect to="/todos" />;
    }

    return (
      <>
        <Navigation />
        <div className="container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-header">
                <h3>Sign In</h3>
                <div className="d-flex justify-content-end social_icon">
                  <span>
                    <i className="fab fa-facebook-square" />
                  </span>
                  <span>
                    <i className="fab fa-google-plus-square" />
                  </span>
                  <span>
                    <i className="fab fa-twitter-square" />
                  </span>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit} method="post">
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                    />
                  </div>
                  <div
                    className={
                      this.state.errMsg === 1
                        ? "alert alert-danger alert-dismissible fade show"
                        : "d-none"
                    }
                  >
                    <strong>Error! </strong>
                    {this.state.errorsMsg}
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Login"
                      className="btn float-right login_btn"
                    />
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-center links">
                  Don't have an account?<Link to={"/signup"}>Signup</Link>
                </div>
                <div className="d-flex justify-content-center">
                  <a href="#">Forgot your password?</a>
                </div>
              </div>
            </div>
          </div>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/todos" component={Todos} />
          </Switch>
        </div>
      </>
    );
  }
}
export default LogIn;
