import Block from "/src/utils/Block";
import { ChatCard } from "./components/chatCard/ChatCard";
import chatIcon from '/static/empty.svg';
import template from "./chatsList.hbs";

export class ChatsList extends Block {
  initChildren() {
    this.children.chatList = [
      new ChatCard({
        chatIcon,
        chatName: 'Андрей',
        lastMessage: 'И Human Interface Guidelines и Material Design рекомендуют. И Human Interface Guidelines и Material Design рекомендуют',
        lastMessageDate: '10:40',
        newMessages: '2'
      }),
      new ChatCard({
        chatIcon,
        chatName: 'Андрей',
        lastMessage: 'И Human Interface Guidelines и Material Design рекомендуют. И Human Interface Guidelines и Material Design рекомендуют',
        lastMessageDate: '10:40',
        newMessages: '2'
      }),
      new ChatCard({
        chatIcon,
        chatName: 'chatName',
        lastMessage: 'Описание',
        lastMessageDate: '21:00',
        newMessages: '4'
        })
    ]

    // this.children.chatList = new ChatCard({
    //   chatIcon,
    //   chatName: 'Андрей',
    //   lastMessage: 'И Human Interface Guidelines и Material Design рекомендуют. И Human Interface Guidelines и Material Design рекомендуют',
    //   lastMessageDate: '10:40',
    //   newMessages: '2'
    // })
  }

  render() {
    return this.compile(template, {})
  }
}
