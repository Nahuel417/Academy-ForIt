import type { CashRegister } from '@domain/entities/cashRegister.js';
import type { CashRegisterService } from '@domain/services/cashRegister-service.js';

interface GetCashRegisterByDateDeps {
    cashRegisterService: CashRegisterService;
}

interface GetCashRegisterByDatePayload {
    date: Date;
}

export async function getCashRegisterByDate({ cashRegisterService }: GetCashRegisterByDateDeps, { date }: GetCashRegisterByDatePayload): Promise<CashRegister | undefined> {
    return cashRegisterService.findByDate(date);
}
