import Block from "/src/utils/Block";
import avatar from "/static/user_avatar.svg";
import template from "./profileHeader.hbs";
import styles from "./profileHeader.less";
import { IUser } from "/src/types";

export class ProfileHeader extends Block {
  constructor(props: IUser) {
    super(props);
  }

  protected render() {
    return this.compile(template, {  ...this.props, styles, avatar,});
  }
}
