const express = require('express');
const connection = require('../db/connection');
const validatePagina = require('../middlewares/validatePagina');

const route = express.Router();

route.get('/', async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM paginas');

    res.status(200).json(result);
});

route.post('/', validatePagina, async (req, res) => {
    const { numero_pagina, img, id_capitulo } = req.body;

    const [result] = await connection.execute(
        'INSERT INTO paginas(numero_pagina, img, id_capitulo) VALUES(?, ?, ?)', [numero_pagina, img, id_capitulo]
    );

    if (!result) {
        res.status(404).json({ message: "Pagina não encontrado." });
    }

    const newPagina = {
        id: result.insertId,
        numero_pagina,
        img,
        id_capitulo
    }

    res.status(201).json(newPagina);
});

route.put('/:id', validatePagina, async (req, res) => {
    const { numero_pagina, img, id_capitulo } = req.body;
    const { id } = req.params;

    const [[result]] = await connection.execute(`SELECT * FROM paginas where id = ?`, [id]);

    if (!result) {
        res.status(404).json({ message: "Pagina não encontrado." });
    }

    const updatePagina = connection.execute(`UPDATE paginas
    SET numero_pagina = ?, imag = ? , id_capitulo = ? WHERE id = ?`, [numero_pagina, img, id_capitulo, id])

    const newPagina = {
        id,
        numero_pagina,
        img,
        id_capitulo
    }

    res.status(201).json(newPagina);
})

route.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const [[result]] = await connection.execute(`SELECT * FROM paginas where id = ?`, [id]);

    if (!result) {
        res.status(404).json({ message: "Pagina não encontrado." });
    }

    await connection.execute(`DELETE FROM paginas 
    WHERE id = ?`,
        [id])

    res.status(204).send();
})

route.get('/:id', async (req, res) => {
    const { id } = req.params;

    const [[result]] = await connection.execute(`SELECT * FROM paginas where id = ?`, [id]);

    if (!result) {
        res.status(404).json({ message: "Pagina não encontrado." });
    }

    res.status(200).json(result);
});

module.exports = route;