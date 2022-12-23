import BaseAPI from '/src/api/BaseApi';
import {
  IPassword, TProfile, TAvatar, IUser,
} from '/src/types';

export class UserApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeProfile(data: TProfile): Promise<IUser> {
    return this.http.put('/profile', data);
  }

  changeAvatar(data: TAvatar) {
    return this.http.put('/profile/avatar', data);
  }

  changePassword(data: IPassword) {
    return this.http.put('/password', data);
  }

  searchUser(data: Pick<IUser, 'login'>) {
    return this.http.post('/search', data);
  }

  update = undefined;

  read = undefined;

  create = undefined;

  delete = undefined;
}
