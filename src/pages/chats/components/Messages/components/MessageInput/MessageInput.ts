import Block from "/src/utils/Block";
import template from "./messageInput.hbs";
import styles from "./messageInput.less";

export class MessageInput extends Block {
  protected render() {
    return this.compile(template, { styles })
  }
}
