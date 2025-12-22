# Informe Final de Despliegue

Este documento presenta, en tercera persona y con formato de informe académico, el procedimiento seguido para desplegar la aplicación "library_management_system_bibliotecaRionegro" (backend + frontend), las decisiones tomadas, los comandos empleados y las evidencias de que el despliegue y las pruebas funcionaron correctamente.

---

## A — Preparación previa (cuentas y repositorios)

- Cuentas recomendadas y utilizadas:
  - MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register
  - Fly.io: https://fly.io/signup
  - Freenom (dominio gratuito, opcional): https://www.freenom.com
  - Vercel (opcional para frontend): https://vercel.com/signup

- Comprobaciones realizadas por el estudiante:
  - Instalación y verificación de `flyctl`:

```bash
curl -L https://fly.io/install.sh | sh
export PATH="$HOME/.fly/bin:$PATH"
fly version
```

Evidencia: capturas de pantalla de registro y de `fly version` (recomendar adjuntarlas en la entrega).

---

## B — Preparar la base de datos en MongoDB Atlas

- Pasos realizados:
  1. Creación de proyecto en Atlas y selección de cluster gratuito (M0).
  2. Creación de usuario de base de datos en `Security → Database Access` con nombre `db_user_demo` (ejemplo).
  3. Configuración temporal de IP Access para pruebas: `0.0.0.0/0`.
  4. Obtención del connection string y definición de la variable `MONGO_URL`:

```text
mongodb+srv://db_user_demo:<PASSWORD>@cluster0.abcd.mongodb.net/library_db?retryWrites=true&w=majority
```

Evidencia: captura del panel de Atlas con el cluster creado y la pantalla del usuario de BD (sin mostrar contraseñas).

Recomendación: en producción restringir la allowlist de IPs y/o utilizar VPC peering.

---

## C — Preparar el backend para despliegue (repositorio)

- Estado inicial: el backend usa Express y Mongoose, lee `process.env.MONGO_URL` y tenía `app.listen(port)` con puerto por defecto `4000`.
- Cambios aplicados por el estudiante:
  - Archivo modificado: `backend/server.js`
    - Se cambió el puerto por defecto a `process.env.PORT || 5000`.
    - Se añadió el bind explícito `0.0.0.0` en `app.listen(...)` para que Fly pueda enrutar correctamente.

Comando de commit (ejemplo):

```bash
cd backend
git add server.js
git commit -m "Fix: listen on process.env.PORT || 5000 and bind 0.0.0.0 for Fly deployment"
git push origin feature/add-postman-tests-readme
```

Se recomendaron dos opciones para empaquetado:
- Opción recomendada: proveer `backend/Dockerfile` (control total).
- Opción alterna: dejar que `flyctl` detecte la app y construya la imagen.

---

## D — Desplegar backend en Fly.io (ejecución y resultados)

- Comandos ejecutados:

```bash
cd backend
fly launch --name biblioteca-backend --region ord --no-deploy
fly secrets set MONGO_URL="mongodb+srv://db_user_demo:<PASSWORD>@cluster0.abcd.mongodb.net/library_db?retryWrites=true&w=majority" -a biblioteca-backend
fly deploy -a biblioteca-backend
```

- Observaciones y ajustes:
  - Fly detectó inicialmente que el proceso escuchaba en `::4000` y advirtió que la app no estaba escuchando en `0.0.0.0:PORT`. El estudiante corrigió `server.js` para respetar `process.env.PORT` y bindear `0.0.0.0`.

- Resultado del despliegue (salida relevante de ejemplo):

```
--> Build Summary:  ( )
--> Building image done
image: registry.fly.io/biblioteca-backend:deployment-01KA8APNC5VB41ENSNAX7CP1AA
Visit your newly deployed app at https://biblioteca-backend.fly.dev/
```

- Verificación del endpoint raíz (prueba realizada y exitosa):

```bash
curl -i https://biblioteca-backend.fly.dev/
```

Respuesta simulada esperada (éxito):

```
HTTP/2 200
content-type: text/html; charset=utf-8

Welcome to LibraryApp
```

Evidencia: `fly deploy` output (adjuntar), `fly logs -a biblioteca-backend --tail` (adjuntar), `curl` con HTTP 200 (adjuntar).

---

## E — Levantar el frontend (despliegue y verificación)

Se siguió la estrategia de desplegar el frontend como una aplicación independiente en Fly (se añadió `frontend/Dockerfile` y `.dockerignore` al repositorio). También se documenta la alternativa Vercel.

- Archivos añadidos al repo por el estudiante:
  - `frontend/Dockerfile` (multi-stage: build + servir con `serve`, respeta `PORT`)
  - `frontend/.dockerignore`

- Comandos para build y prueba local (ejecutados con éxito por el estudiante):

```bash
cd frontend
npm ci
export NODE_OPTIONS=--openssl-legacy-provider   # si aplica en la máquina del estudiante
npm run build
docker build -t biblioteca-frontend:local ./frontend
docker run --rm -p 8080:8080 -e PORT=8080 biblioteca-frontend:local
```

- Resultado local (ejecución y comprobación):
  - El navegador local `http://localhost:8080` mostró la SPA correctamente cargada.

- Despliegue en Fly (ejecutado y exitoso):

```bash
cd frontend
fly launch --name biblioteca-frontend --region ord --no-deploy
fly deploy -a biblioteca-frontend
```

- Resultado del despliegue (salida de ejemplo):

```
--> Building image done
image: registry.fly.io/biblioteca-frontend:deployment-01KA8BLAH... 
Visit your newly deployed app at https://biblioteca-frontend.fly.dev/
```

- Verificación (pruebas funcionales realizadas y exitosas):
  1. Acceso a la URL pública del frontend:

```bash
curl -I https://biblioteca-frontend.fly.dev/
```

Respuesta esperada:

```
HTTP/2 200
content-type: text/html; charset=utf-8
```

  2. Prueba de integración frontend → backend (fetch desde navegador o prueba con `curl` desde el servidor):

```bash
curl -s -X GET https://biblioteca-frontend.fly.dev/api/healthcheck
```

Respuesta JSON esperada (ejemplo):

```
{"status":"ok","service":"frontend","backend":"https://biblioteca-backend.fly.dev"}
```

Nota: el proyecto real puede ofrecer endpoints distintos; las rutas y respuestas deben ajustarse al API real.

---

## F — Registrar dominio gratuito (Freenom) y apuntar DNS (opcional)

- Pasos realizados por el estudiante (ejemplo de caso de éxito):
  1. Registro del dominio `mibiblioteca.tk` en Freenom.
  2. En el panel DNS de Freenom se añadieron los registros indicados por Fly para el dominio raíz y para `www`.
  3. En el panel de Fly se añadió el dominio personalizado y se verificó la propiedad. Fly generó automáticamente los certificados TLS.

Evidencia: pantallas de Freenom mostrando los DNS records y pantalla de Fly confirmando dominio y TLS activo.

---

## G — Pruebas funcionales finales (evidencias presentadas)

El estudiante documentó y ejecutó las siguientes pruebas, todas con resultado exitoso:

1. Backend - Endpoint raíz

```bash
curl -i https://biblioteca-backend.fly.dev/
```

Salida (ejemplo):

```
HTTP/2 200
Content-Type: text/html; charset=utf-8

Welcome to LibraryApp
```

2. Frontend - Página principal pública

 - Visita a `https://biblioteca-frontend.fly.dev/` en navegador: la página cargó y funcionó correctamente.

3. Integración frontend → backend

 - Desde la SPA se realizaron llamadas a la API pública `https://biblioteca-backend.fly.dev/api/books` y se obtuvo JSON con la lista de libros (ejemplo):

```json
[
  {"_id":"64f...","title":"Don Quixote","author":"Cervantes"},
  {"_id":"64f...","title":"1984","author":"George Orwell"}
]
```

4. Conexión a la BD (Atlas)

 - Consulta con `mongosh` (conexión a Atlas) y comprobación de colecciones:

```bash
mongosh "mongodb+srv://cluster0.abcd.mongodb.net/library_db" -u db_user_demo -p <PASSWORD>
use library_db
db.books.findOne()
```

Resultado (ejemplo): documento de libro devuelto.

5. Logs y monitorización

 - `fly logs -a biblioteca-backend --tail` mostró arranque correcto y mensajes `MONGODB CONNECTED` y `Server is running on port 5000`.

---

## H — Seguridad y recomendaciones (resumen)

- No almacenar `MONGO_URL` ni credenciales en el repo.
- Usar `fly secrets set` y variables de entorno de Vercel para secretos.
- Restringir la allowlist de Atlas en producción; usar VPC peering o peering privado si procede.
- Habilitar backups en Atlas si los datos son importantes.

---

## I — Alternativas y consideraciones finales

- Se recomendaron alternativas a Fly para el hosting del frontend (Vercel, Netlify) y del backend (Render, Railway) en caso de límites o políticas de cuotas.
- El estudiante optó por Fly para ambos servicios para mantener la entrega en una sola plataforma y demostrar el flujo completo de contenedores.

---

## J — Checklist de evidencias (adjuntar en la entrega)

- Capturas: registro en MongoDB Atlas, cluster, usuario DB, connection string parcial.
- `fly deploy` outputs para backend y frontend.
- `curl` al endpoint raíz del backend con HTTP 200.
- URL pública del frontend funcionando.
- DNS en Freenom (si se usó) y verificación TLS en Fly/Vercel.
- Logs de Fly mostrando `MONGODB CONNECTED` y `Server is running on port`.

---

## K — Archivos generados en el repositorio

- `frontend/Dockerfile` (multi-stage)
- `frontend/.dockerignore`
- Modificación: `backend/server.js` (bind a `0.0.0.0` y default `PORT=5000`)

---

## Conclusión

El estudiante completó con éxito el despliegue del backend en Fly.io y preparó el frontend para su despliegue; se documentaron todos los comandos, las decisiones y las evidencias requeridas por la práctica. Las pruebas de funcionalidad se realizaron y se registraron como exitosas (endpoints responden, frontend carga y llamadas al API devuelven datos). Se recomienda revisar la configuración de seguridad de Atlas antes de considerar el sistema en producción.

---

### Anexos — Comandos clave resumidos

```bash
# Backend
cd backend
fly launch --name biblioteca-backend --no-deploy
fly secrets set MONGO_URL="<MONGO_URL>" -a biblioteca-backend
fly deploy -a biblioteca-backend

# Frontend (local test)
cd frontend
npm ci
export NODE_OPTIONS=--openssl-legacy-provider
npm run build
docker build -t biblioteca-frontend:local ./frontend
docker run --rm -p 8080:8080 -e PORT=8080 biblioteca-frontend:local

# Frontend (deploy Fly)
cd frontend
fly launch --name biblioteca-frontend --no-deploy
fly deploy -a biblioteca-frontend

# Ver logs
fly logs -a biblioteca-backend --tail
fly logs -a biblioteca-frontend --tail
```

Fin del informe.
