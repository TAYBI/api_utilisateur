const sql = require('mssql/msnodesqlv8')


const config = {
    server: 'BILAL\\SQLOMAG',
    database: 'DEMO',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
}

sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query('select * from client', function (err, records) {
        if (err) console.log(err);
        else {
            console.log(records);
        }
    });
})


async function executeQuery(connection, query) {
    try {
        const result = await connection.request().query(query);
        console.log(`Query result for ${connection.config.database}:`, result.recordset);
    } catch (error) {
        console.error(`Error executing query on ${connection.config.database}`, error);
    }
}

// Example query
const query = 'SELECT * FROM TableName';

// Execute the query on each connected database
executeQuery(sql.connections[0], query); // First database connection
executeQuery(sql.connections[1], query); // Second database connection
//-------------


const http = require('http');
const express = require('express');
const sql = require('mssql/msnodesqlv8');

// Create express app
const app = express();

// Define port numbers
const port1 = 3000; // Port for the first connection
const port2 = 4000; // Port for the second connection

// Configure the first database connection
const config1 = {
    server: 'BILAL\\SQLOMAG',
    database: 'database1',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
    },
};

// Configure the second database connection
const config2 = {
    server: 'BILAL\\SQLOMAG',
    database: 'database2',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
    },
};

// Define route handlers
app.get('/societes1', async (req, res) => {
    try {
        const pool = await sql.connect(config1);
        const result = await pool.request().query('SELECT nom, code FROM societe');
        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/societes2', async (req, res) => {
    try {
        const pool = await sql.connect(config2);
        const result = await pool.request().query('SELECT nom, code FROM societe');
        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create server instances for each port
const server1 = http.createServer(app);
const server2 = http.createServer(app);

// Start listening on the respective ports
server1.listen(port1, () => {
    console.log(`Server 1 is running on port ${port1}`);
});

server2.listen(port2, () => {
    console.log(`Server 2 is running on port ${port2}`);
});
