import { addProduct } from './products/add-product.js';
import { deleteProduct } from './products/delete-product.js';
import { getProductById } from './products/get-product-by-id.js';
import { updateProduct } from './products/update-product.js';
// import { getProductsList } from './products/get-product-list.js';
// import { getProduct } from './products/get-product.js';
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
} as const satisfies Record<string, UseCaseDeclaration>;

export const USE_CASE_NAME = Object.keys(domainUseCases).reduce((acc, key) => {
    acc[key] = key;
    return acc;
}, {} as Record<string, string>) as Record<keyof typeof domainUseCases, keyof typeof domainUseCases>;

export type UseCaseName = (typeof USE_CASE_NAME)[keyof typeof USE_CASE_NAME];

export type UseCaseType<TEndpointName extends UseCaseName> = (typeof domainUseCases)[TEndpointName]['useCase'];
