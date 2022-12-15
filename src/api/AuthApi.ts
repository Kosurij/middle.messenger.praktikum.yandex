import BaseAPI from '/src/api/BaseApi';
import { ISignInData, ISignUpData, IUser } from '/src/types';

export class AuthApi extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signUp(data: ISignUpData) {
    return this.http.post('/signup', data);
  }

  signIn(data: ISignInData) {
    return this.http.post('/signin', data);
  }

  read(): Promise<IUser> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;
  delete = undefined;
  update = undefined;
}
