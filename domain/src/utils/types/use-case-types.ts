import type { domainUseCases } from "../../use-cases/use-cases.js";

export type UseCaseTypes =
  (typeof domainUseCases)[keyof typeof domainUseCases]["useCase"];
