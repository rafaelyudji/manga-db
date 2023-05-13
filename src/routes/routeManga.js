const express = require('express');
const connection = require('../db/connection');
const validateManga = require('../middlewares/validateManga');

const route = express.Router();

route.get('/', async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM mangas');

    res.status(200).json(result);
});

route.post('/', validateManga, async (req, res) => {
    const { nome_manga, autor, resumo, genero, capa_img } = req.body;

    const [result] = await connection.execute(
        'INSERT INTO mangas(nome_manga, autor, resumo, genero, capa_img) VALUES(?, ?, ?, ?, ?)', [nome_manga, autor, resumo, genero, capa_img]
    );

    const newManga = {
        id: result.insertId,
        nome_manga,
        autor,
        resumo,
        genero,
        capa_img
    }

    res.status(201).json(newManga);
});

route.put('/:id', validateManga, async (req, res) => {
    const { nome_manga, autor, resumo, genero, capa_img } = req.body;
    const { id } = req.params;

    const [[result]] = await connection.execute(`SELECT * FROM mangas where id = ?`, [id]);

    if (!result) {
        res.status(404).json({ message: "Manga não encontrado." });
    }

    const updateManga = connection.execute(`UPDATE mangas 
    SET nome_manga = ?, autor = ? , resumo = ?, genero = ?, capa_img = ? WHERE id = ?`, [nome_manga, autor, resumo, genero, capa_img, id])

    const newManga = {
        id: result.insertId,
        nome_manga,
        autor,
        resumo,
        genero,
        capa_img
    }

    res.status(201).json(newManga);
})

route.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const [[result]] = await connection.execute(`SELECT * FROM mangas where id = ?`, [id]);

    if (!result) {
        res.status(404).json({ message: "Manga não encontrado." });
    }

    await connection.execute(`DELETE FROM mangas 
    WHERE id = ?`,
        [id])

    res.status(204).send();
})

route.get('/:id', async (req, res) => {
    const { id } = req.params;

    const [[result]] = await connection.execute(`SELECT * FROM mangas where id = ?`, [id]);

    if (!result) {
        res.status(404).json({ message: "Manga não encontrado." });
    }

    res.status(200).json(result);
});

module.exports = route;