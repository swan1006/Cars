const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

// Database connection

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'carshop'
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected with App...');
});

/**
 * Get All Items
 *
 * @return response()
 */

app.get('/api/cars', (req, res) => {
    let sqlQuery = 'select * from cars';

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Get Single Item
 *
 * @return response()
 */

app.get('/api/items/:id', (req, res) => {
    let sqlQuery = 'select * from items where id=' + req.params.id;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/cars', (req, res) => {
    console.log(req.body)
    let data = {
        cName: req.body.cName,
        cModel: req.body.cModel,
        cPrice: req.body.cPrice,
        cSku: req.body.cSku
    };

    let sqlQuery = "INSERT INTO cars SET ?";

    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Update Item
 *
 * @return response()
 */
app.put('/api/items/:id', (req, res) => {
    let sqlQuery = "UPDATE items SET title='" + req.body.title + "', body='" + req.body.body + "' WHERE id=" + req.params.id;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/items/:id', (req, res) => {
    let sqlQuery = "DELETE FROM items WHERE id=" + req.params.id + "";

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
    return JSON.stringify({ "status": 200, "error": null, "response": results });
}

/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(5000, () => {
    console.log('Server started on port 5000...');
});