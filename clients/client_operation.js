const Client = {
    constructor(code_client, nom, adresse, tel) {
        this.code_client = code_client
        this.nom = nom
        this.adresse = adresse
        this.tel = tel
    }
}

var config = require('../dbconfig');
//const sql = require('mssql');
const sql = require('mssql/msnodesqlv8')

async function getClients() {
    try {
        let pool = await sql.connect(config);
        // var cmd = `select code_client, nom, adresse, tel, ville.libelle ville
        //     from client
        //     left join Ville on client.IDville=Ville.IDville`;
        var cmd = `select code_client, nom, adresse, tel, IDville
            from client`;
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}

async function getClient(code_client) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select code_client, nom, adresse, tel, ville.libelle ville
        from client
        left join Ville on client.IDville=Ville.IDville
        where code_client = @input_parameter`;
        let result = pool.request()
            .input('input_parameter', sql.VarChar, code_client)
            .query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}


async function addClient(Client) {
    try {
        let pool = await sql.connect(config);
        var cmd = `insert into client (code_client, nom, adresse, tel) 
                values  ('${Client.code_client}', '${Client.nom}', '${Client.adresse}', '${Client.tel}')`;
        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}


async function updateClient(Client) {
    try {
        let pool = await sql.connect(config);
        var cmd = `update client set  
                nom = '${Client.nom}', 
                adresse = '${Client.adresse}', 
                tel = '${Client.tel}'
                where code_client = '${Client.code_client}'`
        let result = pool.request().query(cmd);

        console.log(Client);
        console.log(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}


async function deleteClient(code_client) {
    try {
        let pool = await sql.connect(config);
        var cmd = `delete  from client where  code_client = '${code_client}'`;
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
    updateClient: updateClient,
    deleteClient: deleteClient
}