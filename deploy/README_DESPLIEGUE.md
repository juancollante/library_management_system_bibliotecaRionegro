# Despliegue local de la aplicación "Biblioteca Rionegro" — Informe del montaje

Fecha: 16-11-2025

**Resumen**: Se preparó un entorno local reproducible para desplegar la web del proyecto `library_management_system_bibliotecaRionegro` como sitio estático servido por `nginx` en Docker. El proceso incluyó crear scripts de despliegue/chequeo, ajustar `docker-compose.yml` para servir la carpeta `frontend/build`, y aplicar soluciones para problemas encontrados durante la compilación del frontend (OpenSSL/Node y availability de `node`).

**Archivos añadidos / modificados**
- **`docker-compose.yml`**: configura el servicio `web` con `nginx:alpine` y monta `./frontend/build` en `/usr/share/nginx/html` (puerto `8080`).
- **`check.sh`**: script en la raíz que consulta `http://localhost:8080` hasta obtener HTTP 200.
- **`deploy.sh`**: script automatizado que instala dependencias en `frontend/`, compila el build y levanta los contenedores (`docker compose up -d --build`). Incluye estrategias para resolver errores de OpenSSL y un fallback para ejecutar la compilación dentro de un contenedor `node:18` si no hay `node` local.
- **`deploy/plantilla-landing/site/index.html`**: plantilla de ejemplo mínima (se añadió inicialmente para pruebas; el `build` real la reemplaza).

**Objetivo del ejercicio**
- Utilizar la página web del proyecto (frontend React) como producto de prueba.
- Seleccionar una plataforma de despliegue local reproducible: se eligió Docker (`nginx:alpine` + `docker compose`).
- Generar documentación y capturas para el informe.

**Pasos realizados (detallado y reproducible)**

1) Preparación y archivos iniciales

- Añadir `docker-compose.yml` en la raíz: monta `./frontend/build` en nginx y publica `8080`.
- Crear `check.sh` y `deploy.sh` para automatizar verificación y despliegue.

2) Compilar el frontend (build)

- Desde la raíz del repo puedes ejecutar:

```
chmod +x deploy.sh
./deploy.sh
```

- Qué hace `deploy.sh` (resumen):
	- Entra en `frontend/` y ejecuta `npm install`.
	- Intenta compilar con `node` local aplicando `--openssl-legacy-provider` si es necesario.
	- Si `node` no está disponible, usa Docker para ejecutar la compilación dentro de `node:18`.
	- Levanta (o reconstruye) el servicio nginx con `docker compose up -d --build`.
	- Ejecuta `./check.sh` para comprobar que `http://localhost:8080` devuelve `200`.

3) Verificación manual alternativa

Si prefieres ejecutar manualmente los pasos:

```
cd frontend
npm install
# Si usas bash/WSL y tienes Node 17+ y ves errores OpenSSL, exporta:
export NODE_OPTIONS=--openssl-legacy-provider
npm run build
cd ..
docker compose up -d --build
./check.sh
```

**Problemas encontrados y soluciones aplicadas**

- Duplicado accidental en `docker-compose.yml`: se detectó y eliminó la definición duplicada dejando una única configuración válida.
- Error en `npm run build`: "Error: error:0308010C:digital envelope routines::unsupported" (código `ERR_OSSL_EVP_UNSUPPORTED`). Causado por incompatibilidad entre OpenSSL 3 (Node >= 17/20) y versiones antiguas de `webpack`/`react-scripts`.
	- Soluciones aplicadas:
		- En `deploy.sh` se exporta `NODE_OPTIONS=--openssl-legacy-provider` antes de `npm run build` como workaround.
		- Si la variable de entorno no se propaga correctamente, `deploy.sh` intenta ejecutar directamente: `node --openssl-legacy-provider node_modules/react-scripts/scripts/build.js`.
		- Si no hay `node` local, `deploy.sh` usa un contenedor `node:18-bullseye` para realizar `npm install` y la compilación con `--openssl-legacy-provider`.

- Problema al descargar la imagen Docker desde el host: error con helpers de credenciales (`docker: error getting credentials - err: exit status 1`).
	- Diagnóstico y posibles soluciones:
		- Ejecutar `docker logout` y volver a probar `docker pull node:18-bullseye`.
		- Revisar y, si procede, editar temporalmente `~/.docker/config.json` para eliminar `credsStore` o `credHelpers` si están mal configurados (hacer copia de seguridad antes).
		- Alternativa rápida: instalar Node 18 localmente (recomendado si no quieres lidiar con Docker credential helpers ahora) usando `nvm`.

**Comandos útiles (resumen)**

- Levantar todo (script automático):
	- `chmod +x deploy.sh && ./deploy.sh`
- Comandos manuales (build + nginx):
	- `cd frontend && npm install && export NODE_OPTIONS=--openssl-legacy-provider && npm run build`
	- `cd .. && docker compose up -d --build && ./check.sh`
- Probar Docker pull (si el script falla con error de credenciales):
	- `docker logout`
	- `docker pull node:18-bullseye`
	- Si falla por `credsStore`, revisar `~/.docker/config.json`.

**Verificación efectiva**

- `./check.sh` comprueba repetidamente `http://localhost:8080` hasta recibir HTTP/200. Este script se ejecuta al final de `deploy.sh`.

**Recomendaciones y pasos siguientes**

- Recomendación inmediata: usar Node 18 (LTS) para desarrollo local y para CI. Instalar con `nvm` evita problemas de compatibilidad:

```
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 18
nvm use 18
```

- Para producción o pruebas compartidas, mantener el flujo con Docker es más reproducible: crear una imagen que incluya build y nginx es la siguiente mejora (multi-stage Dockerfile).
- Añadir capturas en `report/screenshots/`: terminal con `docker --version`, estructura `frontend/build`, salida de `./deploy.sh`, y página cargada en `http://localhost:8080`.

**Rutas relevantes en este repositorio**
- `docker-compose.yml` (raíz)
- `deploy.sh` (raíz)
- `check.sh` (raíz)
- `deploy/README_DESPLIEGUE.md` (este archivo)
- `deploy/plantilla-landing/site/` (plantilla de ejemplo)

Si quieres que añada:
- un `Dockerfile` multi-stage que construya el `frontend` y produzca una imagen final `nginx` lista para ejecutar, o
- un `.nvmrc` con `18` y/o un `Makefile` con tareas `make build` / `make deploy`, dime y lo implemento.

---

Informe preparado por: tareas realizadas el 16-11-2025.


Problema conocido con Node.js >=17 / OpenSSL 3

Al ejecutar `npm run build` en máquinas con Node.js 17+ o Node.js 20 puedes ver el error:

```
Error: error:0308010C:digital envelope routines::unsupported
ERR_OSSL_EVP_UNSUPPORTED
```

Soluciones:
- Opción rápida (funciona en bash/WSL/macOS/Linux): antes de `npm run build` exporta:
	```bash
	export NODE_OPTIONS=--openssl-legacy-provider
	npm run build
	```
- En Windows PowerShell:
	```powershell
	$env:NODE_OPTIONS="--openssl-legacy-provider"
	npm run build
	```
- Mejor solución a largo plazo: usar Node.js LTS 18.x o actualizar dependencias (react-scripts/webpack) para versiones compatibles con OpenSSL 3.

El script `deploy.sh` ya aplica la variable `NODE_OPTIONS` antes del `npm run build` para prevenir este fallo.

Estructura de la plantilla de ejemplo
- `deploy/plantilla-landing/site/index.html` (ejemplo mínimo con Bootstrap CDN).

Capturas y reportes
- Cree `report/screenshots/` y guarde capturas como se describe en la guía principal.

Notas
- Si no puede usar Docker, puede servir `deploy/plantilla-landing/site` con Python:
```
cd deploy/plantilla-landing/site
python -m http.server 8080
```
# Despliegue local de plantilla HTML

Resumen
- Plantilla de ejemplo ligera (Bootstrap CDN) para servir como sitio estático.

Requisitos
- Docker y Docker Compose instalados (o alternativa: Python 3)

Estructura creada
- `deploy/plantilla-landing/` : contiene `index.html` (sitio de ejemplo).
- `docker-compose.yml` : en la raíz, expone el sitio en `:8080`.
- `check.sh` : script para verificar HTTP 200.

Comandos rápidos
1. Levantar con Docker Compose:

```bash
docker compose up -d
```

2. Ver logs:

```bash
docker compose logs -f
```

3. Verificación con el script:

```bash
chmod +x ./check.sh
./check.sh
```

Alternativa sin Docker (rápido):

```bash
cd deploy/plantilla-landing
python -m http.server 8080
# entonces abrir http://localhost:8080
```

Capturas y reporte
- Coloca las capturas en `deploy/report/screenshots/` y actualiza este README con imágenes según tu informe.

Notas
- El `index.html` usa Bootstrap vía CDN para evitar copiar assets con licencia. Si quieres que descargue una plantilla específica (Start Bootstrap), puedo añadirla en `deploy/plantilla-landing/` previa confirmación.
