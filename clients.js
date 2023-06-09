var express = require('express');
var router = express.Router();
var config = require('./dbconfig').dbconfig('omag');
const { cleanObject } = require('./dbconfig');
const sql = require('mssql/msnodesqlv8')

router.use((request, response, next) => {
    next();
})


// lecture tout
router.route('/clients/:db').get((request, response) => {
    db = request.params.db
    clients(db).then(result => {
        response.json(result);
    })
})

async function clients(db) {
    try {
        let pool = await sql.connect(config);
        cmd = `select code_client, nom, adresse, tel, IDville
        from [${db}].dbo.client`;

        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        // console.log(error);
        return error.message;
    }
}




//lecture 1
router.route('/clientParCodeClient/:db/:id').get((request, response) => {
    db = request.params.db
    clientParCodeClient(db, request.params.id).then(result => {
        response.json(result);
    })
})

async function clientParCodeClient(db, id) {
    try {
        let pool = await sql.connect(config);
        cmd = `select code_client, nom, adresse, tel, IDville
        from [${db}].dbo.client
        where code_client = '${id}'`;
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}



//ajouter 1
router.post('/ClientAjouter/:db', (request, response) => {
    db = request.params.db
    let client = { ...request.body }

    ClientAjouter(db, client).then(result => {
        response.status(201).json(result);
    })
})

async function ClientAjouter(db, licences) {
    licences = cleanObject(licences);
    try {
        let pool = await sql.connect(config);
        var cmd = `insert into [${db}].dbo.client (code_client, nom, adresse, tel, IdVille) 
                values  ('${client.code_client}', '${client.Nom}', '${client.Adresse}', '${client.Telephone}', ${client.IdVille})`;
        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}

//Modifier 1
router.post('/ClientModifier/:db', (request, response) => {
    db = request.params.db
    let client = { ...request.body }

    ClientModifier(db, client).then(result => {
        response.status(201).json(result);
    })
})

async function ClientModifier(db, client) {
    client = cleanObject(client);
    try {
        let pool = await sql.connect(config);
        var cmd = `UPDATE [${db}].dbo.client 
                 SET nom = '${client.nom}', adresse = '${client.adresse}', tel = '${client.tel}', IdVille = ${client.IDville}
                 WHERE code_client = '${client.code_client}';`;
        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}


// supression 1
router.delete('/clients/:db/:id', (request, response) => {
    db = request.params.db
    clientSupprimer(db, request.params.id).then(result => {
        response.json(result);
    })

})

async function clientSupprimer(db, id) {
    try {
        let pool = await sql.connect(config);
        var cmd = `DELETE FROM [${db}].dbo.client 
                 WHERE code_client = '${id}'`;

        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = router;