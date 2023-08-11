 # Configuración de MongoDB - MongoAtlas.

 **MongoDB Atlas** 
 
 Es un servicio en la nube ofrecido por MongoDB, la popular base de datos NoSQL orientada a documentos. Atlas permite a los desarrolladores hospedar, administrar y escalar sus bases de datos MongoDB sin la necesidad de configurar y mantener servidores físicos o virtuales.

 ![MongoAtlas](/img/mongoDBatlas.png)

[MongoDB Atlas Database](https://www.mongodb.com/atlas/database)


**Pasos para Configurar MongoDB Atlas y Crear un Usuario de Clúster:**

1. **Creación del Clúster:**

    Una vez registrada en MongoDB Atlas, el primer paso es crear un nuevo clúster. Esto se logra siguiendo las instrucciones proporcionadas en la interfaz de usuario. 

    ![cluster](/img/createCluster.png)


2. **Creación del Usuario del Clúster:**

    Dirígete a la sección "Data Access" y procede a crear un nuevo usuario que será utilizado para conectar tu aplicación Node.js al clúster. 

    ![ususarioCluster](/img/cluster_ususario.png)

3. **Asignación de Roles:**

    Al crear el usuario, asigna el rol de "escritura y lectura a cualquier base de datos". Esto garantiza los permisos necesarios para interactuar con la base de datos.

    ![cluster](/img/roleUser.png) 

Con estos pasos, habrás configurado exitosamente MongoDB Atlas y creado un usuario de clúster con los roles apropiados. Ahora tu aplicación Node.js podrá conectarse y gestionar datos en tu clúster alojado en la nube.


 Resultado:
 
 ![cluster](/img/resultado_user_cluster.png) 










* El siguiente paso consiste en almacenar tus datos de usuario como variables de entorno en el archivo .env de la siguiente manera:

```javascript
PORT=8080

USER=user_node_cafe
PASS1=krvwnJ7KUc0z2fQM
```






