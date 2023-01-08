import Block from '/src/utils/Block';
import { Link } from '../../components';
import { ROUTES } from '/src/const/routes';
import template from './500.hbs';
import styles from './500.less';

export class ServerErrorPage extends Block {
  protected initChildren() {
    this.children.homeLink = new Link({
      text: 'Назад к чатам',
      to: ROUTES.INDEX,
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
