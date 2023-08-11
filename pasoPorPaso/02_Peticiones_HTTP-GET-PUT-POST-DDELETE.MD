# Peticiones HTTP - GET - PUT - POST - DELETE

Las peticiones HTTP son solicitudes que se envían desde un cliente a un servidor para interactuar con los recursos o datos en la web. 

### GET

 El método GET se utiliza para solicitar datos o recursos del servidor. Se envía una solicitud GET para obtener información del servidor sin modificar nada en el servidor. Por ejemplo, al ingresar una URL en el navegador, se realiza una solicitud GET al servidor para obtener la página web correspondiente.

### PUT
    
El método PUT se utiliza para enviar datos o recursos al servidor para que sean almacenados o actualizados. Es útil para actualizar una entidad o recurso existente en el servidor. Al realizar una solicitud PUT, se debe especificar la URL del recurso que se va a actualizar y enviar los datos que se desean modificar en el cuerpo de la solicitud.

### POST

 El método POST se utiliza para enviar datos al servidor para crear nuevos recursos. Es comúnmente utilizado para enviar formularios y datos al servidor. Al realizar una solicitud POST, se envían los datos en el cuerpo de la solicitud y el servidor procesa estos datos para crear un nuevo recurso.

### DELETE

 El método DELETE se utiliza para eliminar un recurso específico en el servidor. Al realizar una solicitud DELETE, se debe especificar la URL del recurso que se desea eliminar. Esta solicitud indica al servidor que debe eliminar el recurso correspondiente.



En general, las peticiones HTTP y los métodos GET, PUT, POST y DELETE son fundamentales para la comunicación entre clientes y servidores en la web y son esenciales para el funcionamiento de aplicaciones y sitios web.
Free Research Preview. 

# POSTMAN
![logo_POSTMAN](https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/03/postman-logo-image.jpg)

En esta clase, la herramienta clave es Postman. Postman es una poderosa plataforma que facilita el desarrollo, prueba y documentación de API (Interfaces de Programación de Aplicaciones). Con Postman, los desarrolladores pueden realizar solicitudes HTTP a sus puntos finales de API, lo que les permite interactuar con sus servicios web de manera sencilla y eficiente.

+ Copiamos la URL de nuesta ruta "Hello World":

![url](/img/URL_Hello_World.png)

Respuesta de POSTMAN:

![url](/img/respuesta_POSTMAN_1.png)

Pero nuestro objetivo es regresar una información en un formato super común y estándar hoy en día que es el JSON.

```javascript
routes() {
        this.app.get('/api', ( req, res) => {
            res.json('Hello World')
        });

    }
```
 Y la respuesta de POStman ya va ser diferente:

 ![url](/img/respuesta_POSTMAN_2.png)

 Usualmente no mandamos un stream directamente en una petición, lo que vamos a mandar es un objeto:

 ```javascript
 routes() {
        this.app.get('/api', ( req, res) => {
            res.json({

                msg: 'Esto es la peticion GET'

            })
        });

    }
 ```
 ![url](/img/respuesta_POSTMAN_peticionGet.png)


+ A continuacion nesesitamos peticiones  - PUT - POST - DELETE y PATCH a mayores.

```javascript
 routes() {

    this.app.get('/api', ( req, res) => {
            res.json({

                msg: 'Esto es la peticion GET'

            })
        });

        this.app.put('/api', ( req, res) => {
            res.json({

                msg: 'Esto es la peticion PUT'

            })
        });
   
        this.app.post('/api', ( req, res) => {
            res.json({

                msg: 'Esto es la peticion POST'

            })
        });

        this.app.delete('/api', ( req, res) => {
            res.json({

                msg: 'Esto es la peticion DELETE'

            })
        });

        this.app.patch('/api', ( req, res) => {
            res.json({

                msg: 'Esto es la peticion PATCH'

            })
        });

 }
 ```

 ### Crear una nueva solicitud: 

 ![todas_peticiones](/img/todas_peticiones.png)

 Selecciona el tipo de solicitud HTTP que deseas realizar (GET, POST, PUT, DELETE, PATCH, etc.) mediante los botones que se encuentran en la parte izquierda de la interfaz.


Resultado peticion PUT:

 ![todas_peticiones](/img/peticion_put.png)


