var config = require('../dbconfig');
const sql = require('mssql/msnodesqlv8');

async function getClients(database) {
    try {
        let pool = await sql.connect(config);
        cmd = `select code_client, nom, adresse, tel, IDvill
        from [${database}].dbo.client`;

        console.log(cmd);
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}

async function getClient(database, id) {
    try {
        let pool = await sql.connect(config);
        cmd = `select code_client, nom, adresse, tel, IDvill
        from [${database}].dbo.client
        where code_client = '${id}'`;

        console.log(cmd);
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}

async function addClient(database, client) {
    try {
        let pool = await sql.connect(config);
        var cmd = `insert into [${database}].dbo.client (code_client, nom, adresse, tel, IdVill) 
                values  ('${client.code_client}', '${client.Nom}', '${client.Adresse}', '${client.Telephone}', ${client.IdVill})`;
        console.log(cmd);
        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteClient(database, id) {
    try {
        let pool = await sql.connect(config);
        var cmd = `DELETE FROM [${database}].dbo.client 
                 WHERE code_client = '${id}'`;
        console.log(cmd);
        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}

async function editClient(database, client) {
    try {
        let pool = await sql.connect(config);
        var cmd = `UPDATE [${database}].dbo.client 
                 SET nom = '${client.nom}', adresse = '${client.adresse}', tel = '${client.tel}', IdVill = ${client.IDvill}
                 WHERE code_client = '${client.code_client}';`;
        console.log(cmd);
        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getClients: getClients,
    getClient: getClient,
    addClient: addClient,
    editClient: editClient,
    deleteClient: deleteClient
}