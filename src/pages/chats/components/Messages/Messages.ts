import Block from "/src/utils/Block";
import { MessageInput } from "./components/MessageInput/MessageInput";
import { MessageList } from "./components/MessageList/MessageList";
import userAvatar from '/static/empty.svg';
import template from "./messages.hbs";
import styles from "./messages.less";

export class Messages extends Block {
  protected initChildren() {
    this.children.inputMessage = new MessageInput();

    this.children.messagesList = new MessageList({
      date: '19 июня'
    });
  }

  protected render() {
    return this.compile(template, {
      userName: 'Андрей',
      userAvatar,
      styles
    })
  }
}
