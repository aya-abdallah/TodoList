import React, { Component } from "react";
import Cookies from "universal-cookie";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { BrowserRouter as  Switch, Route, Link } from "react-router-dom";
// import Signup from "./signup";
import "../App.css";
import axios from "../api";
import Nav from "./nav";

class Todos extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeEditedText = this.onChangeEditedText.bind(this);
    this.state = {
      text: "",
      loading: true,
      inEdit: {},
      editedText: "",
      authorized: true
    };
  }
  getData() {
    let cookies = new Cookies();
    const id = cookies.get("id");
    axios
      .get("http://localhost:4000/api/todos", {
        params: {
          userId: id
        }
      })
      .then(res => {
        this.setState({
          allTasks: res.data,
          loading: false
        });
      });
  }

  componentDidMount() {
    this.getData();
  }
  deleteTask(deletedElement) {
    axios
      .delete("http://localhost:4000/api/todos", {
        params: {
          id: deletedElement
        }
      })
      .then(res => console.log("deleted successfully = ", res));
    const newTasks = this.state.allTasks.filter(
      task => task._id !== deletedElement
    );
    this.setState({ allTasks: newTasks });
  }
  editTask(editedTask, text) {
    const editElement = { id: editedTask };
    this.setState({ inEdit: editElement });
  }
  updateTask(updatedTask) {
    this.setState({ inEdit: {} });
    const data = {
      text: this.state.editedText,
      id: updatedTask
    };
    axios.put("http://localhost:4000/api/todos", data).then(res => {
      this.getData();
      this.setState({ editedText: "" });
    });
  }
  updateCompleteTask(id) {
    const data = {
      id: id
    };
    axios.put("http://localhost:4000/api/todos/complete", data).then(res => {
      this.getData();
      console.log("res = ", res.data);
    });
  }
  onChangeText(e) {
    this.setState({
      text: e.target.value,
      userId: ""
    });
  }

  onChangeEditedText(e) {
    console.log("data = ", e.target.value);
    this.setState({
      editedText: e.target.value
    });
  }
  toggleTask(id) {
    this.state.allTasks.map(task =>
      id === task._id ? (task.completed = !task.completed) : task.completed
    );
    console.log("new tasks = ", this.state.allTasks);
  }
  onEditText(e, text) {
    e.target.value = text;
  }
  onSubmit(e) {
    e.preventDefault();

    let cookies = new Cookies();
    const token = cookies.get("token");

    axios
      .get("http://localhost:4000/api/users/current", {
        headers: { Authorization: `Token ${token}` }
      })
      .then(res => {
        this.setState({ authorized: true });
        const data = {
          text: this.state.text,
          userId: res.data.user._id
        };
        this.setState({ userId: res.data.user._id });
        axios.post("http://localhost:4000/api/todos", data).then(res => {
          this.setState({
            text: "",
            allTasks: [...this.state.allTasks, res.data]
          });
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    // console.log("auth = ", this.state.authorized)
    if (new Cookies().get("token") !== undefined) {
      if (this.state.loading) {
        return (
          <div className="alert alert-info" role="alert">
            Loading...
          </div>
        );
      } else {
        return (
          <>
            <Nav auth={this.state.authorized}/>
            <div className="mt-5">
              <form method="post" onSubmit={this.onSubmit}>
                <div className="form-group addForm ">
                  <span>
                    <input
                      className="form-control form-control-lg "
                      type="text"
                      placeholder="enter your task ..."
                      value={this.state.text}
                      onChange={this.onChangeText}
                    />
                  </span>
                  <span className="input-group-btn addBtn">
                    <button type="submit" className="btn btn-primary ">
                      Add
                    </button>
                  </span>
                </div>
              </form>

              {this.state.allTasks.map(task =>
                this.state.inEdit.id === task._id ? (
                  <div key={task._id} className="alert alert-info" role="alert">
                    <form
                      method="put"
                      onSubmit={() => this.updateTask(task._id)}
                    >
                      <input
                        type="text"
                        autoFocus
                        onFocus={e => {
                          this.onEditText(e, task.text);
                        }}
                        className="form-control form-control-lg"
                        onChange={this.onChangeEditedText}
                        value={this.state.editedText}
                      />
                      <input
                        type="submit"
                        value="Edit"
                        className="btn btn-success"
                      />
                    </form>
                  </div>
                ) : (
                  <div key={task._id} className="alert alert-info" role="alert">
                    <div className="taskName float-left">
                      <input
                        className="checkbox"
                        type="checkbox"
                        onClick={() => {
                          this.toggleTask(task._id);
                          this.updateCompleteTask(task._id);
                        }}
                        checked={task.completed}
                      />
                      <span className={task.completed ? "underline" : ""}>
                        {task.text}
                      </span>
                    </div>
                    <span className="controlBtns">
                      <button
                        type="button"
                        onClick={() => this.deleteTask(task._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => this.editTask(task._id, task.text)}
                        className="btn btn-success"
                      >
                        Edit
                      </button>
                    </span>
                  </div>
                )
              )}
            </div>
          </>
        );
      }
    } else {
      return <h1>Not Found Page !</h1>;
    }
  }
}
export default Todos;
