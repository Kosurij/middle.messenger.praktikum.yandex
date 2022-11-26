export type TFieldNamesKeys = keyof typeof FIELD_NAMES;

export type TFormData = [TFieldNamesKeys, string];

export type TInput = { name: TFieldNamesKeys, value: string }

type TErrors = Partial<Record<string, boolean>>;

export enum FIELD_NAMES {
  first_name = "first_name",
  second_name = "second_name",
  login = "login",
  email = "email",
  oldPassword = "oldPassword",
  password = "password",
  repeatPassword = "repeatPassword",
  phone = "phone",
  message = "message",
}

const PATTERNS: Record<TFieldNamesKeys, RegExp> = {
  [FIELD_NAMES.first_name]: /^[А-ЯЁA-Z]{1}([а-яёa-z]|-[А-ЯЁA-Zа-яёa-z]{1}[а-яёa-z])*$/,
  [FIELD_NAMES.second_name]: /^[А-ЯЁA-Z]{1}([а-яёa-z]|-[А-ЯЁA-Zа-яёa-z]{1}[а-яёa-z])*$/,
  [FIELD_NAMES.login]: /^(?=.*?([a-zA-Z]|-|_))(\w|-|_){3,20}$/,
  [FIELD_NAMES.email]: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  [FIELD_NAMES.phone]: /^\+?\d{10,15}$/,
  [FIELD_NAMES.message]: /[\s\S]+/,
  [FIELD_NAMES.oldPassword]: /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/,
  [FIELD_NAMES.password]: /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/,
  [FIELD_NAMES.repeatPassword]: /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/
}

const highlightErrors  = (errors: TErrors) => {
  const inputWrappers: HTMLElement[] = Array.from(document.querySelectorAll('.inputField'));

  inputWrappers.forEach(inputWrapper => {
    const input = inputWrapper.firstElementChild as HTMLInputElement;

    errors[input.name]
        ? inputWrapper.classList.add('inputField-error')
        : inputWrapper.classList.remove('inputField-error')
  })
}

const validateFormData = ([fieldName, value]: TFormData): boolean => PATTERNS[fieldName].test(value)

const validateInput = ({ name, value } : TInput) => PATTERNS[name].test(value)

export const formValidation = (formData: FormData) => {
  const errors: TErrors = {}

  for(let inputField of formData) {
    if (!validateFormData(inputField as TFormData)) {
      errors[inputField[0]] = true;
    }
  }

  highlightErrors(errors);

  if (!Object.keys(errors).length) {
    return null;
  }
}

export const inputValidation = (input: HTMLInputElement) => {
  const errors: TErrors = {}

  if (!validateInput(input as TInput)) {
    errors[input.name] = true;
  }

  highlightErrors(errors)
}

