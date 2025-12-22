---

# Informe final: despliegue local de plantilla HTML con Docker

Fecha: 16-11-2025

Objetivo del informe
 - Seleccionar una plantilla HTML gratuita y usarla como producto de prueba.
 - Seleccionar una plataforma de desarrollo e implantación para montar un servidor de aplicaciones local completo.
 - Documentar el paso a paso para la instalación de la plataforma y el montaje del producto, incluyendo capturas/plantillas para las imágenes.

1) Producto de prueba seleccionado (este proyecto)

Para este ejercicio NO se descargó una plantilla externa. En su lugar se utilizó la propia aplicación del repositorio —la página web de la Biblioteca Rionegro— como producto de prueba para el despliegue.

Detalle:
- Producto de prueba: la aplicación contenida en `frontend/` del repositorio `library_management_system_bibliotecaRionegro`. Esta carpeta ya incluye una app React y, en este workspace, una carpeta `frontend/build/` generada durante las pruebas.
- Nota alternativa: en el repo también se incluyó una plantilla mínima de ejemplo en `deploy/plantilla-landing/site/` para pruebas rápidas, pero la entrega y el montaje final usan la versión compilada del `frontend`.

2) Selección de la plataforma de desarrollo e implantación

Plataforma elegida: Docker + Docker Compose con `nginx:alpine` como servidor estático.

Motivación:
- Reproducibilidad: Docker garantiza que el servicio se ejecuta de forma idéntica en distintas máquinas.
- Aislamiento: no modifica la configuración local del host (salvo archivos montados explícitamente).
- Facilidad: `nginx` sirve archivos estáticos eficientemente; `docker compose` orquesta el servicio.

Alternativas válidas: XAMPP (Windows), `python -m http.server` para pruebas rápidas, o un servidor Node/Express si se necesitara más lógica.

3) Requisitos previos

- Docker Desktop (Windows/WSL2) o Docker Engine en Linux.
- Git (para clonar el repositorio) y acceso al repositorio.
- Node.js (opcional) si se compila el `frontend` localmente (se incluye fallback para usar `node:18` en Docker si no está instalado).

4) Instalación de la plataforma (resumen rápido)

Windows (recomendado con WSL2):
 - Instalar WSL2 si no está activo: en PowerShell (administrador): `wsl --install`.
 - Descargar e instalar Docker Desktop: https://www.docker.com/products/docker-desktop
 - Habilitar integración con WSL2 cuando el instalador lo pida.

Linux (ejemplo Ubuntu):
```
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl enable --now docker
sudo usermod -aG docker $USER  # cerrar sesión/abrir para aplicar
```

5) Preparación del producto para despliegue

Verifica que existe el `frontend/build` (resultado de `npm run build`) en el repo. Si no existe, genera el build antes de desplegar (instrucciones más abajo).

Captura sugerida: guardar `deploy/report/screenshots/01_build_tree.png` mostrando el árbol `frontend/build`.

6) Montaje del servidor de aplicaciones local (paso a paso)

Estructura principal usada:
- `docker-compose.yml` en la raíz — monta `./frontend/build` en `/usr/share/nginx/html` del contenedor nginx y publica el puerto `8080`.

Pasos:

a) Si vas a usar la web del proyecto (React) como producto de prueba: construir la app

```
cd frontend
npm install
# En caso de error OpenSSL con Node >=17:
export NODE_OPTIONS=--openssl-legacy-provider
npm run build
```

b) Si no vas a compilar (usar la plantilla HTML descargada): copia la plantilla a la carpeta que sirve nginx:

```
rm -rf deploy/plantilla-landing/site/*
cp -r path/to/your/template/* deploy/plantilla-landing/site/
```

c) Ejecutar Docker Compose (desde la raíz del repo):

```
docker compose up -d --build
```

d) Verificar que el sitio responde (script incluido):

```
chmod +x ./check.sh
./check.sh
```

Capturas sugeridas:
- `deploy/report/screenshots/02_docker_compose_up.png`: salida de `docker compose up -d`.
- `deploy/report/screenshots/03_check_sh_ok.png`: salida de `./check.sh` indicando HTTP 200.
- `deploy/report/screenshots/04_browser_render.png`: vista del navegador mostrando `http://localhost:8080`.

7) Problemas habituales y resolución

- Error OpenSSL (`ERR_OSSL_EVP_UNSUPPORTED`): solución temporal `export NODE_OPTIONS=--openssl-legacy-provider` o usar Node 18 LTS. `deploy.sh` incluye workarounds y fallback a `node:18` en Docker.
- Problemas con descarga de imágenes Docker (credenciales): ejecutar `docker logout` y revisar `~/.docker/config.json` en caso de `credsStore` mal configurado.

8) Documentación gráfica (capturas)

Incluye capturas en `deploy/report/screenshots/` con los nombres sugeridos y, en el informe final, incrústalas en el Markdown así:

```markdown
![Plantilla descargada](deploy/report/screenshots/01_template_files.png)
![Docker up](deploy/report/screenshots/02_docker_compose_up.png)
![Check OK](deploy/report/screenshots/03_check_sh_ok.png)
![Sitio en navegador](deploy/report/screenshots/04_browser_render.png)
```

9) Entrega y recomendaciones finales

- Para mantener reproducibilidad, se recomienda crear un `Dockerfile` multi-stage que construya el `frontend` y produzca una imagen final con `nginx` (esto evita depender del build en el host y simplifica despliegues).
- Añadir un `.nvmrc` con `18` para el equipo de desarrollo y documentar la instalación de `nvm` en el README.
- Incluir en la entrega las capturas y un `report/README_REPORT.md` que describa cada una.

10) Archivos y rutas relevantes (resumen)
- `docker-compose.yml` (raíz)
- `deploy.sh` (raíz): script automatizado (instala dependencias, build y levanta Docker).
- `check.sh` (raíz): verificación HTTP 200.
- `deploy/plantilla-landing/site/`: carpeta que el contenedor nginx sirve cuando se usa plantilla estática.
- `deploy/report/screenshots/`: carpeta sugerida para guardar capturas del informe.

---

---

# Informe de despliegue local (proyecto: Biblioteca Rionegro)

Este informe documenta el montaje completo realizado sobre el repositorio `library_management_system_bibliotecaRionegro` para desplegar localmente la web del proyecto (producto de prueba) usando **Docker Desktop** como plataforma de desarrollo e implantación local.

Resumen rápido
- Producto de prueba: la propia aplicación del repo `library_management_system_bibliotecaRionegro` (carpeta `frontend/`). El objetivo fue servir la versión compilada `frontend/build` mediante `nginx` en un contenedor Docker.
- Plataforma elegida: **Docker Desktop** (con Docker Compose). Se usó `nginx:alpine` para servir archivos estáticos.

Objetivos cubiertos
- Seleccionar plantilla / producto de prueba: se utilizó la aplicación `frontend` del proyecto (ya contiene una app React y una carpeta `build/` generada).
- Seleccionar la plataforma de despliegue: Docker Desktop (recomendado para Windows con WSL2) y Docker Compose.
- Documentar el paso a paso para instalar la plataforma y montar el producto localmente, incluyendo las soluciones a los problemas encontrados.

Estructura y ficheros relevantes (creados/modificados)
- `docker-compose.yml` (raíz): servicio `web` con `nginx:alpine` que monta `./frontend/build` en `/usr/share/nginx/html`, mapea el puerto `8080`.
- `deploy.sh` (raíz): script automatizado que instala dependencias (`npm install`), construye el `frontend` (build) y levanta `docker compose up -d --build`. Incluye workarounds para errores OpenSSL y un fallback que ejecuta la compilación dentro de `node:18` si no hay Node local.
- `check.sh` (raíz): verifica que `http://localhost:8080` responda HTTP 200.
- `deploy/plantilla-landing/site/`: plantilla de ejemplo mínima incluida para pruebas iniciales.
- `deploy/README_DESPLIEGUE.md`: este informe.

Requisitos previos (para Windows con Docker Desktop)
- Windows 10/11 64-bit con WSL2 recomendado.
- Docker Desktop (descargar de https://www.docker.com/products/docker-desktop). Durante la instalación habilitar integración con WSL2.
- Git (para clonar y trabajar el repo).
- Opcional: `nvm` y Node 18 para compilar localmente sin Docker.

Instalación de Docker Desktop (resumen)
1. Descargar el instalador de Docker Desktop desde https://www.docker.com/products/docker-desktop
2. Ejecutar el instalador y habilitar integración con WSL2 cuando se solicite.
3. Reiniciar el equipo si el instalador lo solicita.
4. Verificar en PowerShell/WSL:

```bash
docker --version
docker compose version
```

Instalación alternativa en Linux (breve):

```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl enable --now docker
sudo usermod -aG docker $USER  # reiniciar sesión para aplicar
```

Preparación del repositorio (usar este proyecto como producto de prueba)
1. Clonar o situarse en el repositorio:

```bash
cd /ruta/al/repositorio/library_management_system_bibliotecaRionegro
```

2. Verificar que hay una versión compilada del frontend (`frontend/build`). Si no existe o quieres reconstruirla, compilarla (siguientes pasos).

Compilar el frontend (opcional — si deseas servir la app React real)
1. Instalar dependencias y compilar (desde la raíz del repo):

```bash
cd frontend
npm install
# En sistemas con Node >=17/20 puede aparecer un error OpenSSL.
# Workaround (bash/WSL/Linux/macOS):
export NODE_OPTIONS=--openssl-legacy-provider
npm run build
```

2. Si no tienes `node` instalado en el host, `deploy.sh` puede ejecutar la compilación dentro de un contenedor `node:18` automáticamente.

Problemas encontrados y soluciones (resumen aplicado en este montaje)
- Error OpenSSL al ejecutar `npm run build` (ERR_OSSL_EVP_UNSUPPORTED): solución temporal con `NODE_OPTIONS=--openssl-legacy-provider`, ejecución directa con `node --openssl-legacy-provider ...`, o usar Node 18.
- Si `node` no está disponible localmente, `deploy.sh` usa Docker (`node:18-bullseye`) para ejecutar `npm install` y la compilación.
- Problema al descargar imágenes Docker por helpers de credenciales: solución con `docker logout`, editar `~/.docker/config.json` (hacer backup) o instalar Node localmente si prefieres evitar tratar credenciales Docker ahora.

Despliegue con Docker Desktop (paso a paso)
1. Situarse en la raíz del repo:

```bash
cd /mnt/e/SENA/ejecucion/GUIA\ 9/library_management_system_bibliotecaRionegro
```

2. Ejecutar el script automático (`deploy.sh`) que hace build y levanta Docker:

```bash
chmod +x deploy.sh
./deploy.sh
```

El script realiza:
- `npm install` en `frontend/` (si procede).
- intenta `npm run build` aplicando workarounds; si no hay `node`, hace la build dentro de `node:18` en Docker.
- `docker compose up -d --build` para levantar nginx y montar `frontend/build`.
- ejecuta `./check.sh` para verificar HTTP 200.

3. Ver manualmente el estado del contenedor y logs:

```bash
docker compose ps
docker compose logs -f
```

4. Abrir en el navegador: `http://localhost:8080`.

Ficheros importantes y su función
- `docker-compose.yml`: define el servicio `web` (nginx) y el volumen que monta el `build`.
- `deploy.sh`: automatiza build + docker compose.
- `check.sh`: script de verificación HTTP.

Capturas y evidencias (qué capturar y dónde guardarlas)
- Crear la carpeta para capturas:

```bash
mkdir -p deploy/report/screenshots
```

- Capturas sugeridas (nombres de archivo):
	- `01_docker_version.png`: salida de `docker --version`.
	- `02_frontend_build_tree.png`: árbol `frontend/build` mostrando `index.html` y `static/`.
	- `03_deploy_sh_output.png`: terminal con la salida de `./deploy.sh` (build + docker compose up).
	- `04_check_sh_ok.png`: salida del script `./check.sh` con `OK`.
	- `05_browser_home.png`: vista del navegador con `http://localhost:8080` mostrando la web.

- Para incrustar capturas en el informe (Markdown):

```markdown
![Docker version](deploy/report/screenshots/01_docker_version.png)
![Build tree](deploy/report/screenshots/02_frontend_build_tree.png)
![Deploy output](deploy/report/screenshots/03_deploy_sh_output.png)
![Check OK](deploy/report/screenshots/04_check_sh_ok.png)
![Browser view](deploy/report/screenshots/05_browser_home.png)
```

Comandos útiles de validación

```bash
# Validar docker-compose
docker compose config

# Ver contenedores
docker compose ps

# Logs
docker compose logs -f

# Verificar HTTP
./check.sh
```

Recomendaciones finales y mejoras sugeridas
- Añadir un `Dockerfile` multi-stage que haga la build del `frontend` y copie el resultado en una imagen `nginx` final. Esto permite distribuir una sola imagen que ya contiene el build (más adecuada para producción y CI).
- Añadir `.nvmrc` con `18` para el equipo de desarrollo y documentar la instalación de `nvm` en el README.
- Incluir en la entrega las capturas y un `report/README_REPORT.md` que describa cada una.

Acciones que puedo realizar ahora si lo deseas
- a) Crear un `Dockerfile` multi-stage y un `Makefile` con `make build` / `make deploy`.
- b) Añadir un `.nvmrc` con `18` y documentar su uso en el README.
- c) Crear la carpeta `deploy/report/screenshots/` con placeholders PNG (archivos vacíos) para que subas las capturas.

---

Informe generado el 16-11-2025 para la práctica: despliegue local con Docker Desktop.


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
