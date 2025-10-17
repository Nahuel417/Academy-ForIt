import type { CashRegister } from '@domain/entities/cashRegister.js';
import type { User } from '@domain/entities/user.js';
import type { CashRegisterService } from '@domain/services/cashRegister-service.js';
import { randomUUID } from 'crypto';

interface OpenCashRegisterDeps {
    cashRegisterService: CashRegisterService;
}

interface OpenCashRegisterPayload {
    initialAmount: number;
    openedBy?: User;
}

export async function openCashRegister({ cashRegisterService }: OpenCashRegisterDeps, { initialAmount, openedBy }: OpenCashRegisterPayload): Promise<CashRegister> {
    const today = new Date();

    const existing = await cashRegisterService.findByDate(today);
    if (existing) {
        throw new Error('Ya existe una caja abierta para esta fecha');
    }

    const newRegister: CashRegister = {
        id: randomUUID(),
        date: today,
        closedAt: undefined,
        initialAmount,
        orders: [],
        movements: [],
        totalSales: 0,
        totalMovements: 0,
        finalAmount: initialAmount,
        openedBy,
    };

    await cashRegisterService.save(newRegister);
    return newRegister;
}
