const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empleados',
});

app.post('/create', (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const correo = req.body.correo;

    const sql = 'INSERT INTO empleado (nombre, edad, pais, cargo, correo) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre, edad, pais, cargo, correo], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al insertar el empleado');
        } else {
            res.status(200).send('Empleado insertado correctamente');
        }
    });
});

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});