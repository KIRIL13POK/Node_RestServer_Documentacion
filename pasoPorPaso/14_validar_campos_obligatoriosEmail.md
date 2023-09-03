El problema principal abordado en la clase es la necesidad de validar direcciones de correo electrónico en una aplicación web desarrollada con Express.js y Node.js. Se destaca la importancia de garantizar que los correos electrónicos proporcionados sean válidos y únicos antes de permitir su inserción en una base de datos. La clase se centra en encontrar una solución efectiva para validar correos electrónicos y gestionar errores relacionados con esta validación en la aplicación.

# Express-validator

**Express Validator** es una biblioteca middleware para Express.js que se utiliza para simplificar y automatizar la validación de datos en las aplicaciones web Node.js. Su función principal es proporcionar herramientas y funciones para validar los datos de entrada, como los parámetros de solicitud, el cuerpo de la solicitud y otros datos enviados por los clientes. Esto ayuda a garantizar que los datos cumplen con los criterios deseados antes de procesarlos o almacenarlos en la base de datos, mejorando la seguridad y la integridad de la aplicación.

![express-validator](/img/expressValidator.png)

[express-validator-npm](https://www.npmjs.com/package/express-validator)

* Paso 1

Descarga y instalación la biblioteca Express Validator y todas sus dependencias en el proyecto.

```JavaScript

npm i express-validator

```

![express-validator instalado](/img/expressValdidatorInstalado.png)

* Paso 2 

Esta parte del código garantiza que no se registren múltiples usuarios con el mismo correo y proporciona una respuesta adecuada en caso de que el correo ya esté en uso.

```JavaScript
// Verificar si un correo existe
const existeEmail = await Usuario.findOne({ correo });
if (existeEmail) {
    return res.status(400).json({
        msg: 'Ese correo ya está registrado'
    });
}
```
   * Se utiliza el método `Usuario.findOne()` para buscar un documento en la colección de usuarios donde el campo **"correo"** coincide con el valor proporcionado en `req.body.correo`. Esto se hace usando la desestructuración: `const { correo } = req.body`.

   * Luego, se verifica si existeEmail no es `null`. Si no es `null`, significa que ya hay un usuario registrado con ese correo en la base de datos, por lo que se devuelve una respuesta de error con un código 400 y un mensaje que indica que el correo ya está registrado.

* Paso 3

Vamos a recordar que es un middleware
***
***Un middleware es una función que se ejecuta antes de que una solicitud HTTP llegue a su destino final, que puede ser un controlador, una ruta u otra función. Su propósito principal es realizar tareas específicas de procesamiento, autorización o manipulación de datos en el flujo de la solicitud antes de que sea manejada por la lógica principal de la aplicación. Los middlewares actúan como intermediarios entre la solicitud del cliente y la respuesta del servidor, permitiendo agregar funcionalidad adicional y modularizar el manejo de las solicitudes en una aplicación web.***
***
Para agregar middlewares antes de que se ejecute la función userPost en esta ruta, `router.post('/',userPost);` debes hacerlo proporcionando un arreglo de middlewares entre la ruta y la función de controlador, de la siguiente manera:

```JavaScript

router.post('/',[
    check('correo', 'El correo no es válido').isEmail()
],userPost);

```
  * El primer argumento, **'correo'**, especifica el campo de body que deseas validar. En este caso, se está validando el campo "correo" en la solicitud.

  * El segundo argumento, **'El correo no es válido', es un mensaje de error personalizado que se mostrará si la validación falla.** Este mensaje se envía al cliente si el campo "correo" no cumple con la validación.

  * El método encadenado `.isEmail()` es una regla de validación que verifica si el valor del campo "correo" es una dirección de correo electrónico válida. En este caso, `isEmail()` comprueba si el valor es una cadena de caracteres que cumple con el formato de una dirección de correo electrónico válida.

Es importante verificar que se ha importado correctamente **express-validator**. Una vez que empieces a escribir `check()`, debería aparecer la importación de la siguiente manera:

```JavaScript
const {Router}= require ('express');

const { userGet,
        userPut, 
        userPost, 
        userDelete,
        userPatch } = require('../controllers/user.controller');

//La importación express-validator
const { check } = require('express-validator');
```


* Paso 4 

Este paso consiste de conseguir mostrar el error.
***
El método `check() `de **express-validator** acumula errores en la solicitud (req) a medida que se aplican validaciones en una ruta. Estos errores son útiles para tomar decisiones basadas en la validez de los datos ingresados. Cuando se llega al controlador de la ruta, estos errores pueden ser utilizados para enviar respuestas de error adecuadas en función de las validaciones fallidas. En resumen, `check()` simplifica la gestión de errores al almacenarlos convenientemente en la solicitud para su manejo posterior.
***

Vamos a necesitar **validationResult**
 es una función proporcionada por express-validator que se utiliza para obtener y gestionar los resultados de las validaciones que se han realizado en una ruta de Express.js. Permite acceder a los errores o resultados de validación acumulados y tomar decisiones basadas en ellos

 ```JavaScript
const { response, request } = require('express');
const bcryptjs = require('bcrypt');

const Usuario = require('../models/usuario.js');

//Importacion de validationResult
const { validationResult } = require('express-validator');
 ```

```JavaScript
const userPost = async (req, res = response) => {
    
    // Manejo de  errores de validación
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json( errors );
    }

    const { nombre, correo, password,rol} = req.body
    const usuario = new Usuario({ nombre, correo, password, rol } )

    //Verificar un correo existe
    const existeEmail = await Usuario.findOne( { correo} );
    if (existeEmail){
        return res.status(400).json({
            msg: 'Ese correo ya está registrado'
        });
    }
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);


     await usuario.save()

    res.json({
        usuario

    });
}

```

1. `const errors = validationResult(req);`: En esta línea, utilizas la función **validationResult(req)** para obtener un objeto que contiene los resultados de las validaciones que se aplicaron en la solicitud actual (req). Este objeto errors contendrá información sobre los errores de validación, si los hubiera.

2. `if (!errors.isEmpty()) {`: Aquí verificas si el objeto errors no está vacío, lo que significa que se produjeron errores de validación en la solicitud.

3. Si el objeto errors no está vacío (lo que indica que se produjeron errores de validación), entonces se ejecuta el bloque de código dentro del if.

4. `return res.status(400).json(errors);`: En caso de que se produzcan errores de validación, este código configura una respuesta HTTP con un código de estado 400 (Bad Request) para indicar que ha habido un error en la solicitud. Luego, se envían los detalles de los errores de validación en formato JSON en el cuerpo de la respuesta utilizando `res.json(errors)`.

Resultado despues de hacer una petición con el POSTMAN :

![checkErrors](/img/chekErrors.png)







