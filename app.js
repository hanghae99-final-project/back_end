require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");

const connectDB = require("./config/connect");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const scheduler = require("./config/scheduler");

const ejs = require("ejs");

const { errorHandlerMiddleware } = require("./middleware/errorHandler");

const requestMiddleWare = (req, res, next) => {
  console.log("request URL: ", req.originalUrl, " - ", new Date());
  next();
};
app.use(cors({ origin: process.env.FRONT_URL, credentials: true }));
// app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(requestMiddleWare);
require("./passport/kakaoLocal")(passport);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
);

app.use("/", route);
app.use(errorHandlerMiddleware);

app.use((req, res) => {
  res.status(404).send("not found");
});
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    //connect DB
    await connectDB.connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}....`));
    scheduler.scheduler();
  } catch (error) {
    console.log(error);
  }
};
start();
