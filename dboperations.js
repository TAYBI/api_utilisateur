var config = require('./dbconfig');
const sql = require('mssql/msnodesqlv8')

async function getUtilisateurs() {
    try {
        let pool = await sql.connect(config);
        var cmd = `select *
        from utilisateur`;
        let result = pool.request().query(cmd);

        // pool.close();
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}

async function getUtilisateur(mail, pw_web) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select IDutilisateur, IdClients, mail, pw_web
        from utilisateur
        where mail='${mail}' and pw_web='${pw_web}'`;
        let result = pool.request().query(cmd);
        console.log(result);

        // pool.close();
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}


// async function getSocietes(IdClients) {
//     const config_commun6 = {
//         server: 'BILAL\\SQLOMAG',
//         database: "omag_" + IdClients + "_commun6",
//         driver: 'msnodesqlv8',
//         options: {
//             trustedConnection: true
//         }
//     }

//     console.log(IdClients);

//     try {
//         let pool = await sql.connect(config_commun6);
//         var cmd = `select nom, code
//         from societe`;
//         let result = pool.request().query(cmd);
//         console.log(result);

//         pool.close();
//         return (await result).recordset;
//     }
//     catch (error) {
//         console.log(error);
//     }

// }

async function getSocietes(IdClients) {
    const config_commun6 = {
        server: 'BILAL\\SQLOMAG',
        database: "omag_" + IdClients + "_commun6",
        driver: 'msnodesqlv8',
        options: {
            trustedConnection: true
        }
    }

    console.log(IdClients);

    try {
        let pool = await sql.connect(config);
        var cmd = `select nom, code from ${config_commun6.database}.dbo.societe`;
        let result = await pool.request().query(cmd); // use await here to wait for the query to complete
        console.log(result);

        // do not close the connection here, leave it open for the connection pool to manage
        return result.recordset;
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getUtilisateurs: getUtilisateurs,
    getUtilisateur: getUtilisateur,
    getSocietes: getSocietes
}