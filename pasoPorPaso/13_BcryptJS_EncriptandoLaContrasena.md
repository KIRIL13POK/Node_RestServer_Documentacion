**Uno de los problemas críticos identificados en esta grabación es la ausencia de encriptación de las contraseñas.**

El problema mencionado se relaciona con el almacenamiento de contraseñas en texto plano en la base de datos, lo cual representa un riesgo de seguridad significativo. La falta de encriptación de contraseñas deja expuesta la información sensible de los usuarios, ya que si alguien obtiene acceso no autorizado a la base de datos, podría leer las contraseñas en su forma original y comprometer las cuentas de los usuarios.

***
**Para abordar este problema, se sugiere utilizar una técnica de encriptación unidireccional, preferiblemente con un algoritmo de hash seguro como bcrypt. Bcrypt es una función de hash diseñada para almacenar contraseñas de manera segura, y su característica distintiva es que es computacionalmente costosa, lo que dificulta los ataques de fuerza bruta. Al aplicar bcrypt a las contraseñas antes de almacenarlas en la base de datos, incluso si un atacante logra acceder a la base de datos, no podrá obtener las contraseñas originales debido a la naturaleza irreversible del hash. Este enfoque aumenta significativamente la seguridad y protege la información confidencial de los usuarios.**
***

## bcrypt

![bcrypt](/img/bcrypt.png)
[bcrypt - npm](https://www.npmjs.com/package/bcrypt)


+ Antes de realizar todo nesesario para encriptación realizamos unos cambios:

```javascript

const userPost = async (req, res = response) => {

    //Se han desestructurado las propiedades del objeto
    const { nombre, correo, password,rol} = req.body
    //Ahora se crean explícitamente las propiedades necesarias en un nuevo objeto.
    const usuario = new Usuario({ nombre, correo, password, rol } )

     await usuario.save()

    res.json({
        usuario

    });
}

```
 
  En general, estos cambios hacen que el código sea más limpio, fácil de entender y más seguro al controlar directamente las propiedades que se utilizan en la creación del objeto Usuario.


**El comando `npm i bcrypt` instala el paquete bcrypt desde el registro de paquetes de Node.js (npm) en el proyecto**

![dependecias_bccrypt](/img/dependencia_bcrypt.png)

 + PASO 1 

    Importación el módulo bcrypt en Node.js y lo asigna a la constante bcryptjs `const bcryptjs = require('bcrypt');`

    ```JavaScript

    const { response, request } = require('express');
    const bcryptjs = require('bcrypt');

    const Usuario = require('../models/usuario.js');
    ```

+ PASO 2
 
    `const salt = bcryptjs.genSaltSync();`
    
     En esta línea, se genera un "salt" (sal) aleatorio utilizando la función `genSaltSync()` de la librería **bcrypt**. El "salt" es un valor aleatorio que se combina con la contraseña antes de ser encriptada. Esto añade una capa adicional de seguridad al proceso de hashing y hace que los hashes generados sean únicos incluso para las mismas contraseñas. El método `genSaltSync()` genera automáticamente un "salt" adecuado para la aplicación.

    `usuario.password = bcryptjs.hashSync(password, salt);`

     Aquí, se utiliza la función `hashSync()` de bcrypt para encriptar la contraseña original del usuario (password) utilizando el "salt" generado previamente. El resultado es un hash seguro y único que representa la contraseña en forma encriptada. Este hash es el que se almacena en la base de datos en lugar de la contraseña en texto plano. El hash resultante se asigna a la propiedad password del objeto usuario.

  
```JavaScript

 const userPost = async (req, res = response) => {

    const { nombre, correo, password,rol} = req.body
    const usuario = new Usuario({ nombre, correo, password, rol } )

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);


     await usuario.save()

    res.json({
        usuario

    });
}
   
 ```
***
En conjunto, estas dos líneas de código representan el proceso de encriptación de contraseñas utilizando un "salt" aleatorio y el algoritmo de hashing seguro proporcionado por bcrypt. Esto mejora significativamente la seguridad al almacenar contraseñas en una base de datos, ya que los hashes resultantes son únicos y difíciles de revertir para obtener la contraseña original.

***

Despues de inviar la peticion con el POSTMAN el resultado final en la base de datos:

![resulato_bcryptjs_password](/img/resultadoPaswword_bcsrypt.png)

   



   