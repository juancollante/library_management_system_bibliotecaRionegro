# Plan de Ajustes Metodológicos y Evaluación

## Portada
- Proyecto: Sistema de Gestión Bibliotecaria (Biblioteca Rionegro)
- Documento: Plan de Ajustes Metodológicos y Evaluación
- Metodología: Scrum + XP con prácticas DevOps
- Fecha: 25/12/2025
- Elaborado por: [Nombre del estudiante]
- Instructor: [Nombre del docente]

---

## Introducción
Este documento evalúa el proceso de desarrollo según la metodología seleccionada y registra los cambios propuestos y aplicados a nivel operativo y técnico, siguiendo buenas prácticas de calidad alineadas con ISO/IEC 25010.

---

## 1. Reconocimiento de la metodología (30%)
- **Scrum:** sprints semanales, DoD con pruebas/documentación, retrospectivas.
- **XP:** refactorización, revisión de código, pruebas automatizadas.
- **DevOps:** scripts de auditoría y pruebas, contenedorización, configuración por entorno.

**Evidencia:** `BITACORA_DESARROLLO.md`, `PROCESO_CALIDAD_SOFTWARE.md`.

---

## 2. Cambios en la secuencia de procesos (40%)
### Propuesta
1. Planificación: definir métricas (ISO/IEC 25010) y criterios de aceptación por historia.
2. Desarrollo: implementar pruebas de API en paralelo; ejecutar colección completa tras cambios críticos.
3. Pre-commit: ejecutar `lint` y `audit`.
4. Verificación: medir P95/P99 en endpoints y registrar hallazgos.
5. Documentación: actualizar evidencias y trazabilidad.

### Aplicación (Operativo y Técnico)
- **Operativo:** nuevos scripts en `backend/package.json`:
  - `start:dev`, `audit:fix`, `test:postman:win`, `test:postman:unix`.
- **Técnico:** mejoras de búsqueda y rendimiento:
  - Filtro de categoría a nivel de BD en `routes/search.js`.
  - Índices en `models/Book.js` (author, language, status, countAvailable, createdAt, categories).

**Evidencia:** commits asociados y sección "Ajustes Metodológicos" en `PROCESO_CALIDAD_SOFTWARE.md`.

---

## 3. Buenas prácticas de calidad (15%)
- ISO/IEC 25010: P95 < 500 ms, 0 vulnerabilidades altas, <1% 5xx, cobertura mínima acordada.
- XP: refactorización continua, pruebas automatizadas, revisión de código.
- DevOps: auditorías periódicas, scripts estandarizados, contenedorización.

**Evidencia:** `INFORME_RESULTADOS_CALIDAD.md`, `INFORME_LECCIONES_APRENDIDAS.md`.

---

## 4. Documentación de cambios (15%)
- Sección añadida en `PROCESO_CALIDAD_SOFTWARE.md`: "Ajustes Metodológicos (25/12/2025)".
- Detalle en `PLAN_AJUSTES_METODOLOGICOS.md` (este documento).
- Vinculaciones en `BITACORA_DESARROLLO.md` y evidencias en `Documentacion/deploy/screenshots/`.

---

## Conclusiones
Los ajustes metodológicos y técnicos mejoran la eficiencia de búsqueda, estandarizan la ejecución de pruebas y auditorías, y refuerzan el cumplimiento de atributos de calidad. Se recomienda mantener estos cambios como parte del DoD y ampliar automatización (CI/CD) en iteraciones futuras.

---

## Referencias
- `PROCESO_CALIDAD_SOFTWARE.md`
- `INFORME_RESULTADOS_CALIDAD.md`
- `INFORME_LECCIONES_APRENDIDAS.md`
- `BITACORA_DESARROLLO.md`
