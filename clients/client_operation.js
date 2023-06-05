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


module.exports = {
    getClients: getClients,
    addClient: addClient
}