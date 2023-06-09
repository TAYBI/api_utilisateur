
var express = require('express');
var router = express.Router();
var config = require('./dbconfig').dbconfig('omag');
const sql = require('mssql/msnodesqlv8');
const { cleanObject } = require('./dbconfig');

router.use((request, response, next) => {
    //console.log('middleware');
    next();
})


///////////////////////////Employes /////////////////////////////////////////////////////

//insertion
router.route('/EmployesPcVersCloud/:db').post((request, response) => {
    let Employes = { ...request.body }

    EmployesPcVersCloud(Object.values(Employes),request.params.db).then(result => {
        response.status(201).json(result);
    })
})


async function EmployesPcVersCloud(Employes,db) {
    Employes = cleanObject(Employes);  
    var cmd1 = `delete  from [${db}].dbo.Employe `;
   // console.log(cmd1);
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd1);
    }
    catch (error) {
        return error.message;
    }

    var cmd = `	insert into [${db}].dbo.Employe (Matricule, Codebare, Nom, Prenom , Id_departemet, Id_site) values`
    Employes.forEach(Employe => {
        cmd += `('${Employe.Matricule}', '${Employe.Codebare}', '${Employe.Nom}', '${Employe.Prenom}','${Employe.Id_departemet}','${Employe.Id_site}'),`
    });
    cmd = cmd.substring(0,cmd.length-1);

   
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }
}





router.route('/AffairesPcVersCloud/:db').post((request, response) => {
        
    let affaires = { ...request.body }

    AffairesPcVersCloud(Object.values(affaires),request.params.db).then(result => {
        response.status(201).json(result);
    })

})


async function AffairesPcVersCloud(affaires,db) {
    affaires = cleanObject(affaires);  
    var cmd1 = `delete  from [${db}].dbo.affaire `;
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd1);
    }
    catch (error) {
        return error.message;
    }

    var cmd = `	insert into [${db}].dbo.affaire (affaire_id,libelle) values`
    affaires.forEach(affaire => {
        cmd += `('${affaire.affaire_id}', '${affaire.libelle}'),`
    });
    cmd = cmd.substring(0,cmd.length-1);
  
   
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }



}



router.route('/SitesPcVersCloud/:db').post((request, response) => {

    let sites = { ...request.body }

    SitesPcVersCloud(Object.values(sites),request.params.db).then(result => {
        response.status(201).json(result);
    })
    
   
})


async function SitesPcVersCloud(sites,db) {
    sites = cleanObject(sites);  
    var cmd1 = `delete  from [${db}].dbo.site `;
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd1);
    }
    catch (error) {
        return error.message;
    }

    var cmd = `	insert into [${db}].dbo.site (Id_site,Nom) values`
    sites.forEach(site => {
        cmd += `('${site.Id_site}', '${site.Nom}'),`
    });
    cmd = cmd.substring(0,cmd.length-1);

   
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }



}




router.route('/EquipesPcVersCloud/:db').post((request, response) => {
    
    let Equipes = { ...request.body }

    EquipesPcVersCloud(Object.values(Equipes),request.params.db).then(result => {
        response.status(201).json(result);
    })
    
   
})


async function EquipesPcVersCloud(Equipes,db) {
    Equipes = cleanObject(Equipes);  
    var cmd1 = `delete  from [${db}].dbo.Equipe `;
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd1);
    }
    catch (error) {
        return error.message;
    }

    var cmd = `	insert into [${db}].dbo.Equipe (code,Libelle) values`
    Equipes.forEach(equipe => {
        cmd += `('${equipe.code}', '${equipe.Libelle}'),`
    });
    cmd = cmd.substring(0,cmd.length-1);
   
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }

}



router.route('/TachesPcVersCloud/:db').post((request, response) => {
 
    let taches = { ...request.body }

    TachesInsert(Object.values(taches),request.params.db).then(result => {
        response.status(201).json(result);
    })
    
   
})



async function TachesInsert(taches,db) {
    taches = cleanObject(taches);
    

    var cmd1 = `delete  from [${db}].dbo.tache `;
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd1);
    }
    catch (error) {
        return error.message;
    }


    var cmd = `	insert into [${db}].dbo.tache (code1,Libelle) values`
    taches.forEach(tache => {
        cmd += `('${tache.code}', '${tache.Libelle}'),`

    });
    cmd = cmd.substring(0,cmd.length-1);

   
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
       return error.message;
     // console.log(error.message);
    }


}




router.route('/EmplacementPcVersCloud/:db').post((request, response) => {

    let Emplacements = { ...request.body }

    EmplacementPcVersCloud(Object.values(Emplacements),request.params.db).then(result => {
        response.status(201).json(result);
    })
    
   
})


async function EmplacementPcVersCloud(Emplacements,db) {
    
    Emplacements = cleanObject(Emplacements);

    var cmd1 = `delete  from [${db}].dbo.Emplacement `;
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd1);
    }
    catch (error) {
        return error.message;
    }
     
    var cmd = `	insert into [${db}].dbo.Emplacement (code,Libelle) values`
    Emplacements.forEach(Emplacement => {
        cmd += `('${Emplacement.code}', '${Emplacement.Libelle}'),`
    });
    cmd = cmd.substring(0,cmd.length-1);
   
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }



}




///////////////////////////entree_mobile /////////////////////////////////////////////////////

router.route('/entree_mobile/:date/:db').get((request, response) => {
    
    getentree_mobile(request.params.date,request.params.db).then(result => {
        response.json(result);
    })
})


async function getentree_mobile(date,db) {

    try {
        let pool = await sql.connect(config);
        var cmd = `select * 
        from [${db}].dbo.entree_mobile
        where cast(date as date)='${date}'
        order by IDEntree
        `;
       
        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }
}

///////////////////////////fin entree_mobile //////////////////////////////////////////////////




///////////////////////////sortie_mobile /////////////////////////////////////////////////////

router.route('/sortie_mobile/:date/:db').get((request, response) => {
    
    getsortie_mobile(request.params.date,request.params.db).then(result => {
        response.json(result);
    })
})


async function getsortie_mobile(date,db) {

    try {
        let pool = await sql.connect(config);
        var cmd = `select * 
        from [${db}].dbo.sortie_mobile
        where cast(date as date)='${date}'
        order by IDSortie`;
      
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }
}

///////////////////////////fin sortie_mobile //////////////////////////////////////////////////


///////////////////////////terrain_mobile /////////////////////////////////////////////////////

router.route('/terrain_mobile/:date/:db').get((request, response) => {
    
    getterrain_mobile(request.params.date,request.params.db).then(result => {
        response.json(result);
    })
})


async function getterrain_mobile(date,db) {

    try {
        let pool = await sql.connect(config);
        var cmd = `select * 
        from [${db}].dbo.terrain_mobile
        where cast(date as date)='${date}'
        order by IDTerrain`;
     
        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }
}

///////////////////////////fin terrain_mobile //////////////////////////////////////////////////





////////////////////////// De l'API vers Mobile

//////////////////////////////Employes

router.route('/EmployesPointageMobile/:db').get((request, response) => {
   
   EmployesPointageMobile(request.params.db).then(result => {
        response.json(result);
    })
})

async function EmployesPointageMobile(db) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select Matricule, Codebare, Nom, Prenom , Id_departemet, Id_site
                   from [${db}].dbo.Employe
                   where  (Employe.dates is null or Employe.dates='19000101' Or Employe.dates>=(SELECT CONVERT(VARCHAR(10), getdate(), 111))) `;
        let result = pool.request().query(cmd);

        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }
}


////////////////////////////////Affaire

router.route('/AffairesPointageMobile/:db').get((request, response) => {
   
    AffairesPointageMobile(request.params.db).then(result => {
        response.json(result);
    })
})

async function AffairesPointageMobile(db) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select affaire_id, libelle from [${db}].dbo.affaire `;
        let result = pool.request().query(cmd);
         return (await result).recordset
    }
    catch (error) {
        return error.message;
    }
}



////////////////////////////////Site

router.route('/SitesPointageMobile/:db').get((request, response) => {
    SitesPointageMobile( request.params.db).then(result => {
        response.json(result);
    })
})

async function SitesPointageMobile(db) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select Id_site, nom, Id_affaire_p from [${db}].dbo.site`;
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }
}



////////////////////////////////Emplacement

router.route('/EmplacementsPointageMobile/:db').get((request, response) => {
   
    EmplacementsPointageMobile(request.params.db).then(result => {
        response.json(result);
    })
})

async function EmplacementsPointageMobile(db) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select code, Libelle from [${db}].dbo.Emplacement`;
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }
}

router.route('/EquipesPointageMobile/:db').get((request, response) => {
    
    EquipesPointageMobile(request.params.db).then(result => {
        response.json(result);
    })
})

async function EquipesPointageMobile(db) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select code, Libelle from [${db}].dbo.equipe`;
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }
}


router.route('/TachesPointageMobile/:db').get((request, response) => {
    
    TachesPointageMobile(request.params.db).then(result => {
        response.json(result);
    })
})

async function TachesPointageMobile(db) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select code, Libelle from [${db}].dbo.Tache`;
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }
}




////////////////////////// De  Mobile vers le cloud

router.route('/EntreeMobileVersCloud/:db').post((request, response) => {
     
    let entrees = { ...request.body }

    EntreeMobileVersCloud(Object.values(entrees),request.params.db).then(result => {
        response.status(201).json(result);
    })
    
   
})


async function EntreeMobileVersCloud(entrees,db) {
    entrees = cleanObject(entrees);  
    var cmd = `	insert into [${db}].dbo.entree_mobile (matricule,date) values`
    entrees.forEach(entree => {
        cmd += `('${entree.matricule}', '${entree.date}'),`
    });
    cmd = cmd.substring(0,cmd.length-1);
  
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }

}



router.route('/SortieMobileVersCloud/:db').post((request, response) => {
   
    let entrees = { ...request.body }

    SortieMobileVersCloud(Object.values(entrees),request.params.db).then(result => {
        response.status(201).json(result);
    })
    
   
})


async function SortieMobileVersCloud(sorties,db) {
    sorties = cleanObject(sorties);     
    var cmd = `	insert into [${db}].dbo.sortie_mobile (matricule,date) values`
    sorties.forEach(sortie => {
        cmd += `('${sortie.matricule}', '${sortie.date}'),`
    });
    cmd = cmd.substring(0,cmd.length-1);
  
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }

}



router.route('/TerrainMobileVersCloud/:db').post((request, response) => {
    
    let Terrains = { ...request.body }
    TerrainMobileVersCloud(Object.values(Terrains),request.params.db).then(result => {
        response.status(201).json(result);
    })
    
   
})


async function TerrainMobileVersCloud(Terrains,db) {
    Terrains = cleanObject(Terrains);  
    var cmd = `	insert into [${db}].dbo.terrain_mobile (matricule,date, IDEmplacement,IDEquipe,IDTache) values`
    Terrains.forEach(Terrain => {
        cmd += `('${Terrain.matricule}', '${Terrain.date}','${Terrain.IDEmplacement}','${Terrain.IDEquipe}','${Terrain.IDTache}'),`
    });
    cmd = cmd.substring(0,cmd.length-1);
    
    try {
        let pool = await sql.connect(config);
        let result = pool.request().query(cmd);
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }

}



//Login
router.route('/UtilisateurParMail/:db/:mail').get((request, response) => {
    db = request.params.db
    UtilisateurParMail(request.params.mail,db).then(result => {
        response.json(result);
    })
})

async function UtilisateurParMail(mail,db) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select * 
                    from [${db}].dbo.utilisateur
                    where mail = '${mail}'`;
          let result = pool.request().query(cmd);
         
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }
}


router.route('/BasesUser/:db').get((request, response) => {
 
   console.log(config.database);
    BasesUser(request.params.db).then(result => {
        response.json(result);
    })
})

async function BasesUser(db) {
    try {
        let pool = await sql.connect(config);
        var cmd = `select code, nom
                    from [${db}].dbo.societe
                    order by Id_societe`;
         let result = pool.request().query(cmd);
      
        return (await result).recordset
    }
    catch (error) {
        return error.message;
    }
}



module.exports = router;

