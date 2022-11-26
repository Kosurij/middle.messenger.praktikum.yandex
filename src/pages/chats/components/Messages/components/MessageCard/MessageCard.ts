import Block from "/src/utils/Block";
import template from "./messageCard.hbs";
import styles from "./messageCard.less";

interface IMessageCardProps {
  message: string;
  time: string | Date;
  type: 'got' | 'sent';
}

export class MessageCard extends Block {
  constructor(props: IMessageCardProps) {
    super(props);
  }

  protected render() {
    return this.compile(template, {
      message: this.props.message,
      time: this.props.time,
      type: this.props.type,
      styles,
    });
  }
}
