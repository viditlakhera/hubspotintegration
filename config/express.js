const express = require('express');
const axios = require("axios");
const app = express();
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require('../routes/index.route');

let userid = '';
let access_token = 'CLyYjvSoMRIMQIEAQAAAYQIAAAAYGL-G5hQg5tDIHCjLvnwyFIhgmlO-bTZjing0lRfH9V02wyU2OjAAAABHAAAABAAAAAAAAAAAAIAAAAAAAAAAAAAgAH4AHgDgAQAAACAAAPwAAAAAcANCFNncMAWF-GA7HsZtNjAyt7zRPcAySgNuYTFSAFoA';
let associatedObjectId = '';

// //set ejs as view engine
app.set('view engine', 'ejs');

console.log("------------------------------------------in express");
app.use('/',routes);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app
