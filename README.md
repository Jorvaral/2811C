Khabib Nurmagomedov - Sitio estático (educativo)

Contenido:
- `index.html` - Página principal
- `about.html`, `fights.html`, `media.html`, `training.html`, `timeline.html` - Páginas secundarias
- `styles.css` - Hoja de estilos compartida
- `scripts.js` - Lógica compartida (menú móvil, lightbox, botón "volver arriba")
- `images/` - Imágenes (locales)

Cómo probar localmente:
1. Abre `index.html` (o cualquiera de las páginas) en tu navegador: haz doble clic sobre el archivo o arrástralo al navegador.
2. Para un entorno más fiable (y evitar restricciones de CORS al abrir archivos localmente), puedes iniciar un servidor estático desde PowerShell:

```powershell
# Desde la carpeta del proyecto
python -m http.server 8000; # o
# Si tienes Node.js instalado
npx http-server -p 8000
```

Luego abre `http://localhost:8000`.

Desplegar en GitHub Pages:
- Crea un repositorio en GitHub y sube los archivos.
- Desde la página del repositorio -> Settings -> Pages, configura la rama `main` y carpeta `/` (root).
- GitHub Pages servirá automáticamente el sitio.

Tareas sugeridas para mejorar:
- Optimizar imágenes (convertir a WebP y generar `srcset`).
- Añadir favicon optimizado y meta detallados (ya se añadió `favicon.svg`).
- Añadir analytics o comentarios (si procede).

Si quieres, puedo:
- Optimizar imágenes localmente (necesitaría crear versiones WebP/avif).
- Pull request y push a un remoto (si me das acceso y confirmas remote).
- Mejorar la UI del menú (animaciones extra) o añadir filtros interactivos en `fights.html`.
