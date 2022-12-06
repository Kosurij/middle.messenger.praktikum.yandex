import Block from "/src/utils/Block";
import template from "./chatsList.hbs";

interface IChatsList {
  chatList: Block[];
}

export class ChatsList extends Block {
  constructor(props: IChatsList) {
    super(props);
  }

  initChildren() {
    this.children.chatList = this.props.chatList;
  }

  render() {
    return this.compile(template, {});
  }
}
