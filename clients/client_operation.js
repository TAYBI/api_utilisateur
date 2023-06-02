var config = require('../dbconfig');
const sql = require('mssql/msnodesqlv8');



async function getClients(database) {
    try {
        let pool = await sql.connect(config);
        // var cmd = `select code_client, nom, adresse, tel, ville.libelle ville
        //     from client
        //     left join Ville on client.IDville=Ville.IDville`;
        var cmd = `select code_client, nom, adresse, tel, IDvill
            from [${database}].dbo.client`;

        console.log(cmd);
        console.log(database);
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getClients: getClients,

}