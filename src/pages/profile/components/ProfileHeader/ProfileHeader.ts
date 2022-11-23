import Block from "/src/utils/Block";
import avatar from "/static/user__avatar.png";
import template from "./profileHeader.hbs";
import styles from "./profileHeader.less";

export class ProfileHeader extends Block {
  protected render() {
    return this.compile(template, { styles, avatar })
  }
}
