const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const licences_routes =  require('./licences');
const omag_clt_routes =  require('./omag_clt');
const version_routes =  require('./version');
const pointage_routes =  require('./pointage');
const gms_routes =  require('./gms');
const clientsRoutes =  require('./clients');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.use('/api', licences_routes);
app.use('/api', omag_clt_routes);
app.use('/api', version_routes);
app.use('/api', pointage_routes);
app.use('/api', clientsRoutes);

app.use('/api', gms_routes);




var port = process.env.PORT || 8083;
app.listen(port);
console.log('API is runnning at ' + port);


module.exports = {database:global.nom_db}