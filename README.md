# Seguimiento multimedia

SPA de seguimiento multimedia, series, anime y mangas; que registre estados (por ver, visto, dejado, viendo) y capitulo.

![image](./SeguimientoMultimedia.png)

## Links

- Api para obtener información de animes: [https://jikan.moe/](https://jikan.moe/)
- Api para obtener información de películas, series y TV shows: [imdbapi.dev](https://imdbapi.dev)

## Despliegue

Para el despliegue se utiliza un contendor ([containerFile](./src/containerFile)).

Generar la imagen

```sh
podman build -t seguimiento-multimedia:vx.x.x -f src/containerfile .
```

Exportar imagen a `.tar`

```sh
podman save -o seguimiento-multimedia-vx.x.x.tar seguimiento-multimedia:vx.x.x
```

Cargar imagen desde archivo `.tar`

```sh
podman load -i seguimiento-multimedia-vx.x.x.tar
```
