const dboperations = require('./dboperations');

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

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);
