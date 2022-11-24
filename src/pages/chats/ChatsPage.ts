import Block from "/src/utils/Block";
import { Messages } from "./components/Messages/Messages";
import { ChatsHeader } from "./components/ChatsHeader/ChatsHeader";
import { ChatsList } from "./components/ChatsList/ChatsList";
import template from "./chats.hbs";
import styles from "./chats.less";

export class ChatsPage extends Block {
  protected initChildren() {
    this.children.messages = new Messages();

    this.children.chatsList = new ChatsList();

    this.children.header = new ChatsHeader();
  }

  protected render() {
    return this.compile(template, { styles })
  }
}
