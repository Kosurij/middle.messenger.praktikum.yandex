import Block from "/src/utils/Block";
import template from "./profileSidebar.hbs";
import styles from "./profileSidebar.less";

export class ProfileSidebar extends Block {
  protected render() {
    return this.compile(template, { styles })
  }
}
