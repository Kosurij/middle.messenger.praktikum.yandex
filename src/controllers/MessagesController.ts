import WSTransport, { WSTransportEvents } from '../utils/WSTransport';
import store from '../utils/Store';
import { IMessage } from "/src/types";
import { userReducer } from "/src/reducers";
import BaseController from "/src/controllers/BaseController";

class MessagesController extends BaseController {
  private transports: Map<number, WSTransport> = new Map();

  protected storePath: string;

  constructor() {
    const storePath = 'messages';

    super(storePath);

    this.storePath = storePath;
  }

  async connect(id: number, token: string) {
    await this.makeRequest(async () => {
      if (this.transports.has(id)) {
        return;
      }

      const userId = userReducer(store.getState()).id;

      const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);

      this.transports.set(id, wsTransport);

      await wsTransport.connect();

      this.subscribe(wsTransport, id);

      this.fetchOldMessages(id);
    });
  }

  sendMessage(id: number, message: string) {
    this.makeRequest(() => {
      const socket = this.transports.get(id);

      if (!socket) {
        throw new Error(`Chat ${id} is not connected`);
      }

      socket.send({
        type: 'message',
        content: message,
      });
    });
  }

  fetchOldMessages(id: number) {
    this.makeRequest(() => {
      const socket = this.transports.get(id);

      if (!socket) {
        throw new Error(`Chat ${id} is not connected`);
      }

      socket.send({ type: 'get old', content: '0' });
    });
  }

  closeAll() {
    this.makeRequest(() => {
      Array.from(this.transports.values()).forEach((transport) => transport.close());
    });
  }

  private onMessage(id: number, messages: IMessage | IMessage[]) {
    let messagesToAdd: IMessage[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (store.getState().messages?.data || {})[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    store.set(`${this.storePath}.data.${id}`, messagesToAdd);
  }

  private onClose(id: number) {
    this.makeRequest(() => {
      this.transports.delete(id);
    });
  }

  private subscribe(transport: WSTransport, id: number) {
    // @ts-ignore
    transport.on(WSTransportEvents.Message, (message) => this.onMessage(id, message));
    transport.on(WSTransportEvents.Close, () => this.onClose(id));
  }
}

const controller = new MessagesController();

export default controller;
