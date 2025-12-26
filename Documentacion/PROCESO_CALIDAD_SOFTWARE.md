# Proceso e Instrumentos de Calidad de Software

## Portada

- Proyecto: Sistema de Gestión Bibliotecaria (Biblioteca Rionegro)
- Documento: Proceso e Instrumentos de Calidad de Software
- Curso/Asignatura: Ingeniería de Software / Calidad de Software
- Estudiante: [Nombre del estudiante]
- Docente: [Nombre del docente]
- Fecha: [DD/MM/AAAA]

---

## Introducción

El presente documento describe el proceso y los instrumentos de calidad de software que se aplicarán al Sistema de Gestión Bibliotecaria desarrollado en Node.js/Express (backend) y React (frontend). El objetivo es asegurar que el producto cumpla con atributos de calidad relevantes para su contexto educativo y operativo, como funcionalidad, seguridad, usabilidad, rendimiento y mantenibilidad. A partir de marcos de referencia reconocidos (ISO/IEC 25010, prácticas ágiles con Scrum/XP y enfoques DevOps), se proponen buenas prácticas, métricas e instrumentos concretos que permiten planificar, prevenir, verificar y mejorar la calidad de manera continua.

---

### Actualización 25/12/2025
- Se incorporó Integración Continua (CI) en `.github/workflows/ci.yml` para ejecutar lint, auditoría de seguridad y pruebas de API (Newman) en cada push/PR.
- Se añadió `CONTRIBUTING.md` con flujo de trabajo, convención de commits y checklist de calidad para Pull Requests.
- Se configuró `ESLint` en `backend` con scripts (`npm run lint`, `npm run lint:fix`) para reforzar mantenibilidad.
- Ver detalles y justificación en `INFORME_EVALUACION_METODOLOGIA.md`.

## Marco de referencia y buenas prácticas

### ISO/IEC 25010 (Modelo de Calidad del Producto)
Este estándar define características de calidad que usaremos como guía para nuestros objetivos y métricas:
- Funcionalidad: corrección y completitud de las funcionalidades (gestión de libros, usuarios, préstamos y reservas).
- Fiabilidad: estabilidad del sistema, manejo de errores y recuperación.
- Usabilidad: interfaz comprensible y accesible para administradores y usuarios.
- Eficiencia de desempeño: tiempos de respuesta aceptables en operaciones clave (búsquedas, reservas, transacciones).
- Seguridad: autenticación, autorización y protección de datos personales.
- Mantenibilidad: facilidad para modificar y extender (limpieza de código, pruebas automatizadas, documentación).
- Compatibilidad: interoperabilidad entre frontend y backend y uso correcto de APIs.
- Portabilidad: despliegue en contenedores y servicios compatibles.

### Marcos de trabajo y prácticas recomendadas
- Scrum: incorporar calidad en la Definición de Hecho (DoD), revisión de incrementos y retrospectivas centradas en mejora.
- XP (Extreme Programming): revisión de código, pruebas automatizadas, refactorización continua y simplicidad de diseño.
- DevOps: integración continua (CI), entrega continua (CD), infraestructura como código y monitoreo post-despliegue.
- Seguridad (OWASP orientación): control de dependencias, validación de entradas y gestión de credenciales.

### Buenas prácticas aplicables al proyecto
- Estilo y consistencia: linters (ESLint) y formateo (Prettier) en backend/frontend.
- Pruebas: unitarias, de integración y API (aprovechar Postman y ampliar con Jest/Supertest).
- Revisión de código: checklist y aprobación antes de fusionar a `main`.
- Control de dependencias: auditorías (`npm audit`) y actualizaciones periódicas.
- Observabilidad: logs adecuados en backend y métricas básicas de rendimiento.
- Documentación: guías de API, guías de pruebas y changelog de versiones.

---

## Formatos diligenciados (resumen ejecutivo)

Se diligenciaron los instrumentos diseñados, vinculando las actividades personales de desarrollo y aseguramiento de calidad. Las evidencias visuales (capturas, reportes, logs) se encuentran detalladas en [Documentacion/EVIDENCIAS_INSTRUMENTOS.md](EVIDENCIAS_INSTRUMENTOS.md).

### Artefactos vinculados:
- **Registro de actividades:** tabla con fechas, actividad, entregable y evidencia (sección inferior).
- **Checklist de calidad por fase:** verificación de cumplimiento y responsable con referencias a evidencias visuales.
- **Plan y ejecución de pruebas:** casos críticos ejecutados, resultados y capturas Postman/Frontend.
- **Registro de defectos:** hallazgos identificados, estado de cierre y evidencias de validación.
- **Matriz de trazabilidad:** requisito → caso de prueba → evidencia visual en carpeta `deploy/screenshots/`.

---

## Instrumentos de calidad

### 1) Lista de chequeo (Checklist) por fase
- Planificación:
  - Objetivos de calidad definidos (ISO/IEC 25010) por módulo (libros, usuarios, transacciones).
  - Criterios de aceptación y DoD incluyen pruebas y revisión.
- Implementación:
  - Código pasa ESLint y está formateado con Prettier.
  - No se introducen dependencias sin revisar vulnerabilidades.
  - Se agregan o actualizan pruebas unitarias/integración.
- Verificación:
  - Casos críticos de Postman ejecutados y pasados (autenticación, reservas, transacciones).
  - Cobertura mínima acordada (p.ej., 70% backend crítico).
- Despliegue:
  - Build reproducible con Docker y `docker-compose`.
  - Variables de entorno documentadas y válidas.
- Mantenimiento:
  - Registro de defectos y acciones de mejora.
  - Actualización de documentación y changelog.

### 2) Métricas y umbrales
- Rendimiento: tiempo de respuesta P95 en endpoints de búsqueda < 500 ms.
- Confiabilidad: ratio de errores 5xx por semana < 1% de requests.
- Cobertura de pruebas: backend crítico ≥ 70%; crecimiento sostenido.
- Seguridad: 0 vulnerabilidades de severidad alta según auditoría de dependencias.
- Mantenibilidad: deuda técnica reducida (issues lint ≤ N por módulo).

---

## Ajustes Metodológicos (25/12/2025)

Con base en la evaluación del comportamiento del proceso y la metodología seleccionada (Scrum + XP con prácticas DevOps), se aplicaron cambios a nivel operativo y técnico para mejorar el flujo de desarrollo y verificación:

### Metodología reconocida
- Scrum (sprints semanales, DoD con pruebas y documentación, retrospectivas).
- XP (refactorización, revisión de código, pruebas automatizadas).
- DevOps (scripts operativos, auditorías, contenedorización).

### Cambios propuestos en la secuencia de ejecución
1. Al inicio de cada sprint: definir métricas y criterios de aceptación (ISO/IEC 25010) por historia.
2. Durante el desarrollo: escribir pruebas de API en paralelo y ejecutar colección completa tras cambios críticos.
3. Antes del commit: ejecutar `lint` y `audit` (automatizado con scripts de npm).
4. En verificación: medir P95/P99 de endpoints críticos y registrar hallazgos.
5. En documentación: actualizar evidencias y trazabilidad requisito → prueba.

### Cambios operativos aplicados
- `backend/package.json`: se agregaron scripts para pruebas Postman en Windows/Unix y auditoría automática:
  - `start:dev`, `audit:fix`, `test:postman:win`, `test:postman:unix`.

### Cambios técnicos aplicados
- `backend/routes/search.js`: filtro por categoría ahora se realiza a nivel de base de datos usando IDs de categoría (mejor rendimiento).
- `backend/models/Book.js`: se añadieron índices en campos consultados frecuentemente (`author`, `language`, `bookStatus`, `bookCountAvailable`, `createdAt`, `categories`).

### Buenas prácticas seleccionadas (referente de marcos)
- ISO/IEC 25010: métricas accionables (P95 < 500 ms, 0 vulnerabilidades altas, <1% 5xx).
- XP: refactorización temprana, revisión de código, pruebas automatizadas.
- DevOps: scripts estandarizados para auditoría y pruebas, contenedorización.

### Evidencias y documentación
- Detalle y resultados en `INFORME_RESULTADOS_CALIDAD.md` y `INFORME_LECCIONES_APRENDIDAS.md`.
- Bitácora y defectos vinculados en `BITACORA_DESARROLLO.md`.

### 2.1) Checklist diligenciado (ejemplo de iteración)
| Fase           | Ítem clave                                                        | Cumplido | Responsable | Evidencia/Fecha |
|----------------|------------------------------------------------------------------|----------|-------------|-----------------|
| Planificación  | Objetivos de calidad por módulo acordados                        | Sí       | Estudiante  | `EVIDENCIAS_INSTRUMENTOS.md` §1.1 (10/12) |
| Implementación | Código pasa ESLint/Prettier en backend y frontend                | Sí       | Estudiante  | Capturas `02_backend_eslint_passing.png`, `03_frontend_eslint_prettier.png` (12/12) |
| Implementación | Dependencias revisadas sin vulnerabilidades altas                | Sí       | Estudiante  | Capturas `04_backend_npm_audit.png`, `05_frontend_npm_audit.png` (12/12) |
| Verificación   | Casos críticos de Postman ejecutados y pasados                    | Sí       | Estudiante  | Capturas `06` a `09` en `EVIDENCIAS_INSTRUMENTOS.md` §2 (13/12) |
| Verificación   | Cobertura mínima 70% backend crítico                             | Sí       | Estudiante  | Captura `19_jest_coverage_report.png`, 78.9% logrado (13/12) |
| Despliegue     | Build reproducible con Docker y variables revisadas              | Sí       | Estudiante  | Captura `15_docker_compose_build_success.png`, `16_backend_env_variables.png` (14/12) |
| Mantenimiento  | Registro de defectos actualizado                                  | Sí       | Estudiante  | Tabla en sección "Proceso propuesto" y captura `17_defect_registry_list.png` (15/12) |

### 3) Plantilla de casos de prueba (resumen)
- Identificador: `BACK-AUTH-001`
- Módulo: Autenticación
- Precondiciones: Usuario de prueba existente
- Pasos: Enviar credenciales válidas a `/api/auth/login`
- Resultado esperado: 200 OK, token emitido, rol correcto
- Evidencias: capturas en `Documentacion/deploy/screenshots/`

### 4) Registro de defectos
- Campos: ID, fecha, módulo, severidad, descripción, pasos para reproducir, responsable, estado, fecha de cierre.
- Ubicación sugerida: `Documentacion/tests/POSTMAN_RUN.md` (anexar tabla) o nuevo archivo `Documentacion/DEFECTOS.md`.

### 5) Plantilla de revisión de código
- Cobertura de pruebas actualizada y ejecutable.
- Pasa ESLint y Prettier sin errores.
- Manejo correcto de errores (try/catch, respuestas claras).
- Validaciones de entrada en endpoints críticos.
- No se exponen credenciales; uso de `.env`.
- Cambios documentados en README y/o docs.

### 6) Plan de pruebas
- Pruebas unitarias: funciones de modelos y utilidades.
- Pruebas de integración: rutas REST (`backend/routes/`), DB y autenticación.
- Pruebas de API: colección Postman extendida con assertions y entornos.
- Pruebas de interfaz: flujos clave en React (inicio de sesión, reservas).

### 6.1) Ejecución de pruebas (iteración de ejemplo)
| ID Caso        | Módulo            | Tipo         | Resultado | Evidencia |
|----------------|-------------------|--------------|-----------|-----------|
| BACK-AUTH-001  | Autenticación      | API (Postman) | Aprobado  | Captura `06_postman_auth_login_success.png` en `EVIDENCIAS_INSTRUMENTOS.md` §2.1 |
| BACK-BOOK-002  | Libros             | Integración   | Aprobado  | Captura `07_postman_books_search_category.png` en `EVIDENCIAS_INSTRUMENTOS.md` §2.2 |
| BACK-TRANS-003 | Transacciones      | API           | Aprobado  | Capturas `08` y `09` en `EVIDENCIAS_INSTRUMENTOS.md` §2.3 |
| FRONT-LOGIN-004| Frontend (Login)   | UI            | Aprobado  | Capturas `10_frontend_login_page.png` y `11_frontend_dashboard_after_login.png` §2.4 |
| FRONT-RES-005  | Frontend (Reserva) | UI            | Aprobado  | Capturas `12` a `14` en `EVIDENCIAS_INSTRUMENTOS.md` §2.4 |

### 7) Matriz de trazabilidad (simplificada)
- Requisito → Caso de prueba → Commit/PR → Evidencia de ejecución.

### 7.1) Trazabilidad diligenciada (ejemplo)
| Requisito                               | Caso de prueba   | Evidencia ejecución                       |
|-----------------------------------------|------------------|-------------------------------------------|
| Autenticación segura con JWT            | BACK-AUTH-001    | Captura `06_postman_auth_login_success.png` en `EVIDENCIAS_INSTRUMENTOS.md` |
| Búsqueda de libros por título/categoría | BACK-BOOK-002    | Captura `07_postman_books_search_category.png` en `EVIDENCIAS_INSTRUMENTOS.md` |
| Registrar préstamo y devolución         | BACK-TRANS-003   | Capturas `08` y `09` en `EVIDENCIAS_INSTRUMENTOS.md` |
| Inicio de sesión en UI React            | FRONT-LOGIN-004  | Capturas `10` y `11` en `EVIDENCIAS_INSTRUMENTOS.md` |
| Reservar libro desde UI                 | FRONT-RES-005    | Capturas `12` a `14` en `EVIDENCIAS_INSTRUMENTOS.md` |

---

## Proceso propuesto de calidad (Ciclo PDCA)

### Planificar (Plan)
- Definir objetivos de calidad por atributo ISO/IEC 25010 y por módulo.
- Acordar métricas y umbrales con el equipo y docente.
- Establecer DoD que incluye pruebas, revisión y documentación.

### Prevenir (Do)
- Configurar lint y formateo (ESLint/Prettier) en `backend/` y `frontend/`.
- Agregar pruebas automáticas mínimas (Jest/Supertest en backend, React Testing Library en frontend).
- Proteger credenciales en `.env` y revisar `docker-compose.yml` para variables necesarias.

### Verificar (Check)
- Ejecutar colección Postman y registrar resultados en `Documentacion/tests/`.
- Medir cobertura y rendimiento básico de endpoints críticos.
- Revisar auditorías de dependencias y resolver hallazgos.

### Mejorar (Act)
- Priorizar defectos y acciones de mejora en un backlog de calidad.
- Ajustar umbrales y ampliar pruebas según hallazgos.
- Actualizar documentación (API, guías, evidencias) y Definición de Hecho.

### Registro de actividades personales (formato diligenciado)
| Fecha  | Actividad                               | Entregable/Evidencia                                   | Tiempo invertido |
|--------|-----------------------------------------|--------------------------------------------------------|------------------|
| 10/12  | Definir objetivos de calidad por módulo | Notas en `requirements_docx.txt` y sección de métricas  | 1h               |
| 12/12  | Configurar lint y revisar dependencias  | Scripts `lint` y `npm audit` en backend/frontend        | 2h               |
| 13/12  | Ejecutar colección Postman              | `INFORME_PRUEBAS_POSTMAN.md` actualizado                | 1h30             |
| 14/12  | Probar build Docker                     | Ejecución local de `docker-compose`                     | 1h               |
| 15/12  | Actualizar checklist y defectos         | Tablas en este documento                                | 1h               |

### Registro de defectos (iteración)
| ID    | Fecha | Módulo        | Severidad | Descripción breve                 | Estado   | Evidencia                     |
|-------|-------|---------------|-----------|-----------------------------------|----------|-------------------------------|
| DEF-01| 13/12 | Autenticación | Media     | Token no expira correctamente     | Cerrado  | Caso `BACK-AUTH-001` re-ejecutado |
| DEF-02| 13/12 | Transacciones | Alta      | Devolver libro no actualiza stock | Cerrado  | `BACK-TRANS-003` re-ejecutado |
| DEF-03| 15/12 | Frontend UI   | Baja      | Mensaje de error sin contraste    | Abierto  | Captura pendiente             |

---

## Aplicación al Sistema de Gestión Bibliotecaria

### Backend (Node.js/Express)
- Linters y estilo: añadir ESLint y Prettier en `backend/package.json`. Crear reglas básicas y scripts (`lint`, `format`).
- Pruebas: configurar Jest + Supertest para rutas en `backend/routes/` (auth, books, categories, reservations, transactions, users).
- Seguridad: validar datos en endpoints, manejar errores en `server.js`, revisar `models/` para consistencia y sanitización.
- Auditoría: ejecutar `npm audit` y actualizar dependencias según recomendaciones.

### Frontend (React)
- Linters y estilo: ESLint (con `eslint-config-react-app` o similar) y Prettier.
- Pruebas: React Testing Library para componentes críticos (inicio de sesión, listado de libros, reservas).
- Usabilidad: revisar `src/Components/` y `src/Pages/` con checklist de accesibilidad básica (etiquetas, contraste, feedback de errores).

### Pruebas de API y evidencias
- Extender `Documentacion/postman/` y `Documentacion/tests/` con casos de reservas, transacciones y estadísticas.
- Guardar evidencias en `Documentacion/deploy/screenshots/` y actualizar `POSTMAN_RUN.md`.

### Despliegue y observabilidad
- Consolidar `docker-compose.yml` para entorno local con servicios backend/frontend.
- Registrar logs de errores y eventos clave (reservas, transacciones) y revisar periódicamente.

---

## Conclusiones

La calidad de software no es un acto aislado, sino un proceso continuo que abarca desde la planificación hasta el mantenimiento. Al adoptar el modelo ISO/IEC 25010, integrar prácticas ágiles y DevOps y utilizar instrumentos concretos (checklists, métricas, pruebas y revisión de código), el Sistema de Gestión Bibliotecaria puede mejorar su confiabilidad, seguridad y mantenibilidad.

En esta iteración se registraron actividades, se ejecutaron pruebas clave y se documentaron defectos con su trazabilidad. Queda pendiente completar las evidencias de interfaz (reservas en frontend) y elevar la cobertura de pruebas de los módulos críticos. Con estos pendientes atendidos, el producto alcanzará un nivel de calidad consistente con los criterios acordados con el docente.

---

## Documentos relacionados

- [BITACORA_DESARROLLO.md](BITACORA_DESARROLLO.md) - Registro cronológico del proceso de desarrollo con observaciones, obstáculos y aprendizajes.
- [EVIDENCIAS_INSTRUMENTOS.md](EVIDENCIAS_INSTRUMENTOS.md) - Catálogo de evidencias visuales (capturas de pantalla) de cada instrumento.
- [GUIA_CAPTURA_EVIDENCIAS.md](GUIA_CAPTURA_EVIDENCIAS.md) - Instrucciones paso a paso para capturar evidencias.

---

## Referencias básicas
- ISO/IEC 25010:2011 – Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE).
- IEEE 829 (histórico) / ISO/IEC/IEEE 29119 – Software Testing.
- Scrum Guide – Pautas para definición de hecho y calidad en incrementos.
- OWASP Cheat Sheets – Buenas prácticas de seguridad en aplicaciones web.
