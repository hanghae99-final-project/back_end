require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/connect");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const scheduler = require("./config/scheduler");

const ejs = require("ejs");
const passport = require("passport");
const requestMiddleWare = (req, res, next) => {
  let url = req.originalUrl.split("/");

  if (url[3] === "finish") {
    require("./passport/kakao")(passport);
  } else if (url[3] === "callback") {
    require("./passport/kakaoLocal")(passport);
  }
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

// app.use(cors({ origin: process.env.FRONT_URL, credentials: true }));

app.use(cors());

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
  })
);

app.use("/", route);

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
