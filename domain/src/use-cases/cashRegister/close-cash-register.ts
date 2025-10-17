import type { CashRegister } from '@domain/entities/cashRegister.js';
import { OrderStatus } from '@domain/entities/order.js';
import type { CashRegisterService } from '@domain/services/cashRegister-service.js';

interface CloseCashRegisterDeps {
    cashRegisterService: CashRegisterService;
}

interface CloseCashRegisterPayload {
    registerId: string;
}

export async function closeCashRegister({ cashRegisterService }: CloseCashRegisterDeps, { registerId }: CloseCashRegisterPayload): Promise<CashRegister> {
    const register = await cashRegisterService.findById(registerId);
    if (!register) throw new Error('Cash register not found');
    if (register.closedAt) throw new Error('Cash register already closed');

    register.closedAt = new Date();

    // recalcular totalSales solo con órdenes COMPLETADAS
    register.totalSales = register.orders.filter((o) => o.status === OrderStatus.COMPLETED).reduce((sum, o) => sum + o.total, 0);

    register.finalAmount = register.initialAmount + register.totalSales + register.totalMovements;

    await cashRegisterService.editOne(register);
    return register;
}
