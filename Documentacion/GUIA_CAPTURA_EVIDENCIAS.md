# Guía Práctica: Captura de Evidencias de Instrumentos de Calidad

## Introducción

Este documento proporciona instrucciones paso a paso para capturar las evidencias visuales (screenshots) requeridas para validar cada instrumento de calidad del Sistema de Gestión Bibliotecaria.

---

## Parte 1: Preparación del Entorno

### 1.1 Requisitos previos
- Ambiente local completamente configurado (backend y frontend corriendo)
- Herramientas instaladas: Node.js, npm, Docker, Postman
- Base de datos poblada con datos de prueba
- Usuario de prueba existente (ej: admin@biblioteca.com / admin123)

### 1.2 Estructura de carpetas para almacenar evidencias
```bash
# Crear carpeta de screenshots si no existe
mkdir -p Documentacion/deploy/screenshots

# Desplazarse a esa carpeta para guardar archivos
cd Documentacion/deploy/screenshots
```

### 1.3 Configuración de Postman
- Importar colección: `Documentacion/postman/Postman_Collection.json`
- Importar entorno: `Documentacion/postman/Postman_Environment.json`
- Verificar URL base: `{{BASE_URL}}` = `http://localhost:5000`

---

## Parte 2: Capturas de Herramientas CLI

### 2.1 Captura: Backend ESLint (01)
**Archivo esperado:** `02_backend_eslint_passing.png`

**Pasos:**
```bash
# En la carpeta backend/
cd backend
npm install

# Ejecutar linter
npm run lint

# Capturar pantalla (Windows/Mac/Linux)
# - Windows: Win + Shift + S
# - Mac: Cmd + Shift + 4
# - Linux: Print Screen

# Guardar en: ../Documentacion/deploy/screenshots/02_backend_eslint_passing.png
```

**Qué debe verse en la captura:**
- Terminal mostrando ejecución exitosa
- Mensaje: "✓ X files checked" o similar
- Errores: 0 (o mínimo aceptable)
- Sin líneas rojas de error crítico

---

### 2.2 Captura: Frontend ESLint & Prettier (03)
**Archivo esperado:** `03_frontend_eslint_prettier.png`

**Pasos:**
```bash
# En la carpeta frontend/
cd frontend
npm install

# Ejecutar linter
npm run lint

# Ejecutar prettier (si está configurado)
npm run format

# Capturar resultado exitoso
```

**Qué debe verse:**
- Confirmación de archivos formateados
- Sin errores de linting en componentes críticos

---

### 2.3 Captura: Backend npm audit (04)
**Archivo esperado:** `04_backend_npm_audit.png`

**Pasos:**
```bash
cd backend

# Ejecutar auditoría
npm audit

# Capturar pantalla completa del reporte
```

**Qué debe verse:**
- Número total de vulnerabilidades (esperado: 0)
- Status: "up to date"
- Desglose de severidad (high, moderate, low)

---

### 2.4 Captura: Frontend npm audit (05)
**Archivo esperado:** `05_frontend_npm_audit.png`

**Pasos:**
```bash
cd frontend

# Ejecutar auditoría
npm audit

# Capturar reporte
```

**Nota:** Es aceptable tener vulnerabilidades MODERATE en archivos no críticos (build, assets).

---

### 2.5 Captura: Docker Compose Build (15)
**Archivo esperado:** `15_docker_compose_build_success.png`

**Pasos:**
```bash
# En la raíz del proyecto
cd /path/to/library_management_system

# Ejecutar docker-compose
docker-compose up --build

# Capturar cuando veas los mensajes:
# - "Creating library_db_1 ... done"
# - "Creating library_backend_1 ... done"
# - "Creating library_frontend_1 ... done"
```

**Qué debe verse:**
- Todos los servicios en color verde o "done"
- URLs de acceso (http://localhost:3000, http://localhost:5000)
- Sin mensajes de error rojo

---

### 2.6 Captura: Jest Coverage Report (19)
**Archivo esperado:** `19_jest_coverage_report.png`

**Pasos:**
```bash
cd backend

# Instalar Jest si no está
npm install --save-dev jest supertest

# Ejecutar pruebas con cobertura
npm run test:coverage

# Capturar la tabla de resumen de cobertura
```

**Qué debe verse:**
- Tabla con columnas: File, Stmts, Branch, Funcs, Lines
- Porcentajes ≥ 70% (mínimo)
- Total de cobertura en la última fila

---

### 2.7 Captura: Security Audit Clean (20)
**Archivo esperado:** `20_security_audit_clean.png`

**Pasos:**
```bash
# En backend o frontend
npm audit --production

# Si todo está limpio, capturar:
# "0 vulnerabilities"
```

---

## Parte 3: Capturas de Postman

### 3.1 Configuración previa
1. Abrir Postman
2. Importar colección desde `Documentacion/postman/Postman_Collection.json`
3. Importar entorno desde `Documentacion/postman/Postman_Environment.json`
4. Asegurar que el backend está corriendo en `http://localhost:5000`

### 3.2 Captura: Login Exitoso (06)
**Archivo esperado:** `06_postman_auth_login_success.png`

**Pasos:**
1. En Postman, seleccionar endpoint: `POST /api/auth/login`
2. Body (JSON):
   ```json
   {
     "email": "admin@biblioteca.com",
     "password": "admin123"
   }
   ```
3. Clic en "Send"
4. Capturar pantalla mostrando:
   - Request en la sección izquierda
   - Response en la sección derecha
   - Status: **200 OK** (en verde)
   - Response body con `token` y `user` info

**Estructura de respuesta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "admin@biblioteca.com",
    "role": "ADMIN"
  }
}
```

---

### 3.3 Captura: Búsqueda de Libros (07)
**Archivo esperado:** `07_postman_books_search_category.png`

**Pasos:**
1. Endpoint: `GET /api/books/search?category=Ficción`
2. Headers: Agregar header `Authorization: Bearer <token>` (copiar del login anterior)
3. Clic en "Send"
4. Capturar:
   - Status: **200 OK**
   - Response con array de libros
   - Campos: id, title, category, available, reserved

**Validar que aparezcan campos:**
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "id": "5",
      "title": "El Quijote",
      "category": "Ficción",
      "available": 3
    }
  ]
}
```

---

### 3.4 Captura: Préstamo de Libro (08)
**Archivo esperado:** `08_postman_transaction_borrow.png`

**Pasos:**
1. Endpoint: `POST /api/transactions/borrow`
2. Body:
   ```json
   {
     "bookId": "5",
     "userId": "2",
     "dueDate": "2025-01-21"
   }
   ```
3. Headers: Incluir token de autenticación
4. Clic en "Send"
5. Capturar:
   - Status: **201 Created**
   - Response con `transactionId`, `status: "ACTIVO"`, fechas

---

### 3.5 Captura: Devolución de Libro (09)
**Archivo esperado:** `09_postman_transaction_return.png`

**Pasos:**
1. Endpoint: `POST /api/transactions/return`
2. Body:
   ```json
   {
     "transactionId": "TRANS-20251220-001"
   }
   ```
3. Clic en "Send"
4. Capturar:
   - Status: **200 OK**
   - Response con `status: "CERRADO"`, `returnDate`, `finalStatus: "Devuelto en término"`

---

### 3.6 Captura: Métricas de Rendimiento (18)
**Archivo esperado:** `18_performance_metrics_p95.png`

**Pasos (en Postman):**
1. Ejecutar cada request varias veces
2. En la pestaña de cada request, ver "Response time" (ej: 245 ms)
3. Usar herramienta de Postman: Collection Runner
   - Seleccionar colección
   - Run Collection
   - Capturar resumen de tiempos

**Datos esperados:**
- GET /books/search → ~320 ms
- POST /auth/login → ~245 ms
- POST /transactions → ~185 ms
- Todos < 500 ms

---

## Parte 4: Capturas de Frontend (React)

### 4.1 Preparación
```bash
cd frontend
npm install
npm start
```

El navegador abrirá en `http://localhost:3000`

### 4.2 Captura: Página de Login (10)
**Archivo esperado:** `10_frontend_login_page.png`

**Pasos:**
1. Si estás autenticado, cerrar sesión
2. Navegar a `/signin` (o ir a Login)
3. Capturar pantalla mostrando:
   - Formulario con campos: Email, Password
   - Botón "Iniciar Sesión"
   - Logo/Header de biblioteca visible
   - Sin errores en consola

**Resolución recomendada:** 1280 x 720

---

### 4.3 Captura: Dashboard Post-Login (11)
**Archivo esperado:** `11_frontend_dashboard_after_login.png`

**Pasos:**
1. Ingresa credenciales: admin@biblioteca.com / admin123
2. Clic en "Iniciar Sesión"
3. Esperar redirección a Dashboard
4. Capturar pantalla mostrando:
   - Bienvenida personalizada: "Bienvenido, Admin"
   - Menú lateral: Libros, Miembros, Transacciones, Estadísticas
   - Panel de estadísticas o cards
   - Estado de autenticación confirmado

---

### 4.4 Captura: Lista de Libros (12)
**Archivo esperado:** `12_frontend_books_list.png`

**Pasos:**
1. Desde Dashboard, clic en "Libros" o "Ver Todos los Libros"
2. Esperar carga de grid/lista de libros
3. Capturar mostrando:
   - Grid de libros con portadas/imágenes
   - Cada libro muestra: título, autor, disponibilidad
   - Botones: "Ver Detalles", "Reservar"
   - Indicador de cantidad disponible (ej: "3 disponibles")

---

### 4.5 Captura: Modal de Reserva (13)
**Archivo esperado:** `13_frontend_reservation_modal.png`

**Pasos:**
1. En la lista de libros, clic en "Reservar" en cualquier libro disponible
2. Se abrirá un modal de confirmación
3. Capturar mostrando:
   - Overlay oscuro de fondo
   - Modal centrado con texto: "¿Desea reservar '[Nombre del Libro]'?"
   - Botones: "Confirmar", "Cancelar"
   - Sin errores visuales

---

### 4.6 Captura: Confirmación de Reserva (14)
**Archivo esperado:** `14_frontend_reservation_success.png`

**Pasos:**
1. En el modal anterior, clic en "Confirmar"
2. Modal se cierra
3. Capturar el toast/notificación de éxito mostrando:
   - Mensaje verde: "¡Reserva realizada exitosamente!"
   - Ícono de check ✓
   - Duración: ~3-4 segundos
   - Opcionalmente: redirección a página "Mis Reservas"

---

### 4.7 Captura: Dashboard de Calidad (21) - OPCIONAL
**Archivo esperado:** `21_quality_dashboard_summary.png`

**Este es un resumen visual.** Puede ser:
- Una imagen compilada con íconos de estado
- Una página que muestres creando (ej: componente React con un dashboard)
- O simplemente un resumen en tabla formato imagen

**Contenido esperado:**
```
DASHBOARD DE CALIDAD - Sistema Gestión Bibliotecaria

Checklist Completado:        7/7 ✅
Pruebas Ejecutadas:          5/5 ✅
Defectos:                    3 (2 cerrados, 1 abierto)
Cobertura de Pruebas:        78.9%
Vulnerabilidades (ALTA):     0 ✅
Rendimiento (P95):           420 ms ✅ (< 500ms)
```

---

## Parte 5: Organización Final de Archivos

### 5.1 Checklist de archivos esperados
```
✓ 02_backend_eslint_passing.png
✓ 03_frontend_eslint_prettier.png
✓ 04_backend_npm_audit.png
✓ 05_frontend_npm_audit.png
✓ 06_postman_auth_login_success.png
✓ 07_postman_books_search_category.png
✓ 08_postman_transaction_borrow.png
✓ 09_postman_transaction_return.png
✓ 10_frontend_login_page.png
✓ 11_frontend_dashboard_after_login.png
✓ 12_frontend_books_list.png
✓ 13_frontend_reservation_modal.png
✓ 14_frontend_reservation_success.png
✓ 15_docker_compose_build_success.png
✓ 16_backend_env_variables.png (opcional)
✓ 17_defect_registry_list.png
✓ 18_performance_metrics_p95.png
✓ 19_jest_coverage_report.png
✓ 20_security_audit_clean.png
✓ 21_quality_dashboard_summary.png (opcional)
```

### 5.2 Ubicación final
```
Documentacion/
└── deploy/
    └── screenshots/
        ├── 02_backend_eslint_passing.png
        ├── 03_frontend_eslint_prettier.png
        ├── 04_backend_npm_audit.png
        ├── ...
        └── 21_quality_dashboard_summary.png
```

---

## Parte 6: Validación de Calidad de Capturas

### 6.1 Checklist visual para cada captura
- [ ] Resolución mínima: 1280 x 720 píxeles
- [ ] Texto legible (sin borroso)
- [ ] Toda la información clave visible
- [ ] Sin información sensible expuesta (redactar tokens/contraseñas si aparecen)
- [ ] Formato: PNG (preferido) o JPG (aceptable)
- [ ] Nombre de archivo coincide con numeración

### 6.2 Recomendaciones para mejor calidad
- Usar herramienta nativa del SO (Print Screen, Cmd+Shift+4, etc.)
- O herramientas recomendadas: Snagit, Greenshot, ShareX
- Ajustar zoom si es necesario (100-125%) para legibilidad
- Redactar información sensible con borrador/blur
- Guardar con nomenclatura clara: `NN_descripcion.png`

---

## Parte 7: Integración con Documento Principal

Una vez capturadas todas las evidencias:

1. Verificar que todas las rutas en `EVIDENCIAS_INSTRUMENTOS.md` son correctas
2. Validar que `PROCESO_CALIDAD_SOFTWARE.md` referencia cada captura
3. Compilar documento final en formato PDF (opcional) con imágenes embebidas
4. Entregar carpeta completa: `Documentacion/deploy/screenshots/`

---

## Parte 8: Solución de Problemas Comunes

### Problema: "Backend no arranca"
**Solución:**
- Verificar puerto 5000 disponible: `lsof -i :5000` (Mac/Linux) o `netstat -ano | findstr :5000` (Windows)
- Revisar archivo `.env` en backend
- Reiniciar servidor: `npm start`

### Problema: "Postman muestra error 401 Unauthorized"
**Solución:**
- Verificar que el login fue exitoso primero
- Copiar token completo del response
- Agregar header: `Authorization: Bearer <token_completo>`
- Revisar que el token no haya expirado

### Problema: "Frontend muestra blank page"
**Solución:**
- Abrir consola del navegador (F12)
- Ver si hay errores en Network o Console
- Verificar que el backend está corriendo
- Limpiar caché: Ctrl+Shift+Del y recargar

### Problema: "No veo cambios después de npm start"
**Solución:**
- Ctrl+Shift+R (recarga dura)
- Cerrar y reabrir navegador
- Limpiar node_modules: `rm -rf node_modules && npm install`

---

**Documento creado:** 21/12/2025  
**Última actualización:** 21/12/2025  
**Estado:** Listo para uso
