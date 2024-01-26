# Docker Help

Si queremos construir una imagen de docker necesitaremos crear un fichero con el nombre **dockerfile**

```sh
# Así construimos una imagen anónima, dónde el . es la ruta hasta el fichero dockerfile 
docker build .

# Y así una imagen con nombre
docker build -t ElNombre .
```

Si queremos lanzar un contenedor partiendo de una imagen:

```sh
docker run ElNombre

# Si es una imagen anónima necesitaremos el identificador y sería:
docker run id
```