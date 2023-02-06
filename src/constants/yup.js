import * as Yup from "yup";

export const validationCollectionName = Yup.string()
  .trim()
  .min(2, "Must be at least 2 characters")
  .max(100, "Must be at most 100 characters")
  .required("This field is required");

export const validationWebsite = Yup.string()
  .trim()
  .url("URL must start with http:// or https://")
  .max(100, "Must be at most 100 characters");

export const validationTwitter = Yup.string()
  .trim()
  .url("URL must start with http:// or https://")
  .max(100, "Must be at most 100 characters")
  .matches(/\btwitter.com\b/, "URL must be twitter.com");

export const validationDiscord = Yup.string()
  .trim()
  .url("URL must start with http:// or https://")
  .max(100, "Must be at most 100 characters")
  .matches(/\bdiscord.(com|gg)\b/, "URL must be discord.com or discord.gg");

export const validationTelegram = Yup.string()
  .trim()
  .url("URL must start with http:// or https://")
  .max(100, "Must be at most 100 characters")
  .matches(/\bt.me\b/, "URL must be t.me");

export const validationDescription = Yup.string()
  .trim()
  .min(2, "Must be at least 2 characters")
  .max(5000, "Must be at most 5000 characters")
  .required("This field is required");

export const validationNftName = Yup.string()
  .trim()
  .when("isEditMode", {
    is: false,
    then: Yup.string()
      .min(2, "Must be at least 2 characters")
      .max(100, "Must be at most 100 characters")
      .required("This field is required"),
  });

export const validationNftSymbol = Yup.string()
  .trim()
  .when("isEditMode", {
    is: false,
    then: Yup.string()
      .min(2, "Must be at least 2 characters")
      .max(30, "Must be at most 30 characters")
      .required("This field is required"),
  });

export const validationAgreeTosCheckbox = Yup.boolean().when("isEditMode", {
  is: false,
  then: Yup.boolean()
    .required("The terms of service must be accepted.")
    .oneOf([true], "The TOS must be accepted."),
});

export const validationAgreeProjectMintFeeCheckbox = Yup.boolean().when(
  "isEditMode",
  {
    is: false,
    then: Yup.boolean()
      .required("This terms must be accepted.")
      .oneOf([true], "This terms must be accepted."),
  }
);

export const validationAgreeFeeCheckbox = Yup.boolean().when("isEditMode", {
  is: false,
  then: Yup.boolean()
    .required("This terms must be accepted.")
    .oneOf([true], "This terms must be accepted."),
});

export const validationEmail = Yup.string().trim().email("Not a proper email");
