// export function pluckFirstColumn<T extends Record<string, unknown>>(rows: T[]) {
//     return (
//         rows
//             .map((row) => Object.values(row)[0])
//             // remove null values
//             .filter((value) => value != null)
//     );
// }



export function pluckFirstColumn<T>(rows: Record<string, T | null>[]): T[] {
    return (
        rows
            .map((row) => Object.values(row)[0])
            // remove null values
            .filter((value): value is T => value != null)
    );
}


import type { ValidationError } from "express-validator";

export function validationErrorsToErrorMap(
    errors: ValidationError[],
): Record<string, string[]> {
    return errors.reduce((acc, error) => {
        if (error.type !== "field") {
            return acc;
        }

        const messages = acc[error.path] ?? [];
        messages.push(`${error.msg} ${error.value}`);
        acc[error.path] = messages;

        return acc;
    }, {} as Record<string, string[]>);
}
