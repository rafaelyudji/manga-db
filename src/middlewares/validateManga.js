const joi = require('joi');

const MANGA = joi.object({
    nome_manga: joi.string().required().min(1).max(255),
    autor: joi.string().required().min(1).max(255),
    resumo: joi.string().required().min(1).max(1000),
    genero: joi.string().required().min(1).max(255),
    capa_img: joi.string().required().min(1).max(255),
})

function validateManga(req, res, next) {
    const { nome_manga, autor, resumo, genero, capa_img } = req.body;

    const { error } = MANGA.validate({ nome_manga, autor, resumo, genero, capa_img });

    if (error) {
        next({ status: 400, message: error.details[0].message });
    }

    next();
}

module.exports = validateManga