const express = require("express");
const app = express();

var formData = {
  grant_type: "authorization_code",
  client_id: "7105d93a-f835-462e-a2a9-f17b19b89ec7",
  client_secret: "1bc43cee-3af5-4908-bde6-ceee1deff819",
  redirect_uri: "http://localhost:1338/api/oauth",
};


const authentication = app.get(
  "/",
);

module.exports = authentication;
