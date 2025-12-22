# EVIDENCIA DE DESEMPEÑO: GA7-220501096-AA4-EV02
## VERIFICACIÓN DE PROCEDIMIENTOS PARA LA DEFINICIÓN DE COMPONENTES FRONTEND DE LA APLICACIÓN
### Sistema de Gestión de Biblioteca - Biblioteca Rionegro

---

## 1. INTRODUCCIÓN

Este documento describe los componentes frontend utilizados en el desarrollo del Sistema de Gestión de Biblioteca de la Biblioteca Rionegro. El proyecto está desarrollado utilizando React.js como biblioteca principal, implementando una arquitectura de componentes modular y reutilizable que facilita el mantenimiento y escalabilidad del sistema.

---

## 2. ARQUITECTURA TECNOLÓGICA

### 2.1 Stack Tecnológico Principal

**Framework Base:**
- **React 17.0.2**: Biblioteca principal para la construcción de interfaces de usuario
- **React DOM 17.0.2**: Renderizado de componentes React en el DOM
- **React Router DOM 5.2.0**: Manejo de rutas y navegación

**Bibliotecas de UI y Estilos:**
- **Material-UI 4.11.4**: Componentes de interfaz siguiendo Material Design
- **React Bootstrap 1.6.1**: Componentes de Bootstrap para React
- **Semantic UI React 2.0.3**: Componentes semánticos para interfaces consistentes
- **Bootstrap 4.6.0**: Framework CSS para estilos responsivos

**Bibliotecas de Utilidades:**
- **Axios 0.21.1**: Cliente HTTP para comunicación con el backend
- **Moment.js 2.29.1**: Manipulación y formateo de fechas
- **React DatePicker 4.2.0**: Componente de selección de fechas
- **React Multi Select Component 4.0.3**: Componente de selección múltiple

---

## 3. ESTRUCTURA DE COMPONENTES

### 3.1 Componente Principal

#### **App.js**
**Descripción:** Componente raíz de la aplicación que define la estructura de navegación y rutas principales.

**Características:**
- Implementa React Router para navegación entre páginas
- Maneja autenticación mediante AuthContext
- Define rutas protegidas según el tipo de usuario (admin/miembro)
- Integra componente Header común a todas las páginas

**Rutas Definidas:**
- `/` - Página de inicio (Home)
- `/signin` - Página de autenticación
- `/dashboard@admin` - Dashboard administrativo
- `/dashboard@member` - Dashboard de miembros
- `/books` - Catálogo de libros

---

### 3.2 Componentes de Navegación

#### **Header.js**
**Descripción:** Componente de navegación principal que aparece en todas las páginas.

**Características:**
- Navegación responsiva con menú hamburguesa para dispositivos móviles
- Barra de búsqueda integrada
- Enlaces a páginas principales (Inicio, Libros, Iniciar Sesión)
- Integración con Material-UI Icons (MenuIcon, ClearIcon)
- Manejo de estado para toggle del menú móvil

**Funcionalidades:**
- Toggle de menú en dispositivos móviles
- Navegación mediante React Router Link
- Campo de búsqueda de libros

---

### 3.3 Componentes de Contenido Principal

#### **WelcomeBox.js**
**Descripción:** Componente de bienvenida que presenta el mensaje principal de la biblioteca.

**Características:**
- Mensaje de bienvenida personalizado
- Diseño atractivo con tipografía jerárquica
- Elemento visual principal de la página de inicio

#### **Stats.js**
**Descripción:** Componente que muestra estadísticas importantes de la biblioteca.

**Características:**
- Tres bloques de estadísticas principales:
  - Total de Libros (3254)
  - Total de Miembros (254)
  - Reservas (54)
- Integración con Material-UI Icons:
  - LibraryBooksIcon para libros
  - LocalLibraryIcon para miembros
  - BookIcon para reservas
- Diseño en tarjetas con iconografía representativa

#### **PopularBooks.js**
**Descripción:** Componente que muestra una galería de libros populares.

**Características:**
- Galería de imágenes de libros populares
- Imágenes obtenidas desde URLs externas
- Diseño responsivo en grid
- Título descriptivo "Libros Populares"

#### **About.js**
**Descripción:** Componente informativo sobre la biblioteca.

#### **News.js**
**Descripción:** Componente para mostrar noticias y novedades de la biblioteca.

#### **PhotoGallery.js**
**Descripción:** Galería fotográfica de la biblioteca.

#### **ImageSlider.js**
**Descripción:** Carrusel de imágenes para la página principal.

#### **RecentAddedBooks.js**
**Descripción:** Componente que muestra los libros recientemente agregados al catálogo.

#### **ReservedBooks.js**
**Descripción:** Componente para mostrar libros reservados.

#### **Footer.js**
**Descripción:** Pie de página con información de contacto y enlaces adicionales.

---

### 3.4 Páginas Principales

#### **Home.js**
**Descripción:** Página principal que integra todos los componentes de contenido.

**Características:**
- Composición de múltiples componentes:
  - ImageSlider (carrusel de imágenes)
  - WelcomeBox (mensaje de bienvenida)
  - About (información sobre la biblioteca)
  - Stats (estadísticas)
  - RecentAddedBooks (libros recientes)
  - PopularBooks (libros populares)
  - ReservedBooks (libros reservados)
  - News (noticias)
  - PhotoGallery (galería de fotos)
  - Footer (pie de página)

#### **Signin.js**
**Descripción:** Página de autenticación para usuarios del sistema.

**Características:**
- Formulario de login para estudiantes y empleados
- Switch para alternar entre tipos de usuario
- Integración con AuthContext para manejo de estado
- Validación de credenciales
- Redirección automática según tipo de usuario
- Manejo de errores de autenticación

**Funcionalidades:**
- Campos de entrada diferenciados (admissionId para estudiantes, employeeId para empleados)
- Validación de formulario
- Comunicación con API backend mediante Axios

#### **Allbooks.js**
**Descripción:** Página que muestra el catálogo completo de libros disponibles.

---

### 3.5 Dashboards

#### **AdminDashboard.js**
**Descripción:** Panel de control administrativo con todas las funcionalidades de gestión.

**Características:**
- Sidebar responsive con opciones de administración
- Múltiples secciones:
  - Agregar libros (AddBook)
  - Agregar miembros (AddMember)
  - Gestionar transacciones (AddTransaction)
  - Consultar miembros (GetMember)
  - Procesar devoluciones (Return)
- Integración con Material-UI Icons para navegación
- Sistema de tabs para cambio de contenido
- Función de logout integrada

**Componentes Integrados:**
- AddBook, AddMember, AddTransaction, GetMember, Return

#### **MemberDashboard.js**
**Descripción:** Panel de control para miembros de la biblioteca.

**Características:**
- Vista de perfil personal
- Historial de transacciones
- Libros activos prestados
- Libros reservados
- Sistema de puntos y ranking
- Sidebar responsivo similar al admin

---

### 3.6 Componentes de Administración

#### **AddBook.js**
**Descripción:** Formulario para agregar nuevos libros al catálogo.

**Características:**
- Formulario completo con campos necesarios para libros
- Integración con Semantic UI Dropdown
- Validación de datos
- Comunicación con API backend

#### **AddMember.js**
**Descripción:** Formulario para registrar nuevos miembros.

**Características:**
- Formulario diferenciado para estudiantes y empleados
- Campos específicos según tipo de usuario:
  - Estudiantes: admissionId
  - Empleados: employeeId
- Selector de fecha de nacimiento con React DatePicker
- Dropdown para género y tipo de usuario
- Tabla de miembros recientemente agregados
- Validación completa de formulario

**Funcionalidades:**
- Registro de estudiantes y empleados
- Generación automática de contraseñas
- Validación de campos obligatorios
- Actualización de lista de miembros recientes

#### **AddTransaction.js**
**Descripción:** Componente para gestionar préstamos y reservas de libros.

**Características:**
- Selección de miembro mediante dropdown
- Selección de libro disponible
- Selector de fechas de préstamo con React DatePicker
- Tipos de transacción: Reserve e Issue
- Validación de disponibilidad
- Historial de transacciones recientes

**Funcionalidades:**
- Creación de reservas y préstamos
- Validación de fechas
- Control de disponibilidad de libros
- Actualización automática de inventario

#### **GetMember.js**
**Descripción:** Componente para consultar información detallada de miembros.

**Características:**
- Búsqueda de miembros mediante dropdown
- Vista completa del perfil del miembro:
  - Información personal (nombre, edad, género, etc.)
  - Libros activos prestados con cálculo de multas
  - Libros reservados
  - Historial completo de transacciones
- Sistema de puntos y ranking
- Cálculo automático de multas por retraso

**Funcionalidades:**
- Consulta detallada de perfiles
- Visualización de historial completo
- Cálculo de multas automático
- Gestión de puntos de usuario

#### **Return.js**
**Descripción:** Componente para procesar devoluciones de libros.

**Características:**
- Selección de miembro
- Lista de libros prestados pendientes de devolución
- Procesamiento de devoluciones
- Actualización de estado de transacciones
- Cálculo final de multas

---

### 3.7 Sistema de Gestión de Estado

#### **AuthContext.js**
**Descripción:** Context Provider para manejo global del estado de autenticación.

**Características:**
- Estado global de usuario autenticado
- Persistencia en localStorage
- Estados de carga y error
- Proveedor de contexto para toda la aplicación

**Estado Manejado:**
- user: información del usuario logueado
- isFetching: estado de carga durante autenticación
- error: manejo de errores de autenticación

#### **AuthActions.js**
**Descripción:** Definición de acciones para el sistema de autenticación.

**Acciones Definidas:**
- LOGIN_START: inicio del proceso de login
- LOGIN_SUCCESS: login exitoso
- LOGIN_FAILURE: error en login

#### **AuthReducer.js**
**Descripción:** Reducer para manejo de estados de autenticación.

**Funcionalidades:**
- Procesamiento de acciones de login
- Actualización de estado según acción
- Manejo de estados de carga y error

---

## 4. PATRONES DE DISEÑO IMPLEMENTADOS

### 4.1 Patrón de Componentes Funcionales
- Uso extensivo de React Hooks (useState, useEffect, useContext)
- Componentes funcionales para mayor simplicidad y rendimiento

### 4.2 Patrón Context API
- Gestión de estado global mediante React Context
- Evita prop drilling en componentes anidados

### 4.3 Patrón de Composición
- Componentes reutilizables y modulares
- Separación clara de responsabilidades

### 4.4 Patrón de Renderizado Condicional
- Mostrar/ocultar componentes según estado de autenticación
- Navegación diferenciada por tipo de usuario

---

## 5. CARACTERÍSTICAS TÉCNICAS DESTACADAS

### 5.1 Responsividad
- Diseño responsive implementado con Bootstrap y Material-UI
- Menús adaptables para dispositivos móviles
- Componentes que se ajustan a diferentes tamaños de pantalla

### 5.2 Accesibilidad
- Uso de iconografía descriptiva de Material-UI
- Estructura semántica con Semantic UI
- Navegación clara y consistente

### 5.3 Experiencia de Usuario
- Interfaz intuitiva con navegación clara
- Feedback visual en formularios
- Estados de carga y error manejados

### 5.4 Gestión de Datos
- Comunicación asíncrona con backend mediante Axios
- Manejo de fechas con Moment.js
- Validación de formularios en tiempo real

---

## 6. INTEGRACIÓN CON BACKEND

### 6.1 API REST
- Comunicación mediante Axios con endpoints REST
- Manejo de tokens de autenticación
- Procesamiento de respuestas JSON

### 6.2 Variables de Entorno
- Configuración de URL de API mediante REACT_APP_API_URL
- Separación de configuración por ambiente

---

## 7. ESTRUCTURA DE ARCHIVOS CSS

Cada componente mantiene su archivo CSS correspondiente:
- Estilos específicos por componente
- Nomenclatura consistente de clases CSS
- Uso de CSS modules implícito

---

## 8. MAPEO DE COMPONENTES FRONTEND CON HISTORIAS DE USUARIO

### 8.1 Historias de Usuario para Visitantes/Usuarios Públicos

#### **HU-001: Explorar información de la biblioteca**
**Como** visitante de la página web  
**Quiero** conocer información sobre la biblioteca y sus servicios  
**Para** entender qué ofrece la institución

**Componentes que la implementan:**
- **About.js**: Presenta información detallada sobre la Biblioteca Pública Municipal de Rionegro, sus servicios, misión y recursos disponibles
- **WelcomeBox.js**: Proporciona mensaje de bienvenida atractivo que invita a explorar los servicios
- **Stats.js**: Muestra estadísticas clave (3254 libros, 254 miembros, 54 reservas) que demuestran la actividad de la biblioteca
- **Footer.js**: Incluye información de contacto y enlaces adicionales

#### **HU-002: Visualizar catálogo de libros disponibles**
**Como** usuario interesado  
**Quiero** ver los libros disponibles en la biblioteca  
**Para** conocer la colección y decidir qué leer

**Componentes que la implementan:**
- **Allbooks.js**: Página dedicada que muestra el catálogo completo con tarjetas de libros incluyendo:
  - Imagen de portada
  - Título del libro
  - Autor
  - Categoría
- **PopularBooks.js**: Galería visual de libros más demandados
- **RecentAddedBooks.js**: Carrusel animado mostrando las últimas adquisiciones de la biblioteca
- **ReservedBooks.js**: Muestra libros disponibles para reserva

#### **HU-003: Buscar libros específicos**
**Como** usuario  
**Quiero** poder buscar libros por título o autor  
**Para** encontrar rápidamente el material que necesito

**Componentes que la implementan:**
- **Header.js**: Incluye barra de búsqueda siempre visible en todas las páginas
- Campo de búsqueda integrado con placeholder "Buscar un libro"

#### **HU-004: Navegar fácilmente por el sitio**
**Como** usuario  
**Quiero** una navegación clara e intuitiva  
**Para** acceder rápidamente a las diferentes secciones

**Componentes que la implementan:**
- **Header.js**: Navegación principal responsiva con:
  - Menú hamburguesa para móviles
  - Enlaces a secciones principales (Inicio, Libros, Iniciar Sesión)
  - Logo/nombre de la biblioteca
- **Home.js**: Página de inicio que integra todos los componentes de forma organizada

---

### 8.2 Historias de Usuario para Miembros Registrados

#### **HU-005: Autenticarse en el sistema**
**Como** miembro registrado (estudiante o empleado)  
**Quiero** iniciar sesión en mi cuenta  
**Para** acceder a mis servicios personalizados

**Componentes que la implementan:**
- **Signin.js**: Formulario de autenticación con:
  - Switch para alternar entre Estudiante/Empleado
  - Campos específicos (admissionId/employeeId)
  - Validación de credenciales
  - Redirección automática según perfil
- **AuthContext.js**: Manejo global del estado de autenticación
- **AuthActions.js** y **AuthReducer.js**: Gestión de acciones de login

#### **HU-006: Ver mi perfil personal**
**Como** miembro registrado  
**Quiero** ver mi información personal y estadísticas  
**Para** conocer mi estado en la biblioteca

**Componentes que la implementan:**
- **MemberDashboard.js**: Dashboard personalizado con sección de perfil mostrando:
  - Información personal completa
  - Foto de perfil
  - Datos de contacto
  - Sistema de puntos y ranking
  - Estadísticas personales

#### **HU-007: Consultar mis libros prestados**
**Como** miembro  
**Quiero** ver todos los libros que tengo prestados  
**Para** controlar mis préstamos y fechas de devolución

**Componentes que la implementan:**
- **MemberDashboard.js**: Sección "Active" que muestra:
  - Lista de libros prestados actualmente
  - Fechas de préstamo y devolución
  - Cálculo automático de multas por retraso
  - Estado de cada préstamo

#### **HU-008: Ver mis reservas activas**
**Como** miembro  
**Quiero** consultar los libros que tengo reservados  
**Para** saber cuándo estarán disponibles

**Componentes que la implementan:**
- **MemberDashboard.js**: Sección "Reserved" que incluye:
  - Lista de libros reservados
  - Estado de la reserva
  - Fecha estimada de disponibilidad

#### **HU-009: Consultar mi historial de préstamos**
**Como** miembro  
**Quiero** ver mi historial completo de préstamos  
**Para** llevar un registro de mis lecturas

**Componentes que la implementan:**
- **MemberDashboard.js**: Sección "History" con:
  - Historial completo de transacciones
  - Fechas de préstamo y devolución
  - Libros previamente leídos

---

### 8.3 Historias de Usuario para Administradores

#### **HU-010: Gestionar inventario de libros**
**Como** administrador  
**Quiero** agregar, editar y gestionar libros  
**Para** mantener actualizado el catálogo

**Componentes que la implementan:**
- **AdminDashboard.js**: Panel de control administrativo
- **AddBook.js**: Formulario completo para agregar nuevos libros con:
  - Campos para todos los metadatos del libro
  - Validación de datos
  - Integración con categorías
  - Actualización automática del inventario

#### **HU-011: Administrar miembros de la biblioteca**
**Como** administrador  
**Quiero** registrar y gestionar usuarios del sistema  
**Para** controlar el acceso y membresías

**Componentes que la implementan:**
- **AddMember.js**: Formulario de registro de miembros con:
  - Campos diferenciados para estudiantes y empleados
  - Validación completa de datos
  - Selección de fecha de nacimiento con DatePicker
  - Generación automática de credenciales
  - Tabla de miembros recientes

#### **HU-012: Procesar préstamos y reservas**
**Como** administrador  
**Quiero** gestionar transacciones de préstamos y reservas  
**Para** controlar la circulación de libros

**Componentes que la implementan:**
- **AddTransaction.js**: Sistema completo de transacciones con:
  - Selección de miembro mediante dropdown
  - Selección de libro disponible
  - Tipos de transacción (Reserve/Issue)
  - Selección de fechas con DatePicker
  - Validación de disponibilidad
  - Historial de transacciones recientes

#### **HU-013: Procesar devoluciones**
**Como** administrador  
**Quiero** registrar devoluciones de libros  
**Para** actualizar el inventario y calcular multas

**Componentes que la implementan:**
- **Return.js**: Sistema de devoluciones con:
  - Selección de miembro
  - Lista de libros pendientes de devolución
  - Procesamiento automático de devoluciones
  - Cálculo de multas por retraso
  - Actualización de estado de inventario

#### **HU-014: Consultar información detallada de miembros**
**Como** administrador  
**Quiero** ver perfiles completos de los miembros  
**Para** brindar mejor servicio y apoyo

**Componentes que la implementan:**
- **GetMember.js**: Vista completa de perfiles con:
  - Búsqueda de miembros mediante dropdown
  - Información personal detallada
  - Libros activos con cálculo de multas
  - Historial completo de transacciones
  - Sistema de puntos y estadísticas
  - Estado de reservas activas

#### **HU-015: Acceder a panel de administración**
**Como** administrador  
**Quiero** un dashboard centralizado  
**Para** gestionar todas las operaciones de la biblioteca

**Componentes que la implementan:**
- **AdminDashboard.js**: Panel de control completo con:
  - Sidebar responsivo con todas las opciones
  - Sistema de navegación por tabs
  - Integración de todos los módulos administrativos
  - Función de logout seguro
  - Iconografía intuitiva con Material-UI

---

### 8.4 Historias de Usuario Transversales

#### **HU-016: Experiencia responsive**
**Como** usuario en cualquier dispositivo  
**Quiero** que la aplicación funcione correctamente en móvil, tablet y desktop  
**Para** acceder desde cualquier lugar

**Componentes que la implementan:**
- **Todos los componentes** implementan diseño responsive mediante:
  - Bootstrap para grid system
  - Material-UI para componentes adaptativos
  - CSS personalizado para breakpoints
  - Menú hamburguesa en Header.js para móviles

#### **HU-017: Navegación intuitiva**
**Como** usuario del sistema  
**Quiero** navegar de forma intuitiva  
**Para** encontrar rápidamente lo que necesito

**Componentes que la implementan:**
- **App.js**: Estructura de routing clara con rutas protegidas
- **Header.js**: Navegación consistente en todas las páginas
- **Dashboards**: Sidebars con iconografía clara y navegación por tabs

#### **HU-018: Seguridad y autenticación**
**Como** usuario del sistema  
**Quiero** que mis datos estén seguros  
**Para** confiar en el sistema

**Componentes que la implementan:**
- **AuthContext.js**: Gestión segura de estado de autenticación
- **App.js**: Rutas protegidas con validación de roles
- **Signin.js**: Validación de credenciales y manejo de errores
- Persistencia segura en localStorage con validación de sesión

---

## 9. FLUJOS DE USUARIO IMPLEMENTADOS

### 9.1 Flujo de Usuario Público
1. **Entrada** → `Home.js` (página principal)
2. **Exploración** → Componentes informativos (About, Stats, PopularBooks)
3. **Búsqueda** → `Header.js` (barra de búsqueda) → `Allbooks.js`
4. **Registro/Login** → `Signin.js`

### 9.2 Flujo de Usuario Miembro
1. **Autenticación** → `Signin.js`
2. **Dashboard** → `MemberDashboard.js`
3. **Gestión Personal** → Secciones de perfil, libros activos, reservas, historial

### 9.3 Flujo de Usuario Administrador
1. **Autenticación** → `Signin.js`
2. **Panel Administrativo** → `AdminDashboard.js`
3. **Gestión Completa** → AddBook, AddMember, AddTransaction, GetMember, Return

---

## 10. VALIDACIÓN DE HISTORIAS DE USUARIO

### 10.1 Criterios de Aceptación Cumplidos

**✅ Funcionalidad Completa**: Todas las historias de usuario identificadas tienen componentes frontend que las implementan completamente.

**✅ Experiencia de Usuario**: La interfaz es intuitiva y responsive, cumpliendo con los requisitos de usabilidad.

**✅ Seguridad**: Implementación de autenticación, autorización y rutas protegidas.

**✅ Escalabilidad**: Arquitectura modular que permite agregar nuevas funcionalidades fácilmente.

**✅ Integración**: Comunicación efectiva con el backend mediante APIs REST.

### 10.2 Cobertura de Roles de Usuario

| Rol | Historias Cubiertas | Componentes Asociados |
|-----|--------------------|-----------------------|
| **Visitante Público** | 4 historias | Home, About, Allbooks, Header, PopularBooks, RecentAddedBooks |
| **Miembro Registrado** | 5 historias | Signin, MemberDashboard, AuthContext |
| **Administrador** | 6 historias | AdminDashboard, AddBook, AddMember, AddTransaction, GetMember, Return |
| **Transversales** | 3 historias | Todos los componentes (responsive, navegación, seguridad) |

**Total: 18 historias de usuario implementadas**

---

## 11. CONCLUSIONES

El sistema de gestión de biblioteca implementa una arquitectura frontend moderna y escalable utilizando React.js y sus mejores prácticas. La separación clara de componentes, el uso de patrones de diseño establecidos y la integración de bibliotecas especializadas garantizan:

1. **Mantenibilidad**: Código modular y bien organizado
2. **Escalabilidad**: Arquitectura preparada para crecimiento
3. **Usabilidad**: Interfaz intuitiva y responsiva
4. **Rendimiento**: Optimizaciones mediante React Hooks y componentes funcionales
5. **Seguridad**: Manejo seguro de autenticación y rutas protegidas
6. **Cobertura Completa**: Todas las historias de usuario del sistema están implementadas
7. **Experiencia de Usuario**: Flujos claros y navegación intuitiva para todos los tipos de usuario

### 11.1 Fortalezas del Sistema Frontend

- **Arquitectura Modular**: Cada componente tiene responsabilidades claras y específicas
- **Reutilización de Código**: Componentes reutilizables que mantienen consistencia visual
- **Gestión de Estado Eficiente**: Context API para estado global y hooks para estado local
- **Diseño Responsive**: Funciona correctamente en todos los dispositivos
- **Validación Robusta**: Formularios con validación en tiempo real
- **Integración Seamless**: Comunicación fluida con el backend

### 11.2 Impacto en las Historias de Usuario

El diseño frontend no solo cumple con los requisitos funcionales, sino que mejora la experiencia de usuario mediante:

- **Navegación Intuitiva**: Los usuarios pueden encontrar fácilmente las funciones que necesitan
- **Feedback Visual**: Estados de carga, errores y confirmaciones claras
- **Accesibilidad**: Diseño inclusivo con iconografía descriptiva
- **Eficiencia**: Procesos optimizados que reducen el tiempo de operación

Este documento sirve como base para la verificación de procedimientos y como guía de referencia para el desarrollo y mantenimiento continuo del sistema, demostrando cómo cada componente frontend contribuye directamente al cumplimiento de las historias de usuario del Sistema de Gestión de Biblioteca de Rionegro.

---

**Fecha de Elaboración:** 29 de Septiembre de 2025  
**Autor:** Sistema de Gestión de Biblioteca - Biblioteca Rionegro  
**Versión:** 1.0