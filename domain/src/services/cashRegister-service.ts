import type { CashRegisterMovement } from '@domain/entities/cashRegisterMovement.js';
import type { CashRegister } from '../entities/cashRegister.js';
import type { Service } from '../utils/types/service.js';

export interface CashRegisterService extends Service<CashRegister> {
    findByDate(date: Date): Promise<CashRegister | undefined>;
    addMovement?(registerId: string, movement: CashRegisterMovement): Promise<void>;
    removeMovement?(registerId: string, description: string): Promise<void>;
    updateMovement?(registerId: string, movement: CashRegisterMovement): Promise<void>;
}
