import BaseController from "/src/controllers/BaseController";
import store from "/src/utils/Store";
import { ChatsApi } from "/src/api/ChatsApi";
import { ID } from "/src/types";

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
    const chats = await this.api.read();

    // chats.map(async (chat) => {
    //   const token = await this.getToken(chat.id);
    //
    //   await MessagesController.connect(chat.id, token);
    // });

    store.set('chats', chats)
  }

  async create(title: string) {
    await this.api.create(title);

    this.getChats();
  }

  async delete(id: ID) {
    await this.api.delete(id);

    this.getChats();
  }

  addUserToChat(id: ID, userId: ID) {
    this.api.addUsers(id, [userId]);
  }

  getToken(id: ID) {
    return this.api.getToken(id);
  }

  selectChat(id: ID) {
    store.set('selectedChat', id);
  }

}

export default new ChatsController();
