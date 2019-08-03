const express = require("express");
const todoRouter = express.Router();
const Todo = require("../../models/todos");

todoRouter.get("/", (req, res) => {
  console.log("user_id = ", req.query.userId);
  Todo.find({ userId: req.query.userId }).then(todos => res.json(todos));
});

todoRouter.post("/", (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false,
    userId: req.body.userId
  });
  newTodo
    .save()
    .then(data => {
      console.log("data saved ", data);
      res.json(data);
    })
    .catch(err => res.status(400).send("unable to save to database"));
});

todoRouter.delete("/", (req, res) => {
  Todo.findOneAndDelete({ _id: req.query.id }).then(todos => {
    res.json(todos);
  });
});

todoRouter.put("/", (req, res) => {
  Todo.findOneAndUpdate({ _id: req.body.id }, { text: req.body.text }).then(
    todos => {
      res.json(todos);
    }
  );
});

todoRouter.put("/complete", (req, res) => {
  Todo.findOne({ _id: req.body.id }).then(todos => {
    Todo.findOneAndUpdate(
      { _id: req.body.id },
      { completed: !todos.completed }
    ).then(task => res.json(task));
  });
});

module.exports = todoRouter;
