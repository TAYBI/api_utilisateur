const dboperations = require('./client_operations');

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

// lecture
router.route('/clients').get((request, response) => {
    dboperations.getClients().then(result => {
        response.json(result);
    })
})

//lecture 1
router.route('/clients/:id').get((request, response) => {
    dboperations.getClient(request.params.id).then(result => {
        response.json(result);
    })
})

//insertion
router.route('/insert_client').post((request, response) => {
    let client = { ...request.body }
    dboperations.addClient(client).then(result => {
        response.status(201).json(result);
    })
})

//update 1
router.route('/update_client').post((request, response) => {
    let client = { ...request.body }
    dboperations.updateClient(client).then(result => {
        response.json(result);
    })
})

//delete 1
router.route('/delete_client/:id').post((request, response) => {
    dboperations.deleteClient(request.params.id).then(result => {
        response.json(result);
    })
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);