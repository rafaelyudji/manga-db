const express = require('express');
const connection = require('../db/connection');
const validateCapitulo = require('../middlewares/validateCapitulo');

const route = express.Router();

route.get('/', async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM capitulos');

    res.status(200).json(result);
});

route.post('/', validateCapitulo, async (req, res) => {
    const { nome_capitulo, numero_capitulo, id_manga } = req.body;

    const [result] = await connection.execute(
        'INSERT INTO capitulos(nome_capitulo, numero_capitulo, id_manga) VALUES(?, ?, ?)', [nome_capitulo, numero_capitulo, id_manga]
    );

    const newCapitulo = {
        id: result.insertId,
        nome_capitulo,
        numero_capitulo,
        id_manga
    }

    res.status(201).json(newCapitulo);
});

route.put('/:id', validateCapitulo, async (req, res) => {
    const { nome_capitulo, numero_capitulo, id_manga } = req.body;
    const { id } = req.params;

    const [[result]] = await connection.execute(`SELECT * FROM capitulos where id = ?`, [id]);

    if (!result) {
        res.status(404).json({ message: "Capitulo não encontrado." });
    }

    const updateCapitulo = connection.execute(`UPDATE capitulos
    SET nome_capitulo = ?, numero_capitulo = ? , id_manga = ? WHERE id = ?`, [nome_capitulo, numero_capitulo, id_manga, id])

    const newCapitulo = {
        id: result.insertId,
        nome_capitulo,
        numero_capitulo,
        id_manga
    }

    res.status(201).json(newCapitulo);
})

route.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const [[result]] = await connection.execute(`SELECT * FROM capitulos where id = ?`, [id]);

    if (!result) {
        res.status(404).json({ message: "Capitulo não encontrado." });
    }

    await connection.execute(`DELETE FROM capitulos 
    WHERE id = ?`,
        [id])

    res.status(204).send();
})

route.get('/:id', async (req, res) => {
    const { id } = req.params;

    const [[result]] = await connection.execute(`SELECT * FROM capitulos where id = ?`, [id]);

    if (!result) {
        res.status(404).json({ message: "Capitulo não encontrado." });
    }

    res.status(200).json(result);
});

module.exports = route;