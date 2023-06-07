const express = require('express');
const router = express.Router();
const dboperations = require('./client_operation');
const { database } = require('../dbconfig');


// lecture tout
router.get('/:database/clients', (req, res) => {
    dboperations.getClients(req.params.database.toString().replace('@', ' ')).then((result) => {
        res.json(result);
    });
});

// lecture 1
router.get('/:database/clients/:id', (req, res) => {
    dboperations.getClient(req.params.database.toString().replace('@', ' '), req.params.id).then((result) => {
        res.json(result);
    });
});


//ajoute 1
router.post('/:database/client', (request, response) => {
    let client = { ...request.body }
    console.log(client);

    dboperations.addClient(request.params.database.toString().replace('@', ' '), client).then(result => {
        response.json(result);
    })
})

//edition 1
router.post('/:database/clients/:id', (request, response) => {
    let client = { ...request.body }
    console.log(client);

    dboperations.editClient(request.params.database.toString().replace('@', ' '), client).then(result => {
        response.json(result);
    })
})

// supression 1
router.delete('/:database/clients/:id', (request, response) => {
    dboperations.deleteClient(request.params.database.toString().replace('@', ' '), request.params.id).then(result => {
        response.json(result);
    })
})

module.exports = router;
