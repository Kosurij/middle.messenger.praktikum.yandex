import Block from "/src/utils/Block";
import { Messenger } from "./components/Messenger/Messenger";
import { ChatsHeader } from "./components/ChatsHeader/ChatsHeader";
import { ChatsList } from "./components/ChatsList/ChatsList";
import template from "./chats.hbs";
import styles from "./chats.less";
import ChatsController from "/src/controllers/ChatsController";

export class ChatsPage extends Block {
  protected init() {
    ChatsController.getChats();

    this.children.header = new ChatsHeader();

    this.children.chatsList = new ChatsList({});

    this.children.messenger = new Messenger({});
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
