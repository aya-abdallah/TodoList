import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainPage from "./components/mainPage";
import "./App.css";
import Signup from "./components/signup";
import LogIn from "./components/login";
import Todos from "./components/todos";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login"  exact component={LogIn} />
          <Route path="/todos" exact component={Todos} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
