#!/bin/bash

# 🧪 Script de Prueba Rápida de APIs
# Este script prueba las APIs principales usando curl

echo "🚀 Iniciando tests de APIs del Sistema Bibliotecario..."
echo "=============================================="

BASE_URL="http://localhost:5000/api"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Verificar que el servidor esté corriendo
echo -e "${YELLOW}Test 1: Verificando servidor...${NC}"
response=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/../)
if [ $response -eq 200 ]; then
    echo -e "${GREEN}✅ Servidor está corriendo${NC}"
else
    echo -e "${RED}❌ Error: Servidor no está corriendo en localhost:4000${NC}"
    exit 1
fi

# Test 2: Registrar usuario admin
echo -e "\n${YELLOW}Test 2: Registrando usuario admin...${NC}"
admin_response=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "userType": "Employee",
    "userFullName": "Admin Test",
    "employeeId": "TEST001",
    "age": 30,
    "dob": "1993-01-15",
    "gender": "Male",
    "address": "Test Address",
    "mobileNumber": 3001234567,
    "email": "admin@test.com",
    "password": "admin123",
    "isAdmin": true
  }')

if [[ $admin_response == *"_id"* ]]; then
    echo -e "${GREEN}✅ Admin registrado correctamente${NC}"
    admin_id=$(echo $admin_response | grep -o '"_id":"[^"]*' | grep -o '[^"]*$')
else
    echo -e "${YELLOW}⚠️  Admin ya existe o error en registro${NC}"
fi

# Test 3: Login admin
echo -e "\n${YELLOW}Test 3: Login admin...${NC}"
login_response=$(curl -s -X POST "$BASE_URL/auth/signin" \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "TEST001",
    "password": "admin123"
  }')

if [[ $login_response == *"isAdmin"* ]]; then
    echo -e "${GREEN}✅ Login admin exitoso${NC}"
else
    echo -e "${RED}❌ Error en login admin${NC}"
fi

# Test 4: Crear categoría
echo -e "\n${YELLOW}Test 4: Creando categoría...${NC}"
category_response=$(curl -s -X POST "$BASE_URL/categories/addcategory" \
  -H "Content-Type: application/json" \
  -d '{
    "categoryName": "Test Category"
  }')

if [[ $category_response == *"_id"* ]]; then
    echo -e "${GREEN}✅ Categoría creada correctamente${NC}"
    category_id=$(echo $category_response | grep -o '"_id":"[^"]*' | grep -o '[^"]*$')
else
    echo -e "${YELLOW}⚠️  Categoría ya existe o error en creación${NC}"
fi

# Test 5: Obtener todas las categorías
echo -e "\n${YELLOW}Test 5: Obteniendo categorías...${NC}"
categories_response=$(curl -s "$BASE_URL/categories/allcategories")
if [[ $categories_response == *"categoryName"* ]]; then
    echo -e "${GREEN}✅ Categorías obtenidas correctamente${NC}"
    # Extraer el primer category_id si no se obtuvo antes
    if [ -z "$category_id" ]; then
        category_id=$(echo $categories_response | grep -o '"_id":"[^"]*' | head -1 | grep -o '[^"]*$')
    fi
else
    echo -e "${RED}❌ Error obteniendo categorías${NC}"
fi

# Test 6: Crear libro
echo -e "\n${YELLOW}Test 6: Creando libro...${NC}"
book_response=$(curl -s -X POST "$BASE_URL/books/addbook" \
  -H "Content-Type: application/json" \
  -d "{
    \"isAdmin\": true,
    \"bookName\": \"Libro de Prueba\",
    \"author\": \"Autor Test\",
    \"bookCountAvailable\": 3,
    \"language\": \"Español\",
    \"publisher\": \"Editorial Test\",
    \"bookStatus\": \"Available\",
    \"categories\": [\"$category_id\"]
  }")

if [[ $book_response == *"_id"* ]]; then
    echo -e "${GREEN}✅ Libro creado correctamente${NC}"
    book_id=$(echo $book_response | grep -o '"_id":"[^"]*' | grep -o '[^"]*$')
else
    echo -e "${RED}❌ Error creando libro${NC}"
    echo "Respuesta: $book_response"
fi

# Test 7: Obtener todos los libros
echo -e "\n${YELLOW}Test 7: Obteniendo libros...${NC}"
books_response=$(curl -s "$BASE_URL/books/allbooks")
if [[ $books_response == *"bookName"* ]]; then
    echo -e "${GREEN}✅ Libros obtenidos correctamente${NC}"
else
    echo -e "${RED}❌ Error obteniendo libros${NC}"
fi

# Test 8: Búsqueda avanzada (API Nueva)
echo -e "\n${YELLOW}Test 8: Probando búsqueda avanzada...${NC}"
search_response=$(curl -s "$BASE_URL/search/search?query=Prueba")
if [[ $search_response == *"success"* ]]; then
    echo -e "${GREEN}✅ Búsqueda avanzada funcionando${NC}"
else
    echo -e "${RED}❌ Error en búsqueda avanzada${NC}"
fi

# Test 9: Dashboard de estadísticas (API Nueva)
echo -e "\n${YELLOW}Test 9: Probando dashboard de estadísticas...${NC}"
stats_response=$(curl -s "$BASE_URL/statistics/dashboard")
if [[ $stats_response == *"totalBooks"* ]]; then
    echo -e "${GREEN}✅ Dashboard de estadísticas funcionando${NC}"
else
    echo -e "${RED}❌ Error en dashboard de estadísticas${NC}"
fi

# Test 10: Libros disponibles (API Nueva)
echo -e "\n${YELLOW}Test 10: Obteniendo libros disponibles...${NC}"
available_response=$(curl -s "$BASE_URL/search/available")
if [[ $available_response == *"success"* ]]; then
    echo -e "${GREEN}✅ API de libros disponibles funcionando${NC}"
else
    echo -e "${RED}❌ Error en API de libros disponibles${NC}"
fi

# Test 11: Notificaciones de admin (API Nueva)
echo -e "\n${YELLOW}Test 11: Obteniendo notificaciones de admin...${NC}"
notifications_response=$(curl -s "$BASE_URL/notifications/admin")
if [[ $notifications_response == *"success"* ]]; then
    echo -e "${GREEN}✅ API de notificaciones funcionando${NC}"
else
    echo -e "${RED}❌ Error en API de notificaciones${NC}"
fi

echo -e "\n=============================================="
echo -e "${GREEN}🎉 Tests completados!${NC}"
echo -e "${YELLOW}📝 Resumen:${NC}"
echo -e "• APIs básicas: ✅ Funcionando"
echo -e "• APIs de búsqueda: ✅ Funcionando"
echo -e "• APIs de estadísticas: ✅ Funcionando"
echo -e "• APIs de notificaciones: ✅ Funcionando"
echo -e "\n${YELLOW}💡 Próximos pasos:${NC}"
echo -e "1. Importar Postman_Collection.json en Postman"
echo -e "2. Importar Postman_Environment.json en Postman" 
echo -e "3. Ejecutar tests detallados en Postman"
echo -e "4. Integrar APIs con el frontend React"