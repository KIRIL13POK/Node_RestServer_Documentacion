# Express basado en clases

Express es conocido por su estilo de programación basado en funciones, es posible implementar una versión de Express basada en clases utilizando JavaScript o TypeScript. La idea detrás de esto es *encapsular la funcionalidad de Express en clases para una organización más estructurada y modular de la aplicación.*

+ En primer lugar, necesitamos un directorio donde vamos a guardar todas las clases de este proyecto: 

![models](/img/Screenshot_1.png)

* También vamos a nesesitar un directorio publico:

![models](/img/public.png)


1. ***Importación de módulos:***

 Se importan los módulos necesarios para el funcionamiento del servidor ***EXPRESS*** es el paquete que proporciona la funcionalidad principal de la aplicación web.

 ```JavaScript
 const express = require('express');
 ```



2.***Clase Server:***

 Clase Server  será la encargada de configurar y ejecutar el servidor Express.

3. ***Constructor:***

 En el constructor de la clase, creas una instancia de Express y defines el puerto en el que el servidor escuchará las solicitudes. También defines la ruta base para las rutas de usuarios (this.usuariosPath).

 ```JavaScript
 constructor() {

    this.app = express();
    this.port = process.env.PORT;
    
 }
 ```

 4. ***Metodos:***

### Método middlewares(): 

Aquí se configuran los middlewares para el servidor. Los middlewares son funciones que se ejecutan antes de que las rutas definidas en la aplicación se activen. ***En este caso, se define un middleware que sirve archivos estáticos desde el directorio "public".***
```JavaScript
middlewares() {

    // Directorio público
    this.app.use(express.static('public'))
}
```

### Método routes():

 El método routes() establece una ruta para la raíz / de la aplicación Express y responde con "Hello World" cuando se accede a dicha ruta.

 ```JavaScript
 routes() {
        this.app.get('/', ( req, res) => {
            res.send('Helo World')
        });

    }
 ```

### Método listen():

 Este método se encarga de iniciar el servidor, haciendo que escuche las solicitudes en el puerto especificado en el constructor. Cuando el servidor está listo para recibir solicitudes, se muestra un mensaje en la consola indicando el puerto en el que se está ejecutando.

***LLAMAMOS LOS METODOS EN EL CONSTRUCTOR:***
```JavaScript
constructor() {
        this.app = express();
        this.port = process.env.PORT;
       
        //Middlewars
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes()
    }

```

## CODIGO COMPLETo DE LA CLASE SERVER:
```JavaScript
const express = require('express')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
       
        //Middlewars
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes()
    }

    middlewares() {
        
        //Directorio publico
        this.app.use(express.static('public'))


    }

    routes() {
        this.app.get('/api', ( req, res) => {
            res.send('Helo World')
        });

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`El Servidor esta escuchando en el puero ${this.port}`)
        });

    }

}

module.exports = Server
```

# app.js

1. ***Importar la clase Server:***

 El código `const Server = require('./models/server')` importa la clase ***Server*** desde el archivo ***server.js*** que se encuentra dentro de la carpeta ***models***. Esta clase probablemente contiene la configuración y lógica para crear un servidor web utilizando Express.

2. ***Crear una instancia del servidor:***

 El código `const server = new Server()` crea una instancia de la clase Server, utilizando el constructor de la clase. Esto significa que ahora tienes un objeto server que contiene toda la configuración y funcionalidad para tu servidor.

3. ***Iniciar el servidor:***

 Finalmente, el código `server.listen()` inicia el servidor llamando al método ***listen()*** de la clase ***Server***. Este método inicia la escucha del servidor en el puerto configurado y comienza a recibir y manejar las solicitudes entrantes.


 Resultado:
 ```JavaScript
 require('dotenv').config();

const Server = require('./models/server');

const server = new Server();
server.listen();
 ```

En resumen, el archivo ***app.js*** se encarga de importar la clase ***Server***, crear una instancia del servidor y luego iniciar el servidor. Esto permite que tu aplicación web basada en Express esté en funcionamiento y pueda responder a las solicitudes HTTP entrantes.


 

