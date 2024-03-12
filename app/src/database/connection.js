import mongoose from "mongoose";

// [TODO: COMENTAR!!! (0,5 puntos) por qué formamos esta ruta así??] Creamos una constante llamada DB_URI con la cadena de conexión a la base de datos MongoDB, en la que se escribe: "(mongodb://) es el protocolo utilizado para la conexión a MongoDB; (database) es el nombre de la base de datos; (27017) es el puerto por el que accedemos; (${process.env.MONGO_DB_NAME}) es una expresión que utiliza el nombre de la base de datos obtenido de la variable de entorno 'MONGO_DB_NAME'". 
const DB_URI = `mongodb://database:27017/${process.env.MONGO_DB_NAME}`;

//Conexión con la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI, {
            user: process.env.MONGO_API_USER,
            pass: process.env.MONGO_API_PWD,
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
        process.exit(1);
    }
};

export default connectDB;
