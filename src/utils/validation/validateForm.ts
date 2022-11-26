import { formValidation } from "./validatator";

export const validateForm = (event: SubmitEvent) => {
  event.preventDefault();

  const form = event.target as HTMLFormElement;

  if (!form) {
    return;
  }

  const invalidFields = formValidation(new FormData(form));

  if (invalidFields === null) {
    console.log(Object.fromEntries(new FormData(form).entries()));
  }
}
