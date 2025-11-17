# Informe de despliegue a GitHub Pages

Este documento describe paso a paso el proceso realizado para publicar la aplicación frontend de este proyecto en GitHub Pages. Está redactado en español y contiene comandos, enlaces a recursos y marcadores para capturas de pantalla.

**Resumen objetivo**
- Publicar la carpeta `frontend/build` en GitHub Pages usando un workflow de GitHub Actions.
- Proveer instrucciones para asignar un dominio personalizado gratuito (ej.: Freenom) y dejar los archivos necesarios en el repo (`CNAME`).
- Incluir capturas de pantalla indicativas y fuentes utilizadas.

---

## 1) Requisitos previos
- Tener una cuenta de GitHub con acceso al repositorio `juancollante/library_management_system_bibliotecaRionegro`.
- El frontend ya debe estar listo en `frontend/build`. (En este repo ya existe la carpeta `frontend/build` con el build estático).
- Tener permisos para crear workflows (push a la rama con los cambios).

Fuentes y herramientas utilizadas:
- GitHub Pages: https://pages.github.com/
- peaceiris/actions-gh-pages (acción usada para publicar): https://github.com/peaceiris/actions-gh-pages
- Freenom (dominios gratuitos sugeridos): https://www.freenom.com/

---

## 2) Archivo workflow usado
Se creó el archivo `.github/workflows/deploy-pages.yml` con un job que:
- Instala Node 18
- Ejecuta `npm ci` y `npm run build` dentro de `frontend` (si es necesario)
- Publica el contenido de `frontend/build` en la rama `gh-pages` usando `peaceiris/actions-gh-pages`

(Ver el archivo en el repo para el contenido exacto del workflow.)

---

## 3) Pasos que ejecuté (acción automática)
1. Hice un commit vacío y `git push` para disparar el workflow desde la rama `feature/add-postman-tests-readme`:

```bash
git commit --allow-empty -m "ci: trigger gh-pages deploy"
git push origin HEAD
```

2. Consulté los runs recientes de GitHub Actions para el repositorio (API pública):

```bash
curl -s "https://api.github.com/repos/juancollante/library_management_system_bibliotecaRionegro/actions/runs?per_page=5"
```

Resultado: se detectaron dos ejecuciones del workflow `Deploy Frontend to GitHub Pages` y ambas han terminado con `conclusion: failure`.

- Run #2 (más reciente): https://github.com/juancollante/library_management_system_bibliotecaRionegro/actions/runs/19417018498
- Run #1: https://github.com/juancollante/library_management_system_bibliotecaRionegro/actions/runs/19416764355

> Captura sugerida: `deploy/screenshots/run-fail-01.png` (poner captura de la página de logs con el error). 

---

## 4) Diagnóstico inicial de fallos en el workflow
Los runs terminaron con `failure`. Para identificar la causa se deben revisar los logs del run (en la interfaz web de Actions). Pasos de diagnóstico:

- Abrir cualquiera de los enlaces de run arriba.
- Ir a la sección `Jobs` y revisar las etapas: `Setup Node`, `Install dependencies`, `Build`, `Deploy`.
- Copiar las líneas de error más relevantes (por ejemplo errores de `npm install`, errores de OpenSSL/webpack, problemas con `gh-pages` o permiso de token).

> Captura sugerida: `deploy/screenshots/log-error-build.png`

---

## 5) Correcciones habituales y soluciones
Según errores comunes vistos en otros entornos (anteriores pruebas locales), las correcciones típicas son:

- Si el build falla por OpenSSL (error `ERR_OSSL_EVP_UNSUPPORTED` en Node >= 17): agregar la variable de entorno `NODE_OPTIONS=--openssl-legacy-provider` al paso de build del workflow o usar Node 18/16.
- Si `npm ci` falla por lockfile o dependencias nativas: asegurarse de que `package.json` y `package-lock.json` están actualizados en la rama.
- Si la acción `peaceiris/actions-gh-pages` falla al publicar: comprobar token/permissions. La acción por defecto usa `GITHUB_TOKEN` (suficiente si el repo es público), pero revisar logs para mensajes específicos.

Si quieres, puedo modificar el workflow para setear `NODE_OPTIONS` durante el build y reintentar.

---

## 6) Despliegue manual alternativo (si se desea verificar inmediatamente)
Si deseas ver la web inmediatamente sin esperar a Actions, puedes levantar un contenedor `nginx` local que sirva `frontend/build`:

```bash
docker compose up -d --build
# o
docker run --rm -p 8080:80 -v "$PWD/frontend/build:/usr/share/nginx/html:ro" nginx:alpine
```

Luego abrir: http://localhost:8080

> Captura sugerida: `deploy/screenshots/local-nginx-serve.png`

---

## 7) Dominio personalizado gratuito (Freenom) y configuración DNS
1. Registrar un dominio gratuito en Freenom (p. ej. `midominio.ml` / `midominio.ga`).
2. En el panel de Freenom, en la sección de gestión del dominio, agregar los **A records** necesarios para GitHub Pages:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

3. Crear un archivo `CNAME` en la raíz del repo (ej.: `deploy/CNAME.example` o directamente `CNAME`) con el dominio (`midominio.ml`). Cuando `gh-pages` publique, el archivo `CNAME` será preservado si se publica la carpeta raíz.

4. En el repositorio GitHub → Settings → Pages, configurar el dominio personalizado y comprobar el estado (HTTPS provisioning puede tardar).

> Captura sugerida: `deploy/screenshots/freenom-dns.png`

Fuentes:
- GitHub Pages custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- Freenom: https://www.freenom.com/

---

## 8) Archivos añadidos en este repositorio
- `deploy/GITHUB_PAGES_REPORT.md` (este informe)
- `deploy/screenshots/` (carpeta con marcadores para capturas)

---

## 9) Próximos pasos que propongo
- (Recomendado) Modificar el workflow para exportar `NODE_OPTIONS=--openssl-legacy-provider` durante el build y reintentar el run.
- Añadir `CNAME` con el dominio gratuito cuando lo tengas registrado.
- Si quieres que automatice el registro en Freenom o gestione DNS, necesitaré tus credenciales (no recomendado) o lo puedes hacer y yo te guío.

---

## 10) Evidencias (donde colocar capturas)
- `deploy/screenshots/run-fail-01.png` — captura del run fallido en Actions
- `deploy/screenshots/log-error-build.png` — sección del log con el error
- `deploy/screenshots/local-nginx-serve.png` — captura al servir localmente
- `deploy/screenshots/freenom-dns.png` — panel de Freenom con A records



---

Si quieres, ahora procedo con cualquiera de estas acciones concretas:
- (1) Modificar el workflow para añadir `NODE_OPTIONS` y reintentar.
- (2) Ejecutar otro commit vacío para re-disparar el workflow (si ya corregimos algo).
- (3) Añadir `CNAME` con un dominio que me indiques.
- (4) Levantar `nginx` localmente y mostrar la web en `localhost:8080`.

Indica qué opción quieres que ejecute ahora y yo la hago.
