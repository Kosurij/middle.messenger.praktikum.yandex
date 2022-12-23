import Block from "/src/utils/Block";
import template from "./message.hbs";
import styles from "./message.less";

interface IMessageProps {
  content: string;
  isMine: boolean;
  time: string | Date;
}

export class Message extends Block {
  constructor(props: IMessageProps) {
    super(props);
  }

  protected render() {
    return this.compile(template, {
      content: this.props.content,
      time: this.props.time,
      isMine: this.props.isMine,
      styles,
    });
  }
}
