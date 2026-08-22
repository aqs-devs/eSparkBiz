// const validateId = (req, res, next) => {
//     const id = Math.floor(Number(req.params.id)) || 1;

//     if (!id || !Number.isInteger(id) || id <= 0) {
//         return next(new Error('Invalid ID format.'));
//     }

//     next();
// };

import { param } from 'express-validator';

export const idValidator = [
    param('id').isInt({ min: 1 })
        .toInt()
        // .withMessage('ID must be a positive integer'),
];

export default idValidator;
