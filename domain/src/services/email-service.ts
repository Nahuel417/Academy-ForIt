export interface EmailService {
  notifyNewProduct: (name: string, emails: string[]) => Promise<void>;
}
