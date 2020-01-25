// Dependencies
// =============================================================
const express = require("express");
const apiRoutes = require("./routes/apiRoutes.js")
const htmlRoutes = require("./routes/htmlRoutes.js")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3500;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// This allows the express app to use the html files in the public folder
app.use(express.static("public"));



app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

