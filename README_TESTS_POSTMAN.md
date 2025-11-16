# Ejecutar pruebas en Postman — Sistema de Gestión Biblioteca Rionegro

Este documento explica paso a paso, de forma pedagógica y detallada, cómo importar y ejecutar la colección de pruebas de la API en Postman, y cómo ejecutar las mismas pruebas en línea de comandos con Newman. Está pensado para un estudiante que parte desde cero.

Fecha: 2025-11-02

Requisitos previos
- Tener instalado Node.js (>=14) y npm.
- Tener MongoDB instalado y en ejecución local (o acceso a una base de datos Mongo).
- Tener Postman instalado (aplicación de escritorio) o instalar Newman para ejecución por CLI.
- El repositorio contiene `Postman_Collection.json` ya preparada.

Resumen de pasos
1. Preparar y arrancar el backend.
2. Verificar que el servidor responde (health check).
3. Importar la colección en Postman.
4. Crear/Importar el environment (variable `baseURL`).
5. Ejecutar la colección en Postman (Runner) o con Newman.
6. Interpretar resultados y resolver fallos comunes.

1) Preparar y arrancar el backend

- Abre una terminal (bash) y sitúate en la carpeta `backend`:

```bash
cd "e:/SENA/ejecucion/GUIA 9/library_management_system_bibliotecaRionegro/backend"
```

- Instala dependencias (si no lo has hecho ya):

```bash
npm install
```

- Asegúrate de que MongoDB está corriendo en tu máquina. Opciones comunes en Windows:

  - Si instalaste MongoDB como servicio: abre `services.msc` y verifica que `MongoDB` está en estado "Running".
  - Desde bash (si `mongod` está en PATH) puedes arrancar:

```bash
# Ejecuta solo si no tienes MongoDB corriendo como servicio
mongod --dbpath "C:/ruta/a/tu/db" --bind_ip 127.0.0.1
```

- El backend usa el archivo `.env` en `backend/.env`. Por defecto en este proyecto está:

```
PORT = 5000
MONGO_URL = mongodb://localhost:27017/librarydb
```

- Arranca el servidor:

```bash
# modo desarrollo (con nodemon)
npm run dev

# o en modo producción
npm start
```

Observa la salida en consola; cuando se conecte a MongoDB verás `MONGODB CONNECTED` y `Server is running in PORT 5000`.

2) Verificar que el servidor responde

- Abre el navegador o usa curl para hacer una petición de comprobación:

```bash
curl http://localhost:5000/
```

Deberías recibir: "Welcome to LibraryApp".

3) Importar la colección de Postman

- Abre Postman (aplicación de escritorio).
- Menú "Import" → "File" → selecciona `Postman_Collection.json` desde la raíz del repositorio.
- Verifica que la colección importada aparece en la barra lateral con el nombre "Sistema Bibliotecario - API Tests".

4) Importar / crear el Environment (variables)

- El collection usa la variable `{{baseURL}}`. Necesitas un Environment con esa variable.

- Opción A — Importar el archivo de entorno que está en el repositorio (si existe):
  - En Postman, `Environments` → Import → selecciona `Postman_Environment.json`.

- Opción B — Crear manualmente:
  1. En Postman, haz clic en el icono de ojo (Manage Environments) → Add.
  2. Nombre: `Local`.
  3. Añade una variable: `baseURL` → Valor: `http://localhost:5000/api` → Guarda.

Nota: la colección está diseñada para usar el prefijo `/api` (por ejemplo `{{baseURL}}/auth/register`), por eso `baseURL` debe terminar en `/api`.

5) Ejecutar la colección en Postman (GUI)

- Selecciona la colección en la barra lateral.
- Haz clic en "Run" (Run in Collection Runner).
- En la ventana del Runner:
  - Selecciona Environment: `Local` (o el que hayas creado).
  - Iterations: 1.
  - Click en "Start Run".

- El runner ejecutará cada request en orden. Los tests definidos en cada request (scripts con `pm.test`) mostrarán Passed/Failed.

Interpretación rápida:
- Verde = Passed.
- Rojo = Falló. Al hacer clic en la petición fallida verás el body de la respuesta y el mensaje del test (pm.test).

6) Ejecutar con Newman (CLI) — opcional y útil para CI

- Instala Newman globalmente (opcional):

```bash
npm install -g newman
# reporter extra (html) opcional
npm install -g newman-reporter-htmlextra
```

- Ejecuta la colección usando el environment que importaste/creaste:

```bash
# Desde la raíz del repo
newman run Postman_Collection.json -e Postman_Environment.json -r cli,htmlextra --reporter-htmlextra-export newman-report.html
```

- Si no tienes `Postman_Environment.json`, puedes usar `--env-var baseURL=http://localhost:5000/api` directamente:

```bash
newman run Postman_Collection.json --env-var "baseURL=http://localhost:5000/api" -r cli
```

7) Fallos comunes y cómo resolverlos

- Error: Connection refused / ECONNREFUSED -> El backend no está arrancado o está en otro puerto. Verifica `npm run dev` y `backend/.env`.
- Error: Mongoose/MongoDB no conectado -> Asegúrate que MongoDB está activo y `MONGO_URL` apunta al host correcto.
- Error 401 / 403 -> revisa autenticación: algunos endpoints requieren token o rol; sigue el flujo de autenticación en la colección (register → login → usar token).
- Tests que esperan status 200 pero obtienen 500 -> revisa logs del servidor para la traza; puede faltar un campo en la petición o la DB no tiene datos.

8) Si quieres, puedo ejecutar las pruebas aquí
- Puedo intentar arrancar el backend y ejecutar Newman desde esta sesión si me autorizas. Aviso: necesito que MongoDB esté disponible en el entorno donde estoy ejecutando (si no está, las pruebas fallarán). Si prefieres, ejecútalo localmente con los pasos anteriores y comparte los resultados.

Archivos en este repositorio que te ayudan
- `Postman_Collection.json` -> colección con todos los tests.
- `backend/.env` -> configuración por defecto (usa puerto 5000 y una BD local `librarydb`).

Si quieres, el siguiente paso que puedo hacer ahora por ti:
1. Crear y subir `Postman_Environment.json` configurado para `http://localhost:5000/api` (ya lo agregué al repo).
2. Intentar arrancar el backend y ejecutar Newman aquí — dime si quieres que lo intente ahora.

---

Fin del documento. Si quieres que ejecute las pruebas aquí, confirma y lo intento (te mostraré la salida y un reporte HTML si la ejecución con Newman funciona). Si prefieres que lo hagas tú, dime cuál paso te resulta confuso y lo detallo aún más.
