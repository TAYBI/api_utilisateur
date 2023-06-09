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
router.route('/version/:db').get((request, response) => {
    db = request.params.db
    getVersion(db).then(result => {
        response.json(result);
    })
})

async function getVersion(db) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select * 
                    from [${db}].dbo.version`;
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}








//Par APP_NAME
router.route('/VersionParAPP_NAME/:db/:APP_NAME').get((request, response) => {
    db = request.params.db
    getVersionParAPP_NAME(db,request.params.APP_NAME).then(result => {
        response.json(result);
    })
})
//par APP_NAME
async function getVersionParAPP_NAME(db,APP_NAME) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select * 
                    from [${db}].dbo.version
                    where APP_NAME = '${APP_NAME}'`;
        let result = pool.request().query(cmd);

     
        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}







//update 1
router.route('/update_version/:db').post((request, response) => {
    db = request.params.db
    let version = {...request.body}
    updateVersion(db,version).then(result => {
        response.json(result);
    })
})

//Update version

async function updateVersion(db,version) {
    try {
        let pool = await sql.connect(config);
        var cmd = `update [${db}].dbo.version set  
                version = '${version.version}'
                where IDVersion = '${version.IDVersion}'`
        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        console.log(error);
    }
}






module.exports = router;