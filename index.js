var createError = require("http-errors");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var logger = require("morgan");
var multer = require("multer");

// Import your routes here
const productRoute = require("./routes/products");
const exportData = require("./routes/exportData");

// Import db connection
const conn = require("./lib/db");
conn.connectDatabase();

//  case "EACCES":

var app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  next();
});
// app.use(connectDB)
app.use(logger("dev"));
 // Support json encoded bodies
/**
 * 
 */
 app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
  limit: '50mb',
  type: ["application/x-www-form-urlencoded", "application/json"],
}));
// app.use(multer().any());
app.use(cookieParser());
app.use(cors());

// Request Logger
if (app.get("env") === "development") {
  app.use(logger("dev"));
}
// Add your routes here
app.use("/api/products", productRoute);
app.use("/api/export", exportData); 



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
