const express = require('express');
const User = require('./users/model');

// BUILD YOUR SERVER HERE
const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const body = req.body;

    if (!body.name || !body.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user"})
    } else {
        User.insert(body)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the user to the database"})
            })
    }
})
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved"})
        })
})
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist"})
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be retrieved"})
        })
})
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    User.remove(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist"})
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user could not be removed"})
        })
})
server.put('/api/users/:id', (req, res) => {
    const body = req.body;
    const id = req.params.id;
    User.update(id, body)
        .then(updated => {
            if (!updated) {
                res.status(404).json({ message: "The user with the specified ID does not exist"})
            } else if (!body.name || !body.bio) {
                res.status(400).json({ message: "Please provide name and bio for the user"})
            } else {
                res.status(200).json(updated)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be modified"})
        })

})

module.exports = server; // EXPORT YOUR SERVER instead of {}
