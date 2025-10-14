import type { CashRegister } from '../../entities/cashRegister.js';
import type { CashRegisterMovement } from '../../entities/cashRegisterMovement.js';
import type { CashRegisterService } from '../cashRegister-service.js';

export class MockedCashRegisterService implements CashRegisterService {
    registers: CashRegister[] = [];

    constructor(initialRegisters: CashRegister[] = []) {
        this.registers = initialRegisters;
    }

    save = async (data: CashRegister): Promise<void> => {
        this.registers.push(data);
    };

    findAll = async (): Promise<CashRegister[]> => this.registers;

    findById = async (id: string): Promise<CashRegister | undefined> => this.registers.find((r) => r.id === id);

    editOne = async (data: CashRegister): Promise<CashRegister> => {
        const index = this.registers.findIndex((r) => r.id === data.id);
        if (index === -1) throw new Error('CashRegister not found');
        this.registers[index] = data;
        return this.registers[index];
    };

    updateMany = async (data: CashRegister[]): Promise<CashRegister[] | undefined> => {
        data.forEach((d) => {
            const index = this.registers.findIndex((r) => r.id === d.id);
            if (index !== -1) this.registers[index] = d;
        });
        return data;
    };

    delete = async (id: string): Promise<void> => {
        this.registers = this.registers.filter((r) => r.id !== id);
    };

    findByDate = async (date: Date): Promise<CashRegister | undefined> => this.registers.find((r) => r.date.toDateString() === date.toDateString());

    // Métodos para manejar CashRegisterMovements
    addMovement = async (registerId: string, movement: CashRegisterMovement): Promise<void> => {
        const register = this.registers.find((r) => r.id === registerId);
        if (!register) throw new Error('Cash register not found');
        if (!register.movements) register.movements = [];
        register.movements.push(movement);

        // actualizar totales
        register.totalMovements = register.movements.reduce((sum, m) => sum + m.amount, 0);
        register.finalAmount = register.initialAmount + register.totalSales + register.totalMovements;
    };

    removeMovement = async (registerId: string, description: string): Promise<void> => {
        const register = this.registers.find((r) => r.id === registerId);
        if (!register) throw new Error('Cash register not found');
        register.movements = register.movements.filter((m) => m.description !== description);

        // actualizar totales
        register.totalMovements = register.movements.reduce((sum, m) => sum + m.amount, 0);
        register.finalAmount = register.initialAmount + register.totalSales + register.totalMovements;
    };

    updateMovement = async (registerId: string, updatedMovement: CashRegisterMovement): Promise<void> => {
        const register = this.registers.find((r) => r.id === registerId);
        if (!register) throw new Error('Cash register not found');
        const index = register.movements.findIndex((m) => m.description === updatedMovement.description);
        if (index === -1) throw new Error('Movement not found');
        register.movements[index] = updatedMovement;

        // actualizar totales
        register.totalMovements = register.movements.reduce((sum, m) => sum + m.amount, 0);
        register.finalAmount = register.initialAmount + register.totalSales + register.totalMovements;
    };
}
