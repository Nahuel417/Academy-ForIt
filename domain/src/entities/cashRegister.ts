import type { Entity } from '../utils/types/entity.js';
import type { CashRegisterMovement } from './cashRegisterMovement.js';
import type { Order } from './order.js';
import type { User } from './user.js';

export interface CashRegister extends Entity {
    date: Date; // Fecha de la caja (única por día)
    openedBy?: User | undefined; // Usuario que abrió la caja
    closedAt?: Date | undefined; // Momento de cierre
    initialAmount: number; // Monto inicial al abrir
    orders: Order[]; // Ventas del día
    movements: CashRegisterMovement[]; // Gastos o ingresos extra
    totalSales: number; // Total de ventas (suma de orders)
    totalMovements: number; // Total de movimientos (gastos/ingresos)
    finalAmount: number; // Monto final de la caja (initial + ventas + movimientos)
}
