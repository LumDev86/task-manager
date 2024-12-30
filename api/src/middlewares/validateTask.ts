import { body } from "express-validator";

export const validateTask = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
];
