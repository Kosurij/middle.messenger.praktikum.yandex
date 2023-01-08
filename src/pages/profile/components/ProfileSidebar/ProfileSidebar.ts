import Block from '/src/utils/Block';
import { Link } from '/src/components';
import { ROUTES } from '/src/const/routes';
import template from './profileSidebar.hbs';
import styles from './profileSidebar.less';

export class ProfileSidebar extends Block {
  protected initChildren() {
    this.children.backButton = new Link({
      text: '',
      to: ROUTES.CHATS,
      customClass: 'sidebar__backButton',
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
