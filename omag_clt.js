
var express = require('express');
var router = express.Router();
var config = require('./dbconfig').dbconfig('omag');
const { cleanObject } = require('./dbconfig');
const sql = require('mssql/msnodesqlv8')

router.use((request, response, next) => {
   //console.log('middleware');
    next();
})



// lecture
router.route('/omag_clt/:db').get((request, response) => {
    db = request.params.db
    getEnregistrement().then(result => {
        response.json(result);
    })
})


async function getEnregistrement(db) {

    try {
        let pool = await sql.connect(config);
        var cmd = `select distinct nom_client
        from [${db}].dbo.omag_clt
        order by nom_client
        `;
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}





// clients d'un client
router.route('/omag_clt/:db/:nom_client').get((request, response) => {
    db = request.params.db
    getEnregistrement2(db,request.params.nom_client).then(result => {
        response.json(result);
    })
})



async function getEnregistrement2(db,nom_client) {

    try {
        let pool = await sql.connect(config);
        var cmd = `select *
        from [${db}].dbo.omag_clt
        where nom_client=${nom_client}
        order by id_societe `;
        let result = pool.request().query(cmd);
       
        return (await result).recordset

    }
    catch (error) {
        console.log(error);
    }
}





/////////////////////////Insertion dans Omag_clt

router.route('/DeleteOmag_clt/:db/:nom_client').post((request, response) => {
    db= request.params.db
    omag_cltDelete(db,request.params.nom_client).then(result => {
        response.json(result);
    })

})


async function omag_cltDelete(db,nom_client) {
    try {
   
        let pool = await sql.connect(config);
        var cmd = `delete  from [${db}].dbo.omag_clt where  nom_client = '${nom_client}'`;
        let result = pool.request().query(cmd);
  
        return (await result).recordset

    }
    catch (error) {
        console.log(error);
    }
}

//insertion
router.route('/omag_cltInsert/:db').post((request, response) => {
    db = request.params.db
    let omag_clts = { ...request.body }

    omag_cltInsert(db,Object.values(omag_clts)).then(result => {
        response.status(201).json(result);
    })
})


async function omag_cltInsert(db,omag_clts) {
   
    omag_clts = cleanObject(omag_clts);

    var cmd = `	insert into [${db}].dbo.omag_clt (nom_client,id_societe, nom, adresse, tel, ville, ifiscal, ice, mail, Produit_version, nb_employes, nb_employes9421) values`
    omag_clts.forEach(omag_clt => {
        cmd += `('${omag_clt.nom_client}', '${omag_clt.id_societe}', '${omag_clt.nom}', '${omag_clt.adresse}','${omag_clt.tel}',
        '${omag_clt.ville}','${omag_clt.ifiscal}','${omag_clt.ice}','${omag_clt.mail}','${omag_clt.Produit_version}','${omag_clt.nb_employes}','${omag_clt.nb_employes9421}'),`
    });
    cmd = cmd.substring(0,cmd.length-1);
 
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}

/////////////////////////Fin Insertion dans Omag_clt




module.exports = router;

