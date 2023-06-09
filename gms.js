var express = require('express');
var router = express.Router();
var config = require('./dbconfig').dbconfig('omag');
const { cleanObject } = require('./dbconfig');
const sql = require('mssql/msnodesqlv8')

router.use((request, response, next) => {
    console.log('middleware');
    next();
})


// Affaire
router.route('/gmsSites/:db/:affaire_id').get((request, response) => {
    db = request.params.db
    affaire_id = request.params.affaire_id
    gmsSites(db,affaire_id).then(result => {
        response.json(result);
    })
})

async function gmsSites(db,affaire_id) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select * 
                    from [${db}].dbo.site
                    where Id_affaire_p=${affaire_id}
                    `;
        
                       let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}




// Employes
router.route('/gmsEmployes/:db/:affaire_id').get((request, response) => {
    db = request.params.db
    affaire_id = request.params.affaire_id
    gmsEmployes(db,affaire_id).then(result => {
        response.json(result);
    })
})

async function gmsEmployes(db,affaire_id) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select Matricule,nom,prenom,cin,cnss,datee,Id_site
                    from [${db}].dbo.employe
                    where Id_departemet=${affaire_id}
                    order by Matricule
                    `;
    
                    let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}






module.exports = router;