const express = require('express');
const router = express.Router();
const dboperations = require('./client_operation');

// lecture
router.route('/:database/clients').get((request, response) => {
    dboperations.getClients(request.params.database).then(result => {
        response.json(result);
    })
})


module.exports = router;
