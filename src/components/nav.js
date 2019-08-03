import React, { Component } from "react";
import { BrowserRouter as Link,Redirect } from "react-router-dom";

import Cookies from "universal-cookie";

class Nav extends Component {
 

  clearData = ()=>{
    new Cookies().remove("token");
    console.log("token  ==== " , new Cookies().get("token"))
    return <Redirect to="/"/>
 }
  render() {
    let cookies = new Cookies();
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav">
        <Link className="navbar-brand active" to={"/"}>
          TODO LIST <span className="sr-only">(current)</span>
        </Link>

        <div className="collapse navbar-collapse navContent p-5">
          <span className="p-5">{cookies.get("fullName")}</span>
          <a href="/" onClick={this.clearData}>Logout</a>
        </div>
      </nav>
    );
  }
}

export default Nav;
