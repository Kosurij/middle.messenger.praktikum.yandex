import { AuthApi } from '/src/api/AuthApi';
import { ISignInData, ISignUpData } from '/src/types';
import { ROUTES } from '/src/const/routes';
import store from '/src/utils/Store';
import Router from '/src/utils/Router';
import BaseController from "/src/controllers/BaseController";

class AuthController extends BaseController {
  private readonly api = new AuthApi();

  protected storePath: string;

  protected notificationText?: string;

  constructor() {
    const storePath = 'user';

    super(storePath);

    this.storePath = storePath;
  }

  async signUp(data: ISignUpData) {
    await this.makeRequest(async () => {
      await this.api.signUp(data);

      await this.getUser();

      Router.go(ROUTES.PROFILE);

      this.notificationText = 'Вы успешно зарегистрированы';
    });
  }

  async signIn(data: ISignInData) {
    await this.makeRequest(async () => {
      await this.api.signIn(data);

      await this.getUser();

      Router.go(ROUTES.PROFILE);
    });
  }

  async logout() {
    await this.makeRequest(async () => {
      await this.api.logout();

      Router.go(ROUTES.INDEX);
    });
  }

  async getUser() {
    await this.makeRequest(async () => {
      const user = await this.api.read();

      store.set(`${this.storePath}.data`, user);
    });
  }
}

export default new AuthController();
