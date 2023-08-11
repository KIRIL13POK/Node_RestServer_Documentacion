const express = require('express')
const cors = require('cors')


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';

        //Middlewars
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes()
    }

    middlewares() {

        //CORS
        this.app.use( cors());

        //Leer y parsear el body
        this.app.use( express.json())

        //Directorio publico
        this.app.use(express.static('public'))


    }

    routes() {

        this.app.use(this.usuarioPath, require('../routes/user'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`El Servidor esta escuchando en el puero ${this.port}`)
        });

    }

}



module.exports = Server