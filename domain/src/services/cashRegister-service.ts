import type { CashRegister } from '../entities/cashRegister.js';
import type { Service } from '../utils/types/service.js';

export interface CashRegisterService extends Service<CashRegister> {
    findByDate(date: Date): Promise<CashRegister | undefined>;
}
