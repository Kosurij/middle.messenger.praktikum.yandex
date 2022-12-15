import { formValidation } from "./validatator";

export const validateForm = (data: FormData, selector?: string, errorClass?: string) => {
  const notification: HTMLElement | null = document.querySelector(".notification");

  notification!.textContent = "";

  const invalidFields = formValidation(data, selector, errorClass);

  return invalidFields === null;
};
