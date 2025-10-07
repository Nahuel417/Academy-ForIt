import type { UseCase } from "demo-domain";

export type UseCaseDependencies<TUseCase extends UseCase> = TUseCase extends (
  deps: infer Deps,
  payload: infer _
) => Promise<unknown>
  ? Deps
  : never;

type UnionToIntersection<TUnion> = (
  TUnion extends any ? (k: TUnion) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type MergedDependencies<TUseCaseCollection extends UseCase> =
  UnionToIntersection<UseCaseDependencies<TUseCaseCollection>>;
