import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fort/awesome/free-solid-svg-icons";
import axios from "../api";
import "../App.css";
import Navigation from "./navigation";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }
  onSubmit(e) {
    e.preventDefault();
    // console.log(`name is ${this.state.firstName} and port is ${this.state.email}`);
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("http://localhost:4000/api/users", data)
      .then(res => console.log(res.data));
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
  }
  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
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
  render() {
    return (
      <>
        <Navigation />
        
          <div className="signup-form">
            <form action="" onSubmit={this.onSubmit} method="post">
              <h2>Sign Up</h2>
              <p>Please fill in this form to create an account!</p>
              <hr />
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                  <i class="fas fa-user"></i>
                  {/* <FontAwesomeIcon className="icons" icon={faUser} /> */}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    placeholder="First Name"
                    required="required"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-user" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Last Name"
                    required="required"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-paper-plane" />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    required="required"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  {/* <span className="input-group-addon">
                    <i className="fas fa-user" />
                  </span> */}
               
               
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    required="required"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />
                </div>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-lg">
                  Sign Up
                </button>
              </div>
            </form>
            <div className="text-center">
              Already have an account? <a href="/login">Login here</a>
            </div>
          </div>
     
      </>
    );
  }
}

export default Signup;
