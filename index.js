// implement your API here

const express = require("express");
const usersDB = require("./data/db")

const server = express();

server.use(express.json())


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

server.get("/users/:id", (req, res) => {
    const id = req.params.id;
    usersDB
        .findById(id)
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
})

server.post("/users", (req, res) => {
    const addUser = req.body;
    usersDB
        .insert(addUser)
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
})

server.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body
    usersDB
        .update(id, updatedUser)
        .then((user) => {
            res.sendStatus(200)
        })
        .catch((err) => {
            res.sendStatus(401)
        })
})
const port = 6000;
server.listen(port, () => console.log(`running on port ${port}`))