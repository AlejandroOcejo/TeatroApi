# TeatroApi Docker Image

Este repositorio contiene la imagen Docker para la aplicación TeatroApi. A continuación, se proporcionan instrucciones para ejecutar la imagen en un entorno local.

## Ejecución

1. **Descargar la imagen desde Docker Hub:**

    ```bash
    docker pull pablofrancopinilla/teatroapi:final
    ```

    Este comando descarga la imagen `pablofrancopinilla/teatroapi` desde Docker Hub a tu máquina local.

2. **Ejecutar la imagen como un contenedor:**

    ```bash
    docker run -p 3000:3000 pablofrancopinilla/teatroapi:final
    ```

    Este comando ejecuta la imagen como un contenedor Docker. El flag `-p` mapea el puerto del contenedor al puerto del host, permitiendo el acceso a la aplicación TeatroApi en el puerto local 3000.
