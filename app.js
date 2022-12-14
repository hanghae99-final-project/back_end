require("dotenv").config();
require("express-async-errors");
require("ejs");

const express = require("express");
const app = express();
const route = require("./routes/index.route");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const { local } = require("./passport");
const admin = require("firebase-admin");

const connectDB = require("./config/connect");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const scheduler = require("./config/scheduler");
const alarm = require("./config/notification");

const { errorHandlerMiddleware } = require("./middleware/errorHandler");

const requestMiddleWare = (req, res, next) => {
  console.log("request URL: ", req.originalUrl, " - ", new Date());
  next();
};
app.use(
  cors({
    origin: [process.env.FRONT_URL, process.env.BASE_URL],
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(requestMiddleWare);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    expires: new Date(Date.now() + 60 * 1000),
  })
);

local();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", route);
app.use(errorHandlerMiddleware);

app.use((req, res) => {
  res.status(404).send("not found");
});
let serviceAccount = require("./ranking-planner-firebase-adminsdk-hn6qf-d15a7baf2d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    //connect DB
    await connectDB.connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}....`));
    scheduler.scheduler();
    alarm.scheduler();
  } catch (error) {
    console.log(error);
  }
};
start();

module.exports = app;
