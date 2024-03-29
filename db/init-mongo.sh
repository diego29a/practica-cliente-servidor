#!/bin/bash
# Este script sirve para crear un usuario que tenga permisos de lectura/escritura sobre la db que se creará en la primera ejecución.

# Primero nos autenticamos en la shell de mongo con el usuario root (usuario que debería usarse solo para administrar la db).
# Luego con el comando "use" cambiaremos a la base de datos especificada en la variable de entorno, dónde se realizarán las operaciones siguientes. [TODO: comentar]
# Por último con la función "db.createUser" crearemos el usuario con los valores de las VEs y el rol que queremos.
mongosh admin -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase admin <<EOF
use $MONGO_DB_NAME
db.createUser({
  user: '$MONGO_API_USER',
  pwd: '$MONGO_API_PWD',
  roles: [
    {
      role: 'readWrite',
      db: '$MONGO_DB_NAME'
    }
  ]
})
EOF