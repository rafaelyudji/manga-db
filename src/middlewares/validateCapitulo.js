const joi = require('joi');

const CAPITULO = joi.object({
    nome_capitulo: joi.string().required(),
    numero_capitulo: joi.number().required().min(1),
    id_manga: joi.number().required().min(1).positive(),
})

function validateCapitulo(req, res, next) {
    const { nome_capitulo, numero_capitulo, id_manga } = req.body;

    const { error } = CAPITULO.validate({ nome_capitulo, numero_capitulo, id_manga });

    if (error) {
        next({ status: 400, message: error.details[0].message });
    }

    next();
}

module.exports = validateCapitulo