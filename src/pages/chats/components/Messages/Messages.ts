import Block from "/src/utils/Block";
import { MessageInput } from "./components/MessageInput/MessageInput";
import template from "./messages.hbs";
import styles from "./messages.less";

export class Messages extends Block {
  protected initChildren() {
    this.children.inputMessage = new MessageInput()
  }

  protected render() {
    return this.compile(template, { styles })
  }
}
