import { FIELD_NAMES } from "/src/utils/validation/validatator";

export interface ISignInData {
  login: string;
  password: string;
}

export interface ISignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export type TProfile = Omit<IUser, 'password | id | avatar'>;

export type TAvatar = FormData;

export interface IPassword {
  oldPassword: string;
  newPassword: string;
}

export type TState = any;

export type TFieldNamesKeys = keyof typeof FIELD_NAMES;

export type TFormData = [TFieldNamesKeys, string | File];

export type TInput = { name: TFieldNamesKeys, value: string }

export type TErrors = Partial<Record<string, boolean>>;
