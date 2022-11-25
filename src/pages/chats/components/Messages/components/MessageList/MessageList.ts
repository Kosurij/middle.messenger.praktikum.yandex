import Block from "/src/utils/Block";
import template from "./messageList.hbs";
import styles from "./messageList.less";

interface IMessageList {
  date: string | Date;
  messageList: Block[];
}

export class MessageList extends Block {
  constructor(props: IMessageList) {
    super(props);
  }

  initChildren() {
    this.children.messageList = this.props.messageList;
  }

  render() {
    return this.compile(template, {
      date: this.props.date,
      messageList: this.props.messageList,
      styles
    })
  }
}
