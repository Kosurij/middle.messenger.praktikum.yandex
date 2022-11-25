import Block from "/src/utils/Block";
import { MessageCard } from "./components/MessageCard/MessageCard";
import template from "./messageList.hbs";
import styles from "./messageList.less";

interface IMessageList {
  date: string | Date;
}

export class MessageList extends Block {
  constructor(props: IMessageList) {
    super(props);
  }
  initChildren() {
    this.children.messageList = [
      new MessageCard({
        message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой',
        time: '11:56',
        type: 'got'
      }),
      new MessageCard({
        message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой',
        time: '11:56',
        type: 'got'
      }),
      new MessageCard({
        message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой',
        time: '11:56',
        type: 'got'
      }),
      new MessageCard({
        message: 'Круто!',
        time: '12:00',
        type: 'sent'
      }),
    ]
  }

  render() {
    return this.compile(template, {
      date: this.props.date,
      styles
    })
  }
}
