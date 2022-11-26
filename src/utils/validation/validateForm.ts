import { formValidation } from "./validatator";

export const validateForm = (event: SubmitEvent, selector?: string, errorClass?: string) => {
  event.preventDefault();

  const form = event.target as HTMLFormElement;

  if (!form) {
    return;
  }

  const invalidFields = formValidation(new FormData(form), selector, errorClass);

  if (invalidFields === null) {
    console.log(Object.fromEntries(new FormData(form).entries()));
  }
}
