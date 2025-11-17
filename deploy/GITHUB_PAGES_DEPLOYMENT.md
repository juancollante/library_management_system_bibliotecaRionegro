# Despliegue en GitHub Pages — Biblioteca Rionegro

Fecha: 16-11-2025

Este documento explica paso a paso cómo publicar la web del proyecto `library_management_system_bibliotecaRionegro` en GitHub Pages y, opcionalmente, cómo asociar un dominio personalizado gratuito. Se incluyen dos alternativas para publicar:

- Publicación automática con GitHub Actions (recomendada).
- Publicación manual copiando `frontend/build` a la carpeta `docs/` (método rápido).

Requisitos previos

- Repositorio en GitHub (se usará `https://github.com/juancollante/library_management_system_bibliotecaRionegro`).
- Permisos para crear workflows y editar `Settings → Pages` del repo.
- Si quieres un dominio personalizado gratuito: registro en Freenom (o similar) para obtener `.tk`, `.ml`, `.ga`, `.cf`, etc.

1) Preparar la aplicación (local)

1.1. Desde la raíz del repositorio, construir la aplicación React (`frontend`):

```bash
cd frontend
npm install
npm run build
```

1.2. Verificar que `frontend/build/index.html` existe y que los assets están en `frontend/build/static`.

Captura sugerida: `deploy/report/screenshots/02_frontend_build_tree.png` mostrando `frontend/build`.

2) Opción A — Publicación automática con GitHub Actions (recomendada)

2.1. Qué hace el workflow

El workflow que añadimos compila la app desde `frontend/` y publica los archivos estáticos en la rama `gh-pages` usando `peaceiris/actions-gh-pages`. GitHub Pages sirve el contenido desde `gh-pages`.

2.2. Archivo de workflow (ya agregado en el repo): `.github/workflows/deploy-pages.yml`.

2.3. Pasos que el workflow ejecuta (resumen):
- checkout del repo
- setup Node.js
- instalar dependencias en `frontend/` y ejecutar `npm run build`
- desplegar `frontend/build` al branch `gh-pages`

2.4. Activar Pages en el repositorio

1. Ve a `Settings -> Pages` en GitHub.
2. Si corresponde, selecciona la fuente `gh-pages` (branch) y la carpeta `/`.
3. Guarda. GitHub empezará a publicar la página en `https://<owner>.github.io/<repo>/` o, si es un repo de usuario con nombre `username/username.github.io`, en la raíz.

2.5. Verificar despliegue

Después de que el workflow termine (ver pestaña Actions), abre:
```
https://juancollante.github.io/library_management_system_bibliotecaRionegro/
```

Capturas sugeridas:
- `deploy/report/screenshots/03_github_actions_run.png` (pantalla del workflow en Actions).
- `deploy/report/screenshots/04_pages_settings.png` (Settings → Pages con `gh-pages` como fuente).
- `deploy/report/screenshots/05_browser_github_pages.png` (sitio en navegador).

3) Opción B — Publicación manual (método rápido)

3.1. Copiar `frontend/build` a `docs/` y push

```bash
rm -rf docs && mkdir docs
cp -r frontend/build/* docs/
git add docs
git commit -m "chore(docs): deploy frontend to docs for GitHub Pages"
git push
```

3.2. En `Settings -> Pages` seleccionar `Branch: main` y carpeta `/docs`.

4) Dominio personalizado gratuito (opcional)

4.1. Registrar dominio gratuito

Usa Freenom (https://www.freenom.com) para registrar un dominio gratuito `.tk/.ml/.ga/.cf/.gq`. Sigue el flujo de registro y obtén el dominio.

4.2. Configurar DNS para GitHub Pages

En el panel DNS del registrador crea estos registros:
- A records (4 entradas) apuntando a:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- (opcional) CNAME para `www` apuntando a `juancollante.github.io` (o a `<owner>.github.io`).

4.3. Añadir `CNAME` al repo

En la rama publicada (`gh-pages`), crea un archivo llamado `CNAME` con el contenido del dominio (por ejemplo `midominio.tk`). El workflow `peaceiris/actions-gh-pages` mantiene el CNAME si lo añades como `deploy/CNAME.example` y luego lo copias manualmente, o puedes añadir un paso de Action para crear CNAME.

Capturas sugeridas:
- `deploy/report/screenshots/06_freenom_dns.png` (panel DNS con A records).
- `deploy/report/screenshots/07_github_pages_custom_domain.png` (Settings → Pages mostrando el dominio personalizado).

5) HTTPS

GitHub Pages habilita HTTPS automáticamente si el dominio apunta correctamente y los registros DNS se han propagado. En `Settings → Pages` habilita "Enforce HTTPS".

6) Archivos añadidos al repo (automáticamente por mí)

- `.github/workflows/deploy-pages.yml` — workflow para compilar y publicar `frontend` en `gh-pages`.
- `deploy/GITHUB_PAGES_DEPLOYMENT.md` — este documento.
- `deploy/CNAME.example` — plantilla para tu CNAME.

7) Siguientes pasos y comprobaciones finales

1. Si usas el workflow: ve a la pestaña `Actions` y revisa la ejecución del job `deploy-pages`.
2. Comprueba que la rama `gh-pages` exista y que contenga los archivos estáticos.
3. Verifica en `Settings → Pages` que la fuente sea `gh-pages` y que la URL pública responde.

8) Fuentes y referencias

- GitHub Pages docs: https://docs.github.com/en/pages
- Freenom: https://www.freenom.com
- peaceiris/actions-gh-pages: https://github.com/peaceiris/actions-gh-pages

---

Si quieres, puedo:
- A) Añadir el `CNAME` final (si me indicas el dominio que registraste).
- B) Crear la rama `gh-pages` y subir los archivos (si me autorizas a hacer push con tu identidad configurada — actualmente ya subí cambios a tu repo con tu confirmación anterior).
- C) Generar capturas de ejemplo y placeholders en `deploy/report/screenshots/`.

Indica qué prefieres y lo implemento.
