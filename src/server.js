require('dotenv').config();
const { app } = require('./app');
const connection = require('./db/connection');

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    console.log(`Rodando na porta ${PORT}`)
});
