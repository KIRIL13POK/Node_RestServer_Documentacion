# CORS - Middleware
### CORS significa "Cross-Origin Resource Sharing" (compartir recursos entre orígenes cruzados).

El paquete **CORS** es una solución que permite a los desarrolladores de servidores web controlar las políticas de seguridad del navegador para habilitar o restringir las solicitudes de origen cruzado. Al configurar adecuadamente el paquete **CORS**, los servidores pueden permitir que ciertos dominios o aplicaciones accedan a sus recursos, lo que es especialmente útil cuando se desarrollan APIs o servicios web que necesitan interactuar con diferentes dominios o clientes web.

```javascript
npm i cors
```
Resultado:

![cors](/img/cors.png)

### Configuración de  CORS:

+ Para importar paquete CORS (server.js):
```JavaScript
const cors = require('cors')
```

Se puede incorporar ese middleware en el flujo de los middlewares antes o despues de *Directorio Público*.

```JavaScript
 middlewares() {

        //CORS
        this.app.use( cors());

        //Directorio publico
        this.app.use(express.static('public'))

    }
```








Documentación de CORS: [Documentation](https://www.npmjs.com/package/cors).

