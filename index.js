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
            res.status(200).json(user);
        })
        .catch(() => {
            res.status(500).json({ error: "The user information could not be retrieved." })
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
            res.status(201).json(user);
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
                    })
})

server.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body
    usersDB
        .update(id, updatedUser)
        .then((user) => {
            if ((req.body.name === undefined) || (req.body.bio === undefined)) {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            } else {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({
                        message: 'The user with the specified ID does not exist.',
                    })
                }
            }
        })
        .catch(() => {
            res.sendStatus(401)
        })

})

server.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    usersDB
        .remove(id)
        .then((delUser) => {
            if (delUser && delUser > 0) {
                res.status(200).json({
                    message: 'the user was deleted.',
                });
            } else {
                res
                    .status(404)
                    .json({ message: 'The user with the specified ID does not exist.' });
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The user could not be removed" })
        })
})

const port = 6000;
server.listen(port, () => console.log(`running on port ${port}`))