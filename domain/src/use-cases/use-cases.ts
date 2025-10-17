import { approveBudget } from './budget/approve-budget.js';
import { createBudget } from './budget/create-budget.js';
import { getBudgetById } from './budget/get-budget-by-id.js';
import { getBudgetsList } from './budget/get-budgets-list.js';
import { addMovement } from './cashRegister/add-movement.js';
import { openCashRegister } from './cashRegister/open-cash-register.js';
import { createOrder } from './order/create-order.js';
import { getOrderById } from './order/get-order-id.js';
import { getOrderList } from './order/get-order-list.js';
import { updateOrderStatus } from './order/update-order-status.js';
import { addProduct } from './products/add-product.js';
import { deleteProduct } from './products/delete-product.js';
import { getProductById } from './products/get-product-by-id.js';
import { getProductsList } from './products/get-products-list.js';
import { searchProducts } from './products/search-products.js';
import { updateProduct } from './products/update-product.js';
import { updateStock } from './products/update-stock.js';
import { authenticate } from './user/authenticate.js';
import { register } from './user/register.js';
import { updateUserRole } from './user/update-user-role.js';

export type UseCase<P = any, D = any, R = unknown> = (deps: D, payload: P) => Promise<R>;

export interface UseCaseDeclaration {
    useCase: UseCase;
    enable?: boolean;
}

export const domainUseCases = {
    // Usuarios
    register: { useCase: register, enable: true },
    authenticate: { useCase: authenticate, enable: true },
    updateUserRole: { useCase: updateUserRole, enable: true },

    // Productos
    addProduct: { useCase: addProduct, enable: true },
    updateProduct: { useCase: updateProduct, enable: true },
    deleteProduct: { useCase: deleteProduct, enable: true },
    getProductById: { useCase: getProductById, enable: true },
    getProductList: { useCase: getProductsList, enable: true },
    searchProducts: { useCase: searchProducts, enable: true },
    updateStock: { useCase: updateStock, enable: true },

    // Ordenes
    createOrder: { useCase: createOrder, enable: true },
    updateOrderStatus: { useCase: updateOrderStatus, enable: true },
    getOrderById: { useCase: getOrderById, enable: true },
    getOrderList: { useCase: getOrderList, enable: true },

    // Budgets
    createBudget: { useCase: createBudget, enable: true },
    approveBudget: { useCase: approveBudget, enable: true },
    getBudgetById: { useCase: getBudgetById, enable: true },
    getBudgetList: { useCase: getBudgetsList, enable: true },

    // Cash Register
    openCashRegister: { useCase: openCashRegister, enable: true },
    addMovement: { useCase: addMovement, enable: true },
} as const satisfies Record<string, UseCaseDeclaration>;

export const USE_CASE_NAME = Object.keys(domainUseCases).reduce((acc, key) => {
    acc[key] = key;
    return acc;
}, {} as Record<string, string>) as Record<keyof typeof domainUseCases, keyof typeof domainUseCases>;

export type UseCaseName = (typeof USE_CASE_NAME)[keyof typeof USE_CASE_NAME];

export type UseCaseType<TEndpointName extends UseCaseName> = (typeof domainUseCases)[TEndpointName]['useCase'];
