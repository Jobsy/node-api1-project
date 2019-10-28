// implement your API here

const express = require("express");

const server = express();

const port = 6000;


server.get("/", (req, res) => {
    res.send("hello world")
})
server.listen(port, () => console.log(`running on port ${port}`))