import { body } from "express-validator"


export const movieCreateValidation = () => {
  return [
    body("title")
      .isString().withMessage("The title is required.")
      .isLength({ min: 5 }).withMessage("The title must be at least 5 characters long."),
    body("rating")
      .isNumeric().withMessage("The rating must be a number.")
      .custom((value: number) => {
        if(value < 0 || value > 10) {
          throw new Error("The rating must be between 0 and 10.")
        }

        return true
      }),
    body("description")
      .isString().withMessage("The description is required."),
    body("director")
      .isString().withMessage("The director is required"),
    body("poster")
      .isURL().withMessage("The poster must be a URL."),
  ]
}