import type { CashRegisterService } from '@domain/services/cashRegister-service.js';
import type { CashRegisterMovement } from '@domain/entities/cashRegisterMovement.js';

interface AddMovementDeps {
    cashRegisterService: CashRegisterService;
}

interface AddMovementPayload {
    registerId: string;
    movement: CashRegisterMovement;
}

export async function addMovement({ cashRegisterService }: AddMovementDeps, { registerId, movement }: AddMovementPayload): Promise<void> {
    if (!cashRegisterService.addMovement) {
        throw new Error('Service does not implement addMovement');
    }

    await cashRegisterService.addMovement(registerId, movement);
}
