require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db/connect");
const bodyParser = require("body-parser");

const requestMiddleWare = (req, res, next) => {
  console.log("request URL: ", req.originalUrl, " - ", new Date());
  next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.urlencoded());
app.use(requestMiddleWare);
app.use(cors());
app.use(morgan("dev"));

app.use("/", (req, res) => {
  res.send("Hello World!");
});

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
