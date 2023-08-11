# Separar las rutas y el controlador de la clase.

  ### Separar las rutas y el controlador en una aplicación con Express en Node.js es una buena práctica para hacer que el código sea más organizado y fácil de mantener. Al separar las rutas (URLs) y el controlador (lógica de negocio), podemos reutilizar el código de manera eficiente y realizar pruebas de forma más efectiva. Cada componente se enfoca en una tarea específica, lo que ayuda a evitar mezclar la lógica y simplifica la estructura de la aplicación. Además, esta separación permite que la aplicación crezca y evolucione más fácilmente en el futuro.

 La lógica y el objetivo de separar las rutas y el controlador:

+ **Organización del código:**

 Separar las rutas (URLs) y el controlador (lógica de negocio) permite mantener un código más ordenado y estructurado. Cada ruta y su funcionalidad se definen en su propio archivo, lo que facilita la búsqueda y el mantenimiento del código.

+ **Reutilización de código:**

 Al separar el controlador de las rutas, es más sencillo reutilizar la lógica de negocio en diferentes rutas o incluso en otras aplicaciones. Esto promueve el principio "DRY" (Don't Repeat Yourself).

+ **Enfoque en la responsabilidad única:**

 La separación de rutas y controlador permite que cada componente (ruta o controlador) se centre en una tarea específica. Las rutas se encargan de definir cómo se accede a los recursos, mientras que los controladores manejan la lógica de negocio relacionada con esos recursos.

+ **Facilitar el testing (pruebas):**

 Al separar la lógica de negocio en controladores independientes, se hace más fácil y efectivo realizar pruebas unitarias en la aplicación. Esto contribuye a una mayor confiabilidad y calidad del código.

+ **Escalabilidad:**

 Una arquitectura modular facilita el crecimiento de la aplicación. A medida que se añaden nuevas funcionalidades o se modifican las existentes, el código se mantiene más organizado y es menos propenso a errores.

***
***
***


### RUTAS
En nuestro proyecto, para continuar, vamos a crear una carpeta llamada "routes". Dentro de esta carpeta, crearemos un archivo llamado "user.js", ya que este archivo se encargará de manejar todas las operaciones relacionadas con usuarios en nuestra aplicación.

![rutas_user](/img/routes_user.png)

En **user.js** a continuación  extraemos el objeto Router del paquete express para utilizarlo en nuestro código. El objeto Router es una clase de Express que nos permite crear rutas y manejar las solicitudes HTTP asociadas a esas rutas.

```javascript
const {Router}= requiere ('express');
const router = Router();
```

En resumen, esta línea de código importa el objeto Router del paquete express, lo que nos permite utilizarlo para definir y gestionar las rutas de nuestra aplicación. Al hacerlo, estamos aprovechando la funcionalidad proporcionada por Express para crear una API o un servidor web con facilidad.

Ahora ya podemos defenir las rutas :
```javascript

//Cambiamos this.app por router para usar el enrutador de Express.
//Creamos una instancia de enrutador con express.Router(),
//y ahora usamos router para definir y manejar nuestras rutas.

router.get('/api', (req, res) => {
    res.json({

        msg: 'Esto es la peticion GET'

    })
});

router.put('/api', (req, res) => {
    res.json({

        msg: 'Esto es la peticion PUT'

    })
});

router.post('/api', (req, res) => {
    res.json({

        msg: 'Esto es la peticion POST'

    })
});

router.delete('/api', (req, res) => {
    res.json({

        msg: 'Esto es la peticion DELETE'

    })
});

router.patch('/api', (req, res) => {
    res.json({

        msg: 'Esto es la peticion PATCH'

    })
});

//Muy importante exportar:
module.exports = router;


```

El metodo `routes()` nesesita una modificacion importante ya que todas las rutas las pasamos al **sever.js** y la solucion es otro middleware:

```javascript
routes() {

        this.app.use('/api/usuarios', require('../routes/user'))

    }
```
Al llamar a este método en la instancia del servidor, se le asigna un enrutador a la ruta base **/api/usuarios**, utilizando **el módulo user.js** que contiene la lógica de manejo de las operaciones relacionadas con los usuarios.

Despues de realizar este paso en el metodo `routes()` debemos ajustar las rutas indicadas en **user.js**:

```javascript
//La ruta esta defenida en el metodo routes() y es '/api/usuarios' 
//por eso la ruta '/api' debe ser eliminada y solo queda '/'


router.get('/', (req, res) => {
    res.json({

        msg: 'Esto es la peticion GET'

    })
});

router.put('/', (req, res) => {
    res.json({

        msg: 'Esto es la peticion PUT'

    })
});

router.post('/', (req, res) => {
    res.json({

        msg: 'Esto es la peticion POST'

    })
});

router.delete('/', (req, res) => {
    res.json({

        msg: 'Esto es la peticion DELETE'

    })
});

router.patch('/', (req, res) => {
    res.json({

        msg: 'Esto es la peticion PATCH'

    })
});
```

Otra buena practica es  facilitar la visualización de las rutas disponibles en la aplicación, se sugiere incluir un simple string o constante en el servidor que liste todas las rutas disponibles. Esto permitirá a cualquier usuario comprender rápidamente las rutas disponibles al acceder al servidor.

```javascript
 constructor() {

        this.app = express();
        this.port = process.env.PORT;
        // Agregar un string o constante con las rutas disponibles en el servidor para una fácil visualización.
        this.usuariosPath = ''/api/usuarios''


        //Middlewars
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes()
    }

```

Ahora nos permite usar `this.usuariosPath` :
 ```javascript
 routes() {

        this.app.use( this.usuariosPath, require('../routes/user'))

    }
 
```

***
***
***


# Controladores

Crarpeta nueva para **controladores**:

![controllers_user](/img/controllers_user.png)

+ Es importante extraer una función crucial que nos permitirá manejar las solicitudes (requests) en este archivo

```javascript
const { response } = require('express');
```

 La línea de código `const { response } = require('express');` nos proporciona acceso a la funcionalidad necesaria para gestionar las respuestas a las solicitudes entrantes. De esta manera, podemos responder adecuadamente a las peticiones del cliente y proporcionar una experiencia fluida en nuestra aplicación.
 

 * La lógica del desarrollo implica la creación de funciones que posteriormente serán exportadas como controladores. Estos controladores se encargan de manejar las diferentes acciones y solicitudes en la aplicación.

 Resultado:

 ```javascript  
const userGet = (req, res = response) => {
    res.json({

        msg: 'Esto es la peticion GET - controlador'

    });
}
const userPut = (req, res = response) => {
    res.json({

        msg: 'Esto es la peticion PUT - controlador'

    });
}
const userPost = (req, res = response) => {
    res.json({

        msg: 'Esto es la peticion POST - controlador'

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

//Importación:
module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete

}
 ```
 **Después de exportar los controladores, podemos aprovechar sus beneficios al mejorar la organización del código, facilitar su reutilización y agilizar el desarrollo de la aplicación.**

 Resultado:

 ```javascript
 const {Router}= require ('express');
//Exportar los controladores
const { userGet,
        userPut, 
        userPost, 
        userDelete,
        userPatch } = require('../controllers/user.controller');

const router = Router();

//Mandamos la referencia
router.get('/', userGet);
router.post('/',userPost);
router.put('/', userPut);
router.patch('/',userPatch);
router.delete('/',userDelete);



module.exports = router;
 ```