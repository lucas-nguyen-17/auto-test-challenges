const express = require("express");
const indexRouter = require("./routes/index");
global.__basedir = __dirname;
const app = express();
const cors = require("cors");
app.use(cors());
app.use("/", indexRouter);
module.exports = app;
