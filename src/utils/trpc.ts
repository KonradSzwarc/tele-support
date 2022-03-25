import { createReactQueryHooks } from '@trpc/react';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';

// ℹ️ Type-only import:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
import type { AppRouter } from '~/server/routers/_app';

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/react#3-create-trpc-hooks
 */
export const trpc = createReactQueryHooks<AppRouter>();

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type InferQueryOutput<TRouteKey extends keyof AppRouter['_def']['queries']> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;

export type InferQueryInput<TRouteKey extends keyof AppRouter['_def']['queries']> = inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>;

export type InferMutationOutput<TRouteKey extends keyof AppRouter['_def']['mutations']> = inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>;

export type InferMutationInput<TRouteKey extends keyof AppRouter['_def']['mutations']> = inferProcedureInput<AppRouter['_def']['mutations'][TRouteKey]>;

export { default as transformer } from 'superjson';
