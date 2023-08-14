# MongoDB Compass - Prueba de conexión.

Los requsitos de esta clase es lo que se logro hacer en la clase anterior:

[Configuración de mongoDb MongoAtlas](/pasoPorPaso/08_%20Configuración_MongoDB%20_MongoAtlas.md)   tener un **Usuario y un Cluster**


# La Conexion:

 * Paso 1:

 ![conectPaso1](/img/conectPaso1.png)
 

 * Paso 2:
 
 Hay varias formas de conectarse, pero es **MongoDB Compass**:

 ![conectPaso2](/img/conectPaso2.png)

 * Paso 3:

 A continuacion pregunta si ya tienes o no instalado  **MongoDB Compass**:

 ![conectPaso3](/img/conectPaso3.png)
 
 * Paso 4:

 Copiar cadena de conexión:

 ![conectPaso4](/img/conectPaso4.png)

 Esta  es la cadena de conexión nesesaria para conectrme a mi base de datos.

 * Paso 5:

 En el archivo de variables de entorno `.env`:

 ```javascript
 //El nombre de la variable es simplimente nombre para conexión (CNN)
 MONGODB_CNN2=
 ```
 ![conectPaso5](/img/conectPaso5.png)

 Colacamos los datos en sus sitios repectivos y el `/test` al final de la cadena cambiamos por `/cafeDB`

 Resultado:
 ```javascript
 MONGODB_CNN2=mongodb+srv://user_node_cafe:csKtVgKNtDFkdinD@nodecafe.tz9q5ua.mongodb.net/cafeDB
 ```
* Paso 6:

Copiamos cadena nueva con todos los datos y habrimos **MongoDB Compass**:

![conectPaso6](/img/conectPaso6.png)

* Paso 7:

Resultado:

![conectPaso7](/img/conectPaso7.png)










