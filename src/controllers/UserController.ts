import { UserApi } from "/src/api/UserApi";
import { ROUTES } from '/src/const/routes';
import Router from '/src/utils/Router'
import BaseController from "/src/controllers/BaseController";
import AuthController from "/src/controllers/AuthController";
import { IPassword, TProfile } from "/src/types";

class UserController extends BaseController {
  private readonly api = new UserApi();
  protected storePath: string;

  constructor() {
    const storePath = 'user';

    super(storePath);

    this.storePath = storePath;
  }

  async changeProfile(data: TProfile) {
    await this.makeRequest(async () => {
      await this.api.changeProfile(data);

      await this.getUser();

      Router.go(ROUTES.PROFILE)
    })
  }

  async changePassword(data: IPassword) {
    await this.makeRequest(async () => {
      await this.api.changePassword(data);

      Router.go(ROUTES.PROFILE)

      alert('Пароль успешно изменен')
    })
  }

  async getUser() {
    await AuthController.getUser()
  }
}

export default new UserController();
