import Block from "/src/utils/Block";
import { Link } from '../../components';
import template from './404.hbs';
import styles from './404.less';

export class NotFoundPage extends Block {
  protected initChildren() {
    this.children.homeLink = new Link({
      text: 'Вернуться на главную',
      to: '/',
      type: 'large',
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
