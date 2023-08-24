const mongoose = require('mongoose');

const dbConection = async() =>{

    try {
        // Aqui hace falta URL que esta en la variable de entorno MONGODB_CNN2
        await mongoose.connect(process.env.MONGODB_CNN2)
        //En la versión actual de Mongoose (6.3.5), ya no se necesita poner los parámetros a la conexión ( useUrlParser,  useUnifiedTopology, useCreateIndex, useFindAndModify )
        console.log('Base de Datos Online')

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');

    }
}



module.exports = {
    dbConection
}