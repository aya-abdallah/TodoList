const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const userRoute = require("./routes");
// const todoRoute = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const errorHandler = require("errorhandler");
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

const mogoURL =
  process.env.URL ||
  "mongodb+srv://aya:aya123@mycluster-rjzla.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(
  mogoURL,
  {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true
  },
  err => {
    if (!err) {
      console.log("started mongodb connection");
    }
  }
);

require('./models/users');

app.use(
  session({
    secret: "passport-tutorial",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
// app.use("/", userRoute);
// app.use("/todos", todoRoute);
require('./config/passport');

if (!isProduction) {
  app.use(errorHandler());
}

// if(!isProduction) {
//   app.use((err, req, res) => {
//     res.status(err.status || 500);

//     res.json({
//       errors: {
//         message: err.message,
//         error: err,
//       },
//     });
//   });
// }

// app.use((err, req, res,next) => {
//   res.status(err.status || 500);

//   res.json({
//     errors: {
//       message: err.message,
//       error: {},
//     },
//   });
// });



app.use(require('./routes'));



app.listen(PORT, () => {
  console.log("listen now ...");
});
