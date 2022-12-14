import Block from '/src/utils/Block';
import { Link } from '/src/components';
import { ROUTES } from '/src/const/routes';
import template from './chatsHeader.hbs';
import styles from './chatsHeader.less';

export class ChatsHeader extends Block {
  protected initChildren() {
    this.children.profileLink = new Link({
      text: 'Профиль',
      to: ROUTES.PROFILE,
      customClass: 'chatsHeader__profileLink__link',
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
