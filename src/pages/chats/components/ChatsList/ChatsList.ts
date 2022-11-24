import Block from "/src/utils/Block";
import { ChatCard } from "./components/chatCard/ChatCard";
import chatIcon from '/static/empty.svg';
import template from "./chatsList.hbs";
import styles from "./chatsList.less";


export class ChatsList extends Block {
  initChildren() {
    this.children.chatCard = new ChatCard({
      chatIcon,
      chatName: 'Андрей',
      lastMessage: 'И Human Interface Guidelines и Material Design рекомендуют. И Human Interface Guidelines и Material Design рекомендуют',
      lastMessageDate: ' 10:40',
      newMessages: '2'
    });
  }

  render() {
    return this.compile(template, { styles })
  }
}
