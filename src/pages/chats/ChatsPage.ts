import Block from "/src/utils/Block";
import { Messages } from "./components/Messages/Messages";
import { ChatsHeader } from "./components/ChatsHeader/ChatsHeader";
import { ChatsList } from "./components/ChatsList/ChatsList";
import { MessageCard } from "./components/Messages/components/MessageCard/MessageCard";
import { ChatCard } from "./components/ChatsList/components/chatCard/ChatCard";
import template from "./chats.hbs";
import avatar from '/static/empty.svg';
import styles from "./chats.less";

export class ChatsPage extends Block {
  protected initChildren() {
    this.children.header = new ChatsHeader();

    this.children.messages = new Messages({
      date: '19 июня',
      messageList: [
        new MessageCard({
          message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой',
          time: '11:56',
          type: 'got',
        }),
        new MessageCard({
          message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой',
          time: '11:56',
          type: 'got',
        }),
        new MessageCard({
          message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой',
          time: '11:56',
          type: 'got',
        }),
        new MessageCard({
          message: 'Круто!',
          time: '12:00',
          type: 'sent',
        }),
      ],
      userName: 'Иван',
      userAvatar: avatar,
    });

    this.children.chatsList = new ChatsList({
      chatList: [
        new ChatCard({
          chatIcon: avatar,
          chatName: 'Андрей',
          lastMessage: 'И Human Interface Guidelines и Material Design рекомендуют. И Human Interface Guidelines и Material Design рекомендуют',
          lastMessageDate: '10:40',
          newMessages: '2',
          events: {
            click: () => {
              // @ts-ignore
              this.children.messages.setProps({
                messageList: [
                  new MessageCard({
                    message: 'Новый текст',
                    time: '11:56',
                    type: 'sent',
                  }),
                  new MessageCard({
                    message: 'И Human Interface Guidelines и Material Design рекомендуют!',
                    time: '12:00',
                    type: 'got',
                  }),
                ],
                date: '20 июня',
                userName: 'Андрей',
                userAvatar: avatar,
              });
            },
          },
        }),
        new ChatCard({
          chatIcon: avatar,
          chatName: 'Иван',
          lastMessage: 'И Human Interface Guidelines и Material Design рекомендуют. И Human Interface Guidelines и Material Design рекомендуют',
          lastMessageDate: '10:40',
          newMessages: '2',
        }),
        new ChatCard({
          chatIcon: avatar,
          chatName: 'chatName',
          lastMessage: 'Описание',
          lastMessageDate: '21:00',
          newMessages: '4',
        }),
      ],
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
