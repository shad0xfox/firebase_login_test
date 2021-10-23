import express from "express";
import helmet from "helmet";
import errorhandler from "errorhandler";
import morgan from "morgan";
import router from "./routes/index.js";
import http from "http";
import cors from "cors";

const isProduction = process.env.NODE_ENV === "production";
// Create global app object
const app = express();
const server = http.createServer(app);

// Normal express config defaults
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5000"],
  })
);
app.use(helmet());
if (!isProduction) {
  app.use(errorhandler());
}

app.use(router);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    if (err.stack) {
      console.log(err.stack);
    }

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

export { server };
