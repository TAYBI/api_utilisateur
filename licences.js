var express = require('express');
var router = express.Router();
var config = require('./dbconfig').dbconfig('omag');
const { cleanObject } = require('./dbconfig');
const sql = require('mssql/msnodesqlv8')

router.use((request, response, next) => {
    console.log('middleware');
    next();
})


// lecture
router.route('/licences/:db/:type/:version/:produit').get((request, response) => {
    
    db = request.params.db
    type = request.params.type
    version = request.params.version
    produit = request.params.produit
    console.log(type, version, produit);
    
    getLicences(db,type, version, produit).then(result => {
        response.json(result);
    })
})


async function getLicences(db, type, version, produit) {
    commadeProduit = ''
    switch (type) {
        case `1`:
            commadeType = `code_licence=''`
            break;
        case `2`:
            commadeType = `code_licence!=''`
            break;
        case `3`:
            commadeType = `bloque_omag=1`
            break;
        case `4`:
            commadeType = `msg_notification!=''`
            break;
        default:
            break;
    }
    if (produit != '0' ) {
        commadeProduit = `and produit = '${produit}'`
    }

    console.log(commadeProduit);
    console.log(config);
    try {
        let pool = await sql.connect(config);
        var cmd = `select * 
        from [${db}].dbo.Licences
        where ${commadeType} and version='${version}'  ${commadeProduit}  
        `;
  
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}





//lecture 1
router.route('/licences/:db/:id').get((request, response) => {
    db = request.params.db
    getLicence(db,request.params.id).then(result => {
        response.json(result);
    })
})

async function getLicence(db,IDlicences) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select * 
                    from [${db}].dbo.licences
                    where IDlicences = '${IDlicences}'`;
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}




//insertion
router.route('/insert_licence/:db').post((request, response) => {
    db = request.params.db
    let licences = { ...request.body }
    
    addLicence(db,licences).then(result => {
        response.status(201).json(result);
    })
})


async function addLicence(db,licences) {
    licences = cleanObject(licences);  
    try {
        let pool = await sql.connect(config);
        var cmd = `	IF NOT EXISTS ( select * from [${db}].dbo.licences where id_pc='${licences.id_pc}' and produit='${licences.produit}' )
        			BEGIN
                    insert into [${db}].dbo.licences (id_pc, produit, nom, ville, adresse, mail, tel, gsm, ice,nb_ste,   version,  code_licence,version_maj) 
                        values  ('${licences.id_pc}', '${licences.produit}', '${licences.nom}', '${licences.ville}','${licences.adresse}','${licences.mail}
                        ','${licences.tel}','${licences.gsm}','${licences.ice}','${licences.nb_ste}','${licences.version}','${licences.code_licence}' ,'${licences.version_maj}' )
                    END
                `;
        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}




//update 1
router.route('/update_licence/:db').post((request, response) => {
    db = request.params.db
    let licences = {...request.body}
    updateLicence(db,licences).then(result => {
        response.json(result);
    })
})

async function updateLicence(db,licences) {
    licences = cleanObject(licences);
    try {
        let pool = await sql.connect(config);
        var cmd = `update [${db}].dbo.Licences set  
                nom = ('${licences.nom}'),
                adresse = ('${licences.adresse}'),
                tel = '${licences.tel}',
                expiration_contrat = '${licences.expiration_contrat}',
                bloque_omag = '${licences.bloque_omag}',
                ville = ('${licences.ville}'),
                mail = '${licences.mail}',
                nb_ste = '${licences.nb_ste}',
                gsm = '${licences.gsm}',
                bloque_maj = '${licences.bloque_maj}',
                msg_bloque_maj = '${licences.msg_bloque_maj}',
                notifier = '${licences.notifier}',
                code_exec = ('${licences.code_exec}'),
                msg_notification = ('${licences.msg_notification}'),
                interval_notification = '${licences.interval_notification}'
                where IDlicences = '${licences.IDlicences}'`
        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}



//delete 1

router.route('/delete_licence/:db').post((request, response) => {
    db = request.params.db
    let licences = {...request.body}
    deleteLicence(db,licences).then(result => {
        response.json(result);
    })
})

async function deleteLicence(db,licences) {
    try {
        let pool = await sql.connect(config);
        var cmd = `delete  from [${db}].dbo.licences where  IDlicences = '${licences.IDlicences}'`;
        let result = pool.request().query(cmd);
      
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}






//Par code licence, démarrage omag
router.route('/code_licence/:db/:code_licence').get((request, response) => {
    db = request.params.db
    getLicenceCodeLicence(db,request.params.code_licence).then(result => {
        response.json(result);
    })
})

////////////////////////////// cas des operations omag
async function getLicenceCodeLicence(db,code_licence) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select * 
                    from [${db}].dbo.licences
                    where code_licence = '${code_licence}'`;
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}



//Par Id_pc
router.route('/licencesParId_pc/:db/:Id_pc').get((request, response) => {
    db = request.params.db
    Id_pc = request.params.Id_pc
    getLicenceId_pc(db,Id_pc).then(result => {
        response.json(result);
    })
})


async function getLicenceId_pc(db,id_pc) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select * 
                    from [${db}].dbo.licences
                    where IDlicences>0 and id_pc = '${id_pc}'`;
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}





//Mise à jour de la version

router.route('/updateVersionLicence/:db').post((request, response) => {
    db = request.params.db
    let licences = {...request.body}
    updateVersionLicence(db,licences).then(result => {
        response.json(result);
    })
})


async function updateVersionLicence(db,licences) {
    try {
        let pool = await sql.connect(config);
        var cmd = `update [${db}].dbo.Licences set  
                version_maj = '${licences.version_maj}',
                derniere_connexion='${licences.derniere_connexion}'
                where IDlicences = '${licences.IDlicences}'`
        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}



module.exports =  router;