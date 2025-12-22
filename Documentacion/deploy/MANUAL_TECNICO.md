# Manual Técnico

Documento técnico que describe la instalación, arquitectura y artefactos necesarios para desplegar y mantener la aplicación "library_management_system_bibliotecaRionegro".

Nota: El manual está orientado a un público técnico (devops/desarrollador/QA) y recoge comandos y scripts de ejemplo.

---

## 1. Prerrequisitos de instalación

- Sistema operativo: Linux (Ubuntu 20.04+) o WSL2 en Windows; macOS también soportado.
- Node.js: 18.x (recomendado). Instalar Node y npm.
- Docker Engine y Docker CLI instalados y corriendo si se desea build local o ejecución en contenedores.
- Git: para clonar el repositorio.
- flyctl: cliente oficial de Fly.io para despliegues.
- Cuenta en MongoDB Atlas y usuario/clave para la base de datos.
- Puertos: 5000 (backend por defecto) y 8080 (frontend local) deben estar disponibles localmente.

Instalación rápida de herramientas (Ubuntu / WSL):

```bash
# Node (ej: usando NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential

# Docker (sigue la guía oficial si es necesario)
sudo apt-get install -y docker.io
sudo usermod -aG docker $USER

# Git
sudo apt-get install -y git

# flyctl (instalador oficial)
curl -L https://fly.io/install.sh | sh
export PATH="$HOME/.fly/bin:$PATH"
```

---

## 2. Frameworks y estándares

- Backend: Node.js + Express.js
- ODM: Mongoose (MongoDB)
- Frontend: React (create-react-app / react-scripts)
- Contenedores: Docker (multi-stage build para frontend y backend)
- Plataforma de despliegue: Fly.io (podría usarse Vercel para frontend)
- Autenticación/Seguridad: JWT (si implementado en el proyecto). Variables sensibles manejadas con `fly secrets set`.
- Estándares de codificación: ECMAScript Modules (import/export), JSON para APIs RESTful.
- Control de versiones: Git (GitHub como remoto)

---

## 3. Diagrama de casos de uso (texto / ASCII)

Actores principales:
- Administrador (Admin)
- Miembro / Usuario (Member)

Casos de uso principales:
- Iniciar sesión / Autenticación
- Buscar libros
- Reservar libro
- Prestar libro (Issue)
- Devolver libro
- Consultar estadísticas

Diagrama ASCII (simplificado):

```
            +---------------------+
            |     Administrador    |
            +---------------------+
                     |   ^
   +-----------------+   +-----------------+
   |                                       |
+------+        +-----------+         +---------+
| Login| ------>| Gestionar |<------->| Estadísticas|
+------+        | Usuarios  |         +---------+
                +-----------+

            +---------------------+
            |       Miembro       |
            +---------------------+
                     |   ^
   +-----------------+   +-----------------+
   |                                       |
+--------+     +-----------+        +------------+
| Buscar |---->| Reservar  | -----> | Transacciones|
| libros |     | libro     |        +------------+
+--------+     +-----------+
```

---

## 4. Modelo Entidad - Relación (ER) (descricpión)

Entidades principales:
- User
- Book
- BookCategory
- BookTransaction

Relaciones:
- Un `User` puede tener muchas `BookTransaction` (activeTransactions / prevTransactions). (1:N)
- Un `Book` puede pertenecer a muchas `BookCategory` (N:M) - implementado con array de referencias.
- Un `Book` puede tener muchas `BookTransaction` (1:N).

ER simplificado (ASCII):

```
User (1) <--- (N) BookTransaction (N) ---> (1) Book
Book (N) <--- (M) BookCategory
```

---

## 5. Diccionario de datos

Se describen a continuación los esquemas y campos extraídos de `backend/models/*.js`.

### Colección: users
- `_id` (ObjectId): Identificador del documento.
- `userType` (String, required): Tipo de usuario (Member, Employee, Admin, etc.).
- `userFullName` (String, required, unique): Nombre completo.
- `admissionId` (String, optional): Identificador de admisión (si aplica).
- `employeeId` (String, optional): Identificador de empleado (si aplica).
- `age` (Number, optional)
- `gender` (String, optional)
- `dob` (String, optional): Fecha de nacimiento (formato ISO recomendado).
- `address` (String, default="")
- `mobileNumber` (Number, required)
- `photo` (String, URL, default="")
- `email` (String, required, unique)
- `password` (String, required): Hash de contraseña (no almacenar en texto claro).
- `points` (Number, default 0)
- `activeTransactions` (Array[ObjectId] -> BookTransaction)
- `prevTransactions` (Array[ObjectId] -> BookTransaction)
- `isAdmin` (Boolean, default false)
- `createdAt`, `updatedAt` (timestamps)

### Colección: books
- `_id` (ObjectId)
- `bookName` (String, required)
- `alternateTitle` (String)
- `author` (String, required)
- `language` (String)
- `publisher` (String)
- `bookCountAvailable` (Number, required)
- `bookStatus` (String, default "Available")
- `categories` (Array[ObjectId] -> BookCategory)
- `transactions` (Array[ObjectId] -> BookTransaction)
- `createdAt`, `updatedAt` (timestamps)

### Colección: bookcategories
- `_id` (ObjectId)
- `categoryName` (String, unique)
- `books` (Array[ObjectId] -> Book)
- `createdAt`, `updatedAt`

### Colección: booktransactions
- `_id` (ObjectId)
- `bookId` (String, required): Id de libro (se almacena como string en el esquema actual)
- `borrowerId` (String, required): admissionId o employeeId
- `bookName` (String, required)
- `borrowerName` (String, required)
- `transactionType` (String, required): e.g., "Issue" o "Reservation"
- `fromDate` (String, required): fecha inicio (ISO recomendado)
- `toDate` (String, required): fecha fin
- `returnDate` (String, optional)
- `transactionStatus` (String, default "Active")
- `createdAt`, `updatedAt`

Notas:
- Se recomienda normalizar campos de fechas a formato ISO y usar ObjectId para referencias consistentes. Actualmente `bookId` y `borrowerId` se guardan como string en `BookTransaction`; es aconsejable usar `mongoose.Types.ObjectId` y referencias si se requiere integridad referencial.

---

## 6. Scripts de instalación y despliegue

Se incluyen scripts y comandos recomendados que el equipo puede ejecutar para levantar el sistema en ambiente local y para preparar despliegue en Fly.

### 6.1 Preparar entorno local (backend)

```bash
# Desde la raíz del repo
cd backend
npm ci
# Configurar variables locales (no subir .env al repo)
export MONGO_URL="mongodb+srv://db_user:PASS@cluster0.../library_db?retryWrites=true&w=majority"
export NODE_ENV=development
npm run dev   # asume nodemon u otro script definido en package.json
```

### 6.2 Preparar frontend local

```bash
cd frontend
npm ci
export NODE_OPTIONS=--openssl-legacy-provider   # si Node produce error OpenSSL en build
npm run build
npx serve -s build -l 8080   # o usar docker/serve
```

### 6.3 Build y Docker (opcional)

Backend (si se añade Dockerfile):
```bash
cd backend
docker build -t biblioteca-backend:local .
docker run --rm -p 5000:5000 -e MONGO_URL="$MONGO_URL" biblioteca-backend:local
```

Frontend (usar Dockerfile añadido en repo):
```bash
cd frontend
docker build -t biblioteca-frontend:local .
docker run --rm -p 8080:8080 -e PORT=8080 biblioteca-frontend:local
```

### 6.4 Despliegue en Fly (resumen)

```bash
# Autenticar con Fly
fly auth login

# Backend
cd backend
fly launch --name biblioteca-backend --no-deploy
fly secrets set MONGO_URL="$MONGO_URL" -a biblioteca-backend
fly deploy -a biblioteca-backend

# Frontend
cd ../frontend
fly launch --name biblioteca-frontend --no-deploy
fly deploy -a biblioteca-frontend
```

---

## 7. Diagrama de componentes (texto / ASCII)

Descripción general de componentes y sus responsabilidades:

- **Frontend (React SPA)**: Interfaz de usuario, realiza llamadas REST a backend, maneja autenticación de sesión y renderizado de vistas.
- **Backend (Express)**: Expone API REST (`/api/*`), gestiona lógica de negocio, autenticación, validación y conexión a MongoDB.
- **MongoDB Atlas**: Persistencia de datos (colecciones: users, books, bookcategories, booktransactions).
- **Fly.io**: Plataforma de ejecución de contenedores y gestión de escalado/SSL.

Diagrama ASCII:

```
+-------------+        HTTPS        +-------------+        MongoDB         +-----------+
|  Frontend   | <----------------> |  Fly (App)  | <--------------------> |  Atlas DB |
| (React SPA) |        REST/API     | (Express)   |       (Mongoose)      |(cluster M0)|
+-------------+                     +-------------+                       +-----------+
```

---

## 8. Recomendaciones y mejoras propuestas

- Normalizar referencias en `BookTransaction` (usar ObjectId para `bookId`, `borrowerId`).
- Convertir campos de fecha a ISO Date (`Date` en Mongoose) para facilitar consultas y comparaciones.
- Restringir CORS en producción a dominios autorizados.
- Añadir scripts de migración/versionado de esquema (ej: migrate/seed con `migrate-mongo` o `umzug`).
- Añadir pipeline CI (GitHub Actions) para builds automáticos, tests y despliegues a Fly.

---

## 9. Anexos

- Ubicación de archivos relevantes en el repo:
  - Backend: `backend/` (server.js, routes, models)
  - Frontend: `frontend/` (src/, public/, package.json)
  - Deploy helpers: `docker-compose.yml`, `deploy.sh`, `check.sh`, `deploy/INFORME_FINAL_DESPLIEGUE.md`, `deploy/evidences/`

---

Fin del manual técnico.
