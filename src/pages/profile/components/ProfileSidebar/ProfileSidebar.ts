import Block from "/src/utils/Block";
import { Link } from "/src/components";
import template from "./profileSidebar.hbs";
import styles from "./profileSidebar.less";

export class ProfileSidebar extends Block {
  protected initChildren() {
    this.children.backButton = new Link({
      text: '',
      to: '/chats',
      customClass: 'sidebar__backButton',
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
