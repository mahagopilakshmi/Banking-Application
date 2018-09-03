var express = require("express");
var app = express();

var apiRoutes = require("./routes/api.routes");

app.use("/api", apiRoutes);

app.use(function(req, res, next) {
  res.status(404).send("Route not found");
});

app.listen(3000, function() {
  console.log("listening on port 3000!");
});
