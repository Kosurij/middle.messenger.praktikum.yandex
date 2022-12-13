import Block from "/src/utils/Block";
import { Link } from '../../components';
import template from './500.hbs';
import styles from './500.less';

export class ServerErrorPage extends Block {
  protected initChildren() {
    this.children.homeLink = new Link({
      text: 'Назад к чатам',
      to: '/chats',
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
