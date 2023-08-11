# Inicio de Iniciando el proyecto - RESTServer


1. ***npm init -y*** :es un comando que se utiliza en el entorno Node.js y npm (Node Package Manager) para inicializar un nuevo proyecto y generar un archivo package.json de manera rápida y automática.


    `npm init -y`

El archivo package.json es un archivo de configuración que contiene información sobre el proyecto, como el nombre, la versión, las dependencias y otros metadatos importantes.

Resultado: 

![package.json](/img/packageJson.png)

2. Creamos punto de entrada app.js

3. Para continuar vamos a instalar paquetes  :

   *  ***Express***: es un marco de desarrollo web rápido y minimalista para Node.js. Es el paquete más popular para crear aplicaciones web y APIs (interfaces de programación de aplicaciones) en Node.js debido a su simplicidad y flexibilidad.

   * ***Dotenv***:  es un paquete que facilita la carga de variables de entorno desde un archivo .env en tu proyecto Node.js. Las variables de entorno son valores que pueden configurarse externamente y se utilizan para almacenar configuraciones o datos sensibles fuera del código fuente.
   
   * ***Nodemon***:  es una herramienta muy útil para desarrolladores de Node.js, especialmente durante el proceso de desarrollo. Es un paquete que ayuda a mejorar la eficiencia del flujo de trabajo al reiniciar automáticamente la aplicación Node.js cuando detecta cambios en los archivos del proyecto.


   
### Instalar múltiples paquetes a la vez:

`npm install express dotenv nodemon`

Después de ejecutar el comando, los paquetes express, dotenv y nodemon se instalarán en tu proyecto, y toda la información relacionada con esas dependencias se actualizará en los archivos package.json y package-lock.json, lo que garantiza la consistencia y reproducibilidad del proyecto. A partir de este punto, estás listo para comenzar a desarrollar utilizando esos paquetes en tu aplicación Node.js.

Resultado:

![dependencias](/img/packageJsonDependencias.png)

# Creamos nuestra web server

```javascript

const express = require('express')
const app = express()

app.get('/',  (req, res) => {
    
    res.send('Hello World')
})

app.listen(3000)

```

1. Carga el paquete express y crea una instancia de la aplicación Express.

2. Define una ruta para la solicitud GET en la ruta raíz ('/') que responde con "Hello World".

3. Inicia el servidor en el puerto 3000 para escuchar las solicitudes entrantes.

4. Cuando un cliente accede a la página principal (http://localhost:3000) en el navegador, el servidor responde con "Hello World".

5. Es una aplicación web simple, ideal para probar si Express está instalado correctamente y para comenzar a construir rutas y lógica en el servidor.


# Configuramos dotenv

1. En la raiz del proyecto creamos nuevo archivo ***.env***  

![PORT](/img/PORT.png)
 
 2. A continuación  hacemos el require de dotenv en app.js

 ```javascript

 require('dotenv').config();

 ```
  La línea de código ***require('dotenv').config()*** se utiliza para cargar las variables de entorno definidas en un archivo .env en tu proyecto Node.js. La biblioteca dotenv es muy útil para gestionar configuraciones y datos sensibles de una manera más segura y organizada.

3. Entonces ahora vamos a sustituir 

 ```javascript
// Aqui ya no necesito el puerto 3000
 app.listen(3000);

 //Ahora me iteresa mi variable de intorno PORT
 app.listen( process.env.PORT);

 ```

 4. Codigo final de esta clase
  
  Resultado:

  ```javascript

require('dotenv').config();

const express = require('express')
const app = express()

app.get('/',  (req, res) => {
    
    res.send('Hello World')
})

app.listen( process.env.PORT, () => {
    console.log(`El servidor esta escuchando en el puerto ${process.env.PORT}`)
});

```




