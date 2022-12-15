import { formValidation } from "./validatator";

export const validateForm = (data: FormData, selector?: string, errorClass?: string) => {
  const invalidFields = formValidation(data, selector, errorClass);

  console.log('invalidFields', invalidFields);

  return invalidFields === null;
};
