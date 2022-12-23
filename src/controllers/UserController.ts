import { UserApi } from "/src/api/UserApi";
import { ROUTES } from '/src/const/routes';
import Router from '/src/utils/Router';
import BaseController from "/src/controllers/BaseController";
import AuthController from "/src/controllers/AuthController";
import {
  IPassword, IUser, TAvatar, TProfile,
} from "/src/types";
import store from "/src/utils/Store";

class UserController extends BaseController {
  private readonly api = new UserApi();

  protected storePath: string;

  protected notificationText?: string;

  constructor() {
    const storePath = 'user';

    super(storePath);

    this.storePath = storePath;
  }

  async changeProfile(data: TProfile) {
    await this.makeRequest(async () => {
      await this.api.changeProfile(data);

      await this.getUser();

      Router.go(ROUTES.PROFILE);

      this.notificationText = 'Данные успешно изменены';
    });
  }

  async changePassword(data: IPassword) {
    await this.makeRequest(async () => {
      await this.api.changePassword(data);

      Router.go(ROUTES.PROFILE);

      this.notificationText = 'Пароль успешно изменен';
    });
  }

  async changeAvatar(data: TAvatar) {
    await this.makeRequest(async () => {
      await this.api.changeAvatar(data);

      await this.getUser();

      this.notificationText = 'Аватар успешно изменен';
    });
  }

  async getUser() {
    await AuthController.getUser();
  }

  async searchUser(data: Pick<IUser, 'login'>) {
    await this.makeRequest(async () => {
      const user = await this.api.searchUser(data);

      store.set(`${this.storePath}.searchedUser`, user);
    });
  }
}

export default new UserController();
