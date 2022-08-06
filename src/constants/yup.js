import * as Yup from "yup";

export const collectionNameValidation = Yup.string()
  .trim()
  .required("Required")
  .min(3, "Must be longer than 3 characters")
  .max(30, "Must be less than 30 characters");
