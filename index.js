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
        .catch(() => {
            res.status(500).json({ error: "The user information could not be retrieved." })
            // res.send(err)
        })
})

server.get("/users/:id", (req, res) => {
    const id = req.params.id;
    usersDB
        .findById(id)
        .then((user) => {
            if (req.body.id === undefined) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
            res.send(user)
        })
        .catch(() => {
            res.status(500).json({ error: "The user information could not be retrieved." })
            // res.send(err)
        })
})

server.post("/users", (req, res) => {
    const addUser = req.body;
    usersDB
        .insert(addUser)
        .then((user) => {
            if ((req.body.name === undefined) || (req.body.bio === undefined)) {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            }
            res.sendStatus(201)
            return user
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
            // res.send(err)
            // console.log(err)
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
        .catch(() => {
            res.sendStatus(401)
        })
})

server.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    usersDB
        .remove(id)
        .then((user) => {
            // if (id) {
            //     res.status(404).json({ message: "The user with the specified ID does not exist." })
            // }
            console.log(user)
            // usersDB.remove(id)
            res.sendStatus(200)
        })
        // .catch((err) => {
        //     res.status(500).json({ error: "The user could not be removed" })
        // })
})

const port = 6000;
server.listen(port, () => console.log(`running on port ${port}`))