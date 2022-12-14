import { formValidation } from "./validatator";

export const validateForm = (data: FormData, selector?: string, errorClass?: string) => {
  const invalidFields = formValidation(data, selector, errorClass);

  return invalidFields === null;
};
