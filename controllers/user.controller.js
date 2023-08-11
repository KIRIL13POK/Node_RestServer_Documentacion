const { response, request } = require('express');

const userGet = (req = request, res = response) => {

    const { categoria, orden, pagina } = req.query;


    res.json({

        msg: 'Esto es la peticion GET - controlador',
        categoria, 
        orden, 
        pagina

    });
}
const userPut = (req , res = response) => {

   
    const  id  = req.params.id;

    res.json({

        msg: 'Esto es la peticion PUT - controlador',
        id

    });
}
const userPost = (req, res = response) => {

    const { nombre, edad } = req.body
    res.json({

        msg: 'Esto es la peticion POST - controlador',
        nombre,
        edad

    });
}
const userDelete = (req, res = response) => {
    res.json({

        msg: 'Esto es la peticion DELETE - controlador'

    });
}
const userPatch = (req, res = response) => {
    res.json({

        msg: 'Esto es la peticion PATCH - controlador'

    });
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}
