import fastify from "fastify";
import cors from "@fastify/cors";

// Todo lo relacionado con la base de datos lo mantenemos en otro(s) fichero(s)
// Y lo mismo para nuestras rutas
// así tenemos el código más ordenado y más fácil de mantener/actualizar
import connectDB from "./database/connection.js";
import taskRoutes from "./routes/tasks.js";

// Metemos la secuencia de arranque de nuestra app en un bloque try/catch y así,
// en caso de fallo en algún punto, terminamos el proceso de forma controlada
try {
    // Primero intentamos conectar a la mongo con la función de database.js
    await connectDB();

    // Se crea el servidor donde haremos las rutas públicas (al cliente)
    const server = fastify({ logger: true });

    // Esto nos permite aceptar peticiones desde cualquier origen (no es lo más seguro del mundo pero ya lo puse así porqué si no me pegaba un tiro :-/)
    server.register(cors, {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["X-Powered-By"],
        credentials: true,
    });

    // Y aquí cargamos las rutas que hemos creado en routes para las tareas
    server.register(taskRoutes, { prefix: "/api/tasks" });

    // En esta parte utilizamos el AWAIT para que espere mientras escucha por el puerto 3000 y la IP 0.0.0.0 que nos indica que es cualquier IP intentando acceder. Si todo está bien imprimirá un mensaje de 'Servidor escuchando en ...'; si algo falla el CATCH se activará e imprimirá el mensaje "Error, no se ha podido iniciar la aplicación" y finalizará el proceso.  [TODO: COMENTAR!!!] (0,5 puntos)
    await server.listen({ port: 3000, host: "0.0.0.0" });
    server.log.info(`Servidor escuchando en ${server.server.address().port}`);
} catch (err) {
    console.error("Error, no se ha podido iniciar la applicación", err);
    process.exit(1);
}
