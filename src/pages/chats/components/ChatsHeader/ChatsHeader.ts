import Block from "/src/utils/Block";
import { Link } from "/src/components";
import template from './chatsHeader.hbs';
import styles from './chatsHeader.less';
import { renderDOM } from "/src/utils/renderDOM";
import { ProfileDetailsPage } from "/src/pages/profile/details/ProfileDetailsPage";

export class ChatsHeader extends Block {
  protected initChildren() {
    this.children.profileLink = new Link({
      text: 'Профиль',
      url: '/profile',
      customClass: 'chatsHeader__profileLink__link',
      events: {
        click: (e) => {
          const profileDetailsPage = new ProfileDetailsPage();

          e.preventDefault();

          renderDOM(profileDetailsPage);
        },
      },
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
