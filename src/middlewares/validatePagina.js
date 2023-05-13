const joi = require('joi');

const PAGINA = joi.object({
    numero_pagina: joi.number().required().min(1),
    img: joi.string().required().min(1),
    id_capitulo: joi.number().required().min(1),
})

function validatePagina(req, res, next) {
    const { numero_pagina, img, id_capitulo } = req.body;

    const { error } = PAGINA.validate({ numero_pagina, img, id_capitulo });

    if (error) {
        next({ status: 400, message: error.details[0].message });
    }

    next();
}

module.exports = validatePagina