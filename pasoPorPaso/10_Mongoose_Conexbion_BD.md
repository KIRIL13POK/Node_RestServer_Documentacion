# Mongoose

Mongoose es una biblioteca de JavaScript que facilita la interacción con bases de datos MongoDB en aplicaciones Node.js. Actúa como un intermediario entre la aplicación y la base de datos, proporcionando herramientas para:

* Definir la estructura de los datos 
* Realizar consultas 
* Validar información 
* Gestionar relaciones de manera más sencilla

En resumen, Mongoose simplifica la forma en que tu aplicación Node.js se conecta y trabaja con la base de datos MongoDB, haciéndolo más fácil y eficiente.

![Mongoose](/img/mongoose.png)

[Mongoose Documentación.](https://mongoosejs.com/)

# Conexión a la Base de Datos.

* Paso 1:

Instalación de Mongoose

```JavaScript
npm i mongoose
```

![MongoosePackages](/img/mongooseNpm.png)

* Paso 2 :

Un nuevo directorio para manejar Base de Datos:

![dtataBaseConfig](/img/dataBaseConfig2.png)

* Paso 3 :

Importaión de Mongoose en `config.js`

```JavaScript
const mongoose = require('mongoose');
```

* Paso 4:

Creamos una funcion asyncrona `dbConection` y la exportamos:

Esta función, llamada **dbConection**, establece una conexión asincrónica con una base de datos MongoDB en función de la URL definida en la variable de entorno **MONGODB_CNN2**. Si la conexión es exitosa, muestra "Base de Datos Online". En caso de error, captura y registra el error, y lanza una excepción con un mensaje específico. Su propósito es manejar la conexión inicial con la base de datos en tu proyecto.

```JavaScript
const dbConection = async() =>{

    try {
        // Aqui hace falta URL que esta en la variable de entorno MONGODB_CNN2
        await mongoose.connect(process.env.MONGODB_CNN2)
        //En la versión actual de Mongoose (6.3.5), ya no se necesita poner los parámetros a la conexión ( useUrlParser,  useUnifiedTopology, useCreateIndex, useFindAndModify )
        console.log('Base de Datos Online')

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iciar la base de datos');

    }
}

//Exportación
module.exports = {
    dbConection
}
```

* Paso 5:

A continuacion vamos a realizar la conexion a la Base de Datos en `server.js`:

* Imporstación de dbConection

 `const { dbConection } = require('../database/config');
`
* Justo despues de Conrolador y antes de `middlewares()` una funcion asyncrona que espera la respuesta de `dbConection()`

`
async conectarDB(){
        await dbConection()
    }
`
* LLamamos la función en el controlador:

`this.conectarDB();`

Resultado:

```JavaScript
const express = require('express')
const cors = require('cors');
//Importacion dbConection
const { dbConection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';

        //Conectar a la Base de Datos
        this.conectarDB();
        
        
        this.middlewares();

        
        this.routes()
    }
        //Nuevo metodo para realizar la conexión
    async conectarDB(){
        await dbConection();
    }
```
Levantamos con `npm run dev ` para que corre el nodemon:

![ResultadoConexion](/img/BDoline.png)