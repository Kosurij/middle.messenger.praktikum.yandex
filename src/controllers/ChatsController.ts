import BaseController from "/src/controllers/BaseController";
import store from "/src/utils/Store";
import { ChatsApi } from "/src/api/ChatsApi";
import { ID, IUser } from "/src/types";
import MessagesController from "/src/controllers/MessagesController";

class ChatsController extends BaseController {
  private readonly api = new ChatsApi();
  protected storePath: string;
  protected notificationText?: string;

  constructor() {
    const storePath = 'chats';

    super(storePath);

    this.storePath = storePath;
  }

  async getChats() {
    await this.makeRequest(async () => {
      const chats = await this.api.read();

      chats.map(async (chat) => {
        const token = await this.getToken(chat.id);

        await MessagesController.connect(chat.id as number, token);
      });

      store.set('chats.data', chats)
    })
  }

  async create(title: string) {
    await this.makeRequest(async () => {
      await this.api.create(title);

      this.getChats();
    })
  }

  async delete(id: ID) {
    await this.makeRequest(async () => {
      await this.api.delete(id);

      this.getChats();
    })
  }

  async addUserToChat(id: ID, user: IUser) {
    await this.makeRequest(async () => {
      const { id: userId, login } = user;

      await this.api.addUsers(id, [userId]);

      this.notificationText = `Пользователь ${login} успешно добавлен`
    })
  }

  async deleteUserFromChat(id: ID, user: IUser) {
    await this.makeRequest(async () => {
      const { id: userId, login } = user;

      await this.api.deleteUsers(id, [userId]);

      this.notificationText = `Пользователь ${login} успешно удален`
    })
  }


  async getToken(id: ID) {
    return this.api.getToken(id);
  }

  selectChat(id: ID) {
    store.set('selectedChat', id);
  }

}

export default new ChatsController();
