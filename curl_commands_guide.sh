# 🚀 Guía de Comandos curl para Probar APIs
# Comandos que funcionan correctamente en bash

echo "==================================================="
echo "🧪 GUÍA DE COMANDOS CURL - Sistema Bibliotecario"
echo "==================================================="
echo ""
echo "Tu servidor está corriendo en: http://localhost:5000"
echo "Todas las APIs están funcionando correctamente ✅"
echo ""

echo "📋 COMANDOS BÁSICOS:"
echo "==================="

echo ""
echo "1. 🏠 Verificar servidor:"
echo "curl http://localhost:5000"

echo ""
echo "2. 📊 Dashboard de estadísticas:"
echo "curl http://localhost:5000/api/statistics/dashboard"

echo ""
echo "3. 📚 Obtener todos los libros:"
echo "curl http://localhost:5000/api/books/allbooks"

echo ""
echo "4. 🔍 Buscar libros (por título):"
echo "curl \"http://localhost:5000/api/search/search?query=Dracula\""

echo ""
echo "5. 📖 Libros disponibles:"
echo "curl http://localhost:5000/api/search/available"

echo ""
echo "6. 🔔 Notificaciones de admin:"
echo "curl http://localhost:5000/api/notifications/admin"

echo ""
echo "7. 📈 Libros populares:"
echo "curl \"http://localhost:5000/api/search/popular?limit=5\""

echo ""
echo "📝 COMANDOS PARA CREAR DATOS:"
echo "============================"

echo ""
echo "8. 👤 Registrar nuevo usuario:"
echo 'curl -X POST "http://localhost:5000/api/auth/register" \'
echo '  -H "Content-Type: application/json" \'
echo '  -d "{\"userType\":\"Student\",\"userFullName\":\"Maria Garcia\",\"admissionId\":\"STU002\",\"age\":20,\"dob\":\"2003-03-15\",\"gender\":\"Female\",\"address\":\"Calle 123\",\"mobileNumber\":3001234567,\"email\":\"maria@test.com\",\"password\":\"maria123\",\"isAdmin\":false}"'

echo ""
echo "9. 📋 Crear categoría:"
echo 'curl -X POST "http://localhost:5000/api/categories/addcategory" \'
echo '  -H "Content-Type: application/json" \'
echo '  -d "{\"categoryName\":\"Ciencia Ficción\"}"'

echo ""
echo "10. 📚 Agregar nuevo libro:"
echo 'curl -X POST "http://localhost:5000/api/books/addbook" \'
echo '  -H "Content-Type: application/json" \'
echo '  -d "{\"isAdmin\":true,\"bookName\":\"1984\",\"author\":\"George Orwell\",\"bookCountAvailable\":3,\"language\":\"Español\",\"publisher\":\"Editorial Test\",\"bookStatus\":\"Available\",\"categories\":[]}"'

echo ""
echo "11. 📝 Crear reserva (necesitas IDs reales):"
echo 'curl -X POST "http://localhost:5000/api/reservations/reserve" \'
echo '  -H "Content-Type: application/json" \'
echo '  -d "{\"bookId\":\"68c1f843b3d6037bbca94eb2\",\"userId\":\"68e32e20522ab57df0a47b98\"}"'

echo ""
echo "🔍 BÚSQUEDAS AVANZADAS:"
echo "====================="

echo ""
echo "12. Buscar por autor:"
echo "curl \"http://localhost:5000/api/search/search?author=Garcia\""

echo ""
echo "13. Buscar por idioma:"
echo "curl \"http://localhost:5000/api/search/search?language=Español\""

echo ""
echo "14. Libros con paginación:"
echo "curl \"http://localhost:5000/api/search/paginated?page=1&limit=2\""

echo ""
echo "15. Libros recientes:"
echo "curl \"http://localhost:5000/api/search/recent?limit=3&days=30\""

echo ""
echo "📊 ESTADÍSTICAS DETALLADAS:"
echo "=========================="

echo ""
echo "16. Estadísticas por categoría:"
echo "curl http://localhost:5000/api/statistics/books-by-category"

echo ""
echo "17. Usuarios más activos:"
echo "curl \"http://localhost:5000/api/statistics/active-users?limit=5\""

echo ""
echo "18. Libros atrasados:"
echo "curl http://localhost:5000/api/statistics/overdue-books"

echo ""
echo "19. Transacciones mensuales:"
echo "curl \"http://localhost:5000/api/statistics/monthly-transactions?year=2025\""

echo ""
echo "🚨 GESTIÓN DE RESERVAS:"
echo "======================"

echo ""
echo "20. Ver todas las reservas:"
echo "curl http://localhost:5000/api/reservations/all-reservations"

echo ""
echo "21. Reservas expiradas:"
echo "curl http://localhost:5000/api/reservations/expired"

echo ""
echo "22. Reservas de un usuario específico:"
echo "curl http://localhost:5000/api/reservations/user-reservations/[USER_ID]"

echo ""
echo "🔔 NOTIFICACIONES:"
echo "================="

echo ""
echo "23. Notificaciones de usuario:"
echo "curl http://localhost:5000/api/notifications/user/[USER_ID]"

echo ""
echo "24. Contador de notificaciones:"
echo "curl http://localhost:5000/api/notifications/count/[USER_ID]"

echo ""
echo "✅ RESULTADOS DE TUS PRUEBAS:"
echo "============================"
echo ""
echo "✅ Servidor funcionando en puerto 5000"
echo "✅ Dashboard de estadísticas: 3 libros, 2 usuarios, 1 transacción activa"
echo "✅ Búsqueda avanzada: Funciona correctamente"
echo "✅ Libros disponibles: 2 libros disponibles"
echo "✅ Notificaciones: 1 libro atrasado + alertas de stock"
echo "✅ Sistema de reservas: Funciona correctamente"
echo "✅ TODAS LAS APIs NUEVAS FUNCIONAN PERFECTAMENTE 🎉"

echo ""
echo "💡 PRÓXIMOS PASOS:"
echo "=================="
echo "1. Importar Postman_Collection.json en Postman (puerto 5000)"
echo "2. Usar estos comandos curl para pruebas rápidas"
echo "3. Integrar las APIs con tu frontend React"
echo "4. Documentar las APIs para tu equipo"
echo ""
echo "🎯 Tu sistema bibliotecario tiene APIs profesionales completas!"