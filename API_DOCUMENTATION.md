# 📚 Sistema de Gestión Bibliotecaria - Documentación de APIs

## Introducción

Este documento contiene la documentación completa de todas las APIs del Sistema de Gestión Bibliotecaria. El sistema está construido con Node.js, Express y MongoDB.

**URL Base:** `http://localhost:4000/api`

## Autenticación

### Registro de Usuario
**POST** `/auth/register`

Registra un nuevo usuario en el sistema.

**Request Body:**
```json
{
  "userType": "Student|Employee",
  "userFullName": "Juan Pérez",
  "admissionId": "STU001", // Solo para estudiantes
  "employeeId": "EMP001",  // Solo para empleados
  "age": 25,
  "dob": "1998-05-15",
  "gender": "Male|Female",
  "address": "Calle 123, Ciudad",
  "mobileNumber": 3001234567,
  "email": "juan@email.com",
  "password": "password123",
  "isAdmin": false
}
```

**Response:**
```json
{
  "_id": "64a5b8c9e12345...",
  "userType": "Student",
  "userFullName": "Juan Pérez",
  "email": "juan@email.com",
  "createdAt": "2023-10-05T10:30:00.000Z"
}
```

### Iniciar Sesión
**POST** `/auth/signin`

Autentica un usuario en el sistema.

**Request Body:**
```json
{
  "admissionId": "STU001", // Para estudiantes
  "employeeId": "EMP001",  // Para empleados
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "64a5b8c9e12345...",
  "userType": "Student",
  "userFullName": "Juan Pérez",
  "email": "juan@email.com",
  "isAdmin": false
}
```

---

## Gestión de Usuarios

### Obtener Usuario por ID
**GET** `/users/getuser/:id`

**Response:**
```json
{
  "_id": "64a5b8c9e12345...",
  "userFullName": "Juan Pérez",
  "email": "juan@email.com",
  "userType": "Student",
  "activeTransactions": [...],
  "prevTransactions": [...]
}
```

### Obtener Todos los Usuarios
**GET** `/users/allmembers`

**Response:**
```json
[
  {
    "_id": "64a5b8c9e12345...",
    "userFullName": "Juan Pérez",
    "email": "juan@email.com",
    "userType": "Student",
    "activeTransactions": [...],
    "prevTransactions": [...]
  }
]
```

### Actualizar Usuario
**PUT** `/users/updateuser/:id`

**Request Body:**
```json
{
  "userId": "64a5b8c9e12345...", // O isAdmin: true
  "userFullName": "Juan Carlos Pérez",
  "email": "juancarlos@email.com",
  "address": "Nueva dirección"
}
```

### Eliminar Usuario
**DELETE** `/users/deleteuser/:id`

**Request Body:**
```json
{
  "userId": "64a5b8c9e12345...", // O isAdmin: true
}
```

---

## Gestión de Libros

### Obtener Todos los Libros
**GET** `/books/allbooks`

**Response:**
```json
[
  {
    "_id": "64a5b8c9e12345...",
    "bookName": "El Quijote",
    "author": "Miguel de Cervantes",
    "language": "Español",
    "publisher": "Editorial ABC",
    "bookCountAvailable": 5,
    "bookStatus": "Available",
    "categories": [...],
    "transactions": [...]
  }
]
```

### Obtener Libro por ID
**GET** `/books/getbook/:id`

### Obtener Libros por Categoría
**GET** `/books?category=ficcion`

### Agregar Nuevo Libro
**POST** `/books/addbook`

**Request Body:**
```json
{
  "isAdmin": true,
  "bookName": "Cien Años de Soledad",
  "alternateTitle": "",
  "author": "Gabriel García Márquez",
  "bookCountAvailable": 3,
  "language": "Español",
  "publisher": "Editorial Sudamericana",
  "bookStatus": "Available",
  "categories": ["64a5b8c9e12345..."]
}
```

### Actualizar Libro
**PUT** `/books/updatebook/:id`

### Eliminar Libro
**DELETE** `/books/removebook/:id`

**Request Body:**
```json
{
  "isAdmin": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book has been deleted successfully"
}
```

---

## Búsqueda Avanzada (NUEVO)

### Búsqueda de Libros
**GET** `/search/search?query=quijote&author=cervantes&category=clasicos&language=español&status=Available`

**Parámetros de consulta:**
- `query`: Búsqueda en nombre y título alternativo
- `author`: Filtrar por autor
- `category`: Filtrar por categoría
- `language`: Filtrar por idioma
- `status`: Filtrar por estado

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64a5b8c9e12345...",
      "bookName": "Don Quijote de la Mancha",
      "author": "Miguel de Cervantes"
    }
  ]
}
```

### Libros con Paginación
**GET** `/search/paginated?page=1&limit=10`

### Libros Disponibles
**GET** `/search/available`

### Libros Populares
**GET** `/search/popular?limit=5`

### Libros Recientes
**GET** `/search/recent?limit=10&days=30`

---

## Estadísticas (NUEVO)

### Dashboard General
**GET** `/statistics/dashboard`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalBooks": 150,
    "availableBooks": 120,
    "borrowedBooks": 30,
    "totalUsers": 85,
    "activeTransactions": 30,
    "totalCategories": 12,
    "overdueTransactions": 5
  }
}
```

### Estadísticas por Categoría
**GET** `/statistics/books-by-category`

### Transacciones Mensuales
**GET** `/statistics/monthly-transactions?year=2023`

### Usuarios Más Activos
**GET** `/statistics/active-users?limit=10`

### Libros Atrasados
**GET** `/statistics/overdue-books`

### Historial de Usuario
**GET** `/statistics/user-history/:userId`

---

## Reservas (NUEVO)

### Crear Reserva
**POST** `/reservations/reserve`

**Request Body:**
```json
{
  "bookId": "64a5b8c9e12345...",
  "userId": "64a5b8c9e12345...",
  "reservationDate": "2023-10-05T10:30:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book reserved successfully",
  "data": {
    "_id": "64a5b8c9e12345...",
    "bookName": "El Quijote",
    "borrowerName": "Juan Pérez",
    "transactionType": "Reserved",
    "fromDate": "2023-10-05T10:30:00.000Z",
    "toDate": "2023-10-12T10:30:00.000Z"
  }
}
```

### Obtener Todas las Reservas
**GET** `/reservations/all-reservations`

### Reservas de Usuario
**GET** `/reservations/user-reservations/:userId`

### Cancelar Reserva
**DELETE** `/reservations/cancel/:reservationId`

**Request Body:**
```json
{
  "userId": "64a5b8c9e12345...", // O isAdmin: true
}
```

### Emitir Libro Reservado
**PUT** `/reservations/issue-reserved/:reservationId`

**Request Body:**
```json
{
  "isAdmin": true,
  "fromDate": "2023-10-05T10:30:00.000Z",
  "toDate": "2023-10-19T10:30:00.000Z"
}
```

### Reservas Expiradas
**GET** `/reservations/expired`

---

## Notificaciones (NUEVO)

### Notificaciones de Administrador
**GET** `/notifications/admin`

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "type": "overdue",
      "priority": "high",
      "title": "Overdue Book",
      "message": "El Quijote is 5 days overdue",
      "details": {
        "book": "El Quijote",
        "borrower": "Juan Pérez",
        "dueDate": "2023-09-30T10:30:00.000Z",
        "daysOverdue": 5,
        "transactionId": "64a5b8c9e12345..."
      }
    }
  ]
}
```

### Notificaciones de Usuario
**GET** `/notifications/user/:userId`

### Contador de Notificaciones
**GET** `/notifications/count/:userId`

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 3,
    "overdue": 1,
    "dueSoon": 2,
    "reservations": 0
  }
}
```

### Enviar Recordatorios
**POST** `/notifications/send-reminders`

**Request Body:**
```json
{
  "isAdmin": true
}
```

---

## Transacciones

### Crear Transacción
**POST** `/transactions/add-transaction`

**Request Body:**
```json
{
  "isAdmin": true,
  "bookId": "64a5b8c9e12345...",
  "borrowerId": "64a5b8c9e12345...",
  "bookName": "El Quijote",
  "borrowerName": "Juan Pérez",
  "transactionType": "Issued",
  "fromDate": "2023-10-05T10:30:00.000Z",
  "toDate": "2023-10-19T10:30:00.000Z"
}
```

### Obtener Todas las Transacciones
**GET** `/transactions/all-transactions`

### Actualizar Transacción
**PUT** `/transactions/update-transaction/:id`

---

## Categorías

### Obtener Todas las Categorías
**GET** `/categories/allcategories`

**Response:**
```json
[
  {
    "_id": "64a5b8c9e12345...",
    "categoryName": "Ficción",
    "books": [...]
  }
]
```

### Agregar Categoría
**POST** `/categories/addcategory`

**Request Body:**
```json
{
  "categoryName": "Ciencia Ficción"
}
```

---

## Códigos de Estado HTTP

- **200** - Éxito
- **201** - Creado exitosamente
- **400** - Solicitud incorrecta
- **401** - No autorizado
- **403** - Prohibido
- **404** - No encontrado
- **500** - Error interno del servidor

## Tipos de Usuarios

- **Student**: Estudiante con acceso limitado
- **Employee**: Empleado con acceso limitado
- **Admin**: Administrador con acceso completo

## Tipos de Transacciones

- **Issued**: Libro prestado
- **Returned**: Libro devuelto
- **Reserved**: Libro reservado

## Notas Importantes

1. **Autenticación**: La mayoría de operaciones requieren autenticación
2. **Permisos de Admin**: Operaciones como agregar, editar y eliminar libros requieren permisos de administrador
3. **Validaciones**: Todas las APIs incluyen validaciones de entrada
4. **Manejo de Errores**: Respuestas estructuradas con mensajes descriptivos
5. **Población**: Los datos relacionados se poblan automáticamente cuando es necesario

## Configuración del Entorno

Crea un archivo `.env` con las siguientes variables:

```env
PORT=4000
MONGO_URL=mongodb://localhost:27017/library_management
```

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# La API estará disponible en http://localhost:4000
```