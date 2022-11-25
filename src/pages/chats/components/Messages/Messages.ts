import Block from "/src/utils/Block";
import { MessageInput } from "./components/MessageInput/MessageInput";
import { MessageList } from "./components/MessageList/MessageList";
import template from "./messages.hbs";
import styles from "./messages.less";

interface IMessages {
  userName: string;
  date: string | Date;
  messageList: Block[];
  userAvatar: string;
}

export class Messages extends Block {
  constructor(props: IMessages) {
    super(props);
  }

  protected initChildren() {
    this.children.inputMessage = new MessageInput();

    this.children.messagesList = new MessageList({
      date: this.props.date,
      messageList: this.props.messageList,
    });
  }

  protected componentDidUpdate(oldProps: IMessages, newProps: IMessages): boolean {
    if (newProps !== oldProps) {
      this.children.messagesList = new MessageList({
        date: this.props.date,
        messageList: this.props.messageList,
      })
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  protected render() {
    return this.compile(template, {
      userName: this.props.userName,
      userAvatar: this.props.userAvatar,
      messagesList: this.props.messagesList,
      styles
    })
  }
}
