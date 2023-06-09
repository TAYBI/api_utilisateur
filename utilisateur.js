var express = require('express');
var router = express.Router();
var config = require('./dbconfig').dbconfig('omag');
const { cleanObject } = require('./dbconfig');
const sql = require('mssql/msnodesqlv8')

router.use((request, response, next) => {
    next();
})



// lecture 1
router.get('/utilisateurs/:mail/:pwd_web', (req, res) => {
    console.log('been called');
    getUtilisateur(req.params.mail, req.params.pwd_web).then((result) => {
        res.json(result);
    });
});

async function getUtilisateur(mail, pw_web) {
    console.log(mail, pw_web);
    try {
        let pool = await sql.connect(config);
        var cmd = `select IDutilisateur, IdClients, mail, pw_web
        from utilisateur
        where mail='${mail}' and pw_web='${pw_web}'`;
        let result = pool.request().query(cmd);
        console.log(result);

        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}

//lecture 1
router.get('/societes/:id', (req, res) => {
    getSocietes(req.params.id).then((result) => {
        res.json(result);
    });
});
async function getSocietes(IdClients) {
    config_commun6 = "omag_" + IdClients + "_commun6",
        console.log(IdClients);

    try {
        let pool = await sql.connect(config);
        var cmd = `select nom, code from ${config_commun6}.dbo.societe`;
        let result = await pool.request().query(cmd);
        console.log(result);

        return result.recordset;
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = router;

