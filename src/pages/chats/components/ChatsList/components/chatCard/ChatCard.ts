import Block from "/src/utils/Block";
import template from './chatCard.hbs';
import styles from './chatCard.less';

interface IChatCardProps {
  chatIcon: string;
  chatName: string;
  lastMessage: string;
  lastMessageDate: string | Date;
  newMessages: string | number;
  events?: {
    click?: () => void;
  }
}

export class ChatCard extends Block {
  constructor(props: IChatCardProps) {
    super(props);
  }

  protected render() {
    return this.compile(template, {
      chatIcon: this.props.chatIcon,
      chatName: this.props.chatName,
      lastMessage: this.props.lastMessage,
      lastMessageDate: this.props.lastMessageDate,
      newMessages: this.props.newMessages,
      events: {
        click: this.props.click,
      },
      styles,
    });
  }
}
