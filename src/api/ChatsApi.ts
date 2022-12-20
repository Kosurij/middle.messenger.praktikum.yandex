import BaseAPI from '/src/api/BaseApi';
import { IChatInfo, ID, IUser } from "/src/types";

export class ChatsApi extends BaseAPI {
  constructor() {
    super('/chats');
  }

  read(): Promise<IChatInfo[]> {
    return this.http.get();
  }

  create(title: string) {
    return this.http.post('', { title });
  }

  delete(id: ID): Promise<unknown> {
    return this.http.delete('', { chatId: id });
  }

  getUsers(id: ID): Promise<IUser[] & { role: string }> {
    return this.http.get(`/${id}/users`)
  }

  addUsers(id: ID, users: ID[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id });
  }

  async getToken(id: ID): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }


  update = undefined;
}
