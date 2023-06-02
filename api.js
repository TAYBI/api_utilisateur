const dboperations = require('./dboperations');
const client_operations = require('./clients/client_operation');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request, response, next) => {
    console.log('middleware');
    next();
})

// get utilasateurs
router.route('/utilisateurs').get((request, response) => {
    dboperations.getUtilisateurs().then(result => {
        response.json(result);
    })
})

// get utilasateur 1
router.route('/utilisateurs/:mail/:pwd_web').get((request, response) => {
    dboperations.getUtilisateur(request.params.mail, request.params.pwd_web).then(result => {
        response.json(result);
    })
})


// get sosietes et code
router.route('/societes/:id').get((request, response) => {
    dboperations.getSocietes(request.params.id).then(result => {
        response.json(result);
    })
})
///////////////////////////////////////////////////////////////
//////////////////////// CLIENT ///////////////////////////////
///////////////////////////////////////////////////////////////



// lecture
router.route('/clients').get((request, response) => {
    client_operations.getClients().then(result => {
        response.json(result);
    })
})

//lecture 1
router.route('/clients/:id').get((request, response) => {
    client_operations.getClient(request.params.id).then(result => {
        response.json(result);
    })
})

//insertion
router.route('/insert_client').post((request, response) => {
    let client = { ...request.body }
    client_operations.addClient(client).then(result => {
        response.status(201).json(result);
    })
})

//update 1
router.route('/update_client').post((request, response) => {
    let client = { ...request.body }
    client_operations.updateClient(client).then(result => {
        response.json(result);
    })
})

//delete 1
router.route('/delete_client/:id').post((request, response) => {
    client_operations.deleteClient(request.params.id).then(result => {
        response.json(result);
    })
})

















var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);
