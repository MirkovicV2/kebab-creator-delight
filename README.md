# Deja Vu

Web hecha con Vite + React.

## Datos y base de datos

La carta utiliza [LokiJS](https://github.com/techfort/LokiJS), una base NoSQL
documental embebida que se ejecuta en memoria dentro del navegador. No requiere
instalar ni mantener un servidor de base de datos y funciona en hosting estático.

- `src/features/menu/data/catalog.json`: categorías, productos y opciones compartidas.
- `src/features/menu/data/restaurant.json`: contacto, horarios y enlaces del local.
- `src/features/menu/data/allergens.json`: definiciones de alérgenos.
- `src/features/menu/data/database.ts`: carga los documentos y consulta productos
  por ID, categoría o destacados, conservando el orden de la carta.
- `src/features/menu/data/images.ts`: rutas de las fotografías WebP.

Para actualizar la carta, edita los documentos JSON y vuelve a generar/publicar
la web. Los precios son números en euros; las opciones indican suplementos
respecto al precio base. `modifierGroups` reutiliza los grupos definidos en
`modifiers`, y `imageKey: null` conserva los productos sin foto. Una descripción
larga omitida usa la descripción normal; las etiquetas, alérgenos y opciones
omitidos se interpretan como listas vacías.

Los JSON versionados son el almacenamiento permanente de la carta. En cada
visita se crea la base en memoria con los datos publicados, sin cachés locales
de precios que puedan quedarse desactualizados. Las fotografías se encuentran
en `public/images/`, optimizadas en WebP hasta 1600 píxeles.

## Desarrollo y comprobaciones

```bash
npm ci --omit=peer
npm run dev
```

Los paquetes peer necesarios ya están declarados en `package.json`. La opción
`--omit=peer` evita instalar herramientas opcionales que no usa el proyecto.
Para limpiar una instalación anterior: `npm prune --omit=peer`.

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

Las pruebas unitarias verifican la carta, precios, alérgenos y referencias. Las
pruebas de navegador comprueban inicio, contacto, las nueve categorías, fotos,
enlaces de productos y redirecciones en escritorio y móvil. Para preparar
Chromium la primera vez: `npx playwright install chromium`.

Las pruebas de navegador compilan y guardan sus diagnósticos en la carpeta
temporal del sistema, fuera del proyecto. `dist/` se genera con `npm run build`
cuando necesitas preparar los archivos para publicarlos.

## GitHub Pages

- Cuenta: `MirkovicV2`
- Repositorio: `https://github.com/MirkovicV2/kebab-creator-delight`
- Dominio principal: `https://bar-dejavu-kebab.es/`

Los cambios en `main` se publican con GitHub Actions. En Settings > Pages,
la fuente debe ser **GitHub Actions** y el dominio personalizado debe ser
`bar-dejavu-kebab.es`.

Desde IntelliJ: trabaja en `main`, crea el commit y haz Push a `origin/main`
en la cuenta `MirkovicV2`. GitHub Actions publica la web automáticamente.

Comprobaciones locales: `npm ci`, `npm run build` y `npm test`.

El dominio se administra en IONOS. El registro CNAME de `www` debe apuntar
a `mirkovicv2.github.io`. Los cuatro registros A del dominio principal
deben apuntar a las direcciones de GitHub Pages.

## Despliegue en IONOS

El proyecto ya queda preparado para hosting estático con rutas SPA:

- `public/.htaccess`: fallback para IONOS Linux/Apache.
- `public/web.config`: fallback para IONOS Windows/IIS.
- `public/404.html`: compatibilidad adicional con GitHub Pages.

Al hacer `npm run build`, esos archivos se copian automáticamente a `dist/`.

### Dominio principal

```bash
npm ci
npm run build
```

Sube el contenido de `dist/` al directorio asociado al dominio en IONOS.

### Subcarpeta

Si la web no va en la raiz del dominio y se sirve, por ejemplo, desde `/dejavu/`, genera el build asi:

```bash
npm run build -- --base=/dejavu/
```

Luego sube el contenido de `dist/` a esa carpeta y accede usando esa misma ruta.

### IONOS Deploy Now

Si prefieres conectarlo a GitHub:

- Build command: `npm ci && npm run build`
- Output directory: `dist`

### Notas

- En IONOS Linux, las rutas tipo `/carta` o `/contacto` quedan resueltas por `.htaccess`.
- En IONOS Windows, `web.config` solo se aplica si la carpeta esta marcada como aplicacion en el panel de IONOS.
- Si el dominio apunta directamente a la carpeta del proyecto publicado, no hace falta tocar nada mas.
