const os = require('os');
let config;
let server;
/*
const interfaces = os.networkInterfaces();
const addresses = [];
for (const k in interfaces) {
    for (const k2 in interfaces[k]) {
        const address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

if (addresses != '178.238.238.52') {
    server = 'DESKTOP-KRHHQLB\\SQLEXPRESS';
}else{
    server = 'M4769\\OMAG';
}


config = {
    database: database, 
    server: server,
    driver: 'msnodesqlv8',
    options:{
        trustedConnection : true
    }
}
*/

function dbconfig(database){
    const interfaces = os.networkInterfaces();
    const addresses = [];
    for (const k in interfaces) {
        for (const k2 in interfaces[k]) {
            const address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    if (addresses != '178.238.238.52') {
        server = 'DESKTOP-KRHHQLB\\SQLEXPRESS';
    }else{
        server = 'M4769\\OMAG';
    }


   return config = {
    database: database, 
    server: server,
    driver: 'msnodesqlv8',
    options:{
        trustedConnection : true
    }
};
}



function cleanObject (list) {
    if (Array.isArray(list)) {
        list.forEach(obj => {
            Object.keys(obj).forEach(item => {
        if (typeof obj[item] === 'string') {
            obj[item] = obj[item].replace(/'/g, "''");
        }
     }
    )});
    }else {
        Object.keys(list).forEach(item => {
            if (typeof list[item] === 'string') {
                list[item] = list[item].replace(/'/g, "''");
            }
         }
        )
    }
    return list;
}

module.exports = {
    dbconfig:dbconfig,
    cleanObject : cleanObject
};