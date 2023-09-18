Ahora es el momento de asegurarnos de que todos los campos esenciales en nuestro modelo de datos de MongoDB estén debidamente validados. Esto incluye
* nombre
* el correo electrónico
* la contraseña 
* el rol 

todos estos campos son obligatorios para continuar. **Garantizar que estos datos estén presentes y sean correctos es fundamental para el correcto funcionamiento de nuestra aplicación.** 

***
Para lograr con éxito la tarea de validar campos en una solicitud HTTP utilizando express-validator, ten en cuenta lo siguiente:

1. **Importar express-validator**: Asegúrate de importar la biblioteca express-validator al principio de tu archivo de enrutamiento o middleware.

2. **Definir reglas de validación**: Utiliza el método `check()` para definir reglas de validación para los campos que deseas verificar. Proporciona el nombre del campo y un mensaje de error personalizado en caso de que la validación falle.

3. **Utilizar métodos de validación**: Encadena métodos de validación específicos después de check para definir las condiciones que deben cumplir los campos. Por ejemplo, puedes usar `.not().isEmpty() ` para verificar que un campo no esté vacío.

4. **Personalizar mensajes de error**: Asegúrate de personalizar los mensajes de error para cada regla de validación. Estos mensajes se mostrarán cuando la validación falle, proporcionando información útil sobre por qué la solicitud no es válida.

5. **Manejar los errores de validación**: En tu controlador o middleware, después de aplicar las reglas de validación, asegúrate de manejar los errores de validación utilizando `validationResult`. Esto te permitirá acceder a los mensajes de error en caso de que la validación falle y tomar las acciones apropiadas en consecuencia.

Al seguir estos pasos, podrás implementar con éxito la validación de campos en tus solicitudes HTTP utilizando express-validator. Esto es esencial para garantizar que los datos ingresados cumplan con los requisitos necesarios antes de ser procesados en tu aplicación.

***

* Paso 1:

En este momento, estamos enfocándonos en el campo **nombre** y asegurándonos de que sea obligatorio y no esté vacío. Esto significa que si alguien intenta enviar datos sin proporcionar un nombre, o si envían un nombre en blanco, generará un mensaje de error.

Siguiendo la misma lógica que aplicamos en la clase anterior, continuaremos creando middlewares adicionales para validar otros campos, como el correo electrónico. Esto es esencial para garantizar que los datos que ingresen en nuestra aplicación cumplan con los requisitos necesarios antes de ser procesados.

 Validar campo "nombre":

```javascript

router.post('/',[
    // Validar campo "nombre"
    check('nombre', 'El nombre es obligaorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail()
],userPost);

```
Resultado:

![validacion nombre](/img/15_validacion-nombre.png)

Validar campo "password":

Estamos validando el campo 'password' y asegurándonos de que tenga al menos 6 caracteres de longitud.
*.isLength() que verifica que la longitud del campo 'password'*

```javascript

router.post('/',[
    // Validar campo "password"
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
    check('nombre', 'El nombre es obligaorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail()
],userPost);

```
Validar campo "rol":

Coincida con uno de los valores permitidos ('ADMIN_ROLE' o 'USER_ROLE'). 
*.isIn() que especifica los valores permitidos para el campo 'rol'.*

```javascript

router.post('/',[
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
    check('nombre', 'El nombre es obligaorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail()
    //Validar campor "rol"
     check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE'])

],userPost);

```
# Optimizando Validaciones en Controladores: Uso de Middlewares Personalizados

Cuando trabajamos en diferentes rutas dentro de nuestro controlador de usuarios, nos enfrentamos a un problema molesto: repetir las mismas validaciones una y otra vez. Esto significa que tenemos que copiar y pegar el mismo código en cada controlador, lo cual no es eficiente. Para solucionar esto, vamos a crear un middleware personalizado. Aunque suene complicado, en realidad es una solución simple. La idea es centralizar nuestras validaciones en un solo lugar para que puedan ser reutilizadas en todas las rutas necesarias. Esto mejora la organización de nuestro código y evita la duplicación, lo que es esencial para un desarrollo eficiente de aplicaciones.

* Paso 1.

Creamos una carpeta para lo middlewares y un archivo `validar-campos.js`:

![validar-campos.js](/img/15_validar-campos.png)

* Paso 2. 

Del controlador post qutemos todo relocionado con validationResult() y creamos un middleware que no deja de ser una funcion en el archivo nuevo;

```javascript
// Importacionimpor  de validationResult de la biblioteca express-validator
const { validationResult } = require('express-validator');

const validarCampos = () => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json( errors );
    }

    

}

module.exports = {
    validarCampos,
}
```
* Paso 3.

En Express, los middlewares son funciones que se ejecutan en el flujo de una solicitud HTTP. Estas funciones pueden acceder tanto a la solicitud (request) como a la respuesta (response). Cuando ocurre un error en un middleware, puedes usar return para interrumpir el flujo y proporcionar una respuesta de error adecuada.

Cuando todo está en orden, puedes utilizar la función next() para indicar que Express debe continuar con el siguiente middleware o con el controlador de ruta final. Esto es útil cuando deseas aplicar múltiples middlewares en secuencia antes de llegar al controlador principal.

En resumen, los middlewares son una parte esencial de Express que te permite agregar lógica intermedia a las solicitudes HTTP. Puedes detener el flujo en caso de errores con return y permitir que continúe con next(), lo que proporciona un control preciso sobre el comportamiento de tu aplicación.

```javascript

const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json( errors );
    }

    next();

}

module.exports = {
    validarCampos,
}
```

* Paso 5

Despues de importar el middleware `const { validarCampos } = require('../middlewares/validar-campos');` se coloca al final de otros:

```javascript

router.post('/',[
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('nombre', 'El nombre es obligaorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']), 
    
    validarCampos//Si no hay errores, permite que la solicitud continúe su flujo normal.
],userPost);

```

Para visualizar el resultado final al realizar una solicitud POST con campos incorrectos, obtendrás el siguiente resultado:

![resultado errores](/img/15_errors-final.png)





