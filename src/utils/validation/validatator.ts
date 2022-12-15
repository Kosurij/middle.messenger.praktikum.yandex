export type TFieldNamesKeys = keyof typeof FIELD_NAMES;

export type TFormData = [TFieldNamesKeys, string];

export type TInput = { name: TFieldNamesKeys, value: string }

type TErrors = Partial<Record<string, boolean>>;

export enum FIELD_NAMES {
  first_name = "first_name",
  second_name = "second_name",
  display_name = "display_name",
  login = "login",
  email = "email",
  oldPassword = "oldPassword",
  newPassword = "newPassword",
  password = "password",
  phone = "phone",
  message = "message",
}

const VALIDATION_FIELDS: Record<TFieldNamesKeys, { pattern: RegExp, info: string }> = {
  [FIELD_NAMES.first_name]: {
    pattern: /^[А-ЯЁA-Z]{1}([а-яёa-z]|-[А-ЯЁA-Zа-яёa-z]{1}[а-яёa-z])*$/,
    info: 'Только из букв (первая заглавная)'
  },
  [FIELD_NAMES.second_name]: {
    pattern: /^[А-ЯЁA-Z]{1}([а-яёa-z]|-[А-ЯЁA-Zа-яёa-z]{1}[а-яёa-z])*$/,
    info: 'Только из букв (первая заглавная)'
  },
  [FIELD_NAMES.login]: {
    pattern: /^(?=.*?([a-zA-Z]|-|_))(\w|-|_){3,20}$/,
    info: 'Логин должен содержать 3-20 символов: цифры, буквы и "_", "-"'
  },
  [FIELD_NAMES.display_name]: {
    pattern: /^(?=.*?([a-zA-Z]|-|_))(\w|-|_){3,20}$/,
    info: 'Имя должно содержать 3-20 символов: цифры, буквы и "_", "-"'
  },
  [FIELD_NAMES.email]: {
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    info: 'Некорректный email'
  },
  [FIELD_NAMES.phone]: {
    pattern: /^\+?\d{10,15}$/,
    info: 'Некорректный номер телефона'
  },
  [FIELD_NAMES.message]: {
    pattern: /[\s\S]+/,
    info: 'Сообщение не должно быть пустым',
  },
  [FIELD_NAMES.oldPassword]: {
    pattern: /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/,
    info: 'Пароль должен содержать 8-40 символов: заглавную букву и цифру'
  },
  [FIELD_NAMES.newPassword]: {
    pattern: /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/,
    info: 'Пароль должен содержать 8-40 символов: заглавную букву и цифру'
  },
  [FIELD_NAMES.password]: {
    pattern: /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/,
    info: 'Пароль должен содержать 8-40 символов: заглавную букву и цифру'
  },
};

const highlightErrors = (errors: TErrors, selector = '.inputField', errorClass = 'inputField-error') => {
  const inputWrappers: HTMLElement[] = Array.from(document.querySelectorAll(selector));

  inputWrappers.forEach((inputWrapper) => {
    const input = inputWrapper.querySelector('input') as HTMLInputElement;

    if (errors[input.name]) {
      inputWrapper.classList.add(errorClass);
      inputWrapper.dataset.content = VALIDATION_FIELDS[input.name as TFieldNamesKeys].info;
    } else {
      inputWrapper.classList.remove(errorClass)
    }
  });
};

const validateFormData = ([fieldName, value]: TFormData): boolean => VALIDATION_FIELDS[fieldName].pattern.test(value);

const validateInput = ({ name, value } : TInput) => VALIDATION_FIELDS[name].pattern.test(value);

export const formValidation = (formData: FormData, selector?: string, errorClass?: string) => {
  const errors: TErrors = {};

  /*
   * Линтер предлагает отказаться от цикла for и бежать методом, однако это formData и тут так не получится.
   * Чтобы избежать лишних приседаний с пробегом по итератору и мутированием FormData, временно отключаю это правило.
   */
  // eslint-disable-next-line no-restricted-syntax
  for (const inputField of formData) {
    if (!validateFormData(inputField as TFormData)) {
      errors[inputField[0]] = true;
    }
  }

  highlightErrors(errors, selector, errorClass);

  if (!Object.keys(errors).length) {
    return null;
  }
};

export const inputValidation = (input: HTMLInputElement, errorClass = 'inputField-error') => {
  let inputError = null;
  const parentElement = input.parentElement as HTMLElement;

  if (!validateInput(input as TInput)) {
    inputError = true;
  }

  if (inputError) {
    parentElement.classList.add(errorClass);
    parentElement.dataset.content = VALIDATION_FIELDS[input.name as TFieldNamesKeys].info;
  } else {
    parentElement.classList.remove(errorClass);
  }
};

export const inputValidationHandler = (e: Event) => {
  inputValidation(e.target as HTMLInputElement);
};
