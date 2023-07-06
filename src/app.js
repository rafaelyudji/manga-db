require('dotenv').config();
const express = require('express');
require('express-async-errors');
const { routeManga } = require('./routes');
const { routeCapitulo } = require('./routes');
const { routePagina } = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/manga', routeManga);
app.use('/capitulo', routeCapitulo);
app.use('/pagina', routePagina);
app.use(errorMiddleware);

module.exports = {
    app,
}