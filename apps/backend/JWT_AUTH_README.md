# 🔐 Autenticación JWT - StockPro Backend

## 📋 Resumen
Se ha implementado un sistema completo de autenticación y autorización JWT en el backend de StockPro.

## 🚀 Características Implementadas

### ✅ Autenticación JWT
- **Login**: Devuelve token JWT junto con datos del usuario
- **Verificación**: Middleware para validar tokens en cada request
- **Expiración**: Tokens expiran en 24 horas (configurable)

### ✅ Autorización por Roles
- **ADMIN**: Acceso completo a todas las funciones
- **EMPLOYEE**: Acceso a operaciones diarias (productos, pedidos, presupuestos)
- **Sin autenticación**: Solo registro y login

### ✅ Rutas Protegidas
| Ruta | Método | Rol Requerido | Descripción |
|------|--------|---------------|-------------|
| `/users/register` | POST | Público | Registro de usuarios |
| `/users/login` | POST | Público | Login y obtención de JWT |
| `/users/:id/role` | PATCH | ADMIN | Cambiar rol de usuario |
| `/products/*` | ALL | EMPLOYEE+ | Gestión de productos |
| `/orders/*` | ALL | EMPLOYEE+ | Gestión de pedidos |
| `/budgets/*` | ALL | EMPLOYEE+ | Gestión de presupuestos |

## 🔧 Configuración

### Variables de Entorno (.env)
```bash
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Uso del Token JWT
```javascript
// En el header de cada request protegido:
Authorization: Bearer <tu-jwt-token>
```

## 📝 Ejemplos de Uso

### 1. Registro de Usuario
```bash
POST /users/register
{
  "email": "admin@stockpro.com",
  "password": "securepass123",
  "role": "ADMIN"
}
```

### 2. Login y Obtención de Token
```bash
POST /users/login
{
  "email": "admin@stockpro.com",
  "password": "securepass123"
}

// Response:
{
  "user": {
    "id": "user-123",
    "email": "admin@stockpro.com",
    "role": "ADMIN"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful"
}
```

### 3. Uso de Token en Requests Protegidos
```bash
GET /products
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## 🛡️ Middlewares Implementados

### AuthMiddleware.authenticate
- Verifica que el token JWT sea válido
- Extrae información del usuario al `req.user`

### AuthMiddleware.requireAdmin
- Solo permite acceso a usuarios con rol ADMIN

### AuthMiddleware.requireEmployee
- Permite acceso a ADMIN y EMPLOYEE

## 🔄 Flujo de Autenticación

1. **Usuario se registra** → Cuenta creada
2. **Usuario hace login** → Recibe JWT token
3. **Usuario incluye token** en headers de requests futuros
4. **Middleware valida token** → Permite o deniega acceso
5. **Middleware verifica roles** → Controla permisos específicos

## 🧪 Testing con JWT

Los tests existentes funcionan sin cambios. Para tests que requieren autenticación, puedes:

```typescript
// En los tests, crear usuario y obtener token
const loginResponse = await request(app)
  .post('/users/login')
  .send({ email: 'test@example.com', password: 'password' });

const token = loginResponse.body.token;

// Usar token en requests posteriores
const response = await request(app)
  .get('/products')
  .set('Authorization', `Bearer ${token}`);
```

## 🔒 Seguridad

- ✅ **Passwords hasheados** con bcrypt
- ✅ **JWT tokens** con expiración
- ✅ **Verificación de roles** en rutas sensibles
- ✅ **Variables de entorno** para secrets
- ⚠️ **Cambiar JWT_SECRET** en producción

¡El sistema de autenticación JWT está listo y funcionando! 🎉
