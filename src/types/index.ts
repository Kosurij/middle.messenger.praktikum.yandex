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
