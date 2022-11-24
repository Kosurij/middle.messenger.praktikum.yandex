import Block from "/src/utils/Block";
import { Link } from '../../components'
import template from './404.hbs';
import styles from './404.less'

export class NotFoundPage extends Block {
  protected initChildren() {
    this.children.homeLink = new Link({
      text: 'Назад к чатам',
      url: '/chats',
    })
  }
  protected render() {
    return this.compile(template, { styles })
  }
}
