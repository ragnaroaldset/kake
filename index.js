const express = require('express');
const app = express();
const port = 5000;
const path = require("path");
const comments = require("./comments");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, "./invite" + "/index.html"));
});
app.use(comments);
app.use(express.static(path.resolve(__dirname, "./resources")));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});