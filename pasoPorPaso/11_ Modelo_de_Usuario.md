# Modelo de Usuario

En esta sección, exploraremos cómo crear un modelo de base de datos para representar usuarios en nuestra aplicación utilizando MongoDB y Mongoose en JavaScript. El modelo de usuario nos permitirá almacenar y gestionar la información relevante de cada usuario en la base de datos.

#### Creación del Archivo del Modelo

Comienza creando un nuevo archivo en tu proyecto llamado usuario.js. Este archivo contendrá la definición del modelo de usuario.

![modeloUsuario.js](/img/moseloUsuario.png)

#### Definición del Modelo

En el archivo usuario.js, estableceremos los campos que conformarán el modelo de usuario. Cada campo representará un atributo relevante de un usuario en nuestra aplicación.

**Campos del Modelo:**

* nombre: Nombre del usuario.
* correo: Correo electrónico del usuario (único en la base de datos).
* password: Contraseña del usuario.
* imagen: Ruta de la imagen del usuario.
* rol: Rol del usuario (debe ser "admin" o "user").
* estado: Estado del usuario  (activo o inactivo).
* creadoPorGoogle: Indica si el usuario fue creado por Google (true o false).


Importación y una nueva constante `UsuarioSchema`- que  es un objeto literal.

```javascript
const {  Schema, model} = require('mongoose');

const UsuarioSchema = Schema ({

     nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    img : {
        type: String
    },

    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },

    creadoPorGoogle: {
        type: Boolean,
        default: false
    },

})
```

Este modelo define cómo se estructura la información de un usuario en la base de datos y establece las validaciones necesarias para asegurar la integridad de los datos. Cada atributo tiene sus propias restricciones, como requerimientos de campo, unicidad, valores permitidos y valores por defecto. Utilizando este modelo, puedes crear, consultar y gestionar los registros de usuario en tu aplicación.

# Exportación del Modelo y Asignación de la Colección

En la parte de exportación del modelo y asignación de la colección:

1. Después de definir el esquema del usuario, es necesario exportar el modelo utilizando la función `model()` de Mongoose. Esta función toma dos argumentos: el nombre del modelo y el esquema definido.

```JavaScript
module.exports = model( 'Usuario', UsuarioSchema);
```
*Mongoose suele añadir automáticamente una "s" al final del nombre del modelo para formar el nombre de la colección. Por ejemplo, "Usuario" se convertirá en "usuarios".* 





