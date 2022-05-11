const express = require('express');
const app = express();
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
app.listen((process.env.PORT || 3050), () => {
  console.log("17.mai app listening on some port");
});