En esta clase, se aborda el desafío de gestionar roles en una aplicación, especialmente la dificultad de agregar nuevos roles sin tener que realizar cambios en el código existente. La solución propuesta consiste en implementar una validación de roles utilizando una base de datos MongoDB y Express en Node.js. Los pasos principales son:

1. Crear una colección llamada "roles" en MongoDB para almacenar los roles.
2. Definir un modelo Mongoose para los roles con un campo "rol" de tipo String y requerido.
3.  Implementar una función de validación personalizada en una ruta de Express que verifica si el rol proporcionado por el usuario existe en la base de datos.
4.  Utilizar esta validación para garantizar que los roles sean válidos antes de procesar las solicitudes.

La validación basada en la base de datos simplifica la gestión de roles y mejora la escalabilidad de la aplicación.

### Crear una colección llamada "rols" en MongoDB para almacenar los roles.

* Paso 1.

En el MongoDB creamos nueva colección:

![nuneva coleccion](/img/16_Create_collection-roll.png)

* Paso 2.

`ADMIN_ROLE`

![ADD DATA](/img/16_Add_data.png)

A continuación creamos un JSON:

![JSON](/img/16_aDD-DATA-JSON1.png)

Mongo ha creado exitosamente el rol 'Heidy' como un identificador único para este rol:

![ ID JSON1](/img/16_ID-JSON1.png)

* Paso 3.

De la misma manerame preparamos `USER_ROLE`:

![ ID JSON1](/img/16_ID-JSON2.png)

* Paso 4.

Y para rematar creamos uno nuevo `VENTAS_ROLE`:

![ ID JSON1](/img/16_ID-JSON3.png)


###  Definir un modelo Mongoose para los roles con un campo "rol" de tipo String y requerido.

* Paso 1.

Un archivo para crear un modelo nuevo:

![modelo rol](/img/16_archivo-para-modele-rol.png)

* Paso 2.

**Schema**: Se desestructura el objeto Schema de Mongoose para definir la estructura de los datos de un modelo.

**Model**: Se desestructura el objeto Model de Mongoose para interactuar con la colección de la base de datos asociada al modelo.

```javascript
const { Schema, model} = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
    
})


module.exports = model( 'Role', RoleSchema)

```

Este esquema **RoleSchema** define la estructura de los documentos que se pueden crear y consultar en la colección asociada al modelo "Role". Luego, puedes utilizar este esquema para crear instancias del modelo "Role" y realizar operaciones de base de datos como guardar, actualizar o consultar roles en la base de datos MongoDB utilizando Mongoose.

###  Implementar una función de validación personalizada en una ruta de Express que verifica si el rol proporcionado por el usuario existe en la base de datos.

Se implementa una validación personalizada en una ruta de Express para verificar si un rol proporcionado por el usuario existe en la base de datos. Esto se hace mediante una consulta a la base de datos MongoDB para buscar un rol con el mismo nombre.

```javascript
//No olvidamos inportar 
const Role = require('../models/role');

router.post('/',[
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('nombre', 'El nombre es obligaorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    
    
   check('rol').custom( async (rol = '') => {
    // Se recibe el valor del campo 'rol' desde la solicitud
    // Que coincida con el valor del campo 'rol'
    const existeRol = await Role.findOne({rol});
    if( !existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la Base de Datos`)
    }

   } ),


    validarCampos
],userPost);

```

Explicación:

1.  Utilizas `check('rol')  `para especificar que estás validando el campo **rol** en la solicitud.

2. Luego, utilizas `.custom(async (rol = '') => {...})`  para crear una función personalizada de validación. Esta función toma el valor del campo *rol* como parámetro (que se establece como una cadena vacía por defecto si no se proporciona en la solicitud).

3. Dentro de la función personalizada, `utilizas await Role.findOne({ rol })` para buscar un documento en la colección **Role** de la base de datos que tenga el mismo valor que el campo *rol* de la solicitud.

4. Si no se encuentra un documento en la base de datos que coincida con el valor de *rol*, lanzas un error personalizado utilizando `throw new Error(...)`. Este error se capturará y se devolverá como parte de la respuesta si la validación falla.


###   Utilizar esta validación para garantizar que los roles sean válidos antes de procesar las solicitudes.

Si el rol existe en la base de datos, se permite continuar con la operación; de lo contrario, se lanza un error personalizado indicando que el rol no está registrado en la base de datos.

Resultado:

*MAL*
![resultado negativo](/img/16_resulltado-naegativo.png)

*BIEN*
![resultado positivo](/img/16_resultado-positivo.png)

 También podemos ver en nuesta Base de Datos el resultado exitoso que paso todas las validaciones incluido el 'rol'

 ![resultado BD](/img/16_resultado-positivo_BD.png)

