import Block from "/src/utils/Block";
import { Link } from "/src/components";
import template from './chatsHeader.hbs'
import styles from './chatsHeader.less'

export class ChatsHeader extends Block {
  protected initChildren() {
    this.children.profileLink = new Link({
      text: 'Профиль',
      url: '/profile',
      customClass: 'chatsHeader__profileLink__link'
    })
  }

  protected render() {
    return this.compile(template, { styles })
  }
}
