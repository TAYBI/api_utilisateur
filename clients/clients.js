const express = require('express');
const router = express.Router();
const dboperations = require('./client_operation');
const { database } = require('../dbconfig');


// lecture
router.get('/:database/clients', (req, res) => {
    dboperations.getClients(req.params.database.toString().replace('@', ' ')).then((result) => {
        res.json(result);
    });
});


//ajoute
router.post('/:database/client', (request, response) => {
    let client = { ...request.body }
    console.log(client);

    dboperations.addClient(request.params.database.toString().replace('@', ' '), client).then(result => {
        response.json(result);
    })
})

module.exports = router;
