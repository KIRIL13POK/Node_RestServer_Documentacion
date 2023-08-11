 # El cuerpo (body) de una solicitud
  **El cuerpo (body) de una solicitud HTTP** es una parte esencial que permite transferir datos entre el cliente y el servidor. Es comúnmente utilizado en los métodos POST, PUT y DELETE para enviar información adicional. Puede contener datos estructurados en formatos como JSON o XML. Su manipulación adecuada es crucial para una comunicación efectiva en aplicaciones y servicios web.


# Obtener datos de un POST

En esta clase, lo primero es aprender a utilizar POSTMAN para visualizar el body de las solicitudes. El body se envía principalmente con los métodos POST, PUT y DELETE.

 En la mayoría de los casos, el cuerpo (body) de una solicitud se envía con los métodos HTTP **POST, PUT y DELETE**. 

 + POST - PUT: 

 Estos métodos permiten enviar datos adicionales junto con la solicitud, lo que es especialmente útil para enviar información que debe ser procesada por el servidor.

 + DELETE:

  Para enviar datos adicionales para la eliminación de recursos.

  Es importante conocer cómo utilizar herramientas como POSTman para visualizar y enviar datos en el cuerpo de las solicitudes para poder interactuar eficazmente con las API y servicios web.ç

  * Seleccionamos Raw en Body y JSON:

![body_POST2](/img/body_POST_2.png)

* Creamos un JSON valido:

![body_POST_JSON](/img/body_POST_JSON.png)

A continuación si tocamos `SEND` no va pasar nada y para solucionar es nesesario añdir un middlewar:

`this.app.use( express.json());`

Permite analizar y procesar datos JSON en el cuerpo de las solicitudes entrantes, permitiendo su acceso y manipulación en las rutas de la aplicación.

```javascript
middlewares() {

        //CORS
        this.app.use( cors());

        //Leer y parsear el body
        this.app.use( express.json());

        //Directorio publico
        this.app.use(express.static('public'))

    }
```

Para  tomar esta información y reflejarla en la respuesta en el controlador de usuario POST `const body = req.body` y ahora lo que sea que venga en el body lo voy a reflejar en la respuesta. Pero para manejar la informacion del JSON es conveniente hacer una destructuración. Esto permite acceder fácilmente a los datos y utilizarlos en la respuesta del controlador:

`const { nombre, edad} = req.body`



```javascript
const userPost = (req, res = response) => {

   //Destructuración 
   const { nombre, edad } = req.body;

    res.json({

        msg: 'Esto es la peticion POST - controlador',
        
        nombre,
        edad
    });
}
```

Resultado:

![body_POST_resultado](/img/body_POST_resultado.png)


### La clase se centró en el manejo de solicitudes POST mediante express.json(). Al utilizar esta función, se logró analizar automáticamente el cuerpo de la solicitud, lo que permitió un procesamiento más eficiente de los datos y una respuesta efectiva desde el controlador.

