# Domain Layer - StockPro

Este es el núcleo de lógica de negocio para **StockPro**, una aplicación de gestión de inventario/stock, implementada con principios de Domain-Driven Design (DDD).

## 📁 Estructura

- **`entities/`**: Modelos de datos (Product, Order, User, Budget, CashRegister, etc.)
- **`services/`**: Interfaces para acceso a datos (CRUD genérico + métodos específicos)
- **`use-cases/`**: Casos de uso de negocio (productos, órdenes, usuarios, presupuestos, caja registradora)
- **`utils/`**: Tipos base (Entity, Service, UseCase)
- **`mocks/`**: Datos falsos para testing

## 🧪 Pruebas Unitarias

Todas las pruebas unitarias han sido ejecutadas y pasan correctamente.

### Resultados de las Pruebas
- **Archivos de Prueba**: 25 pasados (25)
- **Tests Ejecutados**: 72 pasados (72)
- **Duración Total**: ~1.64s
- **Estado**: ✅ Éxito completo

### Casos de Uso Probados
- **Productos**: Crear, actualizar, eliminar, buscar, actualizar stock (15 tests)
- **Órdenes**: Crear, actualizar estado, listar, obtener por ID (9 tests)
- **Usuarios**: Registrar, autenticar, actualizar roles (8 tests)
- **Presupuestos**: Crear, aprobar, listar, obtener (9 tests)
- **Caja Registradora**: Abrir, agregar movimientos, cerrar, obtener por fecha (18 tests)
- **General**: Cálculos de totales (órdenes, presupuestos, caja) (13 tests)

## 🚀 Tecnologías
- **Lenguaje**: TypeScript (ES Modules)
- **Testing**: Vitest
- **Mocks**: @faker-js/faker
- **Arquitectura**: Domain-Driven Design

## 📋 Ejecutar Pruebas
```bash
npm test
# o
vitest run
```

## ✅ Estado del Proyecto
- Todas las entidades y servicios están definidos.
- Los casos de uso implementan la lógica de negocio.
- Las pruebas cubren todos los escenarios principales.
- El dominio está listo para integración con capas superiores (infraestructura, presentación).
