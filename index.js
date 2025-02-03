const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
const { config } = require('./config/index');

const controllers = require('./routes/index.js');

app.use(express.json());
controllers(app);

app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`);
    console.log('Cambio realizado en la rama aplicacionesvirtual');
    console.log('Commit de prueba')
    console.log('nuevo commit')
});