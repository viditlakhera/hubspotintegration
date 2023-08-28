const express = require("express");
const app = express();

const authentication = app.get(
  "/",
  (req, res, next) => {
    console.log("req", req);
    console.log("res", res);
    if (req.query.data == "1234") {
      console.log("this is middleware working");
      next();
    } else {
      console.log("something is missing in this app");
      res.html(`<h1>OOPS SOMETHING WENT WRONG!!!!</h1>`);
    }
  },
  (req, res) => {
    res.send("this is secure");
  }
);

module.exports = authentication;
