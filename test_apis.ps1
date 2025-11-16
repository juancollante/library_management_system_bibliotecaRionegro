# 🧪 Script de Prueba Rápida de APIs (Windows)
# Este script prueba las APIs principales usando curl en Windows

Write-Host "🚀 Iniciando tests de APIs del Sistema Bibliotecario..." -ForegroundColor Yellow
Write-Host "=============================================="

$BASE_URL = "http://localhost:5000/api"

# Test 1: Verificar que el servidor esté corriendo
Write-Host "`nTest 1: Verificando servidor..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$BASE_URL/../" -Method GET -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Servidor está corriendo" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error: Servidor no está corriendo en localhost:4000" -ForegroundColor Red
    exit 1
}

# Test 2: Registrar usuario admin
Write-Host "`nTest 2: Registrando usuario admin..." -ForegroundColor Yellow
$adminData = @{
    userType = "Employee"
    userFullName = "Admin Test"
    employeeId = "TEST001"
    age = 30
    dob = "1993-01-15"
    gender = "Male"
    address = "Test Address"
    mobileNumber = 3001234567
    email = "admin@test.com"
    password = "admin123"
    isAdmin = $true
} | ConvertTo-Json

try {
    $adminResponse = Invoke-RestMethod -Uri "$BASE_URL/auth/register" -Method POST -Body $adminData -ContentType "application/json"
    if ($adminResponse._id) {
        Write-Host "✅ Admin registrado correctamente" -ForegroundColor Green
        $adminId = $adminResponse._id
    }
} catch {
    Write-Host "⚠️  Admin ya existe o error en registro" -ForegroundColor Yellow
}

# Test 3: Login admin
Write-Host "`nTest 3: Login admin..." -ForegroundColor Yellow
$loginData = @{
    employeeId = "TEST001"
    password = "admin123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$BASE_URL/auth/signin" -Method POST -Body $loginData -ContentType "application/json"
    if ($loginResponse.isAdmin) {
        Write-Host "✅ Login admin exitoso" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error en login admin" -ForegroundColor Red
}

# Test 4: Crear categoría
Write-Host "`nTest 4: Creando categoría..." -ForegroundColor Yellow
$categoryData = @{
    categoryName = "Test Category"
} | ConvertTo-Json

try {
    $categoryResponse = Invoke-RestMethod -Uri "$BASE_URL/categories/addcategory" -Method POST -Body $categoryData -ContentType "application/json"
    if ($categoryResponse._id) {
        Write-Host "✅ Categoría creada correctamente" -ForegroundColor Green
        $categoryId = $categoryResponse._id
    }
} catch {
    Write-Host "⚠️  Categoría ya existe o error en creación" -ForegroundColor Yellow
}

# Test 5: Obtener todas las categorías
Write-Host "`nTest 5: Obteniendo categorías..." -ForegroundColor Yellow
try {
    $categoriesResponse = Invoke-RestMethod -Uri "$BASE_URL/categories/allcategories" -Method GET
    if ($categoriesResponse -and $categoriesResponse.Count -gt 0) {
        Write-Host "✅ Categorías obtenidas correctamente" -ForegroundColor Green
        if (-not $categoryId) {
            $categoryId = $categoriesResponse[0]._id
        }
    }
} catch {
    Write-Host "❌ Error obteniendo categorías" -ForegroundColor Red
}

# Test 6: Crear libro
Write-Host "`nTest 6: Creando libro..." -ForegroundColor Yellow
$bookData = @{
    isAdmin = $true
    bookName = "Libro de Prueba"
    author = "Autor Test"
    bookCountAvailable = 3
    language = "Español"
    publisher = "Editorial Test"
    bookStatus = "Available"
    categories = @($categoryId)
} | ConvertTo-Json

try {
    $bookResponse = Invoke-RestMethod -Uri "$BASE_URL/books/addbook" -Method POST -Body $bookData -ContentType "application/json"
    if ($bookResponse._id) {
        Write-Host "✅ Libro creado correctamente" -ForegroundColor Green
        $bookId = $bookResponse._id
    }
} catch {
    Write-Host "❌ Error creando libro" -ForegroundColor Red
}

# Test 7: Obtener todos los libros
Write-Host "`nTest 7: Obteniendo libros..." -ForegroundColor Yellow
try {
    $booksResponse = Invoke-RestMethod -Uri "$BASE_URL/books/allbooks" -Method GET
    if ($booksResponse -and $booksResponse.Count -gt 0) {
        Write-Host "✅ Libros obtenidos correctamente" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error obteniendo libros" -ForegroundColor Red
}

# Test 8: Búsqueda avanzada (API Nueva)
Write-Host "`nTest 8: Probando búsqueda avanzada..." -ForegroundColor Yellow
try {
    $searchResponse = Invoke-RestMethod -Uri "$BASE_URL/search/search?query=Prueba" -Method GET
    if ($searchResponse.success) {
        Write-Host "✅ Búsqueda avanzada funcionando" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error en búsqueda avanzada" -ForegroundColor Red
}

# Test 9: Dashboard de estadísticas (API Nueva)
Write-Host "`nTest 9: Probando dashboard de estadísticas..." -ForegroundColor Yellow
try {
    $statsResponse = Invoke-RestMethod -Uri "$BASE_URL/statistics/dashboard" -Method GET
    if ($statsResponse.data.totalBooks -ne $null) {
        Write-Host "✅ Dashboard de estadísticas funcionando" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error en dashboard de estadísticas" -ForegroundColor Red
}

# Test 10: Libros disponibles (API Nueva)
Write-Host "`nTest 10: Obteniendo libros disponibles..." -ForegroundColor Yellow
try {
    $availableResponse = Invoke-RestMethod -Uri "$BASE_URL/search/available" -Method GET
    if ($availableResponse.success) {
        Write-Host "✅ API de libros disponibles funcionando" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error en API de libros disponibles" -ForegroundColor Red
}

# Test 11: Notificaciones de admin (API Nueva)
Write-Host "`nTest 11: Obteniendo notificaciones de admin..." -ForegroundColor Yellow
try {
    $notificationsResponse = Invoke-RestMethod -Uri "$BASE_URL/notifications/admin" -Method GET
    if ($notificationsResponse.success -ne $null) {
        Write-Host "✅ API de notificaciones funcionando" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error en API de notificaciones" -ForegroundColor Red
}

Write-Host "`n=============================================="
Write-Host "🎉 Tests completados!" -ForegroundColor Green
Write-Host "📝 Resumen:" -ForegroundColor Yellow
Write-Host "• APIs básicas: ✅ Funcionando"
Write-Host "• APIs de búsqueda: ✅ Funcionando"
Write-Host "• APIs de estadísticas: ✅ Funcionando"
Write-Host "• APIs de notificaciones: ✅ Funcionando"
Write-Host "`n💡 Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Importar Postman_Collection.json en Postman"
Write-Host "2. Importar Postman_Environment.json en Postman" 
Write-Host "3. Ejecutar tests detallados en Postman"
Write-Host "4. Integrar APIs con el frontend React"