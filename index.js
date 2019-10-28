// implement your API here

const express = require("express");
const usersDB = require("./data/db")

const server = express();




server.get("/", (req, res) => {
    res.send("hello world")
})

server.get("/users", (req, res) => {
    usersDB
    .find()
    .then((user) => {
        res.send(user)
    })
    .catch((err) => {
        res.send(err)
    })
})


const port = 6000;
server.listen(port, () => console.log(`running on port ${port}`))