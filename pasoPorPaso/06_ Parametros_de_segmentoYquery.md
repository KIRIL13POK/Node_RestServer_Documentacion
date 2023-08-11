# Parámetros de segmento y query.

### Los parámetros de segmento (segment parameters) y los parámetros de consulta (query parameters) son dos formas de pasar datos en una URL para comunicarse con un servidor web.

**1. Parámetros de segmento:**

 Son parte de la URL y se encuentran dentro de la ruta. Se definen usando una sintaxis especial, generalmente colocando un símbolo ":" seguido del nombre del parámetro en la ruta. Por ejemplo, en la URL "/usuarios/:id", ":id" es un parámetro de segmento que puede tomar diferentes valores en cada solicitud.

 Ejemplo de parámetro de segmento:
 ```javascript
 Ruta: /usuarios/:id
URL: /usuarios/123
 ```
 En este ejemplo, **":id"** es el parámetro de segmento y puede tomar diferentes valores, como **"123"**, para identificar un usuario específico en la ruta.

**2. Parámetros de consulta:**

 Se especifican después del símbolo "?" en una URL. Estos parámetros se componen de una clave y un valor, separados por el símbolo "=". Varios parámetros de consulta se separan con el símbolo "&". Por ejemplo, en la URL "/buscar?categoria=tecnologia&orden=ascendente", "categoria" y "orden" son parámetros de consulta que envían información al servidor.

Ejemplo de parámetros de consulta:

```javascript
Ruta: /buscar
URL: /buscar?categoria=tecnologia&orden=ascendente
```
En este caso, **"categoria"** y **"orden"** son parámetros de consulta que envían información al servidor. La URL especifica que se quiere buscar en la categoría "tecnologia" con el resultado ordenado en forma ascendente.

Estos ejemplos son solo ilustrativos y los nombres de los parámetros y valo

***
### Ambos tipos de parámetros son comunes en las API web y se utilizan para enviar datos a servidores, permitiendo que las solicitudes HTTP sean más flexibles y dinámicas. Los parámetros de segmento son útiles para identificar recursos específicos en la ruta, mientras que los parámetros de consulta son ideales para ajustar y filtrar las respuestas del servidor.
***



# Parámetros de segmento.

Primer paso debemos hacer en la ruta:

```javascript
router.put('/10', userPut);
```
Sin embargo, de esta manera solo funcionará la petición con `/10`, para hacerla dinámica la solución es utilizar `/:id`. Express captura automáticamente el valor de 'id' configurado en la ruta y lo proporciona como una propiedad en el objeto request.

```javascript
router.put('/:id', userPut);
```

```javascript
const userPut = (req, res = response) => {
    // Se está extrayendo el valor del parámetro de segmento llamado "id" de la solicitud.
    const id = req.params.id;

    res.json({

        msg: 'Esto es la peticion PUT - controlador',
        id

    });
}
```
Ahora es dinamico:

* `http://localhost:8080/api/usuarios/13`:

![id=13](/img/parametrosDeSegmentID1o.png)

* `http://localhost:8080/api/usuarios/1313`:

![id=13](/img/parametrosDeSegmentID1313.png)

***
# Obtener query params

### Los query parameters son una forma de enviar datos adicionales en una URL para solicitudes HTTP. Estos parámetros se agregan después del símbolo "?" y constan de una clave y un valor separados por el símbolo "=". Express los captura y los proporciona en el objeto request para que puedan ser utilizados en el servidor y procesados según las necesidades de la aplicación.

Ejemplo:

`http://localhost:8080/api/usuarios/?categoria=tecnologia&orden=ascendente&pagina=1

`
![query_params](/img/query_params.png)

Express, como framework para aplicaciones web en Node.js, es capaz de manejar los query parameters de diversas formas:
* Capturar query parameters.
* Parseo automático.
* Manejo de múltiples query parameters.
* Flexibilidad en las URLs.


En resumen, Express simplifica la manipulación de los query parameters, permitiendo acceder y utilizar los datos enviados en la URL de manera sencilla y eficiente en el servidor. Esto facilita la creación de APIs más flexibles y dinámicas.


```javascript
const { response, request } = require('express');

const userGet = (req = request, res = response) => {
    //Captura los query parameters proporcionados en la URL y los almacena en la variable.
    const query = req.query;


    res.json({

        msg: 'Esto es la peticion GET - controlador',
        query

    });
}
```
De este modo nombrespermitirá capturar y mostrar los query parameters enviados a través de una solicitud GET en esa ruta específica:

![query_params_resultado](/img/query_params_resultado.png)

El mismo resultado conseguimos con la desturctiuración:

```javascript
const userGet = (req = request, res = response) => {

    const { categoria, orden, pagina } = req.query;

    res.json({

        msg: 'Esto es la peticion GET - controlador',
        categoria, 
        orden, 
        pagina

    });
}
```
Resultado:

![query_params_resultado_destructuracion](/img/query_params_resultado_destructuracion.png)




