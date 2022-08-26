require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const requestMiddleWare = (req, res, next) => {
    console.log("request URL: ", req.originalUrl, " - ", new Date());
    next();
  };

app.use(express.json());
app.use(express.urlencoded());
app.use(requestMiddleWare);
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello World!");
  });
//app.use("/", route);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
