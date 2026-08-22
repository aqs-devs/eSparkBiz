import { type FieldValidationError, validationResult } from "express-validator";

import type { NextFunction, Request, Response } from "express";
import { z } from 'zod';
import { validationErrorsToErrorMap } from "@job-applicants/server-core/";
import { ErrorCode } from '@job-applicants/schemas';

export function validateRequestExpressValidator(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req).formatWith(
        error => error as FieldValidationError
    );
    // const result = validationResult(req);

    if (!result.isEmpty()) {
        // const errorMap = result.array().reduce((acc, error) => {
        //     if (!acc[error.path]) {
        //         acc[error.path] = [];
        //     }
        //     acc[error.path].push(`${error.msg} ${error.value}`);
        //     return acc;
        // }, {});
    
        const errorMap = validationErrorsToErrorMap(result.array());

        res.json(errorMap);

        return;
    }

    next();
}

// server/src/middleware/request-validator.js
export function validateRequestZod(schema: z.ZodType, validationTarget: "query" | "params" | "body" | "cookies" | "headers") {
    return (req: Request, res: Response, next: NextFunction) => {
        // .safeParse() returns { success, data, error } instead of throwing
        
        // const result = schema.parse(req[validationTarget]);
//        const raw = Object.assign({}, req[validationTarget])
        // console.debug('raw after assign:', raw)
        // console.debug('emptyToDefault result for undefined:', ((v) => (v === '' || v === undefined) ? 10 : v)(raw.pageSize))
        // const result = schema.parse(raw)
        const result = schema.safeParse(req[validationTarget]);


        if (!result.success) {
            // result.error.flatten() gives you { fieldErrors: { field: ['message'] } }
            // which is already the shape you were manually building with .reduce()
            res.status(400).json({
                code: ErrorCode.VALIDATION_ERROR,
                message: "One or more validation errors occurred.",
                errors: z.flattenError(result.error).fieldErrors,
            });
            return
        }

        // result.data is the parsed AND sanitized data — Zod strips unknown fields
        // and applies transformations (trim, toLowerCase) automatically
        res.locals[validationTarget] = result.data;
        // console.debug('result: ', result, 'result.data: ', result.data)
        // console.debug(`middleware: res.locals.${validationTarget} `, res.locals[validationTarget])
        next();
    };
}
