import { translateAppError } from './app-error.ts';

// export function withAppErrors<
//     TErrors extends Record<string, (options?: any) => never>,
//     TInput,
//     TResult,
// >(handler: (input: TInput, errors: TErrors) => Promise<TResult> | TResult) {
//     return async ({ errors, ...options }: TInput & { errors: TErrors }) => {
//         try {
//             return await handler(options as TInput, errors);
//         } catch (error) {
//             translateAppError(error, errors);
//         }
//     };
// }

export function withAppErrors<
    TOptions extends { errors: TErrors },
    TErrors extends Record<PropertyKey, (options?: any) => unknown>,
    TResult,
>(handler: (options: Omit<TOptions, 'errors'>) => Promise<TResult> | TResult) {
    return async (options: TOptions) => {
        const { errors, ...rest } = options;

        try {
            return await handler(rest as Omit<TOptions, 'errors'>);
        } catch (error) {
            translateAppError(error, errors);
        }
    };
}

// export function withAppErrors<
//     TArgs extends {
//         errors: Record<string, (options?: any) => unknown>;
//     },
//     TResult,
// >(handler: (args: TArgs) => TResult | Promise<TResult>) {
//     return async (args: TArgs): Promise<TResult> => {
//         try {
//             return await handler(args);
//         } catch (error) {
//             translateAppError(error, args.errors);
//         }
//     };
// }
