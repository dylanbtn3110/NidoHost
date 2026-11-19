# Nido · Frontend (Angular 22 + Angular Material)

Aplicación web de Nido (gestión de alojamientos temporales). Consume la API REST de `../Nido` (Spring Boot, `/api/v1`) con
login JWT, menú y rutas por rol, CRUD de todas las entidades, reportes con gráficos y la IA de incidencias.

## Cómo ejecutarlo

Requisitos: Node 22 y el backend de Nido encendido en `http://localhost:8080` (ver `../Nido/README.md`).

```bash
npm install          # solo la primera vez
npm start            # http://localhost:4200  (el proxy envía /api al backend: proxy.conf.json)
npm test             # 13 pruebas unitarias (Vitest)
npm run build        # genera dist/nido-frontend/browser
npm run empaquetar   # build + copia el resultado a ../Nido/src/main/resources/static
```

Usuarios de prueba (contraseña `Nido2026!`): `admin` (ADMIN), `lmendoza` (PROPIETARIO), `rhuaman` (PERSONAL).

### Cómo se despliega
`npm run empaquetar` deja el frontend dentro del backend (`static/`), así que **un solo jar** sirve la API y la aplicación en
la misma URL (`http://IP:8080/`) y no hace falta CORS ni configurar un servidor web. En AWS el procedimiento es el de siempre:
compilar el jar (`mvnw clean package -DskipTests`), subirlo a la EC2 y reiniciar el servicio (ver `../Nido/docs/DESPLIEGUE-AWS.md`).
Las rutas usan `#` (`withHashLocation`) para que recargar la página funcione sin reglas de reescritura en el servidor.

## Estructura (`src/app`)

```
core/                 lo que usa toda la aplicación
  models.ts           interfaces que coinciden con el JSON de la API
  services/           un servicio por recurso (AlojamientoService, ReservaService...) sobre HttpClient
    crud.service.ts   clase base con listar / obtener / crear / actualizar / eliminar
    auth.service.ts   login, token y sesión (signals + localStorage)
  interceptors/       authInterceptor (agrega el token) y errorInterceptor (muestra el mensaje de la API y cierra la sesión si el token venció)
  guards/             authGuard (¿inició sesión?) y rolGuard (¿tiene el rol?)
  fechas.ts           utilidades de fecha
layout/shell.*        menú lateral según el rol + barra superior
shared/               componentes reutilizables: confirmar-dialogo, estado-chip, grafico (Chart.js)
pages/                una carpeta por pantalla (cada una con su componente y sus diálogos)
```

Cada pantalla es un componente *standalone* con carga diferida (`loadComponent` en `app.routes.ts`), estado con **signals**,
formularios reactivos y componentes de Angular Material.

## Pantallas por historia de usuario

| Ruta | Rol | HU |
|---|---|---|
| `/login` | todos | US01 |
| `/panel`, `/reportes` | ADMIN, PROPIETARIO | US14, US15 (gráficos con Chart.js) |
| `/alojamientos` | ADMIN, PROPIETARIO | US03, US04 (mapa Leaflet + API OpenStreetMap) |
| `/huespedes` | ADMIN, PROPIETARIO | US05 |
| `/reservas`, `/calendario` | ADMIN, PROPIETARIO | US06, US07 (valida el cruce de fechas en vivo), US08 |
| `/servicios`, `/personal` | ADMIN, PROPIETARIO | US09, US10, US11, US12 (vista del propietario) |
| `/mis-tareas` | PERSONAL | US10, US11, US12 (checklist y fotos, pensada para el celular) |
| `/incidencias` | todos | US13 y **US17: la IA sugiere categoría y prioridad** |
| `/pagos` | ADMIN, PROPIETARIO | US14 |
| `/usuarios`, `/auditoria` | ADMIN | US02, US22 |

## Qué te pueden preguntar en la sustentación

- **¿Cómo viaja el token?** `AuthService.login` guarda la sesión; `authInterceptor` agrega `Authorization: Bearer <token>` a cada petición a `/api/`.
- **¿Cómo proteges las rutas?** `authGuard` exige sesión y `rolGuard('ADMIN', 'PROPIETARIO')` exige el rol; si no, redirige a la pantalla inicial del rol. El backend vuelve a validar el rol en cada endpoint (403), así que el guard es solo comodidad de la interfaz.
- **¿Qué pasa cuando vence el token?** La API responde 401; `errorInterceptor` avisa y cierra la sesión.
- **¿Dónde se muestran los errores 400, 403 o 409?** En `errorInterceptor`: toma el `mensaje` del JSON de error de la API y lo muestra en un aviso.
- **¿Qué son los signals?** Valores reactivos (`signal`, `computed`): la plantilla se actualiza sola cuando cambian, sin suscripciones manuales.
- **¿Por qué componentes standalone y carga diferida?** Cada pantalla se descarga solo cuando se visita; el paquete inicial es pequeño.
- **¿Cómo funciona la IA en la pantalla?** `incidencia-dialogo` espera 700 ms después de escribir (`debounceTime`), llama a `POST /api/v1/ia/incidencias/sugerencia` y muestra categoría, prioridad, confianza y palabras clave; el usuario decide si la aplica.
- **¿Cómo se prueban los gráficos?** `shared/grafico.ts` envuelve Chart.js y se vuelve a dibujar cuando cambian los datos.
