const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const clientsRoutes = require('./clients/clients');
const utilisateurRoutes = require('./utilisateurs/utilisateur');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', clientsRoutes);
app.use('/api', utilisateurRoutes);


const port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});