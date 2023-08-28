### Creación de la Instancia del Modelo "Usuario"

En esta etapa, creamos una "plantilla" llamada instancia siguiendo la estructura del modelo "Usuario". Esta instancia, nombrada con la primera letra en mayúscula, sirve como una forma organizada de preparar los datos antes de insertarlos en la base de datos. Similar a completar un formulario, esta plantilla nos ayuda a tener los datos listos para su almacenamiento y asegura que se guarden de manera correcta en la base de datos.

```javascript
const Usuario = requiere('../models/usuario.js');
```

A continacion en el controlador  POST añadimos:

```javascript
const userPost = (req, res = response) => {

    // Extrae el contenido del cuerpo de la solicitud (req.body) y lo almacena en la variable body.
    const body = req.body
    // Crear una nueva instancia de la clase Usuario utilizando el contenido del cuerpo de la solicitud
    const usuario = new Usuario( body )

    res.json({

        msg: 'Esto es la peticion POST - controlador',

        // Agrega el objeto usuario al objeto JSON de respuesta.
        usuario
 
    });
}

```
EL resultado de en el Postman se ve de siguiente manera:

![postmaInstanciaUsuario](/img/postmanInstanciaUsuario.png)

Podemos observar todo esto que fue creado por el Mongoose:

```javascript

    "usuario": {
        "nombre": "test1",
        "estado": true,
        "creadoPorGoogle": false,
        "_id": "64e63881d4c78e7f61ff4723"
    }
  
```

Hasta el momento, hemos logrado obtener una respuesta exitosa para las solicitudes, sin embargo, aún no hemos implementado la funcionalidad de almacenar los datos en nuestra base de datos. 

 Para completar con éxito el almacenamiento de datos en nuestra base de datos:

```javascript
     // Cambio: Agregada la palabra clave 'async'
const userPost = async (req, res = response) => {

    const body = req.body
    const usuario = new Usuario( body )
    // Esperar a que la operación de guardado se complete antes de continuar con la palabra clave 'await'
    await usuario.save()

    res.json({

        msg: 'Esto es la peticion POST - controlador',
        usuario
 
    });
}
```
Hemos  introducido la línea `await usuario.save()` Esta adición asegura que el programa se detenga temporalmente y espere a que la operación de guardado se complete antes de avanzar. Adicionalmente, hemos ajustado la firma de la función para que sea `async (req, res = response)`, lo que permite que el proceso administre sin problemas operaciones asincrónicas, como el guardado en la base de datos, mientras sigue manejando las solicitudes entrantes de manera eficiente. En resumen, estos cambios nos permiten crear un flujo coherente donde los datos se almacenan correctamente en la base de datos, a la vez que mantenemos una experiencia fluida para los usuarios.

Después de hacer clic en "Send" en Postman, nos encontraremos con un nuevo error en la respuesta de manera segura:

![valideotorError](/img/validationError.png)

Error significa que un registro en el modelo "Usuario" no pasó la revisión de requisitos obligatorios en Mongoose. El mensaje destaca que faltan detalles cruciales como "rol", "contraseña", "correo" y "nombre" en el registro. Esto suele ocurrir si los datos no se completaron según las normas definidas en el esquema del modelo.

Para corregir este error y obtener el resultado deseado, simplemente necesitamos agregar todos los requisitos en el cuerpo (body) de la petición.

![valideotorError](/img/validationErrorBody.png)

Hemos logrado exitosamente almacenar nuestra información de manera persistente en la base de datos.

![valideotorError](/img/ususriosDB_Post.png)







