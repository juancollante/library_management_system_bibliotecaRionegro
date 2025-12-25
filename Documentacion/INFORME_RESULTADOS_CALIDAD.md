# Informe de Resultados del Comportamiento del Software

## Portada

- Proyecto: Sistema de Gestión Bibliotecaria (Biblioteca Rionegro)
- Documento: Informe de Resultados del Comportamiento del Software
- Curso/Asignatura: Calidad de Software / Aplicación de pruebas
- Estudiante: [Nombre del estudiante]
- Docente: [Nombre del docente]
- Fecha: [DD/MM/AAAA]

---

## Introducción

Este informe presenta los resultados del proceso de evaluación de calidad y pruebas del Sistema de Gestión Bibliotecaria, compuesto por un backend en Node.js/Express y un frontend en React. El propósito es documentar el comportamiento observado bajo pruebas, los recursos utilizados, las métricas aplicadas, los criterios de aprobación y la ponderación empleada, articulando todo con buenas prácticas derivadas de marcos de trabajo reconocidos.

---

## Análisis del componente formativo: "Aplicación de pruebas de software"

Del componente formativo se extraen los siguientes lineamientos aplicados al proyecto:
- Diseñar casos de prueba a partir de requisitos y criterios de aceptación.
- Ejecutar pruebas sistemáticas (unitarias, integración, API, UI) y registrar evidencias.
- Definir métricas y umbrales de calidad para evaluar resultados objetivamente.
- Aplicar el ciclo PDCA (Planificar, Hacer, Verificar, Actuar) para la mejora continua.

Aplicación en el proyecto: se consolidaron casos de API en Postman, se definieron métricas (rendimiento P95, cobertura, seguridad, confiabilidad), se recopilaron evidencias y se documentó la trazabilidad.

---

## Marco de referencia y buenas prácticas

- ISO/IEC 25010: guía de atributos de calidad (funcionalidad, fiabilidad, usabilidad, eficiencia, seguridad, mantenibilidad).
- Scrum/XP: incluir calidad en la Definición de Hecho, pruebas automatizadas, revisión de código y refactorización.
- DevOps: integración y entrega continua, infraestructura reproducible (Docker), observabilidad y auditorías de dependencias.

Buenas prácticas aplicadas:
- Linters (ESLint) y formateo (Prettier) en backend/frontend.
- Pruebas de API con Postman y verificación de respuestas/tiempos.
- Auditorías de dependencias (`npm audit`) y control de vulnerabilidades.
- Documentación y trazabilidad en `Documentacion/` (procesos, evidencias y bitácora).

---

## Metodología de evaluación

- Tipos de pruebas: unitarias (backend utilidades/modelos), integración (rutas y DB), API (Postman), UI (React), rendimiento básico (tiempos de respuesta), seguridad (auditoría de dependencias).
- Herramientas: Postman, Docker, ESLint/Prettier, npm audit, (opcional: Jest/Supertest, React Testing Library).
- Evidencias: ver `EVIDENCIAS_INSTRUMENTOS.md` y carpeta `Documentacion/deploy/screenshots/`.
- Bitácora: ver `BITACORA_DESARROLLO.md`.

---

## Recursos utilizados para la evaluación

### Equipo evaluador
- Estudiante (rol QA/Desarrollador): [Nombre del estudiante]
- Docente (revisión académica): [Nombre del docente]
- (Opcional) Compañero de clase: apoyo en revisión cruzada

### Métricas utilizadas
- Rendimiento: tiempo de respuesta P95 por endpoint.
- Confiabilidad: porcentaje de respuestas 5xx sobre total de requests.
- Cobertura de pruebas (si aplica Jest): porcentaje en módulos críticos.
- Seguridad: número de vulnerabilidades por severidad (npm audit).
- Mantenibilidad: número de issues de lint por módulo.

### Ponderación (ejemplo)
| Atributo (ISO/IEC 25010) | Métrica/Medio | Peso |
|--------------------------|---------------|------|
| Seguridad                | npm audit     | 25%  |
| Funcionalidad            | Casos API     | 20%  |
| Confiabilidad            | Errores 5xx   | 15%  |
| Rendimiento              | P95 ms        | 15%  |
| Usabilidad               | UI verificada | 10%  |
| Mantenibilidad           | Lint issues   | 10%  |
| Documentación            | Evidencias    | 5%   |
| TOTAL                    |               | 100% |

### Fidelidades de medición
- Ambiente controlado (local): misma máquina, mismos datos de prueba.
- Repetición: cada caso crítico ejecutado al menos 3 veces.
- Tiempos: medidos desde Postman y verificados en logs.
- Limitaciones: variabilidad del entorno local, ausencia de carga concurrente.

### Criterios de aprobación
- Rendimiento: P95 < 500 ms en endpoints críticos (búsqueda, autenticación, transacciones).
- Cobertura: backend crítico ≥ 70% (si aplica) o evidencia de pruebas integrales en API/UI.
- Seguridad: 0 vulnerabilidades de severidad alta.
- Confiabilidad: errores 5xx < 1% del total.
- Pruebas: 100% de casos críticos aprobados.

### Recursos de infraestructura
- SO: Windows 10/11 (equipo del estudiante).
- Node.js: v18+
- npm: v9+
- Docker Desktop: última versión.
- Postman: última versión.
- Base de datos local: MongoDB (contenedor) o servicio local.

### Tipos de pruebas y pruebas realizadas
- API (Postman): autenticación, libros (CRUD y búsqueda), transacciones (préstamo/devolución), categorías, estadísticas.
- UI (React): inicio de sesión, navegación a dashboard, reservas, listado de libros.
- Seguridad (dependencias): auditoría con `npm audit`.
- Rendimiento básico: medición de tiempos por endpoint en Postman.

---

## Resultados (resumen)

### Pruebas de API (Postman)
- Total de casos críticos: 5
- Aprobados: 5/5 (100%)
- Evidencias: ver `INFORME_PRUEBAS_POSTMAN.md` y `EVIDENCIAS_INSTRUMENTOS.md` (capturas 06–09).

### Rendimiento (ejemplo observado)
- `POST /api/auth/login`: ~245 ms (P95)
- `GET /api/books/search`: ~320 ms (P95)
- `POST /api/transactions/borrow`: ~185 ms (P95)
- `GET /api/statistics`: ~420 ms (P95)
- Cumplimiento: Todos < 500 ms → Aprobado.

### Seguridad
- Auditoría de dependencias: 0 vulnerabilidades de severidad alta.

### Confiabilidad
- Ratio de 5xx: < 1% en pruebas locales → Aprobado.

### Mantenibilidad
- Lint: sin errores críticos; warnings menores atendidos.

### Cobertura (si aplica)
- Backend crítico: ≥ 70% (objetivo) → En proceso/pendiente si no se ejecutó Jest.

---

## Evaluación ponderada (ejemplo)

| Atributo       | Peso | Resultado | Puntos |
|----------------|------|-----------|--------|
| Seguridad      | 25%  | Aprobado  | 25     |
| Funcionalidad  | 20%  | 100% API  | 20     |
| Confiabilidad  | 15%  | <1% 5xx   | 15     |
| Rendimiento    | 15%  | P95 <500  | 15     |
| Usabilidad     | 10%  | Flujos UI | 9      |
| Mantenibilidad | 10%  | Lint ok   | 9      |
| Documentación  | 5%   | Completa  | 5      |
| TOTAL          | 100% |           | 98/100 |

Notas: Usabilidad y Mantenibilidad se califican 9/10 por pendientes menores (mejorar contraste de errores, ampliar reglas ESLint).

---

## Bitácora de procesos documentales (resumen)

Se registraron actividades, decisiones y evidencias en `BITACORA_DESARROLLO.md`, destacando:
- Diseño y ejecución de colección Postman.
- Corrección de defectos DEF-01 (expiración de token) y DEF-02 (actualización de stock en devolución).
- Captura de evidencias y consolidación de documentación.

---

## Conclusiones

El sistema cumple con los criterios de calidad definidos para el contexto del proyecto: tiempos de respuesta adecuados, funcionalidad verificada mediante pruebas de API y UI, ausencia de vulnerabilidades altas y documentación completa. Se recomiendan como mejoras futuras: elevar la cobertura con Jest/Supertest en backend, integrar pruebas de UI automatizadas y fortalecer la observabilidad.

La aplicación de buenas prácticas (ISO/IEC 25010, Scrum/XP, DevOps) y el proceso PDCA permitió obtener resultados medibles y sostenibles. Las evidencias recopiladas respaldan el desempeño observado y la trazabilidad del proceso.

---

## Referencias
- ISO/IEC 25010:2011 – Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE).
- ISO/IEC/IEEE 29119 – Software Testing.
- Scrum Guide.
- OWASP Cheat Sheets.
- Documentos del proyecto en `Documentacion/`.
