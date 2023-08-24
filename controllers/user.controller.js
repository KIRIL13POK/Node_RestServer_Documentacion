const { response, request } = require('express');
const Usuario = require('../models/usuario.js');

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
const userPost = async (req, res = response) => {

    const body = req.body
    const usuario = new Usuario( body )

     await usuario.save()

    res.json({

        msg: 'Esto es la peticion POST - controlador',
        usuario

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
