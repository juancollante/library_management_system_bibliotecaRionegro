# 🧪 Guía Completa para Probar APIs en Postman

## 📋 Prerequisitos

### 1. Instalar Postman
- Descarga Postman desde: https://www.postman.com/downloads/
- Crea una cuenta gratuita (opcional pero recomendada)

### 2. Iniciar el servidor
```bash
cd backend
npm start
# Servidor debe correr en http://localhost:4000
```

---

## 🔧 Configuración Inicial en Postman

### 1. Crear una nueva Collection
1. Abrir Postman
2. Click en "New" → "Collection"
3. Nombrar: "Sistema Bibliotecario APIs"
4. Guardar

### 2. Configurar Variables de Entorno
1. Click en el ícono de engranaje (Settings)
2. "Manage Environments" → "Add"
3. Nombre del ambiente: "Library API Local"
4. Agregar variables:
   - **Variable**: `baseURL`, **Value**: `http://localhost:4000/api`
   - **Variable**: `adminUserId`, **Value**: (se llenará después)
   - **Variable**: `studentUserId`, **Value**: (se llenará después)
   - **Variable**: `bookId`, **Value**: (se llenará después)
   - **Variable**: `transactionId`, **Value**: (se llenará después)

---

## 🧪 Tests Paso a Paso

### PASO 1: Registro de Usuarios

#### Test 1.1: Registrar Administrador
**Método**: `POST`  
**URL**: `{{baseURL}}/auth/register`

**Headers**:
```
Content-Type: application/json
```

**Body** (raw JSON):
```json
{
  "userType": "Employee",
  "userFullName": "Admin Sistema",
  "employeeId": "EMP001",
  "age": 30,
  "dob": "1993-01-15",
  "gender": "Male",
  "address": "Calle Principal 123",
  "mobileNumber": 3001234567,
  "email": "admin@biblioteca.com",
  "password": "admin123",
  "isAdmin": true
}
```

**Tests** (pestaña Tests):
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("User created successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('_id');
    pm.environment.set("adminUserId", jsonData._id);
});
```

#### Test 1.2: Registrar Estudiante
**Método**: `POST`  
**URL**: `{{baseURL}}/auth/register`

**Body** (raw JSON):
```json
{
  "userType": "Student",
  "userFullName": "Juan Pérez",
  "admissionId": "STU001",
  "age": 22,
  "dob": "2001-05-20",
  "gender": "Male",
  "address": "Carrera 45 #23-67",
  "mobileNumber": 3007654321,
  "email": "juan.perez@estudiante.com",
  "password": "student123",
  "isAdmin": false
}
```

**Tests**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Student created successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('_id');
    pm.environment.set("studentUserId", jsonData._id);
});
```

---

### PASO 2: Autenticación

#### Test 2.1: Login Admin
**Método**: `POST`  
**URL**: `{{baseURL}}/auth/signin`

**Body** (raw JSON):
```json
{
  "employeeId": "EMP001",
  "password": "admin123"
}
```

**Tests**:
```javascript
pm.test("Admin login successful", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.expect(jsonData.isAdmin).to.be.true;
});
```

#### Test 2.2: Login Estudiante
**Método**: `POST`  
**URL**: `{{baseURL}}/auth/signin`

**Body** (raw JSON):
```json
{
  "admissionId": "STU001",
  "password": "student123"
}
```

---

### PASO 3: Gestión de Categorías

#### Test 3.1: Crear Categoría
**Método**: `POST`  
**URL**: `{{baseURL}}/categories/addcategory`

**Body** (raw JSON):
```json
{
  "categoryName": "Ficción"
}
```

#### Test 3.2: Obtener Todas las Categorías
**Método**: `GET`  
**URL**: `{{baseURL}}/categories/allcategories`

**Tests**:
```javascript
pm.test("Categories retrieved successfully", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
    if (jsonData.length > 0) {
        pm.environment.set("categoryId", jsonData[0]._id);
    }
});
```

---

### PASO 4: Gestión de Libros

#### Test 4.1: Agregar Libro
**Método**: `POST`  
**URL**: `{{baseURL}}/books/addbook`

**Body** (raw JSON):
```json
{
  "isAdmin": true,
  "bookName": "Cien Años de Soledad",
  "alternateTitle": "",
  "author": "Gabriel García Márquez",
  "bookCountAvailable": 5,
  "language": "Español",
  "publisher": "Editorial Sudamericana",
  "bookStatus": "Available",
  "categories": ["{{categoryId}}"]
}
```

**Tests**:
```javascript
pm.test("Book created successfully", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('_id');
    pm.environment.set("bookId", jsonData._id);
});
```

#### Test 4.2: Obtener Todos los Libros
**Método**: `GET`  
**URL**: `{{baseURL}}/books/allbooks`

#### Test 4.3: Obtener Libro por ID
**Método**: `GET`  
**URL**: `{{baseURL}}/books/getbook/{{bookId}}`

---

### PASO 5: Búsqueda Avanzada (APIs Nuevas)

#### Test 5.1: Búsqueda General
**Método**: `GET`  
**URL**: `{{baseURL}}/search/search?query=Cien&author=García`

**Tests**:
```javascript
pm.test("Search results returned", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success', true);
    pm.expect(jsonData.data).to.be.an('array');
});
```

#### Test 5.2: Libros con Paginación
**Método**: `GET`  
**URL**: `{{baseURL}}/search/paginated?page=1&limit=5`

#### Test 5.3: Libros Disponibles
**Método**: `GET`  
**URL**: `{{baseURL}}/search/available`

#### Test 5.4: Libros Populares
**Método**: `GET`  
**URL**: `{{baseURL}}/search/popular?limit=3`

#### Test 5.5: Libros Recientes
**Método**: `GET`  
**URL**: `{{baseURL}}/search/recent?limit=5&days=30`

---

### PASO 6: Estadísticas (APIs Nuevas)

#### Test 6.1: Dashboard General
**Método**: `GET`  
**URL**: `{{baseURL}}/statistics/dashboard`

**Tests**:
```javascript
pm.test("Dashboard stats retrieved", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
    pm.expect(jsonData.data).to.have.property('totalBooks');
    pm.expect(jsonData.data).to.have.property('totalUsers');
});
```

#### Test 6.2: Estadísticas por Categoría
**Método**: `GET`  
**URL**: `{{baseURL}}/statistics/books-by-category`

#### Test 6.3: Transacciones Mensuales
**Método**: `GET`  
**URL**: `{{baseURL}}/statistics/monthly-transactions?year=2023`

#### Test 6.4: Usuarios Más Activos
**Método**: `GET`  
**URL**: `{{baseURL}}/statistics/active-users?limit=5`

---

### PASO 7: Sistema de Reservas (APIs Nuevas)

#### Test 7.1: Crear Reserva
**Método**: `POST`  
**URL**: `{{baseURL}}/reservations/reserve`

**Body** (raw JSON):
```json
{
  "bookId": "{{bookId}}",
  "userId": "{{studentUserId}}",
  "reservationDate": "2023-10-05T10:30:00.000Z"
}
```

**Tests**:
```javascript
pm.test("Reservation created successfully", function () {
    pm.response.to.have.status(201);
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
    pm.environment.set("reservationId", jsonData.data._id);
});
```

#### Test 7.2: Obtener Todas las Reservas
**Método**: `GET`  
**URL**: `{{baseURL}}/reservations/all-reservations`

#### Test 7.3: Reservas de Usuario
**Método**: `GET`  
**URL**: `{{baseURL}}/reservations/user-reservations/{{studentUserId}}`

#### Test 7.4: Emitir Libro Reservado
**Método**: `PUT`  
**URL**: `{{baseURL}}/reservations/issue-reserved/{{reservationId}}`

**Body** (raw JSON):
```json
{
  "isAdmin": true,
  "fromDate": "2023-10-05T10:30:00.000Z",
  "toDate": "2023-10-19T10:30:00.000Z"
}
```

---

### PASO 8: Transacciones

#### Test 8.1: Crear Transacción (Préstamo)
**Método**: `POST`  
**URL**: `{{baseURL}}/transactions/add-transaction`

**Body** (raw JSON):
```json
{
  "isAdmin": true,
  "bookId": "{{bookId}}",
  "borrowerId": "{{studentUserId}}",
  "bookName": "Cien Años de Soledad",
  "borrowerName": "Juan Pérez",
  "transactionType": "Issued",
  "fromDate": "2023-10-05T10:30:00.000Z",
  "toDate": "2023-10-19T10:30:00.000Z"
}
```

**Tests**:
```javascript
pm.test("Transaction created successfully", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.environment.set("transactionId", jsonData._id);
});
```

#### Test 8.2: Obtener Todas las Transacciones
**Método**: `GET`  
**URL**: `{{baseURL}}/transactions/all-transactions`

---

### PASO 9: Notificaciones (APIs Nuevas)

#### Test 9.1: Notificaciones de Admin
**Método**: `GET`  
**URL**: `{{baseURL}}/notifications/admin`

**Tests**:
```javascript
pm.test("Admin notifications retrieved", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
    pm.expect(jsonData.data).to.be.an('array');
});
```

#### Test 9.2: Notificaciones de Usuario
**Método**: `GET`  
**URL**: `{{baseURL}}/notifications/user/{{studentUserId}}`

#### Test 9.3: Contador de Notificaciones
**Método**: `GET`  
**URL**: `{{baseURL}}/notifications/count/{{studentUserId}}`

#### Test 9.4: Enviar Recordatorios
**Método**: `POST`  
**URL**: `{{baseURL}}/notifications/send-reminders`

**Body** (raw JSON):
```json
{
  "isAdmin": true
}
```

---

### PASO 10: Gestión de Usuarios

#### Test 10.1: Obtener Todos los Usuarios
**Método**: `GET`  
**URL**: `{{baseURL}}/users/allmembers`

#### Test 10.2: Obtener Usuario por ID
**Método**: `GET`  
**URL**: `{{baseURL}}/users/getuser/{{studentUserId}}`

#### Test 10.3: Historial de Usuario (Nueva API)
**Método**: `GET`  
**URL**: `{{baseURL}}/statistics/user-history/{{studentUserId}}`

---

## 📊 Tests de Validación de Errores

### Test Error 1: Crear libro sin permisos de admin
**Método**: `POST`  
**URL**: `{{baseURL}}/books/addbook`

**Body** (raw JSON):
```json
{
  "isAdmin": false,
  "bookName": "Libro Sin Permisos",
  "author": "Autor Test"
}
```

**Tests**:
```javascript
pm.test("Access denied for non-admin", function () {
    pm.response.to.have.status(403);
});
```

### Test Error 2: Buscar libro inexistente
**Método**: `GET`  
**URL**: `{{baseURL}}/books/getbook/invalidid123`

**Tests**:
```javascript
pm.test("Invalid ID returns error", function () {
    pm.response.to.have.status(500);
});
```

---

## 🔄 Orden de Ejecución Recomendado

1. **Usuarios**: Registro → Login
2. **Categorías**: Crear → Listar
3. **Libros**: Crear → Listar → Buscar
4. **Reservas**: Crear → Listar → Convertir a préstamo
5. **Transacciones**: Crear → Listar
6. **Estadísticas**: Dashboard → Reportes
7. **Notificaciones**: Admin → Usuario → Recordatorios

---

## 💡 Tips para Usar Postman

### 1. Variables Dinámicas
Usa `{{$timestamp}}` para fechas dinámicas
Usa `{{$randomEmail}}` para emails aleatorios

### 2. Scripts Útiles
**Pre-request Script** (para generar datos):
```javascript
pm.environment.set("currentDate", new Date().toISOString());
```

**Test Script** (para validar respuestas):
```javascript
pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});
```

### 3. Collection Runner
- Selecciona toda la collection
- Click "Run"
- Ejecuta todos los tests en secuencia

---

## 🐛 Solución de Problemas

### Problema: "ECONNREFUSED"
**Solución**: Verifica que el servidor esté corriendo en `http://localhost:4000`

### Problema: "User not found"
**Solución**: Asegúrate de ejecutar primero los tests de registro

### Problema: "Book not available"
**Solución**: Verifica que el libro tenga `bookCountAvailable > 0`

---

## 📋 Checklist Final

- [ ] Postman instalado
- [ ] Servidor corriendo (`npm start`)
- [ ] Environment configurado
- [ ] Variables de entorno creadas
- [ ] Collection creada
- [ ] Tests básicos ejecutados
- [ ] Tests de error validados
- [ ] Documentación revisada

¡Con esta guía tienes tests completos para todas las 35+ APIs de tu sistema bibliotecario! 🚀