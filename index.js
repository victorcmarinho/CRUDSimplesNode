const express = require(`express`);

const users = ['Victor', 'Diego', 'Cláudio'];

const server = express();

server.use(express.json());


server.use((req, res, next) => {
    console.time('request');
    console.log(`Method: ${req.method}; URL: ${req.url}`);

    next();
    console.timeEnd('request end')
});

function checkUserExists(req, res, next) {
    if(!req.body.name)
        return res.status(400).json({error: 'User name is required!'});
    next();
}

function checkUserInArray(req, res, next) {
    if(!users[req.params.index])
        return res.status(400).json({error: "User don't exist!"});
    next();
}


server.get(`/users`, (req, res) => {
    return res.json(users);
});


server.get(`/users/:index`,checkUserInArray, (req, res) => {
    const {index} = req.params;
    return res.json(users[index]);
});


server.post(`/users`,checkUserExists, (req, res) => {
    const {name} = req.body;
    users.push(name);
    return res.json(name);
});

server.put(`/users/:index`,checkUserInArray,checkUserExists, (req, res) => {
    const {index} = req.params;
    const {name} = req.body;
    
    return res.json(users[index] = name);
});

server.delete(`/users/:index`,checkUserInArray, (req, res) => {
    const {index} = req.params;

     users.splice(index, 1);
    
    return res.json(users);
});
server.listen(3000);