const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use("/static", express.static("."));

app.get("/", (req, res) =>
{
    res.sendFile(path.join(__dirname + "/flocking.html"));
});

app.listen(port, () =>
{
    console.log("Listening at port " + port);
});