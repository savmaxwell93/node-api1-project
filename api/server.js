const express = require('express');
const User = require('./users/model');

// BUILD YOUR SERVER HERE
const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    console.log('Create new user!')
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
    console.log('Get one user by id!')
})
server.delete('/api/users/:id', (req, res) => {
    console.log('Delete user by id!')
})
server.put('/api/users/:id', (req, res) => {
    console.log('Update user by id!')
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
