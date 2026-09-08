import AppError from "./AppError.ts";

export function translateAppError<
    T extends Record<string, (options?: any) => unknown>,
    // TErrors extends Record<string, (options?: unknown) => never>,
>(
    error: unknown,
    errors: T,
    // errors: TErrors,
): never {
    if (!(error instanceof AppError)) {
        throw error;
    }

    const factory = errors[error.code];

    if (!factory) {
        throw error;
    }
    
    throw factory({
        message: error.message,
    });
}
