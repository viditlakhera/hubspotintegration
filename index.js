const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const authentication = require("./middleware/auth");

app.get("/", (req, res) => {
  const authenticated = authentication(req, res);
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
