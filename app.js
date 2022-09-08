require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./db/connect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const ejs = require("ejs");

const requestMiddleWare = (req, res, next) => {
  console.log("request URL: ", req.originalUrl, " - ", new Date());
  next();
};
// const schedule = require("node-schedule");
// const scheduler =(req, res, next) => {
//   //check header

//       schedule.scheduleJob("20 * * * * *", async() =>{
//           console.log("1분마다 스케쥴러가 작동돼!");
//       })
//     next();
// };
const schedule = require("./middleware/scheduler");
app.use(schedule);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(requestMiddleWare);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: { httpOnly: true, secure: false, maxAge: 3.6e6 * 24 },
  })
);
require("./passport/kakao")(passport);

app.use("/", route);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connect DB
    await connectDB.connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};
start();
